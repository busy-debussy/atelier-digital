import { create } from '@storybook/theming/create';

export const lightTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'Atelier Digital',
  brandUrl: 'https://atelierdigital.co.uk',
  brandTarget: '_blank',

  // Accent
  colorPrimary: '#0152ec',
  colorSecondary: '#0152ec',

  // Surfaces
  appBg: '#f6f6f6',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#d4d4d4',
  appBorderRadius: 8,

  // Text
  textColor: '#1f1f1f',
  textMutedColor: '#707070',
  textInverseColor: '#fafafa',

  // Toolbar
  barBg: '#ffffff',
  barTextColor: '#404040',
  barHoverColor: '#1f1f1f',
  barSelectedColor: '#0152ec',

  // Inputs
  inputBg: '#ffffff',
  inputBorder: '#d4d4d4',
  inputTextColor: '#1f1f1f',
  inputBorderRadius: 6,

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontCode: 'ui-monospace, "JetBrains Mono", "Fira Code", monospace',
});

export const darkTheme = create({
  base: 'dark',

  // Brand
  brandTitle: 'Atelier Digital',
  brandUrl: 'https://atelierdigital.co.uk',
  brandTarget: '_blank',

  // Accent
  colorPrimary: '#0142cc',
  colorSecondary: '#0142cc',

  // Surfaces
  appBg: '#1f1f1f',
  appContentBg: '#141414',
  appPreviewBg: '#141414',
  appBorderColor: '#404040',
  appBorderRadius: 8,

  // Text
  textColor: '#fafafa',
  textMutedColor: '#a2a2a2',
  textInverseColor: '#1f1f1f',

  // Toolbar
  barBg: '#141414',
  barTextColor: '#adadad',
  barHoverColor: '#fafafa',
  barSelectedColor: '#ffffff',

  // Inputs
  inputBg: '#1f1f1f',
  inputBorder: '#404040',
  inputTextColor: '#fafafa',
  inputBorderRadius: 6,

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontCode: 'ui-monospace, "JetBrains Mono", "Fira Code", monospace',
});
