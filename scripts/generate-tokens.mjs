// Converts Figma variable data → tokens.json (W3C DTCG format)
//
// When FIGMA_TOKEN + FIGMA_FILE_KEY are set in .env.local, values are fetched
// live from the Figma Variables REST API and merged over the hardcoded fallback.
// Falls back to the hardcoded snapshot below if the fetch fails or creds are absent.
//
// Required Figma PAT scope: file_variables:read
// Create at: figma.com → Account Settings → Security → Personal access tokens

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(fileURLToPath(import.meta.url), '../../');

// ─── Load .env.local ──────────────────────────────────────────────────────────

function loadEnvLocal() {
  const envPath = join(ROOT, '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnvLocal();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toHex(r, g, b) {
  return '#' + [r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
}

function colorValue({ r, g, b, a }) {
  const alpha = Math.round(a * 1000) / 1000;
  if (alpha === 1) return toHex(r, g, b);
  return `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${alpha})`;
}

// Convert a Figma alias path ("Z/800", "cta/600", "fg/primary") into a token reference.
// Primitive references → {color.Z.800}
// Same-collection (semantic) references → {semantic.<mode>.fg.primary}
function aliasToRef(name, mode) {
  const primitiveGroups = ['Z','TB','TW','red','yellow','orange','pink','purple','sky','indigo','pistachio','green','cta'];
  const group = name.split('/')[0];
  if (primitiveGroups.includes(group)) {
    return `{color.${name.replace(/\//g, '.')}}`;
  }
  // semantic self-reference
  return `{semantic.${mode}.${name.replace(/\//g, '.')}}`;
}

// Set a deep nested key on an object from a path like "bg/page" → obj.bg.page = val
function setDeep(obj, path, val) {
  const parts = path.split('/');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]]) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = val;
}

// ─── Known Figma → canonical name renames ────────────────────────────────────
// When you rename a variable in Figma, add an entry here so the CSS variable
// names (and Tailwind short aliases) stay stable.
// Format:  'figma-variable-name': 'canonical-token-name-in-this-file'

const FIGMA_RENAMES = {
  // type-primitives — restructured April 2026
  // (font-size/ → size/, spaces removed, sub-groups added)
  'size/headings/display/H1': 'font-size/headings/Display H1',
  'size/headings/display/H2': 'font-size/headings/Display H2',
  'size/headings/H1':         'font-size/headings/H1',
  'size/headings/H2':         'font-size/headings/H2',
  'size/headings/H3':         'font-size/headings/H3',
  'size/headings/H4':         'font-size/headings/H4',
  'size/headings/H5':         'font-size/headings/H5',
  'size/headings/H6':         'font-size/headings/H6',
  'size/copy/M':              'font-size/copy/copy M',
  'size/copy/S':              'font-size/copy/copy S',
  'size/copy/XS':             'font-size/copy/copy XS',
  'size/labels/subheading':   'font-size/labels/subheading',
  'size/labels/label-S':      'font-size/labels/label S',
  'size/labels/legal':        'font-size/labels/legal',
  'size/labels/fine-print':   'font-size/labels/fine-print',
  'size/labels/overline/M':   'font-size/labels/overline M',
  'size/labels/overline/S':   'font-size/labels/overline S',
  'size/ui/btn/M':            'font-size/ui/button M',
  'size/ui/btn/S':            'font-size/ui/button S',
  'size/ui/card/M':           'font-size/ui/card M',
  'size/ui/tag/M':            'font-size/ui/tag M',
  'size/ui/tag/S':            'font-size/ui/tag S',
  'size/ui/caption':          'font-size/ui/caption',
  'size/ui/nav/L':            'font-size/ui/nav L',
  'size/ui/nav/M':            'font-size/ui/nav M',
  'size/ui/nav/S':            'font-size/ui/nav S',
  'size/ui/tooltip/txt':      'font-size/ui/tooltip',
  'size/ui/tooltip/kbd':      'font-size/ui/tooltip-kbd',
  'size/ui/chip/S':           'font-size/ui/chip S',
  'size/ui/chip/XS':          'font-size/ui/chip XS',
  'size/brand/logo':          'font-size/brand/logo',
};

// ─── Figma Variables REST API ────────────────────────────────────────────────

const PRIMITIVE_GROUPS = new Set([
  'Z','TB','TW','red','yellow','orange','pink','purple',
  'sky','indigo','pistachio','green','cta',
]);

async function fetchFigmaVariables(token, fileKey) {
  const url = `https://api.figma.com/v1/files/${fileKey}/variables/local`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Figma API ${res.status}: ${data.message ?? JSON.stringify(data)}`);
  }
  return data.meta;
}

function parseFigmaVariables(meta) {
  const { variableCollections, variables } = meta;

  // Build id → variable lookup
  const varById = {};
  for (const v of Object.values(variables)) varById[v.id] = v;

  // Resolve a variable alias value → the referenced variable's name (or null)
  const resolveAlias = (val) =>
    val?.type === 'VARIABLE_ALIAS' ? (varById[val.id]?.name ?? null) : null;

  const result = {
    primitives: {},
    semanticRaw: [],
    typography: { desktop: {}, tablet: {}, mobile: {} },
    spacing: {},
    radius: {},
    blur: {},
  };

  for (const coll of Object.values(variableCollections)) {
    if (coll.remote) continue;

    // Build modeId lookups by normalized name
    const modeByNorm = {};  // normalised-name → modeId
    for (const m of coll.modes) modeByNorm[m.name.toLowerCase()] = m.modeId;

    const lightId   = modeByNorm['light'];
    const darkId    = modeByNorm['dark'];
    const desktopId = modeByNorm['desktop'];
    const tabletId  = findModeId(modeByNorm, ['tablet', 'sm']);
    const mobileId  = findModeId(modeByNorm, ['mobile', 'xs']);
    const defaultId = coll.modes[0]?.modeId;

    const isSemanticColl  = !!(lightId && darkId);
    const isTypographyColl = !!desktopId;

    for (const varId of coll.variableIds) {
      const v = varById[varId];
      if (!v || v.remote) continue;

      const figmaName    = v.name;
      const canonName    = FIGMA_RENAMES[figmaName] ?? figmaName;
      const topGroup     = figmaName.split('/')[0];

      if (v.resolvedType === 'COLOR') {
        if (PRIMITIVE_GROUPS.has(topGroup)) {
          // Primitive colour — direct RGBA value
          const slashIdx = figmaName.indexOf('/');
          const group = figmaName.slice(0, slashIdx);
          const shade = figmaName.slice(slashIdx + 1);
          if (!result.primitives[group]) result.primitives[group] = {};
          const val = v.valuesByMode[defaultId];
          if (val && !val.type) result.primitives[group][shade] = val;

        } else if (isSemanticColl) {
          // Semantic alias colour
          const lightVal = v.valuesByMode[lightId];
          const darkVal  = v.valuesByMode[darkId];
          const lightRef = resolveAlias(lightVal);
          const darkRef  = resolveAlias(darkVal);
          if (lightRef && darkRef) {
            result.semanticRaw.push({ name: canonName, light: lightRef, dark: darkRef });
          }
        }

      } else if (v.resolvedType === 'FLOAT') {
        if (isTypographyColl) {
          const dVal = v.valuesByMode[desktopId];
          const tVal = tabletId  ? v.valuesByMode[tabletId]  : undefined;
          const mVal = mobileId  ? v.valuesByMode[mobileId]  : undefined;
          if (typeof dVal === 'number') result.typography.desktop[canonName] = dVal;
          if (typeof tVal === 'number') result.typography.tablet[canonName]  = tVal;
          if (typeof mVal === 'number') result.typography.mobile[canonName]  = mVal;

        } else {
          const val = v.valuesByMode[defaultId];
          if (typeof val !== 'number') continue;

          // Strip collection-group prefixes used in the "layout" collection
          // e.g. "spacing/p-1" → "p-1", "radius/radius-1" → "radius-1"
          let shortName = canonName;
          if      (shortName.startsWith('spacing/')) shortName = shortName.slice('spacing/'.length);
          else if (shortName.startsWith('radius/'))  shortName = shortName.slice('radius/'.length);
          else if (shortName.startsWith('blur/'))    shortName = shortName.slice('blur/'.length);

          if (shortName.startsWith('p-')) {
            result.spacing[shortName] = val;
          } else if (shortName.startsWith('radius-') || shortName === 'radius-half' || shortName === 'radius-full') {
            result.radius[shortName] = val;
          } else if (shortName.startsWith('blur-')) {
            result.blur[shortName] = val;
          }
          // letter-spacing and other FLOAT vars not matched above are silently ignored
        }
      }
    }
  }

  return result;
}

// Find the first matching modeId from a list of candidate name fragments
function findModeId(modeByNorm, fragments) {
  for (const frag of fragments) {
    const key = Object.keys(modeByNorm).find(k => k.includes(frag));
    if (key) return modeByNorm[key];
  }
  return null;
}

// Merge Figma data over hardcoded defaults (Figma wins for matching keys)
function mergeWithDefaults(figma, defaults) {
  // --- Primitives ---
  const primitives = structuredClone(defaults.primitives);
  for (const [group, shades] of Object.entries(figma.primitives)) {
    if (!primitives[group]) primitives[group] = {};
    for (const [shade, rgba] of Object.entries(shades)) {
      primitives[group][shade] = rgba;
    }
  }

  // --- Semantic ---
  const semMap = new Map(defaults.semanticRaw.map(s => [s.name, { ...s }]));
  for (const entry of figma.semanticRaw) {
    semMap.set(entry.name, entry);
  }
  const semanticRaw = Array.from(semMap.values());

  // --- Typography ---
  const typography = { desktop: { ...defaults.typography.desktop }, tablet: { ...defaults.typography.tablet }, mobile: { ...defaults.typography.mobile } };
  for (const bp of ['desktop', 'tablet', 'mobile']) {
    for (const [name, val] of Object.entries(figma.typography[bp])) {
      if (typeof val === 'number') typography[bp][name] = val;
    }
  }

  // --- Spacing ---
  const spacing = { ...defaults.spacing };
  for (const [name, val] of Object.entries(figma.spacing)) {
    if (typeof val === 'number') spacing[name] = val;
  }

  // --- Radius ---
  const radius = { ...defaults.radius };
  for (const [name, val] of Object.entries(figma.radius)) {
    if (typeof val === 'number') radius[name] = val;
  }

  return { primitives, semanticRaw, typography, spacing, radius };
}

// ─── Hardcoded fallback data ──────────────────────────────────────────────────
// These are used as defaults when Figma is unreachable, or for tokens that
// aren't (yet) in the Figma file.  Figma values always take precedence.

const primitives = {
  "Z": {
    "0":    { r:1,                   g:1,                   b:1,                   a:1 },
    "50":   { r:0.9803921580314636,  g:0.9803921580314636,  b:0.9803921580314636,  a:1 },
    "100":  { r:0.9647058844566345,  g:0.9647058844566345,  b:0.9647058844566345,  a:1 },
    "200":  { r:0.8313725590705872,  g:0.8313725590705872,  b:0.8313725590705872,  a:1 },
    "300":  { r:0.6784313917160034,  g:0.6784313917160034,  b:0.6784313917160034,  a:1 },
    "400":  { r:0.6352941393852234,  g:0.6352941393852234,  b:0.6352941393852234,  a:1 },
    "500":  { r:0.43921568989753723, g:0.43921568989753723, b:0.43921568989753723, a:1 },
    "600":  { r:0.250980406999588,   g:0.250980406999588,   b:0.250980406999588,   a:1 },
    "700":  { r:0.14901961386203766, g:0.14901961386203766, b:0.14901961386203766, a:1 },
    "800":  { r:0.12156862765550613, g:0.12156862765550613, b:0.12156862765550613, a:1 },
    "900":  { r:0.0784313753247261,  g:0.0784313753247261,  b:0.0784313753247261,  a:1 },
    "1000": { r:0,                   g:0,                   b:0,                   a:1 },
  },
  "TB": {
    "0":   { r:0, g:0, b:0, a:0 },
    "50":  { r:0, g:0, b:0, a:0.03999999910593033 },
    "100": { r:0, g:0, b:0, a:0.05999999865889549 },
    "200": { r:0, g:0, b:0, a:0.07999999821186066 },
    "300": { r:0, g:0, b:0, a:0.10000000149011612 },
    "400": { r:0, g:0, b:0, a:0.11999999731779099 },
    "500": { r:0, g:0, b:0, a:0.1599999964237213  },
    "600": { r:0, g:0, b:0, a:0.20000000298023224 },
    "700": { r:0, g:0, b:0, a:0.4000000059604645  },
    "800": { r:0, g:0, b:0, a:0.6399999856948853  },
    "900": { r:0, g:0, b:0, a:0.8999999761581421  },
    "950": { r:0, g:0, b:0, a:0.949999988079071   },
  },
  "TW": {
    "0":   { r:1, g:1, b:1, a:0 },
    "50":  { r:1, g:1, b:1, a:0.03999999910593033 },
    "100": { r:1, g:1, b:1, a:0.05999999865889549 },
    "200": { r:1, g:1, b:1, a:0.07999999821186066 },
    "300": { r:1, g:1, b:1, a:0.10000000149011612 },
    "400": { r:1, g:1, b:1, a:0.11999999731779099 },
    "500": { r:1, g:1, b:1, a:0.1599999964237213  },
    "600": { r:1, g:1, b:1, a:0.20000000298023224 },
    "700": { r:1, g:1, b:1, a:0.4000000059604645  },
    "800": { r:1, g:1, b:1, a:0.6399999856948853  },
    "900": { r:1, g:1, b:1, a:0.8999999761581421  },
    "950": { r:1, g:1, b:1, a:0.949999988079071   },
  },
  "red": {
    "50":  { r:1,                   g:0.9529411792755127, b:0.9529411792755127, a:1 },
    "100": { r:1,                   g:0.8352941274642944, b:0.8352941274642944, a:1 },
    "300": { r:1,                   g:0.5647059082984924, b:0.5647059082984924, a:1 },
    "400": { r:1,                   g:0.4941176474094391, b:0.501960813999176,  a:1 },
    "500": { r:1,                   g:0.2980392277240753, b:0.30980393290519714,a:1 },
    "700": { r:0.5882353186607361,  g:0.14901961386203766,b:0.1568627506494522, a:1 },
    "800": { r:0.2235294133424759,  g:0.06666667014360428,b:0.06666667014360428,a:1 },
    "900": { r:0.1725490242242813,  g:0,                  b:0,                  a:1 },
    "950": { r:0.10588235408067703, g:0.0313725508749485, b:0.0313725508749485, a:1 },
  },
  "yellow": {
    "50":  { r:1,                   g:0.9803921580314636, b:0.9058823585510254,  a:1 },
    "100": { r:1,                   g:0.9372549057006836, b:0.7019608020782471,  a:1 },
    "300": { r:1,                   g:0.8509804010391235, b:0.4901960790157318,  a:1 },
    "400": { r:0.9843137264251709,  g:0.8117647171020508, b:0.29019609093666077, a:1 },
    "500": { r:0.9764705896377563,  g:0.7372549176216125, b:0.01568627543747425, a:1 },
    "600": { r:0.7882353067398071,  g:0.658823549747467,  b:0.2980392277240753,  a:1 },
    "700": { r:0.5686274766921997,  g:0.3921568691730499, b:0.01568627543747425, a:1 },
    "800": { r:0.2823529541492462,  g:0.22745098173618317,b:0.019607843831181526,a:1 },
    "900": { r:0.13333334028720856, g:0.10980392247438431,b:0.007843137718737125,a:1 },
    "950": { r:0.1725490242242813,  g:0.13333334028720856,b:0,                   a:1 },
  },
  "orange": {
    "50":  { r:1,                   g:0.9686274528503418, b:0.9411764740943909,  a:1 },
    "100": { r:1,                   g:0.886274516582489,  b:0.7921568751335144,  a:1 },
    "300": { r:1,                   g:0.7215686440467834, b:0.43921568989753723, a:1 },
    "400": { r:1,                   g:0.7803921699523926, b:0.45098039507865906, a:1 },
    "500": { r:1,                   g:0.6941176652908325, b:0.23529411852359772, a:1 },
    "600": { r:0.8509804010391235,  g:0.46666666865348816,b:0.0235294122248888,  a:1 },
    "700": { r:0.6000000238418579,  g:0.30980393290519714,b:0,                   a:1 },
    "800": { r:0.27450981736183167, g:0.1725490242242813, b:0.08235294371843338, a:1 },
    "900": { r:0.1725490242242813,  g:0.0941176488995552, b:0,                   a:1 },
    "950": { r:0.1411764770746231,  g:0.09019608050584793,b:0.04313725605607033, a:1 },
  },
  "pink": {
    "50":  { r:1,                   g:0.9647058844566345, b:0.9921568632125854,  a:1 },
    "100": { r:1,                   g:0.9137254953384399, b:0.9764705896377563,  a:1 },
    "300": { r:1,                   g:0.6666666865348816, b:0.9333333373069763,  a:1 },
    "400": { r:1,                   g:0.6705882549285889, b:0.9058823585510254,  a:1 },
    "500": { r:1,                   g:0.545098066329956,  b:0.8705882430076599,  a:1 },
    "700": { r:0.5607843399047852,  g:0.2078431397676468, b:0.4588235318660736,  a:1 },
    "800": { r:0.2666666805744171,  g:0.08627451211214066,b:0.21960784494876862, a:1 },
    "900": { r:0.1725490242242813,  g:0,                  b:0.13333334028720856, a:1 },
    "950": { r:0.14901961386203766, g:0.0470588244497776, b:0.12156862765550613, a:1 },
  },
  "purple": {
    "50":  { r:0.9882352948188782,  g:0.9725490212440491, b:1,                   a:1 },
    "100": { r:0.95686274766922,    g:0.8980392217636108, b:1,                   a:1 },
    "300": { r:0.800000011920929,   g:0.5333333611488342, b:1,                   a:1 },
    "400": { r:0.8549019694328308,  g:0.6705882549285889, b:0.9921568632125854,  a:1 },
    "500": { r:0.7960784435272217,  g:0.5411764979362488, b:0.9882352948188782,  a:1 },
    "700": { r:0.47843137383461,    g:0.21960784494876862,b:0.6705882549285889,  a:1 },
    "800": { r:0.23137255012989044, g:0.10196078568696976,b:0.32549020648002625, a:1 },
    "900": { r:0.10980392247438431, g:0,                  b:0.2078431397676468,  a:1 },
    "950": { r:0.12941177189350128, g:0.05882352963089943,b:0.18039216101169586, a:1 },
  },
  "sky": {
    "50":  { r:0.9647058844566345,  g:0.9764705896377563, b:1,                   a:1 },
    "100": { r:0.886274516582489,   g:0.9254902005195618, b:1,                   a:1 },
    "300": { r:0.5333333611488342,  g:0.800000011920929,  b:1,                   a:1 },
    "400": { r:0.572549045085907,   g:0.7921568751335144, b:1,                   a:1 },
    "500": { r:0.40784314274787903, g:0.7137255072593689, b:1,                   a:1 },
    "700": { r:0.1568627506494522,  g:0.4274509847164154, b:0.6784313917160034,  a:1 },
    "800": { r:0.11764705926179886, g:0.19607843458652496,b:0.2823529541492462,  a:1 },
    "900": { r:0,                   g:0.0941176488995552, b:0.1725490242242813,   a:1 },
    "950": { r:0.07058823853731155, g:0.11764705926179886,b:0.16862745583057404, a:1 },
  },
  "indigo": {
    "50":  { r:0.95686274766922,    g:0.9686274528503418, b:0.9882352948188782,  a:1 },
    "100": { r:0.843137264251709,   g:0.886274516582489,  b:0.9647058844566345,  a:1 },
    "300": { r:0.5333333611488342,  g:0.6666666865348816, b:0.9333333373069763,  a:1 },
    "400": { r:0.6313725709915161,  g:0.6784313917160034, b:1,                   a:1 },
    "500": { r:0.48627451062202454, g:0.5529412031173706, b:1,                   a:1 },
    "700": { r:0.125490203499794,   g:0.2705882489681244, b:0.545098066329956,   a:1 },
    "800": { r:0.10196078568696976, g:0.16470588743686676,b:0.2823529541492462,  a:1 },
    "900": { r:0,                   g:0.062745101749897,  b:0.1882352977991104,  a:1 },
    "950": { r:0.054901961237192154,g:0.09019608050584793,b:0.1568627506494522,  a:1 },
  },
  "pistachio": {
    "50":  { r:0.9803921580314636,  g:0.9921568632125854, b:0.95686274766922,    a:1 },
    "100": { r:0.9137254953384399,  g:0.9607843160629272, b:0.8274509906768799,  a:1 },
    "300": { r:0.7215686440467834,  g:0.8784313797950745, b:0.3137255012989044,  a:1 },
    "400": { r:0.6823529601097107,  g:0.7843137383460999, b:0.3490196168422699,  a:1 },
    "500": { r:0.5607843399047852,  g:0.6980392336845398, b:0.09803921729326248, a:1 },
    "700": { r:0.3686274588108063,  g:0.4627451002597809, b:0.05882352963089943, a:1 },
    "800": { r:0.12941177189350128, g:0.16862745583057404,b:0.062745101749897,   a:1 },
    "900": { r:0.062745101749897,   g:0.10980392247438431,b:0,                   a:1 },
    "950": { r:0.06666667014360428, g:0.08235294371843338,b:0.0313725508749485,  a:1 },
  },
  "green": {
    "50":  { r:0.9529411792755127,  g:0.9882352948188782, b:0.9450980424880981,  a:1 },
    "100": { r:0.8549019694328308,  g:0.9607843160629272, b:0.8274509906768799,  a:1 },
    "300": { r:0.5333333611488342,  g:0.9333333373069763, b:0.501960813999176,   a:1 },
    "400": { r:0.43921568989753723, g:0.7921568751335144, b:0.41960784792900085, a:1 },
    "500": { r:0.2235294133424759,  g:0.7137255072593689, b:0.19607843458652496, a:1 },
    "600": { r:0.08627451211214066, g:0.6392157077789307, b:0.29019609093666077, a:1 },
    "700": { r:0.15294118225574493, g:0.47843137383461,   b:0.13333334028720856, a:1 },
    "800": { r:0.09019608050584793, g:0.1568627506494522, b:0.07058823853731155, a:1 },
    "900": { r:0,                   g:0.10980392247438431,b:0,                   a:1 },
    "950": { r:0.062745101749897,   g:0.10980392247438431,b:0.05098039284348488, a:1 },
  },
  "cta": {
    "50":  { r:0.9372549057006836,  g:0.9647058844566345, b:1,                   a:1 },
    "100": { r:0.8588235378265381,  g:0.9176470637321472, b:0.9960784316062927,  a:1 },
    "200": { r:0.7490196228027344,  g:0.8588235378265381, b:0.9960784316062927,  a:1 },
    "300": { r:0.3764705955982208,  g:0.6470588445663452, b:0.9803921580314636,  a:1 },
    "400": { r:0.32156863808631897, g:0.5372549295425415, b:0.9490196108818054,  a:1 },
    "500": { r:0.14509804546833038, g:0.38823530077934265,b:0.9215686321258545,  a:1 },
    "600": { r:0.003921568859368563,g:0.32156863808631897,b:0.9254902005195618,  a:1 },
    "700": { r:0.003921568859368563,g:0.25882354378700256,b:0.800000011920929,   a:1 },
    "800": { r:0,                   g:0.20392157137393951,b:0.3921568691730499,  a:1 },
    "900": { r:0,                   g:0.125490203499794,  b:0.250980406999588,   a:1 },
  },
};

const semanticRaw = [
  {"name":"bg/page",                       "light":"Z/0",            "dark":"Z/900"},
  {"name":"bg/surface",                    "light":"Z/100",          "dark":"Z/800"},
  {"name":"bg/surface-inverted",           "light":"Z/800",          "dark":"Z/100"},
  {"name":"bg/subtle",                     "light":"Z/0",            "dark":"Z/600"},
  {"name":"bg/banner-inverted",            "light":"TB/950",         "dark":"TW/950"},
  {"name":"bg/glass/default",              "light":"TB/800",         "dark":"TB/800"},
  {"name":"bg/glass/heavy",                "light":"TB/900",         "dark":"TB/900"},
  {"name":"bg/glass/subtle",               "light":"TB/50",          "dark":"TB/100"},
  {"name":"bg/inverted-subtle",            "light":"TW/100",         "dark":"TB/50"},
  {"name":"fg/primary",                    "light":"Z/800",          "dark":"Z/50"},
  {"name":"fg/on-accent/opacity-95",       "light":"TW/950",         "dark":"TW/950"},
  {"name":"fg/on-dark/primary",            "light":"Z/0",            "dark":"Z/0"},
  {"name":"fg/on-dark/secondary",          "light":"Z/200",          "dark":"Z/200"},
  {"name":"fg/primary-inverse",            "light":"Z/50",           "dark":"Z/800"},
  {"name":"fg/secondary",                  "light":"Z/600",          "dark":"Z/300"},
  {"name":"fg/muted",                      "light":"Z/500",          "dark":"Z/400"},
  {"name":"fg/muted-inverse",              "light":"Z/400",          "dark":"Z/600"},
  {"name":"fg/inverse",                    "light":"Z/0",            "dark":"Z/900"},
  {"name":"fg/on-dark/opacity-90",         "light":"TW/900",         "dark":"TW/900"},
  {"name":"fg/on-dark/opacity-64",         "light":"TW/800",         "dark":"TW/800"},
  {"name":"fg/dot/active",                 "light":"fg/primary",     "dark":"fg/primary"},
  {"name":"fg/dot/rest",                   "light":"TB/700",         "dark":"TW/700"},
  {"name":"fg/dot/edge",                   "light":"TB/600",         "dark":"TW/600"},
  {"name":"fg/dot/hover",                  "light":"TB/900",         "dark":"TW/900"},
  {"name":"border/subtle",                 "light":"Z/200",          "dark":"Z/600"},
  {"name":"border/subtle-inverted",        "light":"Z/600",          "dark":"Z/200"},
  {"name":"border/focus",                  "light":"cta/600",        "dark":"cta/600"},
  {"name":"border/glass/default",          "light":"TB/500",         "dark":"TW/500"},
  {"name":"border/glass/medium",           "light":"TB/400",         "dark":"TW/400"},
  {"name":"border/glass/subtle",           "light":"TB/100",         "dark":"TW/100"},
  {"name":"border/inverted-subtle",        "light":"TW/100",         "dark":"TB/100"},
  {"name":"feedback/success/bg",           "light":"green/50",       "dark":"green/950"},
  {"name":"feedback/success/border",       "light":"green/100",      "dark":"green/800"},
  {"name":"feedback/success/fg",           "light":"green/800",      "dark":"green/400"},
  {"name":"feedback/warning/bg",           "light":"yellow/50",      "dark":"yellow/900"},
  {"name":"feedback/warning/border",       "light":"yellow/300",     "dark":"yellow/800"},
  {"name":"feedback/warning/fg",           "light":"yellow/800",     "dark":"yellow/500"},
  {"name":"feedback/warning/msg-fg",       "light":"orange/700",     "dark":"orange/600"},
  {"name":"accent/gold",                   "light":"yellow/600",     "dark":"yellow/600"},
  {"name":"accent/fg",                     "light":"cta/600",        "dark":"Z/0"},
  {"name":"accent/fg-hover",               "light":"cta/700",        "dark":"TW/900"},
  {"name":"accent/bg",                     "light":"cta/600",        "dark":"cta/700"},
  {"name":"accent/bg-hover",               "light":"cta/600",        "dark":"cta/700"},
  {"name":"card/bg-active",                "light":"cta/800",        "dark":"cta/900"},
  {"name":"accent/border",                 "light":"cta/400",        "dark":"cta/400"},
  {"name":"card/bg-locked",                "light":"Z/800",          "dark":"Z/1000"},
  {"name":"chip/bg-primary",               "light":"TW/500",         "dark":"TW/500"},
  {"name":"chip/bg-secondary",             "light":"TB/700",         "dark":"TB/700"},
  {"name":"chip/fg-primary",               "light":"fg/on-dark/primary","dark":"fg/on-dark/primary"},
  {"name":"chip/fg-secondary",             "light":"TW/800",         "dark":"TW/800"},
  {"name":"btn/fg",                        "light":"Z/800",          "dark":"Z/50"},
  {"name":"btn/bg",                        "light":"Z/100",          "dark":"Z/800"},
  {"name":"btn/bg-over",                   "light":"Z/200",          "dark":"Z/700"},
  {"name":"btn/border",                    "light":"TW/400",         "dark":"TB/400"},
  {"name":"btn/nav/bg/rest",               "light":"Z/100",          "dark":"Z/700"},
  {"name":"btn/icon-bg",                   "light":"Z/100",          "dark":"Z/700"},
  {"name":"btn/nav/bg/rest-subtle",        "light":"Z/0",            "dark":"Z/600"},
  {"name":"btn/nav/bg/hover",              "light":"Z/800",          "dark":"Z/50"},
  {"name":"btn/nav/bg/inactive",           "light":"TB/0",           "dark":"TW/0"},
  {"name":"btn/nav/fg/rest",               "light":"Z/800",          "dark":"Z/50"},
  {"name":"btn/nav/fg/hover",              "light":"Z/50",           "dark":"Z/800"},
  {"name":"btn/nav/fg/inactive",           "light":"TB/600",         "dark":"TW/600"},
  {"name":"palette/yellow/bg",             "light":"yellow/100",     "dark":"yellow/900"},
  {"name":"palette/yellow/fg",             "light":"yellow/700",     "dark":"yellow/300"},
  {"name":"palette/orange/bg",             "light":"orange/100",     "dark":"orange/900"},
  {"name":"palette/orange/fg",             "light":"orange/700",     "dark":"orange/300"},
  {"name":"palette/red/bg",               "light":"red/100",         "dark":"red/900"},
  {"name":"palette/pink/bg",              "light":"pink/100",        "dark":"pink/900"},
  {"name":"palette/pink/fg",              "light":"pink/700",        "dark":"pink/300"},
  {"name":"palette/red/fg",               "light":"red/700",         "dark":"red/300"},
  {"name":"palette/purple/bg",            "light":"purple/100",      "dark":"purple/900"},
  {"name":"palette/indigo/bg",            "light":"indigo/100",      "dark":"indigo/900"},
  {"name":"palette/sky/bg",               "light":"sky/100",         "dark":"sky/900"},
  {"name":"palette/sky/fg",               "light":"sky/700",         "dark":"sky/300"},
  {"name":"palette/indigo/fg",            "light":"indigo/700",      "dark":"indigo/300"},
  {"name":"palette/purple/fg",            "light":"purple/700",      "dark":"purple/300"},
  {"name":"palette/green/bg",             "light":"green/100",       "dark":"green/900"},
  {"name":"palette/green/fg",             "light":"green/700",       "dark":"green/300"},
  {"name":"palette/pistachio/bg",         "light":"pistachio/100",   "dark":"pistachio/900"},
  {"name":"palette/pistachio/fg",         "light":"pistachio/700",   "dark":"pistachio/300"},
  {"name":"tooltip/bg",                   "light":"Z/800",           "dark":"Z/50"},
  {"name":"tooltip/fg",                   "light":"Z/100",           "dark":"Z/800"},
  {"name":"tooltip/ring",                 "light":"TW/600",          "dark":"TB/300"},
  {"name":"tooltip/keyboard-shortcut-bg", "light":"Z/100",           "dark":"Z/600"},
  {"name":"tooltip/keyboard-shortcut-fg", "light":"Z/800",           "dark":"Z/300"},
  {"name":"map/dot-rest",                 "light":"Z/200",           "dark":"Z/600"},
  {"name":"map/dot-inactive",             "light":"Z/100",           "dark":"Z/700"},
  {"name":"map/tz-label-bg",              "light":"TB/100",          "dark":"TW/100"},
  {"name":"map/tz-label-fg",              "light":"fg/inverse",      "dark":"fg/primary-inverse"},
  {"name":"map/dot-sea",                  "light":"bg/page",         "dark":"bg/page"},
  {"name":"feedback/neutral/bg",          "light":"TB/50",           "dark":"TW/50"},
  {"name":"feedback/neutral/border",      "light":"TB/100",          "dark":"TW/100"},
  {"name":"palette/neutral/bg",           "light":"Z/200",           "dark":"Z/700"},
  {"name":"palette/neutral/fg",           "light":"fg/secondary",    "dark":"fg/secondary"},
  {"name":"lightbox/bg",                  "light":"TB/950",          "dark":"TB/950"},
  {"name":"lightbox/btn-bg",              "light":"TW/300",          "dark":"TW/300"},
  {"name":"lightbox/btn-bg-hover",        "light":"TW/600",          "dark":"TW/600"},
  {"name":"lightbox/fg-muted",            "light":"TW/800",          "dark":"TW/800"},
  {"name":"nav/bg",                       "light":"TW/800",          "dark":"TB/800"},
  {"name":"nav/ring",                     "light":"TB/0",            "dark":"border/glass/default"},
  {"name":"nav/divider",                  "light":"TB/400",          "dark":"TW/400"},
  {"name":"nav/active-bg",                "light":"TB/50",           "dark":"TW/100"},
  {"name":"nav/hover-bg",                 "light":"TB/50",           "dark":"TW/200"},
  {"name":"nav/active-bg-solid",          "light":"Z/800",           "dark":"Z/50"},
  {"name":"nav/mobile",                   "light":"TW/900",          "dark":"TB/900"},
  {"name":"modal/scrim",                  "light":"TB/700",          "dark":"TB/700"},
  {"name":"modal/hover-bg",               "light":"TW/600",          "dark":"TB/400"},
  {"name":"modal/copy-btn-hover-bg",      "light":"TW/400",          "dark":"TB/300"},
];

const typographyRaw = {
  desktop: {
    'font-size/headings/Display H1': 72, 'font-size/headings/Display H2': 48,
    'font-size/headings/H1': 48, 'font-size/headings/H2': 36, 'font-size/headings/H3': 30,
    'font-size/headings/H4': 22, 'font-size/headings/H5': 16, 'font-size/headings/H6': 15,
    'font-size/labels/subheading': 18, 'font-size/labels/label S': 15, 'font-size/labels/legal': 15,
    'font-size/labels/fine-print': 12, 'font-size/labels/overline M': 15, 'font-size/labels/overline S': 13,
    'font-size/copy/copy M': 18, 'font-size/copy/copy S': 14, 'font-size/copy/copy XS': 14,
    'font-size/ui/button M': 18, 'font-size/ui/button S': 15, 'font-size/ui/card M': 18,
    'font-size/ui/tag M': 16, 'font-size/ui/tag S': 15, 'font-size/ui/caption': 15,
    'font-size/ui/nav L': 24, 'font-size/ui/nav M': 16, 'font-size/ui/nav S': 13,
    'font-size/ui/tooltip': 13, 'font-size/ui/tooltip-kbd': 11, 'font-size/ui/chip S': 13, 'font-size/ui/chip XS': 12,
    'font-size/brand/logo': 16,
    'letter-spacing/overline': 0.65,
  },
  tablet: {
    'font-size/headings/Display H1': 64, 'font-size/headings/Display H2': 40,
    'font-size/headings/H1': 44, 'font-size/headings/H2': 34, 'font-size/headings/H3': 26,
    'font-size/headings/H4': 20, 'font-size/headings/H5': 15, 'font-size/headings/H6': 15,
    'font-size/labels/subheading': 16, 'font-size/labels/label S': 14, 'font-size/labels/legal': 14,
    'font-size/labels/fine-print': 12, 'font-size/labels/overline M': 14, 'font-size/labels/overline S': 12,
    'font-size/copy/copy M': 17, 'font-size/copy/copy S': 14, 'font-size/copy/copy XS': 13,
    'font-size/ui/button M': 17, 'font-size/ui/button S': 14, 'font-size/ui/card M': 16,
    'font-size/ui/tag M': 15, 'font-size/ui/tag S': 14, 'font-size/ui/caption': 14,
    'font-size/ui/nav L': 24, 'font-size/ui/nav M': 16, 'font-size/ui/nav S': 13,
    'font-size/ui/tooltip': 13, 'font-size/ui/tooltip-kbd': 11, 'font-size/ui/chip S': 13, 'font-size/ui/chip XS': 11,
    'font-size/brand/logo': 16,
    'letter-spacing/overline': 0.6,
  },
  mobile: {
    'font-size/headings/Display H1': 48, 'font-size/headings/Display H2': 30,
    'font-size/headings/H1': 36, 'font-size/headings/H2': 32, 'font-size/headings/H3': 24,
    'font-size/headings/H4': 18, 'font-size/headings/H5': 14, 'font-size/headings/H6': 15,
    'font-size/labels/subheading': 14, 'font-size/labels/label S': 13, 'font-size/labels/legal': 13,
    'font-size/labels/fine-print': 12, 'font-size/labels/overline M': 13, 'font-size/labels/overline S': 11,
    'font-size/copy/copy M': 16, 'font-size/copy/copy S': 14, 'font-size/copy/copy XS': 12,
    'font-size/ui/button M': 16, 'font-size/ui/button S': 13, 'font-size/ui/card M': 15,
    'font-size/ui/tag M': 14, 'font-size/ui/tag S': 10, 'font-size/ui/caption': 13,
    'font-size/ui/nav L': 24, 'font-size/ui/nav M': 16, 'font-size/ui/nav S': 13,
    'font-size/ui/tooltip': 13, 'font-size/ui/tooltip-kbd': 11, 'font-size/ui/chip S': 13, 'font-size/ui/chip XS': 9,
    'font-size/brand/logo': 16,
    'letter-spacing/overline': 0.55,
  },
};

const spacingValues = {
  'p-1': 4, 'p-2': 8, 'p-3': 12, 'p-4': 16,
  'p-5': 20, 'p-6': 24, 'p-7': 28, 'p-8': 32,
  'p-10': 40, 'p-12': 48, 'p-16': 64, 'p-20': 80, 'p-24': 96,
};

const radiusValues = {
  'radius-half': 2,
  'radius-1': 4,  'radius-2': 8,   'radius-3': 12,  'radius-4': 16,
  'radius-5': 20, 'radius-6': 24,  'radius-7': 28,  'radius-8': 32,
  'radius-10': 40,'radius-12': 48, 'radius-14': 56, 'radius-16': 64,
  'radius-18': 72,'radius-full': 9999,
};

// ─── Fetch from Figma (if credentials are available) ─────────────────────────

const figmaToken   = process.env.FIGMA_TOKEN;
const figmaFileKey = process.env.FIGMA_FILE_KEY;

let merged = {
  primitives,
  semanticRaw,
  typography: typographyRaw,
  spacing: spacingValues,
  radius: radiusValues,
};

if (figmaToken && figmaFileKey) {
  try {
    process.stdout.write('Fetching Figma variables… ');
    const meta = await fetchFigmaVariables(figmaToken, figmaFileKey);
    const figmaData = parseFigmaVariables(meta);

    const primCount = Object.values(figmaData.primitives).reduce((n, g) => n + Object.keys(g).length, 0);
    const typoCount = Object.keys(figmaData.typography.desktop).length;
    console.log(`OK (${primCount} primitives, ${figmaData.semanticRaw.length} semantic, ${typoCount} typography, ${Object.keys(figmaData.spacing).length} spacing, ${Object.keys(figmaData.radius).length} radius)`);

    merged = mergeWithDefaults(figmaData, {
      primitives,
      semanticRaw,
      typography: typographyRaw,
      spacing: spacingValues,
      radius: radiusValues,
    });
  } catch (err) {
    console.warn(`\nFigma fetch failed — using hardcoded fallback.\n  ${err.message}`);
    if (err.message.includes('file_variables:read')) {
      console.warn('  → Your PAT needs the "file_variables:read" scope.');
      console.warn('  → Figma → Account Settings → Security → Personal access tokens → create a new token with that scope.');
      console.warn('  → Update FIGMA_TOKEN in .env.local.');
    }
  }
} else {
  console.log('No FIGMA_TOKEN in .env.local — using hardcoded values.');
}

// ─── Build tokens object ──────────────────────────────────────────────────────

const tokens = {
  color: {},
  spacing: {},
  radius: {},
  typography: { desktop: {}, tablet: {}, mobile: {} },
  semantic: { light: {}, dark: {} },
};

// Color primitives
for (const [group, shades] of Object.entries(merged.primitives)) {
  tokens.color[group] = {};
  for (const [shade, rgba] of Object.entries(shades)) {
    tokens.color[group][shade] = { $value: colorValue(rgba), $type: 'color' };
  }
}

// Spacing
for (const [name, val] of Object.entries(merged.spacing)) {
  tokens.spacing[name] = { $value: `${val}px`, $type: 'dimension' };
}

// Radius
for (const [name, val] of Object.entries(merged.radius)) {
  tokens.radius[name] = { $value: `${val}px`, $type: 'dimension' };
}

// Typography
for (const [breakpoint, vars] of Object.entries(merged.typography)) {
  for (const [name, val] of Object.entries(vars)) {
    setDeep(tokens.typography[breakpoint], name, { $value: `${val}px`, $type: 'dimension' });
  }
}

// Semantic tokens
for (const { name, light, dark } of merged.semanticRaw) {
  setDeep(tokens.semantic.light, name, { $value: aliasToRef(light, 'light'), $type: 'color' });
  setDeep(tokens.semantic.dark,  name, { $value: aliasToRef(dark,  'dark'),  $type: 'color' });
}

writeFileSync(join(ROOT, 'tokens.json'), JSON.stringify(tokens, null, 2));

const colorCount    = Object.values(merged.primitives).reduce((n, g) => n + Object.keys(g).length, 0);
const semanticCount = merged.semanticRaw.length;
const typoCount     = Object.keys(merged.typography.desktop).length;
console.log('tokens.json written');
console.log(`  color primitives : ${colorCount} (${Object.keys(merged.primitives).join(', ')})`);
console.log(`  spacing          : ${Object.keys(merged.spacing).length}`);
console.log(`  radius           : ${Object.keys(merged.radius).length}`);
console.log(`  typography       : ${typoCount} vars × 3 breakpoints (desktop / tablet / mobile)`);
console.log(`  semantic (light) : ${semanticCount}`);
console.log(`  semantic (dark)  : ${semanticCount}`);
