import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { trackEvent } from '../analytics';
import Footer from '../components/Footer';
import WorldMapDots from '../components/WorldMapDots';
import imgHero           from '../assets/photos/photo-cgi-sales-platform-hero.webp';
import imgHeroMobile     from '../assets/photos/photo-cgi-sales-platform-mobile.webp';
import imgChevronUp      from '../assets/icons/icon-chevron-up.svg';
import imgArrowRight     from '../assets/icons/icon-arrow-right.svg';
import imgChevronLeft    from '../assets/icons/icon-chevron-left.svg';
import imgChevronRight   from '../assets/icons/icon-chevron-right.svg';
import imgClose          from '../assets/icons/icon-close.svg';
import imgClientLogo     from '../assets/case-study/sales-platform/logo-client.svg';
import imgToolFigma        from '../assets/logos/tools/logo-figma.webp';
import imgToolIllustrator  from '../assets/logos/tools/logo-adobe-illustrator.webp';
import imgToolPhotoshop    from '../assets/logos/tools/logo-adobe-photoshop.webp';
import imgToolDaVinci      from '../assets/logos/tools/logo-davinci-resolve.webp';
import imgToolConfluence   from '../assets/logos/tools/logo-atlassian-confluence.webp';
import imgToolJira         from '../assets/logos/tools/logo-atlassian-jira.webp';
import imgTool3dsMax       from '../assets/logos/tools/logo-autodesk-3dsmax.webp';
import imgToolMiro         from '../assets/logos/tools/logo-miro.webp';
import imgToolVSCode       from '../assets/logos/tools/logo-visual-studio-code.webp';
import imgToolUnreal       from '../assets/logos/tools/logo-unreal-engine.svg';
import imgUserflowDesktopLightEn from '../assets/case-study/sales-platform/userflow/desktop-light-en.webp';
import imgUserflowTabletLightEn  from '../assets/case-study/sales-platform/userflow/tablet-light-en.webp';
import imgUserflowMobileLightEn  from '../assets/case-study/sales-platform/userflow/mobile-light-en.webp';
import imgUserflowDesktopDarkEn  from '../assets/case-study/sales-platform/userflow/desktop-dark-en.webp';
import imgUserflowTabletDarkEn   from '../assets/case-study/sales-platform/userflow/tablet-dark-en.webp';
import imgUserflowMobileDarkEn   from '../assets/case-study/sales-platform/userflow/mobile-dark-en.webp';
import imgUserflowDesktopLightFr from '../assets/case-study/sales-platform/userflow/desktop-light-fr.webp';
import imgUserflowTabletLightFr  from '../assets/case-study/sales-platform/userflow/tablet-light-fr.webp';
import imgUserflowMobileLightFr  from '../assets/case-study/sales-platform/userflow/mobile-light-fr.webp';
import imgUserflowDesktopDarkFr  from '../assets/case-study/sales-platform/userflow/desktop-dark-fr.webp';
import imgUserflowTabletDarkFr   from '../assets/case-study/sales-platform/userflow/tablet-dark-fr.webp';
import imgUserflowMobileDarkFr   from '../assets/case-study/sales-platform/userflow/mobile-dark-fr.webp';
import imgUiCard01 from '../assets/case-study/sales-platform/ui-cards/card-01.webp';
import imgUiCard02 from '../assets/case-study/sales-platform/ui-cards/card-02.webp';
import imgUiCard03 from '../assets/case-study/sales-platform/ui-cards/card-03.webp';
import imgUiCard04 from '../assets/case-study/sales-platform/ui-cards/card-04.webp';
import imgUiCard05 from '../assets/case-study/sales-platform/ui-cards/card-05.webp';
import imgUiCard06 from '../assets/case-study/sales-platform/ui-cards/card-06.webp';
import imgUiCard07 from '../assets/case-study/sales-platform/ui-cards/card-07.webp';
import imgUiCard08 from '../assets/case-study/sales-platform/ui-cards/card-08.webp';
import imgUiCard09 from '../assets/case-study/sales-platform/ui-cards/card-09.webp';
import imgConcepts01DesktopEn from '../assets/case-study/sales-platform/concepts/slide-01-desktop-en.webp';
import imgConcepts02DesktopEn from '../assets/case-study/sales-platform/concepts/slide-02-desktop-en.webp';
import imgConcepts03DesktopEn from '../assets/case-study/sales-platform/concepts/slide-03-desktop-en.webp';
import imgConcepts04DesktopEn from '../assets/case-study/sales-platform/concepts/slide-04-desktop-en.webp';
import imgConcepts05DesktopEn from '../assets/case-study/sales-platform/concepts/slide-05-desktop-en.webp';
import imgConcepts01TabletEn  from '../assets/case-study/sales-platform/concepts/slide-01-tablet-en.webp';
import imgConcepts02TabletEn  from '../assets/case-study/sales-platform/concepts/slide-02-tablet-en.webp';
import imgConcepts03TabletEn  from '../assets/case-study/sales-platform/concepts/slide-03-tablet-en.webp';
import imgConcepts04TabletEn  from '../assets/case-study/sales-platform/concepts/slide-04-tablet-en.webp';
import imgConcepts05TabletEn  from '../assets/case-study/sales-platform/concepts/slide-05-tablet-en.webp';
import imgConcepts01MobileEn  from '../assets/case-study/sales-platform/concepts/slide-01-mobile-en.webp';
import imgConcepts02MobileEn  from '../assets/case-study/sales-platform/concepts/slide-02-mobile-en.webp';
import imgConcepts03MobileEn  from '../assets/case-study/sales-platform/concepts/slide-03-mobile-en.webp';
import imgConcepts04MobileEn  from '../assets/case-study/sales-platform/concepts/slide-04-mobile-en.webp';
import imgConcepts05MobileEn  from '../assets/case-study/sales-platform/concepts/slide-05-mobile-en.webp';
import imgConcepts01DesktopFr from '../assets/case-study/sales-platform/concepts/slide-01-desktop-fr.webp';
import imgConcepts02DesktopFr from '../assets/case-study/sales-platform/concepts/slide-02-desktop-fr.webp';
import imgConcepts03DesktopFr from '../assets/case-study/sales-platform/concepts/slide-03-desktop-fr.webp';
import imgConcepts04DesktopFr from '../assets/case-study/sales-platform/concepts/slide-04-desktop-fr.webp';
import imgConcepts05DesktopFr from '../assets/case-study/sales-platform/concepts/slide-05-desktop-fr.webp';
import imgConcepts01TabletFr  from '../assets/case-study/sales-platform/concepts/slide-01-tablet-fr.webp';
import imgConcepts02TabletFr  from '../assets/case-study/sales-platform/concepts/slide-02-tablet-fr.webp';
import imgConcepts03TabletFr  from '../assets/case-study/sales-platform/concepts/slide-03-tablet-fr.webp';
import imgConcepts04TabletFr  from '../assets/case-study/sales-platform/concepts/slide-04-tablet-fr.webp';
import imgConcepts05TabletFr  from '../assets/case-study/sales-platform/concepts/slide-05-tablet-fr.webp';
import imgConcepts01MobileFr  from '../assets/case-study/sales-platform/concepts/slide-01-mobile-fr.webp';
import imgConcepts02MobileFr  from '../assets/case-study/sales-platform/concepts/slide-02-mobile-fr.webp';
import imgConcepts03MobileFr  from '../assets/case-study/sales-platform/concepts/slide-03-mobile-fr.webp';
import imgConcepts04MobileFr  from '../assets/case-study/sales-platform/concepts/slide-04-mobile-fr.webp';
import imgConcepts05MobileFr  from '../assets/case-study/sales-platform/concepts/slide-05-mobile-fr.webp';
import imgWf01DesktopEnLight from '../assets/case-study/sales-platform/wireframes/slide-01-desktop-en-light.webp';
import imgWf02DesktopEnLight from '../assets/case-study/sales-platform/wireframes/slide-02-desktop-en-light.webp';
import imgWf03DesktopEnLight from '../assets/case-study/sales-platform/wireframes/slide-03-desktop-en-light.webp';
import imgWf04DesktopEnLight from '../assets/case-study/sales-platform/wireframes/slide-04-desktop-en-light.webp';
import imgWf05DesktopEnLight from '../assets/case-study/sales-platform/wireframes/slide-05-desktop-en-light.webp';
import imgWf06DesktopEnLight from '../assets/case-study/sales-platform/wireframes/slide-06-desktop-en-light.webp';
import imgWf07DesktopEnLight from '../assets/case-study/sales-platform/wireframes/slide-07-desktop-en-light.webp';
import imgWf08DesktopEnLight from '../assets/case-study/sales-platform/wireframes/slide-08-desktop-en-light.webp';
import imgWf09DesktopEnLight from '../assets/case-study/sales-platform/wireframes/slide-09-desktop-en-light.webp';
import imgWf01DesktopEnDark  from '../assets/case-study/sales-platform/wireframes/slide-01-desktop-en-dark.webp';
import imgWf02DesktopEnDark  from '../assets/case-study/sales-platform/wireframes/slide-02-desktop-en-dark.webp';
import imgWf03DesktopEnDark  from '../assets/case-study/sales-platform/wireframes/slide-03-desktop-en-dark.webp';
import imgWf04DesktopEnDark  from '../assets/case-study/sales-platform/wireframes/slide-04-desktop-en-dark.webp';
import imgWf05DesktopEnDark  from '../assets/case-study/sales-platform/wireframes/slide-05-desktop-en-dark.webp';
import imgWf06DesktopEnDark  from '../assets/case-study/sales-platform/wireframes/slide-06-desktop-en-dark.webp';
import imgWf07DesktopEnDark  from '../assets/case-study/sales-platform/wireframes/slide-07-desktop-en-dark.webp';
import imgWf08DesktopEnDark  from '../assets/case-study/sales-platform/wireframes/slide-08-desktop-en-dark.webp';
import imgWf09DesktopEnDark  from '../assets/case-study/sales-platform/wireframes/slide-09-desktop-en-dark.webp';
import imgWf01DesktopFrLight from '../assets/case-study/sales-platform/wireframes/slide-01-desktop-fr-light.webp';
import imgWf02DesktopFrLight from '../assets/case-study/sales-platform/wireframes/slide-02-desktop-fr-light.webp';
import imgWf03DesktopFrLight from '../assets/case-study/sales-platform/wireframes/slide-03-desktop-fr-light.webp';
import imgWf04DesktopFrLight from '../assets/case-study/sales-platform/wireframes/slide-04-desktop-fr-light.webp';
import imgWf05DesktopFrLight from '../assets/case-study/sales-platform/wireframes/slide-05-desktop-fr-light.webp';
import imgWf06DesktopFrLight from '../assets/case-study/sales-platform/wireframes/slide-06-desktop-fr-light.webp';
import imgWf07DesktopFrLight from '../assets/case-study/sales-platform/wireframes/slide-07-desktop-fr-light.webp';
import imgWf08DesktopFrLight from '../assets/case-study/sales-platform/wireframes/slide-08-desktop-fr-light.webp';
import imgWf09DesktopFrLight from '../assets/case-study/sales-platform/wireframes/slide-09-desktop-fr-light.webp';
import imgWf01DesktopFrDark  from '../assets/case-study/sales-platform/wireframes/slide-01-desktop-fr-dark.webp';
import imgWf02DesktopFrDark  from '../assets/case-study/sales-platform/wireframes/slide-02-desktop-fr-dark.webp';
import imgWf03DesktopFrDark  from '../assets/case-study/sales-platform/wireframes/slide-03-desktop-fr-dark.webp';
import imgWf04DesktopFrDark  from '../assets/case-study/sales-platform/wireframes/slide-04-desktop-fr-dark.webp';
import imgWf05DesktopFrDark  from '../assets/case-study/sales-platform/wireframes/slide-05-desktop-fr-dark.webp';
import imgWf06DesktopFrDark  from '../assets/case-study/sales-platform/wireframes/slide-06-desktop-fr-dark.webp';
import imgWf07DesktopFrDark  from '../assets/case-study/sales-platform/wireframes/slide-07-desktop-fr-dark.webp';
import imgWf08DesktopFrDark  from '../assets/case-study/sales-platform/wireframes/slide-08-desktop-fr-dark.webp';
import imgWf09DesktopFrDark  from '../assets/case-study/sales-platform/wireframes/slide-09-desktop-fr-dark.webp';
import imgWf01MobileEnLight  from '../assets/case-study/sales-platform/wireframes/slide-01-mobile-en-light.webp';
import imgWf02MobileEnLight  from '../assets/case-study/sales-platform/wireframes/slide-02-mobile-en-light.webp';
import imgWf03MobileEnLight  from '../assets/case-study/sales-platform/wireframes/slide-03-mobile-en-light.webp';
import imgWf04MobileEnLight  from '../assets/case-study/sales-platform/wireframes/slide-04-mobile-en-light.webp';
import imgWf05MobileEnLight  from '../assets/case-study/sales-platform/wireframes/slide-05-mobile-en-light.webp';
import imgWf06MobileEnLight  from '../assets/case-study/sales-platform/wireframes/slide-06-mobile-en-light.webp';
import imgWf07MobileEnLight  from '../assets/case-study/sales-platform/wireframes/slide-07-mobile-en-light.webp';
import imgWf08MobileEnLight  from '../assets/case-study/sales-platform/wireframes/slide-08-mobile-en-light.webp';
import imgWf09MobileEnLight  from '../assets/case-study/sales-platform/wireframes/slide-09-mobile-en-light.webp';
import imgWf01MobileEnDark   from '../assets/case-study/sales-platform/wireframes/slide-01-mobile-en-dark.webp';
import imgWf02MobileEnDark   from '../assets/case-study/sales-platform/wireframes/slide-02-mobile-en-dark.webp';
import imgWf03MobileEnDark   from '../assets/case-study/sales-platform/wireframes/slide-03-mobile-en-dark.webp';
import imgWf04MobileEnDark   from '../assets/case-study/sales-platform/wireframes/slide-04-mobile-en-dark.webp';
import imgWf05MobileEnDark   from '../assets/case-study/sales-platform/wireframes/slide-05-mobile-en-dark.webp';
import imgWf06MobileEnDark   from '../assets/case-study/sales-platform/wireframes/slide-06-mobile-en-dark.webp';
import imgWf07MobileEnDark   from '../assets/case-study/sales-platform/wireframes/slide-07-mobile-en-dark.webp';
import imgWf08MobileEnDark   from '../assets/case-study/sales-platform/wireframes/slide-08-mobile-en-dark.webp';
import imgWf09MobileEnDark   from '../assets/case-study/sales-platform/wireframes/slide-09-mobile-en-dark.webp';
import imgWf01MobileFrLight  from '../assets/case-study/sales-platform/wireframes/slide-01-mobile-fr-light.webp';
import imgWf02MobileFrLight  from '../assets/case-study/sales-platform/wireframes/slide-02-mobile-fr-light.webp';
import imgWf03MobileFrLight  from '../assets/case-study/sales-platform/wireframes/slide-03-mobile-fr-light.webp';
import imgWf04MobileFrLight  from '../assets/case-study/sales-platform/wireframes/slide-04-mobile-fr-light.webp';
import imgWf05MobileFrLight  from '../assets/case-study/sales-platform/wireframes/slide-05-mobile-fr-light.webp';
import imgWf06MobileFrLight  from '../assets/case-study/sales-platform/wireframes/slide-06-mobile-fr-light.webp';
import imgWf07MobileFrLight  from '../assets/case-study/sales-platform/wireframes/slide-07-mobile-fr-light.webp';
import imgWf08MobileFrLight  from '../assets/case-study/sales-platform/wireframes/slide-08-mobile-fr-light.webp';
import imgWf09MobileFrLight  from '../assets/case-study/sales-platform/wireframes/slide-09-mobile-fr-light.webp';
import imgWf01MobileFrDark   from '../assets/case-study/sales-platform/wireframes/slide-01-mobile-fr-dark.webp';
import imgWf02MobileFrDark   from '../assets/case-study/sales-platform/wireframes/slide-02-mobile-fr-dark.webp';
import imgWf03MobileFrDark   from '../assets/case-study/sales-platform/wireframes/slide-03-mobile-fr-dark.webp';
import imgWf04MobileFrDark   from '../assets/case-study/sales-platform/wireframes/slide-04-mobile-fr-dark.webp';
import imgWf05MobileFrDark   from '../assets/case-study/sales-platform/wireframes/slide-05-mobile-fr-dark.webp';
import imgWf06MobileFrDark   from '../assets/case-study/sales-platform/wireframes/slide-06-mobile-fr-dark.webp';
import imgWf07MobileFrDark   from '../assets/case-study/sales-platform/wireframes/slide-07-mobile-fr-dark.webp';
import imgWf08MobileFrDark   from '../assets/case-study/sales-platform/wireframes/slide-08-mobile-fr-dark.webp';
import imgWf09MobileFrDark   from '../assets/case-study/sales-platform/wireframes/slide-09-mobile-fr-dark.webp';
import imgHifi01DesktopEnLight from '../assets/case-study/sales-platform/hifi/hifi-slide01-desktop-en-light.webp';
import imgHifi02DesktopEnLight from '../assets/case-study/sales-platform/hifi/hifi-slide02-desktop-en-light.webp';
import imgHifi03DesktopEnLight from '../assets/case-study/sales-platform/hifi/hifi-slide03-desktop-en-light.webp';
import imgHifi04DesktopEnLight from '../assets/case-study/sales-platform/hifi/hifi-slide04-desktop-en-light.webp';
import imgHifi05DesktopEnLight from '../assets/case-study/sales-platform/hifi/hifi-slide05-desktop-en-light.webp';
import imgHifi06DesktopEnLight from '../assets/case-study/sales-platform/hifi/hifi-slide06-desktop-en-light.webp';
import imgHifi07DesktopEnLight from '../assets/case-study/sales-platform/hifi/hifi-slide07-desktop-en-light.webp';
import imgHifi08DesktopEnLight from '../assets/case-study/sales-platform/hifi/hifi-slide08-desktop-en-light.webp';
import imgHifi09DesktopEnLight from '../assets/case-study/sales-platform/hifi/hifi-slide09-desktop-en-light.webp';
import imgHifi01DesktopEnDark  from '../assets/case-study/sales-platform/hifi/hifi-slide01-desktop-en-dark.webp';
import imgHifi02DesktopEnDark  from '../assets/case-study/sales-platform/hifi/hifi-slide02-desktop-en-dark.webp';
import imgHifi03DesktopEnDark  from '../assets/case-study/sales-platform/hifi/hifi-slide03-desktop-en-dark.webp';
import imgHifi04DesktopEnDark  from '../assets/case-study/sales-platform/hifi/hifi-slide04-desktop-en-dark.webp';
import imgHifi05DesktopEnDark  from '../assets/case-study/sales-platform/hifi/hifi-slide05-desktop-en-dark.webp';
import imgHifi06DesktopEnDark  from '../assets/case-study/sales-platform/hifi/hifi-slide06-desktop-en-dark.webp';
import imgHifi07DesktopEnDark  from '../assets/case-study/sales-platform/hifi/hifi-slide07-desktop-en-dark.webp';
import imgHifi08DesktopEnDark  from '../assets/case-study/sales-platform/hifi/hifi-slide08-desktop-en-dark.webp';
import imgHifi09DesktopEnDark  from '../assets/case-study/sales-platform/hifi/hifi-slide09-desktop-en-dark.webp';
import imgHifi01DesktopFrLight from '../assets/case-study/sales-platform/hifi/hifi-slide01-desktop-fr-light.webp';
import imgHifi02DesktopFrLight from '../assets/case-study/sales-platform/hifi/hifi-slide02-desktop-fr-light.webp';
import imgHifi03DesktopFrLight from '../assets/case-study/sales-platform/hifi/hifi-slide03-desktop-fr-light.webp';
import imgHifi04DesktopFrLight from '../assets/case-study/sales-platform/hifi/hifi-slide04-desktop-fr-light.webp';
import imgHifi05DesktopFrLight from '../assets/case-study/sales-platform/hifi/hifi-slide05-desktop-fr-light.webp';
import imgHifi06DesktopFrLight from '../assets/case-study/sales-platform/hifi/hifi-slide06-desktop-fr-light.webp';
import imgHifi07DesktopFrLight from '../assets/case-study/sales-platform/hifi/hifi-slide07-desktop-fr-light.webp';
import imgHifi08DesktopFrLight from '../assets/case-study/sales-platform/hifi/hifi-slide08-desktop-fr-light.webp';
import imgHifi09DesktopFrLight from '../assets/case-study/sales-platform/hifi/hifi-slide09-desktop-fr-light.webp';
import imgHifi01DesktopFrDark  from '../assets/case-study/sales-platform/hifi/hifi-slide01-desktop-fr-dark.webp';
import imgHifi02DesktopFrDark  from '../assets/case-study/sales-platform/hifi/hifi-slide02-desktop-fr-dark.webp';
import imgHifi03DesktopFrDark  from '../assets/case-study/sales-platform/hifi/hifi-slide03-desktop-fr-dark.webp';
import imgHifi04DesktopFrDark  from '../assets/case-study/sales-platform/hifi/hifi-slide04-desktop-fr-dark.webp';
import imgHifi05DesktopFrDark  from '../assets/case-study/sales-platform/hifi/hifi-slide05-desktop-fr-dark.webp';
import imgHifi06DesktopFrDark  from '../assets/case-study/sales-platform/hifi/hifi-slide06-desktop-fr-dark.webp';
import imgHifi07DesktopFrDark  from '../assets/case-study/sales-platform/hifi/hifi-slide07-desktop-fr-dark.webp';
import imgHifi08DesktopFrDark  from '../assets/case-study/sales-platform/hifi/hifi-slide08-desktop-fr-dark.webp';
import imgHifi09DesktopFrDark  from '../assets/case-study/sales-platform/hifi/hifi-slide09-desktop-fr-dark.webp';
import imgHifi01TabletEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide01-tablet-en-light.webp';
import imgHifi02TabletEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide02-tablet-en-light.webp';
import imgHifi03TabletEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide03-tablet-en-light.webp';
import imgHifi04TabletEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide04-tablet-en-light.webp';
import imgHifi05TabletEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide05-tablet-en-light.webp';
import imgHifi06TabletEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide06-tablet-en-light.webp';
import imgHifi07TabletEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide07-tablet-en-light.webp';
import imgHifi08TabletEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide08-tablet-en-light.webp';
import imgHifi09TabletEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide09-tablet-en-light.webp';
import imgHifi01TabletEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide01-tablet-en-dark.webp';
import imgHifi02TabletEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide02-tablet-en-dark.webp';
import imgHifi03TabletEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide03-tablet-en-dark.webp';
import imgHifi04TabletEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide04-tablet-en-dark.webp';
import imgHifi05TabletEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide05-tablet-en-dark.webp';
import imgHifi06TabletEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide06-tablet-en-dark.webp';
import imgHifi07TabletEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide07-tablet-en-dark.webp';
import imgHifi08TabletEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide08-tablet-en-dark.webp';
import imgHifi09TabletEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide09-tablet-en-dark.webp';
import imgHifi01TabletFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide01-tablet-fr-light.webp';
import imgHifi02TabletFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide02-tablet-fr-light.webp';
import imgHifi03TabletFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide03-tablet-fr-light.webp';
import imgHifi04TabletFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide04-tablet-fr-light.webp';
import imgHifi05TabletFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide05-tablet-fr-light.webp';
import imgHifi06TabletFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide06-tablet-fr-light.webp';
import imgHifi07TabletFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide07-tablet-fr-light.webp';
import imgHifi08TabletFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide08-tablet-fr-light.webp';
import imgHifi09TabletFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide09-tablet-fr-light.webp';
import imgHifi01TabletFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide01-tablet-fr-dark.webp';
import imgHifi02TabletFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide02-tablet-fr-dark.webp';
import imgHifi03TabletFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide03-tablet-fr-dark.webp';
import imgHifi04TabletFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide04-tablet-fr-dark.webp';
import imgHifi05TabletFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide05-tablet-fr-dark.webp';
import imgHifi06TabletFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide06-tablet-fr-dark.webp';
import imgHifi07TabletFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide07-tablet-fr-dark.webp';
import imgHifi08TabletFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide08-tablet-fr-dark.webp';
import imgHifi09TabletFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide09-tablet-fr-dark.webp';
import imgHifi01MobileEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide01-mobile-en-light.webp';
import imgHifi02MobileEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide02-mobile-en-light.webp';
import imgHifi03MobileEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide03-mobile-en-light.webp';
import imgHifi04MobileEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide04-mobile-en-light.webp';
import imgHifi05MobileEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide05-mobile-en-light.webp';
import imgHifi06MobileEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide06-mobile-en-light.webp';
import imgHifi07MobileEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide07-mobile-en-light.webp';
import imgHifi08MobileEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide08-mobile-en-light.webp';
import imgHifi09MobileEnLight  from '../assets/case-study/sales-platform/hifi/hifi-slide09-mobile-en-light.webp';
import imgHifi01MobileEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide01-mobile-en-dark.webp';
import imgHifi02MobileEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide02-mobile-en-dark.webp';
import imgHifi03MobileEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide03-mobile-en-dark.webp';
import imgHifi04MobileEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide04-mobile-en-dark.webp';
import imgHifi05MobileEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide05-mobile-en-dark.webp';
import imgHifi06MobileEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide06-mobile-en-dark.webp';
import imgHifi07MobileEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide07-mobile-en-dark.webp';
import imgHifi08MobileEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide08-mobile-en-dark.webp';
import imgHifi09MobileEnDark   from '../assets/case-study/sales-platform/hifi/hifi-slide09-mobile-en-dark.webp';
import imgHifi01MobileFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide01-mobile-fr-light.webp';
import imgHifi02MobileFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide02-mobile-fr-light.webp';
import imgHifi03MobileFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide03-mobile-fr-light.webp';
import imgHifi04MobileFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide04-mobile-fr-light.webp';
import imgHifi05MobileFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide05-mobile-fr-light.webp';
import imgHifi06MobileFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide06-mobile-fr-light.webp';
import imgHifi07MobileFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide07-mobile-fr-light.webp';
import imgHifi08MobileFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide08-mobile-fr-light.webp';
import imgHifi09MobileFrLight  from '../assets/case-study/sales-platform/hifi/hifi-slide09-mobile-fr-light.webp';
import imgHifi01MobileFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide01-mobile-fr-dark.webp';
import imgHifi02MobileFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide02-mobile-fr-dark.webp';
import imgHifi03MobileFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide03-mobile-fr-dark.webp';
import imgHifi04MobileFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide04-mobile-fr-dark.webp';
import imgHifi05MobileFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide05-mobile-fr-dark.webp';
import imgHifi06MobileFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide06-mobile-fr-dark.webp';
import imgHifi07MobileFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide07-mobile-fr-dark.webp';
import imgHifi08MobileFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide08-mobile-fr-dark.webp';
import imgHifi09MobileFrDark   from '../assets/case-study/sales-platform/hifi/hifi-slide09-mobile-fr-dark.webp';

// ── Hero ──────────────────────────────────────────────────────────────────────
const HERO = {
  en: {
    category: 'Case Study · Responsive Web App',
    title: 'Luxury off-plan sales platform',
    stats: [
      { prefix: '£', countTo: 6.8, decimals: 1, suffix: 'B',  label: 'in sales generated'      },
      { prefix: '+', countTo: 20,  decimals: 0, suffix: '%',   label: 'YoY sales increase'       },
      { prefix: '',  countTo: 48,  decimals: 0, suffix: 'h',   label: 'to sell out first launch' },
    ],
  },
  fr: {
    category: 'Étude de cas · Appli Web Réactive',
    title: 'Une plateforme de vente sur plan',
    stats: [
      { prefix: '',  countTo: 8,  decimals: 0, suffix: ' Mds €', label: 'de ventes générées'           },
      { prefix: '+', countTo: 20, decimals: 0, suffix: ' %',      label: 'd’augmentation en un an' },
      { prefix: '',  countTo: 48, decimals: 0, suffix: 'h',       label: 'pour tout vendre'  },
    ],
  },
};

function useCountUp(target, duration = 1800, decimals = 0, ready = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration, decimals, ready]);
  return count;
}

function AnimatedStat({ prefix, countTo, decimals, suffix, ready }) {
  const value = useCountUp(countTo, 1800, decimals, ready);
  return (
    <span>{prefix}{decimals > 0 ? value.toFixed(decimals) : value}{suffix}</span>
  );
}

function Hero({ lang }) {
  const h = HERO[lang] ?? HERO.en;
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 600); return () => clearTimeout(t); }, []);
  return (
    <section aria-labelledby="hero-heading" lang={lang} className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Background image */}
      <picture className="absolute inset-0 w-full h-full">
        <source media="(min-width: 640px)" srcSet={imgHero} />
        <img
          src={imgHeroMobile}
          alt=""
          className="w-full h-full object-cover object-center"
          draggable="false"
        />
      </picture>

      {/* Gradient overlay, animates in with text */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0, background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)' }} />

      {/* Main content, bottom */}
      <div className="relative z-10 mt-auto max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-10 pb-24 sm:pb-28 lg:pb-32 flex flex-col gap-6 sm:gap-8 transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0 }}>

        <p className="text-[12px] sm:text-[13px] font-semibold tracking-widest uppercase text-white/70">
          {h.category}
        </p>

        <h1 id="hero-heading" className="text-[40px] sm:text-[56px] lg:text-[72px] font-bold leading-[1.05] text-white max-w-3xl">
          {h.title}
        </h1>

        <ul role="list" className="flex items-start gap-8 sm:gap-12 lg:gap-16 pt-2 list-none">
          {h.stats.map((s, i) => {
            const finalValue = s.decimals > 0 ? s.countTo.toFixed(s.decimals) : s.countTo;
            return (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-tight text-white tabular-nums whitespace-nowrap">
                  <span className="sr-only">{s.prefix}{finalValue}{s.suffix}</span>
                  <span><AnimatedStat prefix={s.prefix} countTo={s.countTo} decimals={s.decimals} suffix={s.suffix} ready={heroReady} /></span>
                </span>
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] text-white/70 uppercase tracking-widest font-medium leading-snug max-w-[100px] sm:max-w-none">{s.label}</span>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}

// ── Tile primitives ───────────────────────────────────────────────────────────
function Tile({ children, fullWidth = false, bgClass = 'bg-white dark:bg-[#141414]' }) {
  return (
    <div className={`${bgClass} rounded-[24px] sm:rounded-[32px] lg:rounded-[48px] p-6 sm:p-12 lg:p-[60px] flex flex-col gap-4 sm:gap-5 lg:gap-6${fullWidth ? ' lg:col-span-2' : ''}`}>
      {children}
    </div>
  );
}

function TileEyebrow({ children }) {
  return (
    <h3 className="text-[24px] sm:text-[26px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">
      {children}
    </h3>
  );
}

function TileTitle({ children }) {
  return (
    <h3 className="text-[30px] sm:text-[36px] lg:text-[44px] font-semibold leading-[40px] sm:leading-[48px] lg:leading-[56px] text-[#5c5c5c] dark:text-[#adadad]">
      {children}
    </h3>
  );
}


const tileBodyText = 'text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[30px] sm:leading-[34px] lg:leading-10 text-[#262626] dark:text-[#adadad] [&_strong]:dark:text-[#f6f6f6]';

function TileBody({ children }) {
  return (
    <div className={`space-y-6 ${tileBodyText}`}>
      {children}
    </div>
  );
}

// ── Tool icon with tooltip ────────────────────────────────────────────────────
function ToolIcon({ name, icon, darkInvert = false, circle = false, contain = false, zoom }) {
  const [active, setActive] = useState(false);
  const tooltipId = `tooltip-${name.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="relative flex flex-col items-center">
      <div
        id={tooltipId}
        role="tooltip"
        className={`absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 motion-safe:transition-opacity motion-safe:duration-150 ${active ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="bg-[#1f1f1f] dark:bg-[#f6f6f6] text-[#f6f6f6] dark:text-[#1f1f1f] text-[13px] font-light leading-4 px-2 py-[4px] rounded-lg whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">{name}</div>
      </div>
      <button
        aria-label={name}
        aria-describedby={active ? tooltipId : undefined}
        onMouseEnter={() => { if (!window.matchMedia('(pointer: coarse)').matches) setActive(true); }}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onClick={() => setActive(a => !a)}
        className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 overflow-hidden bg-[#f6f6f6] dark:bg-[#2a2a2a] shadow-[1px_1px_8px_0px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1f1f] dark:focus-visible:outline-[#f6f6f6] ${circle ? 'rounded-full' : 'rounded-[10px]'}`}
      >
        {icon
          ? <img src={icon} alt="" className={`${contain ? `${contain} object-contain` : 'w-full h-full object-cover'}${darkInvert ? ' dark:invert' : ''}`} style={zoom ? { transform: `scale(${zoom})` } : undefined} />
          : <span className="text-[7px] font-bold text-[#5c5c5c] dark:text-[#adadad] text-center leading-tight px-[2px]">{name}</span>
        }
      </button>
    </div>
  );
}

function ToolsGrid({ lang }) {
  const label = (CONTEXT_EYEBROWS[lang] ?? CONTEXT_EYEBROWS.en)[5];
  return (
    <div className="rounded-3xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] px-5 py-4 flex flex-col gap-4 sm:w-fit">
      <p className="text-[12px] font-semibold uppercase tracking-widest text-[#5c5c5c] dark:text-[#adadad]">{label}</p>
      <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
        {CONTEXT_TOOLS.map(cat => (
          <div key={cat.label.en} className="flex flex-col gap-3">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[#9c9c9c] dark:text-[#5c5c5c]">{cat.label[lang] ?? cat.label.en}</p>
            <div className="flex flex-wrap gap-5">
              {cat.tools.map(tool => (
                <ToolIcon key={tool.name} {...tool} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Context section content ───────────────────────────────────────────────────
const CONTEXT_EYEBROWS = {
  en: ['The client', 'A fast-paced industry', 'The mission', 'Stakeholders', 'My role', 'Tools used', 'Our team'],
  fr: ['Le client', 'Un secteur dynamique', 'La mission', 'Parties prenantes', 'Mon rôle', 'Outils utilisés', 'Notre équipe'],
};
const CONTEXT_CLIENT_PILL = { en: 'Result oriented', fr: 'Axé résultats' };
const CONTEXT_INDUSTRY = {
  stat:     { en: '£5.65 B*',                                       fr: '6.7 Md€*' },
  body:     { en: <>The client needed a platform to <strong>support growth</strong> and <strong>scale globally</strong>. While their existing platform worked well, <strong>high maintenance fees</strong> prompted a more <strong>cost-effective</strong>, <strong>user-focused solution</strong>.</>, fr: <>Le client avait besoin d'une plateforme pour <strong>soutenir sa croissance</strong> et <strong>s'étendre à l'international</strong>. Bien que leur plateforme existante fonctionne bien, des <strong>frais de maintenance élevés</strong> ont motivé une solution plus <strong>économique</strong> et <strong>centrée utilisateur</strong>.</> },
  footnote: { en: '*client\'s revenues YoY, before the platform.',   fr: "*chiffre d'affaires annuel du client, avant la plateforme." },
};
const CONTEXT_BODIES = {
  // index matches eyebrows array (0 = client, body handled inline, 1 = industry, handled inline)
  mission:      { en: <>Design a <strong>luxury-first</strong>, <strong>user-centric web platform</strong> that lets buyers explore unbuilt properties interactively while supporting sales agents during high-pressure launch events.</>, fr: <>Concevoir une plateforme web <strong>haut de gamme</strong> et <strong>centrée sur l'utilisateur</strong> permettant aux acheteurs d'explorer des biens non construits de manière interactive, tout en accompagnant les agents commerciaux lors des lancements sous haute pression.</> },
  stakeholders: {
    en: <><ul className="list-disc list-inside"><li>Client: <strong>digital team</strong> and <strong>architects</strong>.</li><li>Internal: <strong>product</strong>, project management, <strong>development</strong>, design, <strong>studio</strong> and marketing.</li></ul><div className="mt-4 sm:w-fit rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] px-4 py-3 text-[14px] sm:text-[15px] leading-relaxed text-[#5c5c5c] dark:text-[#adadad]">🎨 <strong className="text-[#1f1f1f] dark:text-[#f6f6f6]">Design Team:</strong> Coordinated <strong>cross-functional communications</strong> and served as the <strong>source of truth</strong> for product and design decisions.</div></>,
    fr: <><ul className="list-disc list-inside"><li>Client : <strong>équipe digitale</strong> et <strong>architectes</strong>.</li><li>Interne : <strong>équipe produit</strong>, gestion de projet, <strong>développement</strong>, design, <strong>studio</strong> et marketing.</li></ul><div className="mt-4 sm:w-fit rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] px-4 py-3 text-[14px] sm:text-[15px] leading-relaxed text-[#5c5c5c] dark:text-[#adadad]">🎨 <strong className="text-[#1f1f1f] dark:text-[#f6f6f6]">Équipe Design :</strong> Coordination des <strong>communications transverses</strong> et référent de <strong>source de vérité</strong> pour les décisions produit et design.</div></>,
  },
  myRole: {
    en: {
      stats: [
        { value: "15 weeks", label: "to first launch" },
        { value: "10 projects", label: "in first year" },
      ],
      body: <>As <strong>Senior <abbr title="User Experience / User Interface" className="no-underline">UX/UI</abbr> Designer</strong> and <strong>Design Team Manager</strong>, I led a team of four designers across <strong>UX, UI, interaction, and visual design</strong> from concept to launch, including <strong>MVP strategy</strong> and <strong>incremental feature rollout</strong>. 🚀</>,
    },
    fr: {
      stats: [
        { value: "15 semaines", label: "jusqu’au 1er lancement" },
        { value: "10 projets",   label: "la premi\u00e8re ann\u00e9e" },
      ],
      body: <>En tant que <strong>Senior <abbr title="User Experience / User Interface" className="no-underline">UX/UI</abbr> Designer</strong> et <strong>responsable de l&apos;équipe design</strong>, j’ai dirigé une équipe de quatre designers couvrant l’<strong>UX, l’UI, l’interaction et le design visuel</strong>, du concept au lancement, incluant la <strong>stratégie MVP</strong> et le <strong>déploiement incrémental des fonctionnalités</strong>. 🚀</>,
    },
  },
  team: {
    en: <>Fully remote, with the flexibility to work from anywhere, distributed globally 🌏. The <strong>design team</strong> collaborated closely with <strong>developers</strong> and the <strong>studio team</strong>, ensuring <strong>consistent communication</strong> and alignment across all launches.</>,
    fr: <>100% télétravail, avec la flexibilité de travailler de n’importe où, dans le monde 🌏. L’<strong>équipe design</strong> a collaboré étroitement avec les <strong>développeurs</strong> et l’<strong>équipe studio</strong>, garantissant une <strong>communication cohérente</strong> et un alignement tout au long des lancements.</>,
  },
};

const SP_COUNTRY_COLOR_MAP = {
  Scotland:  '#C9A84C',
  England:   '#6B9CE8',
  UAE:       '#E8836B',
  Cyprus:    '#E8836B',
  Portugal:  '#B07FE8',
  Brazil:    '#B07FE8',
  Nigeria:   '#B07FE8',
  India:     '#E86B9C',
  Australia: '#6BB8E8',
  Malaysia:  '#A8E86B',
  Indonesia: '#E8A86B',
  Thailand:  '#E8A86B',
};

const SP_TOOLTIP_OFFSETS = {
  England: { y: 28 }, // shift down to avoid overlapping Scotland
};

// Pin specific SVG dots for countries with multiple circles
const SP_DOT_ID_MAP = {
  Australia: 'even+10-Australia_5', // eastern Australia, further south
  Brazil:    'odd-3-Brazil',      // Brasília
  Cyprus:    'even+2-Greece',     // no Cyprus dot in SVG, reuse Greece
  Indonesia: 'odd+7-Indonesia_3', // Jakarta, shifted east
  Thailand:  'odd+7-Thailand',    // Bangkok
};

const SP_TEAM_DOTS = [
  { label: 'UX/UI',          group: 'design',     countries: ['Scotland', 'India', 'Australia'], color: '#C9A84C' },
  { label: 'Interaction',    group: 'design',     country: 'Malaysia',  color: '#A8E86B' },
  { label: 'Visual',         group: 'design',     country: 'Scotland',  color: '#C9A84C' },
  { label: 'Creative Team',  group: 'studio',     country: 'Scotland', color: '#C9A84C' },
  { label: '3D Artists',     group: 'studio',     countries: ['Portugal', 'Brazil', 'Nigeria'], color: '#B07FE8' },
  { label: 'Project Manager',group: 'management', countries: ['England', 'Cyprus'], color: '#6B9CE8' },
  { label: 'Product Manager',group: 'management', country: 'UAE',                  color: '#E8836B' },
  { label: 'Developer',      group: 'dev',        countries: ['Scotland', 'England'], color: '#C9A84C' },
  { label: 'QA Testers',     group: 'qa',         countries: ['Indonesia', 'Thailand'], color: '#E8A86B' },
  { label: 'Marketing',      group: 'marketing',  countries: ['England', 'Scotland'],   color: '#6B9CE8' },
];

const SP_LEGEND_GROUPS = [
  { heading: 'Design',            group: 'design' },
  { heading: 'Studio',            group: 'studio' },
  { heading: 'Development',       group: 'dev' },
  { heading: 'QA', group: 'qa' },
  { heading: 'Marketing',         group: 'marketing' },
  { heading: 'Management',        group: 'management' },
];

const SP_LEGEND_T = {
  en: {
    headings:       { design: 'Design', studio: 'Studio', dev: 'Engineering', qa: 'QA', marketing: 'Marketing', management: 'Management' },
    labels:         { 'UX/UI': 'UX/UI', Interaction: 'Interaction', Visual: 'Visual', 'Creative Team': 'Creative Team', '3D Artists': '3D Artists', 'QA Testers': 'QA Testers', Marketing: 'Marketing', 'Project Manager': 'Project Manager', 'Product Manager': 'Product Manager', Developer: 'Developer', Cyprus: 'Cyprus', UAE: 'UAE' },
    mapCaption:     'Slide or hover over the map to explore time zones.',
    groupAriaLabel: 'Team members by location',
    mapAriaLabel:   'World map showing team locations. Use left and right arrow keys to explore time zones.',
  },
  fr: {
    headings:       { design: 'Design', studio: 'Studio', dev: 'Ingénierie', qa: 'Qualité', marketing: 'Marketing', management: 'Management' },
    labels:         { 'UX/UI': 'UX/UI', Interaction: 'Interaction', Visual: 'Visuel', 'Creative Team': 'Équipe créative', '3D Artists': 'Artistes 3D', 'QA Testers': 'Testeurs', Marketing: 'Marketing', 'Project Manager': 'Chef de projet', 'Product Manager': 'Product Manager', Developer: 'Développeur', Cyprus: 'Chypre', UAE: 'EAU' },
    mapCaption:     'Survolez la carte pour explorer les fuseaux horaires.',
    groupAriaLabel: "Membres de l'équipe par localisation",
    mapAriaLabel:   "Carte du monde montrant les localisations de l'équipe. Utilisez les flèches gauche et droite pour explorer les fuseaux horaires.",
  },
};

const CONTEXT_TOOLS = [
  {
    label: { en: 'Design', fr: 'Design' },
    tools: [
      { name: "Figma",             icon: imgToolFigma },
      { name: "Adobe Illustrator", icon: imgToolIllustrator },
      { name: "Adobe Photoshop",   icon: imgToolPhotoshop },
    ],
  },
  {
    label: { en: 'Development', fr: 'Développement' },
    tools: [
      { name: "Visual Studio Code", icon: imgToolVSCode },
      { name: "Unreal Engine",      icon: imgToolUnreal, darkInvert: true, circle: true, contain: 'w-[75%] h-[75%]' },
      { name: "Autodesk 3DS Max",   icon: imgTool3dsMax },
    ],
  },
  {
    label: { en: 'Production', fr: 'Production' },
    tools: [
      { name: "DaVinci Resolve", icon: imgToolDaVinci },
    ],
  },
  {
    label: { en: 'Project Management', fr: 'Gestion de projet' },
    tools: [
      { name: "Atlassian Confluence", icon: imgToolConfluence },
      { name: "Atlassian Jira",       icon: imgToolJira },
      { name: "Miro",                 icon: imgToolMiro },
    ],
  },
];

function ContextContent({ lang, isDark }) {
  const eyebrows = CONTEXT_EYEBROWS[lang] ?? CONTEXT_EYEBROWS.en;
  const clientPill = CONTEXT_CLIENT_PILL[lang] ?? CONTEXT_CLIENT_PILL.en;
  const l = lang in CONTEXT_BODIES.mission ? lang : 'en';
  return (
    <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
      <Tile>
        <img src={imgClientLogo} alt="Client logo" width={80} height={80} className="brightness-0 dark:invert" />
        <TileEyebrow>{eyebrows[0]}</TileEyebrow>
        <TileBody>{lang === 'fr' ? <>L'un des <strong>principaux promoteurs immobiliers</strong> des Émirats arabes unis (EAU), qui connaissait une croissance annuelle de son chiffre d'affaires et étendait ses activités à travers trois Émirats.</> : <>One of the <strong>leading real estate developers</strong> in the United Arab Emirates (UAE), was experiencing annual revenue growth and expanding operations across three Emirates.</>}</TileBody>
      </Tile>
      <Tile>
        <p className="text-[30px] sm:text-[36px] lg:text-[44px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">
          {CONTEXT_INDUSTRY.stat[lang] ?? CONTEXT_INDUSTRY.stat.en}
        </p>
        <p className="text-[24px] sm:text-[26px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">{eyebrows[1]}</p>
        <TileBody>{CONTEXT_INDUSTRY.body[l]}</TileBody>
        <p className="text-[13px] sm:text-[14px] text-[#5c5c5c] dark:text-[#adadad]">
          {CONTEXT_INDUSTRY.footnote[lang] ?? CONTEXT_INDUSTRY.footnote.en}
        </p>
      </Tile>
      <Tile><TileEyebrow>{eyebrows[2]}</TileEyebrow><TileBody>{CONTEXT_BODIES.mission[l]}</TileBody></Tile>
      <Tile><TileEyebrow>{eyebrows[3]}</TileEyebrow><TileBody>{CONTEXT_BODIES.stakeholders[l]}</TileBody></Tile>

      <Tile>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
          <TileEyebrow>{eyebrows[4]}</TileEyebrow>
          <div className="flex items-start gap-8 sm:gap-12 shrink-0 my-4 sm:my-0 sm:-mt-2">
            {CONTEXT_BODIES.myRole[l].stats.map((s, i) => (
              <div key={i} className="flex flex-col items-start sm:items-end gap-0.5">
                <span className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">{s.value}</span>
                <span className="text-[13px] sm:text-[14px] text-[#5c5c5c] dark:text-[#adadad] text-left sm:text-right">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <TileBody>{CONTEXT_BODIES.myRole[l].body}</TileBody>
      </Tile>

      <Tile>
        <TileEyebrow>{eyebrows[6]}</TileEyebrow>
        <TileBody>{CONTEXT_BODIES.team[l]}</TileBody>
        <div className="mt-6">
          <WorldMapDots
            isDark={isDark}
            lang={lang}
            teamDots={SP_TEAM_DOTS}
            legendGroups={SP_LEGEND_GROUPS}
            countryColorMap={SP_COUNTRY_COLOR_MAP}
            translations={SP_LEGEND_T}
            dotIdMap={SP_DOT_ID_MAP}
            tooltipOffsets={SP_TOOLTIP_OFFSETS}
          />
        </div>
      </Tile>
    </div>
  );
}

// ── Impact section content ────────────────────────────────────────────────────
const IMPACT = {
  en: {
    outcome: {
      eyebrow: "Outcome",
      body: <><p>The platform's first two projects <strong>sold out within 48 hours</strong> of launch, demonstrating the immediate effectiveness of the design. By the end of the first year, the platform contributed to a <strong>20% YoY increase in sales</strong>, generating <strong>£6.8 billion in revenue</strong>.</p><p>The strong coordination between design, development, and project teams was key to this success. We maintained momentum through <strong>iterative improvements</strong> and <strong>cross-functional collaboration</strong>, ensuring that the platform scaled with each new project.</p></>,
    },
    retrospective: {
      eyebrow: "Retrospective",
      body: <><p>This project highlighted the importance of <strong>early alignment</strong> between design, development, and the client. The team's <strong>agility and collaboration</strong> ensured we met tight deadlines.</p><p>We made several <strong>trade-offs</strong> to balance user needs, business priorities, and technical constraints. In retrospect, more structured research and user testing could have further informed our design decisions. However, our <strong>iterative approach</strong> and ability to adapt quickly contributed to the project's success.</p><p>This experience underscored the value of <strong>clear communication and expectation management</strong> with stakeholders, especially when priorities evolve throughout the project.</p></>
,
    },
  },
  fr: {
    outcome: {
      eyebrow: "Bilan",
      body: <><p>Les deux premiers projets de la plateforme ont été <strong>vendus en 48 heures</strong> suivant leur lancement, témoignant de l'efficacité immédiate du design. À la fin de la première année, la plateforme a contribué à une <strong>augmentation des ventes de 20 %</strong>, générant <strong>6,8 milliards de livres sterling</strong> de chiffre d'affaires.</p><p>La coordination étroite entre les équipes design, développement et gestion de projet a été essentielle à ce succès. Nous avons maintenu l'élan grâce à des <strong>améliorations itératives</strong> et une <strong>collaboration transversale</strong>, garantissant que la plateforme évolue avec chaque nouveau projet.</p></>,
    },
    retrospective: {
      eyebrow: "Rétrospective",
      body: <><p>Ce projet a mis en lumière l'importance d'un <strong>alignement précoce</strong> entre le design, le développement et le client. L'<strong>agilité et la collaboration</strong> de l'équipe nous ont permis de respecter des délais serrés.</p><p>Nous avons effectué plusieurs <strong>compromis</strong> pour équilibrer les besoins des utilisateurs, les priorités métier et les contraintes techniques. Rétrospectivement, une recherche plus structurée et des tests utilisateurs plus poussés auraient pu davantage éclairer nos décisions de design. Cependant, notre <strong>approche itérative</strong> et notre capacité d'adaptation rapide ont contribué au succès du projet.</p><p>Cette expérience a souligné la valeur d'une <strong>communication claire et de la gestion des attentes</strong> avec les parties prenantes, en particulier lorsque les priorités évoluent au fil du projet.</p></>
,
    },
  },
};

function ImpactContent({ lang }) {
  const t = IMPACT[lang] ?? IMPACT.en;
  return (
    <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
      <Tile>
        <TileEyebrow>{t.outcome.eyebrow}</TileEyebrow>
        <TileBody>{t.outcome.body}</TileBody>
      </Tile>
      <Tile>
        <TileEyebrow>{t.retrospective.eyebrow}</TileEyebrow>
        <TileBody>{t.retrospective.body}</TileBody>
      </Tile>
    </div>
  );
}

// ── Define section content ────────────────────────────────────────────────────
function TileH4({ children }) {
  return (
    <h4 className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold leading-[24px] sm:leading-[28px] lg:leading-[32px] text-[#1f1f1f] dark:text-[#f6f6f6]">
      {children}
    </h4>
  );
}

const TIMELINE_PROJECTS = [
  { label: "Project A", weeks: 15, color: "rgba(72,230,184,0.5)",  roundedL: true  },
  { label: "Project B", weeks: 10, color: "#48e6b8"                               },
  { label: "C",         weeks: 4,  color: "#f26f21"                               },
  { label: "D",         weeks: 5,  color: "rgba(242,111,33,0.5)"                  },
  { label: "E",         weeks: 3,  color: "#9747ff"                               },
  { label: "F",         weeks: 6,  color: "rgba(151,71,255,0.5)"                  },
  { label: "G",         weeks: 2,  color: "#339bfc"                               },
  { label: "H",         weeks: 2,  color: "rgba(51,155,252,0.5)"                  },
  { label: "I",         weeks: 2,  color: "#ffd953"                               },
  { label: "J",         weeks: 3,  color: "rgba(255,217,83,0.5)",  roundedR: true },
];

function LaunchesTimeline() {
  return (
    <div className="overflow-hidden">
      <div className="flex w-full">
        {TIMELINE_PROJECTS.map(p => (
          <div key={p.label} className="flex flex-col gap-1.5 sm:gap-2" style={{ flex: p.weeks }}>
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-[#5c5c5c] dark:text-[#adadad] whitespace-nowrap">{p.label}</p>
            <div
              className={`h-6 sm:h-8${p.roundedL ? " rounded-l-[10px] sm:rounded-l-[12px]" : ""}${p.roundedR ? " rounded-r-[10px] sm:rounded-r-[12px]" : ""}`}
              style={{ backgroundColor: p.color }}
            />
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-[#5c5c5c] dark:text-[#adadad] whitespace-nowrap">
              {p.weeks >= 10 ? `${p.weeks} weeks` : `${p.weeks}w`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const DEFINE = {
  en: {
    challenge: {
      eyebrow: "The challenge",
      body: <>How can we help real estate buyers experience <strong className="text-[#1f1f1f] dark:text-[#f6f6f6]">unbuilt spaces</strong> across multiple geographies in a way that is <strong className="text-[#1f1f1f] dark:text-[#f6f6f6]">emotionally engaging</strong> and <strong className="text-[#1f1f1f] dark:text-[#f6f6f6]">contextually relevant?</strong></>,
      description: <><p>Key constraints included:</p><ul className="list-disc list-inside space-y-1"><li><strong>Technical limitations:</strong> Large 3D datasets made real-time rendering expensive and slow.</li><li><strong>Tight deadlines:</strong> The first launch was only <strong>a few weeks away</strong>, leaving limited time for research or extensive feature development.</li><li><strong>Client expectations:</strong> The client wanted a <strong>premium, user-friendly experience</strong> and made final decisions on key features.</li></ul></>,
    },
    exploration: {
      eyebrow: "Exploration",
      subsections: [
        {
          h4: "Integrating 3D without compromising performance",
          body: <><p>Unreal Engine's <strong>real-time rendering</strong> provided significant improvements in lighting quality, nearing the level of traditional CG rendering (e.g. 3dsMax with VRay). This offered a more <strong>immersive, realistic experience</strong> for users.</p><p>We imported large-scale 3D datasets into Unreal and tested <strong>Pixel-streaming</strong> for real-time playback in browsers. However, two major challenges emerged:</p><p><span role="img" aria-label="Challenges">🛑</span> <strong>Challenges</strong></p><ul className="list-disc list-inside space-y-1"><li><strong>Long loading times:</strong> Large 3D datasets caused multi-minute load times.</li><li><strong>High streaming costs:</strong> The per-user cost of streaming 3D content at scale was <strong>unsustainable</strong> for the project.</li></ul><p><span role="img" aria-label="Solution">✅</span> <strong>Solution</strong></p><p>To deliver a browser-based 3D experience efficiently, we decided to use <strong>pre-rendered images</strong> from Unreal for the MVP. This allowed for <strong>smooth, scalable access</strong> to 3D scenes, while <strong>Pixel-streaming</strong> could be reserved for <strong>exclusive, high-priority users</strong> or special events.</p></>,
        },
      ],
    },
    uxStrategy: {
      eyebrow: "UX strategy",
      subsections: [
        {
          h4: "Firm deadlines",
          body: <>Given the <strong>fast-paced nature</strong> of the luxury real estate market, project deliveries had <strong>strict deadlines</strong>. The client aimed to sell large volumes of units on launch day, meaning that every unit (approx. <strong>1,000 per project</strong>) had to be viewable in-app from day one.</>,
        },
        {
          h4: "MVP Approach",
          body: <>With just <strong>15 weeks</strong> from project start to launch, the timeline didn't allow for full design, implementation, and testing of the ideal platform. As a result, we opted for a <strong>Minimum Viable Product (MVP)</strong> that was <strong>desktop-first</strong>, ensuring that sales agents could showcase properties and close deals on launch day.</>,
        },
        {
          h4: "Incremental iterations",
          body: <>Due to the <strong>rapid pace</strong> of upcoming launches, we anticipated new design and development challenges for each project. After the first launch, we would <strong>incrementally introduce</strong> additional features based on <strong>user feedback</strong> and evolving client priorities. This allowed us to balance <strong>immediate needs</strong> with <strong>longer-term goals</strong>, enabling <strong>continuous improvement</strong> without delaying launch.</>,
        },
        { h4: "Launches timeline", body: null, before: <>The launch schedule was <strong>ambitious</strong>, with <strong>tight timelines</strong> for each project release. Here's an overview of the expected delivery timeline for the first year.</>, after: <>Each of these projects required careful <strong>prioritisation</strong> and <strong>fast-paced iterations</strong> to meet the market's demands. As the platform grew, our <strong>incremental approach</strong> allowed us to continuously improve features and ensure that new projects met both <strong>user and client expectations</strong>.</> },
      ],
    },
  },
  fr: {
    challenge: {
      eyebrow: "Le défi",
      body: <>Comment pouvons-nous aider des acheteurs immobiliers à se projeter dans des <strong className="text-[#1f1f1f] dark:text-[#f6f6f6]">espaces non-bâtis</strong> de façon <strong className="text-[#1f1f1f] dark:text-[#f6f6f6]">émotionnellement engageante</strong> et <strong className="text-[#1f1f1f] dark:text-[#f6f6f6]">contextuellement pertinente</strong>, dans divers environnements géographiques<strong className="text-[#1f1f1f] dark:text-[#f6f6f6]"> ?</strong></>,
      description: <><p>Les principales contraintes incluaient :</p><ul className="list-disc list-inside space-y-1"><li><strong>Limitations techniques :</strong> Les grandes bases de données 3D rendaient le rendu en temps réel coûteux et lent.</li><li><strong>Délais serrés :</strong> Le premier lancement n'était qu'à <strong>15 semaines</strong>, laissant peu de temps pour la recherche ou le développement de fonctionnalités.</li><li><strong>Attentes du client :</strong> Le client souhaitait une <strong>expérience premium et intuitive</strong> et prenait les décisions finales sur les fonctionnalités clés.</li></ul></>,
    },
    exploration: {
      eyebrow: "Exploration",
      subsections: [
        {
          h4: "Intégration 3D sans compromettre les perfs",
          body: <><p>Le rendu en <strong>temps réel</strong> d'Unreal Engine apportait des améliorations significatives en qualité d'éclairage, s'approchant du rendu CG traditionnel (3dsMax avec VRay par exemple). Cela offrait une <strong>expérience immersive et réaliste</strong> aux utilisateurs.</p><p>Nous avons importé de larges ensembles de données 3D dans Unreal et testé le <strong>Pixel-streaming</strong> pour une lecture en temps réel dans les navigateurs. Cependant, deux défis majeurs sont apparus :</p><p><span role="img" aria-label="Challenges">🛑</span> <strong>Défis</strong></p><ul className="list-disc list-inside space-y-1"><li><strong>Temps de chargement longs :</strong> Les larges ensembles de données 3D causaient des temps de chargement de plusieurs minutes.</li><li><strong>Coûts de streaming élevés :</strong> Le coût par utilisateur du streaming 3D à grande échelle était <strong>insoutenable</strong> pour le projet.</li></ul><p><span role="img" aria-label="Solution">✅</span> <strong>Solution</strong></p><p>Pour proposer une expérience 3D dans le navigateur de façon efficace, nous avons opté pour les <strong>images pré-rendues</strong> depuis Unreal pour le MVP. Cela permettait un <strong>accès fluide et évolutif</strong> aux scènes 3D, tandis que le <strong>Pixel-streaming</strong> pouvait être réservé aux <strong>utilisateurs prioritaires</strong> ou événements spéciaux.</p></>,
        },
      ],
    },
    uxStrategy: {
      eyebrow: "Stratégie UX",
      subsections: [
        {
          h4: "Échéances strictes",
          body: <>Compte tenu du <strong>rythme soutenu</strong> du marché immobilier de luxe, les livraisons de projets avaient des <strong>délais stricts</strong>. Le client visait à vendre de grandes quantités de lots dès le jour du lancement, ce qui signifiait que chaque lot (environ <strong>1 000 par projet</strong>) devait être visible dans l'application dès le premier jour.</>,
        },
        {
          h4: "Approche MVP",
          body: <>Avec seulement <strong>15 semaines</strong> entre le début du projet et le lancement, le calendrier ne permettait pas la conception, l'implémentation et les tests complets de la plateforme idéale. Nous avons donc opté pour un <strong>Produit Minimum Viable (MVP)</strong> <strong>desktop-first</strong>, garantissant que les agents commerciaux puissent présenter les biens et conclure des ventes dès le lancement.</>,
        },
        {
          h4: "Itérations incrémentales",
          body: <>En raison du <strong>rythme rapide</strong> des lancements à venir, nous anticipions de nouveaux défis de conception et développement pour chaque projet. Après le premier lancement, nous introduirions <strong>progressivement</strong> de nouvelles fonctionnalités basées sur les <strong>retours utilisateurs</strong> et les priorités évolutives du client. Cela nous permettait d'équilibrer les <strong>besoins immédiats</strong> et les <strong>objectifs à long terme</strong>, favorisant une <strong>amélioration continue</strong> sans retarder le lancement.</>,
        },
        { h4: "Chronologie des lancements", body: null, before: <>Le calendrier de lancement était <strong>ambitieux</strong>, avec des <strong>délais serrés</strong> pour chaque sortie de projet. Voici un aperçu du calendrier de livraison prévu pour la première année.</>, after: <>Chacun de ces projets nécessitait une <strong>priorisation rigoureuse</strong> et des <strong>itérations rapides</strong> pour répondre aux exigences du marché. Au fil de la croissance de la plateforme, notre <strong>approche incrémentale</strong> nous a permis d'améliorer continuellement les fonctionnalités et de garantir que les nouveaux projets répondent aux <strong>attentes des utilisateurs et du client</strong>.</> },
      ],
    },
  },
};

function DefineContent({ lang }) {
  const d = DEFINE[lang] ?? DEFINE.en;
  return (
    <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
      <Tile bgClass="bg-[#f6f6f6] dark:bg-[#1f1f1f]">
        <TileEyebrow>{d.challenge.eyebrow}</TileEyebrow>
        <TileTitle>{d.challenge.body}</TileTitle>
        <div className="mt-4 sm:mt-6"><TileBody>{d.challenge.description}</TileBody></div>
      </Tile>
      <Tile bgClass="bg-transparent">
        <TileEyebrow>{d.exploration.eyebrow}</TileEyebrow>
        {d.exploration.subsections.map((s, i) => (
          <div key={i} className="flex flex-col gap-4 sm:gap-5 lg:gap-6 pt-2">
            <TileH4>{s.h4}</TileH4>
            <TileBody>{s.body}</TileBody>
          </div>
        ))}
      </Tile>
      <Tile bgClass="bg-transparent">
        <TileEyebrow>{d.uxStrategy.eyebrow}</TileEyebrow>
        {d.uxStrategy.subsections.map((s, i) => (
          <div key={i} className="flex flex-col gap-4 sm:gap-5 lg:gap-6 pt-2">
            <TileH4>{s.h4}</TileH4>
            {s.body ? <TileBody>{s.body}</TileBody> : <><TileBody>{s.before}</TileBody><div className="my-8 sm:my-10"><LaunchesTimeline /></div><TileBody>{s.after}</TileBody></>}
          </div>
        ))}
      </Tile>
    </div>
  );
}

// ── Concepts carousel ─────────────────────────────────────────────────────────
const CONCEPTS_TITLES = {
  en: ['Globe view', 'Country view', 'City view', 'Project view', 'Building view'],
  fr: ['Vue Globe', 'Vue Pays', 'Vue Ville', 'Vue Projet', 'Vue Tour'],
};
const CONCEPTS_COLORS = [
  { bg: '#ffeeb3', color: '#916404', bgDark: '#2c2200', colorDark: '#ffd97d' },
  { bg: '#ffe2ca', color: '#994f00', bgDark: '#2c1500', colorDark: '#ffb27a' },
  { bg: '#ffd5d5', color: '#962628', bgDark: '#2c0000', colorDark: '#ff9090' },
  { bg: '#f4e5ff', color: '#7a38ab', bgDark: '#1c0035', colorDark: '#cc88ff' },
  { bg: '#d7e2f6', color: '#254c96', bgDark: '#001030', colorDark: '#88aaee' },
];

const CONCEPTS_SLIDES = {
  en: [
    { desktop: imgConcepts01DesktopEn, tablet: imgConcepts01TabletEn, mobile: imgConcepts01MobileEn },
    { desktop: imgConcepts02DesktopEn, tablet: imgConcepts02TabletEn, mobile: imgConcepts02MobileEn },
    { desktop: imgConcepts03DesktopEn, tablet: imgConcepts03TabletEn, mobile: imgConcepts03MobileEn },
    { desktop: imgConcepts04DesktopEn, tablet: imgConcepts04TabletEn, mobile: imgConcepts04MobileEn },
    { desktop: imgConcepts05DesktopEn, tablet: imgConcepts05TabletEn, mobile: imgConcepts05MobileEn },
  ],
  fr: [
    { desktop: imgConcepts01DesktopFr, tablet: imgConcepts01TabletFr, mobile: imgConcepts01MobileFr },
    { desktop: imgConcepts02DesktopFr, tablet: imgConcepts02TabletFr, mobile: imgConcepts02MobileFr },
    { desktop: imgConcepts03DesktopFr, tablet: imgConcepts03TabletFr, mobile: imgConcepts03MobileFr },
    { desktop: imgConcepts04DesktopFr, tablet: imgConcepts04TabletFr, mobile: imgConcepts04MobileFr },
    { desktop: imgConcepts05DesktopFr, tablet: imgConcepts05TabletFr, mobile: imgConcepts05MobileFr },
  ],
};

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ slides, initialIndex, lang, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const indexRef = useRef(initialIndex);
  const trackRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(typeof document !== 'undefined' ? document.activeElement : null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const hidden = Array.from(document.body.children).filter(el => el !== dialog);
    hidden.forEach(el => el.setAttribute('inert', ''));
    return () => {
      hidden.forEach(el => el.removeAttribute('inert'));
      returnFocusRef.current?.focus();
    };
  }, []);

  // Auto-focus close button after mount settles
  useEffect(() => {
    const id = setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, []);

  // Scroll to initial slide instantly on mount
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const raf = requestAnimationFrame(() => {
      track.scrollTo({ left: initialIndex * track.clientWidth, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToSlide = (i) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    indexRef.current = i;
    setIndex(i);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')  scrollToSlide(Math.max(0, indexRef.current - 1));
      if (e.key === 'ArrowRight') scrollToSlide(Math.min(slides.length - 1, indexRef.current + 1));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [slides.length, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== indexRef.current) { indexRef.current = i; setIndex(i); }
  };

  const closeLbl = lang === 'fr' ? 'Fermer' : 'Close';
  const prevLbl  = lang === 'fr' ? 'Image précédente' : 'Previous image';
  const nextLbl  = lang === 'fr' ? 'Image suivante'   : 'Next image';

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'fr' ? 'Image en plein écran' : 'Fullscreen image'}
      className="fixed inset-0 z-[600]"
      style={{ animation: 'fade-in 0.2s ease both', background: 'rgba(0,0,0,0.92)' }}
    >
      {/* Slide track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        role="group"
        aria-label={lang === 'fr' ? 'Diapositives' : 'Slides'}
        tabIndex={0}
        className="w-full h-full flex"
        style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', scrollSnapType: 'x mandatory', touchAction: 'pan-x' }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="shrink-0 w-full h-full flex items-center justify-center"
            style={{ scrollSnapAlign: 'start' }}
            onClick={onClose}
          >
            <img
              src={slide.desktop ?? slide.mobile}
              alt={lang === 'fr' ? `Diapositive ${i + 1} sur ${slides.length}` : `Slide ${i + 1} of ${slides.length}`}
              draggable="false"
              className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>

      {/* Counter */}
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-[13px] font-medium text-white/60 tabular-nums pointer-events-none">
        {index + 1} / {slides.length}
      </span>

      {/* Close */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label={closeLbl}
        data-spring
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <img src={imgClose} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>

      {/* Prev */}
      <button
        data-spring
        onClick={() => scrollToSlide(Math.max(0, index - 1))}
        disabled={index === 0}
        aria-label={prevLbl}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <img src={imgChevronLeft} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>

      {/* Next */}
      <button
        data-spring
        onClick={() => scrollToSlide(Math.min(slides.length - 1, index + 1))}
        disabled={index === slides.length - 1}
        aria-label={nextLbl}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <img src={imgChevronRight} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>
    </div>,
    document.body
  );
}

function ConceptsCarousel({ lang, isDark }) {
  const slides = CONCEPTS_SLIDES[lang] ?? CONCEPTS_SLIDES.en;
  const titles = CONCEPTS_TITLES[lang] ?? CONCEPTS_TITLES.en;
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);

  const scrollToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index];
    if (slide) {
      const slideLeft = slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      track.scrollTo({ left: slideLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    setActiveIndex(index);
    isProgrammaticRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { isProgrammaticRef.current = false; }, 400);
  };

  const handleScroll = () => {
    if (isProgrammaticRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children);
    const containerRect = track.getBoundingClientRect();
    let closest = 0, minDist = Infinity;
    items.forEach((item, i) => {
      const itemLeft = item.getBoundingClientRect().left - containerRect.left + track.scrollLeft;
      const dist = Math.abs(itemLeft - track.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  return (
    <div
      role="region"
      aria-label={lang === 'fr' ? 'Carrousel des concepts CGI' : 'CGI concepts carousel'}
      aria-roledescription="carousel"
      className="flex flex-col gap-3 sm:gap-4"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {lang === 'fr' ? `Diapositive ${activeIndex + 1} sur ${slides.length}` : `Slide ${activeIndex + 1} of ${slides.length}`}
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label={lang === 'fr' ? `Carrousel des concepts CGI — utilisez les flèches pour naviguer, Entrée pour agrandir` : `CGI concepts carousel — use arrow keys to navigate, Enter to expand`}
        onScroll={handleScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToSlide(Math.max(0, activeIndex - 1)); }
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollToSlide(Math.min(slides.length - 1, activeIndex + 1)); }
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(activeIndex); }
        }}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory rounded-xl sm:rounded-2xl lg:rounded-3xl touch-pan-x touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
        style={{ scrollbarWidth: 'none' }}
      >
        {slides.map((slide, i) => (
          <button key={i} tabIndex={-1} onClick={() => setLightboxIndex(i)} aria-label={lang === 'fr' ? `Agrandir : Concept CGI ${i + 1}` : `Expand: CGI concept ${i + 1}`} className="w-full shrink-0 snap-start cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
            <picture>
              <source media="(min-width: 1024px)" srcSet={slide.desktop} />
              <source media="(min-width: 640px)"  srcSet={slide.tablet} />
              <img src={slide.mobile} alt={lang === 'fr' ? `Concept CGI, diapositive ${i + 1} sur ${slides.length}` : `CGI concept, slide ${i + 1} of ${slides.length}`} draggable="false" loading="lazy" className="w-full h-auto" />
            </picture>
          </button>
        ))}
      </div>
      {lightboxIndex !== null && <Lightbox slides={slides} initialIndex={lightboxIndex} lang={lang} onClose={() => setLightboxIndex(null)} />}

      <div className="flex flex-col gap-2">
        <div className="sm:hidden">
          <span className="inline-block text-[15px] font-semibold leading-none px-3 py-1.5 rounded-md whitespace-nowrap" style={{ backgroundColor: CONCEPTS_COLORS[activeIndex][isDark ? 'bgDark' : 'bg'], color: CONCEPTS_COLORS[activeIndex][isDark ? 'colorDark' : 'color'] }}>
            {titles[activeIndex]}
          </span>
        </div>
        <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto_1fr] items-center">
          <div className="hidden sm:block">
            <span className="inline-block text-[15px] sm:text-[16px] font-semibold leading-none px-3 py-1.5 rounded-md whitespace-nowrap" style={{ backgroundColor: CONCEPTS_COLORS[activeIndex][isDark ? 'bgDark' : 'bg'], color: CONCEPTS_COLORS[activeIndex][isDark ? 'colorDark' : 'color'] }}>
              {titles[activeIndex]}
            </span>
          </div>
          <div className="flex items-center">
            {slides.map((_, i) => { const win = Math.min(5, slides.length); const start = Math.min(Math.max(0, activeIndex - 2), slides.length - win); const inWindow = i >= start && i < start + win; const isEdge = inWindow && ((i === start && start > 0) || (i === start + win - 1 && start + win < slides.length)); return (
              <button key={i} tabIndex={inWindow ? 0 : -1} onClick={() => scrollToSlide(i)} aria-label={lang === 'fr' ? `Aller à la diapositive ${i + 1}` : `Go to slide ${i + 1}`} aria-current={i === activeIndex ? 'true' : undefined} className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6] rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}>
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-[#1f1f1f] dark:bg-[#f6f6f6]' : isEdge ? 'w-1.5 h-1.5 bg-[#1f1f1f]/25 dark:bg-[#f6f6f6]/25' : 'w-2 h-2 bg-[#1f1f1f]/40 dark:bg-[#f6f6f6]/40 group-hover:bg-[#1f1f1f]/60 dark:group-hover:bg-[#f6f6f6]/60'}`} />
              </button>
            ); })}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
            <button data-spring onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label={lang === 'fr' ? 'Diapositive précédente' : 'Previous slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter] forced-colors:brightness-[unset]" />
            </button>
            <button data-spring onClick={() => scrollToSlide(Math.min(slides.length - 1, activeIndex + 1))} disabled={activeIndex === slides.length - 1} aria-label={lang === 'fr' ? 'Diapositive suivante' : 'Next slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <img src={imgChevronRight} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter] forced-colors:brightness-[unset] forced-colors:invert-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── UI concept cards data ─────────────────────────────────────────────────────
const UI_CONCEPTS = {
  en: [
    { title: "1. Globe view",     titleBg: "#ffeeb3", titleColor: "#916404", titleBgDark: "#2c2200", titleColorDark: "#ffd97d", bullets: ["Flight times", "Breadcrumbs"],        img: imgUiCard01 },
    { title: "2. Country view",   titleBg: "#ffe2ca", titleColor: "#994f00", titleBgDark: "#2c1500", titleColorDark: "#ffb27a", bullets: ["City cards", "Compass, zoom"],        img: imgUiCard02 },
    { title: "3. City view",      titleBg: "#ffd5d5", titleColor: "#962628", titleBgDark: "#2c0000", titleColorDark: "#ff9090", bullets: ["Points of interest", "Distances"],   img: imgUiCard03 },
    { title: "4. Hero view",      titleBg: "#ffe9f9", titleColor: "#8f3575", titleBgDark: "#2c0022", titleColorDark: "#ffaaee", bullets: ["Project card", "Live weather"],       img: imgUiCard04 },
    { title: "5. Project view",   titleBg: "#f4e5ff", titleColor: "#7a38ab", titleBgDark: "#1c0035", titleColorDark: "#cc88ff", bullets: ["Day/night", "Orbit controls"],        img: imgUiCard05 },
    { title: "6. Tower view",     titleBg: "#d7e2f6", titleColor: "#254c96", titleBgDark: "#001030", titleColorDark: "#88aaee", bullets: ["Floor selector", "Filters"],          img: imgUiCard06 },
    { title: "7. Floors view",    titleBg: "#e2ecff", titleColor: "#286dad", titleBgDark: "#00182c", titleColorDark: "#88ccff", bullets: ["Unit selector", "Distances"],         img: imgUiCard07 },
    { title: "8. Unit view",      titleBg: "#daf5d3", titleColor: "#277a22", titleBgDark: "#001c00", titleColorDark: "#88ee80", bullets: ["Room selector", "Customisation"],     img: imgUiCard08 },
    { title: "9. Interiors view", titleBg: "#e9f5d3", titleColor: "#5e760f", titleBgDark: "#101c00", titleColorDark: "#b8e050", bullets: ["Floor selector", "Request callback"], img: imgUiCard09 },
  ],
  fr: [
    { title: "1. Vue Globe",      titleBg: "#ffeeb3", titleColor: "#916404", titleBgDark: "#2c2200", titleColorDark: "#ffd97d", bullets: ["Durées de vol", "Fil d'Ariane"],               img: imgUiCard01 },
    { title: "2. Vue Pays",       titleBg: "#ffe2ca", titleColor: "#994f00", titleBgDark: "#2c1500", titleColorDark: "#ffb27a", bullets: ["Cartes de ville", "Boussole, zoom"],             img: imgUiCard02 },
    { title: "3. Vue Ville",      titleBg: "#ffd5d5", titleColor: "#962628", titleBgDark: "#2c0000", titleColorDark: "#ff9090", bullets: ["Points d'intérêt", "Distances"],                 img: imgUiCard03 },
    { title: "4. Vue Accueil",    titleBg: "#ffe9f9", titleColor: "#8f3575", titleBgDark: "#2c0022", titleColorDark: "#ffaaee", bullets: ["Fiche projet", "Météo en direct"],               img: imgUiCard04 },
    { title: "5. Vue Projet",     titleBg: "#f4e5ff", titleColor: "#7a38ab", titleBgDark: "#1c0035", titleColorDark: "#cc88ff", bullets: ["Jour/nuit", "Contrôles orbitaux"],               img: imgUiCard05 },
    { title: "6. Vue Tour",       titleBg: "#d7e2f6", titleColor: "#254c96", titleBgDark: "#001030", titleColorDark: "#88aaee", bullets: ["Sélecteur d'étage", "Filtres"],                  img: imgUiCard06 },
    { title: "7. Vue Étages",     titleBg: "#e2ecff", titleColor: "#286dad", titleBgDark: "#00182c", titleColorDark: "#88ccff", bullets: ["Sélecteur d'unité", "Distances"],                img: imgUiCard07 },
    { title: "8. Vue Unité",      titleBg: "#daf5d3", titleColor: "#277a22", titleBgDark: "#001c00", titleColorDark: "#88ee80", bullets: ["Sélecteur de pièce", "Personnalisation"],        img: imgUiCard08 },
    { title: "9. Vue Intérieurs", titleBg: "#e9f5d3", titleColor: "#5e760f", titleBgDark: "#101c00", titleColorDark: "#b8e050", bullets: ["Sélecteur d'étage", "Demande de rappel"],        img: imgUiCard09 },
  ],
};

// ── Shared slide titles & colours (wireframes + hifi) ─────────────────────────
const VIEW_SLIDE_TITLES = {
  en: ['Intro', 'Globe view', 'City view', 'Hero view', 'Project view', 'Tower view', 'Tower floor view', 'Unit floor view', 'Interior view'],
  fr: ['Intro', 'Mappemonde', 'Vue de la ville', 'Page héro', 'Vue du projet', "Vue d'une tour", 'Plan des étages', 'Plan du logement', 'Vue intérieure'],
};
const VIEW_SLIDE_COLORS = [
  { bg: '#e8e8e8', color: '#5c5c5c', bgDark: '#2a2a2a', colorDark: '#adadad' }, // Intro
  { bg: '#ffeeb3', color: '#916404', bgDark: '#2c2200', colorDark: '#ffd97d' }, // Globe
  { bg: '#ffd5d5', color: '#962628', bgDark: '#2c0000', colorDark: '#ff9090' }, // City
  { bg: '#ffe9f9', color: '#8f3575', bgDark: '#2c0022', colorDark: '#ffaaee' }, // Hero
  { bg: '#f4e5ff', color: '#7a38ab', bgDark: '#1c0035', colorDark: '#cc88ff' }, // Project
  { bg: '#d7e2f6', color: '#254c96', bgDark: '#001030', colorDark: '#88aaee' }, // Tower
  { bg: '#e2ecff', color: '#286dad', bgDark: '#00182c', colorDark: '#88ccff' }, // Tower floor
  { bg: '#daf5d3', color: '#277a22', bgDark: '#001c00', colorDark: '#88ee80' }, // Unit floor
  { bg: '#e9f5d3', color: '#5e760f', bgDark: '#101c00', colorDark: '#b8e050' }, // Interior
];

// ── Wireframes carousel ───────────────────────────────────────────────────────
const WIREFRAMES_SLIDES = {
  en: {
    light: [
      { desktop: imgWf01DesktopEnLight, mobile: imgWf01MobileEnLight },
      { desktop: imgWf02DesktopEnLight, mobile: imgWf02MobileEnLight },
      { desktop: imgWf03DesktopEnLight, mobile: imgWf03MobileEnLight },
      { desktop: imgWf04DesktopEnLight, mobile: imgWf04MobileEnLight },
      { desktop: imgWf05DesktopEnLight, mobile: imgWf05MobileEnLight },
      { desktop: imgWf06DesktopEnLight, mobile: imgWf06MobileEnLight },
      { desktop: imgWf07DesktopEnLight, mobile: imgWf07MobileEnLight },
      { desktop: imgWf08DesktopEnLight, mobile: imgWf08MobileEnLight },
      { desktop: imgWf09DesktopEnLight, mobile: imgWf09MobileEnLight },
    ],
    dark: [
      { desktop: imgWf01DesktopEnDark, mobile: imgWf01MobileEnDark },
      { desktop: imgWf02DesktopEnDark, mobile: imgWf02MobileEnDark },
      { desktop: imgWf03DesktopEnDark, mobile: imgWf03MobileEnDark },
      { desktop: imgWf04DesktopEnDark, mobile: imgWf04MobileEnDark },
      { desktop: imgWf05DesktopEnDark, mobile: imgWf05MobileEnDark },
      { desktop: imgWf06DesktopEnDark, mobile: imgWf06MobileEnDark },
      { desktop: imgWf07DesktopEnDark, mobile: imgWf07MobileEnDark },
      { desktop: imgWf08DesktopEnDark, mobile: imgWf08MobileEnDark },
      { desktop: imgWf09DesktopEnDark, mobile: imgWf09MobileEnDark },
    ],
  },
  fr: {
    light: [
      { desktop: imgWf01DesktopFrLight, mobile: imgWf01MobileFrLight },
      { desktop: imgWf02DesktopFrLight, mobile: imgWf02MobileFrLight },
      { desktop: imgWf03DesktopFrLight, mobile: imgWf03MobileFrLight },
      { desktop: imgWf04DesktopFrLight, mobile: imgWf04MobileFrLight },
      { desktop: imgWf05DesktopFrLight, mobile: imgWf05MobileFrLight },
      { desktop: imgWf06DesktopFrLight, mobile: imgWf06MobileFrLight },
      { desktop: imgWf07DesktopFrLight, mobile: imgWf07MobileFrLight },
      { desktop: imgWf08DesktopFrLight, mobile: imgWf08MobileFrLight },
      { desktop: imgWf09DesktopFrLight, mobile: imgWf09MobileFrLight },
    ],
    dark: [
      { desktop: imgWf01DesktopFrDark, mobile: imgWf01MobileFrDark },
      { desktop: imgWf02DesktopFrDark, mobile: imgWf02MobileFrDark },
      { desktop: imgWf03DesktopFrDark, mobile: imgWf03MobileFrDark },
      { desktop: imgWf04DesktopFrDark, mobile: imgWf04MobileFrDark },
      { desktop: imgWf05DesktopFrDark, mobile: imgWf05MobileFrDark },
      { desktop: imgWf06DesktopFrDark, mobile: imgWf06MobileFrDark },
      { desktop: imgWf07DesktopFrDark, mobile: imgWf07MobileFrDark },
      { desktop: imgWf08DesktopFrDark, mobile: imgWf08MobileFrDark },
      { desktop: imgWf09DesktopFrDark, mobile: imgWf09MobileFrDark },
    ],
  },
};

function WireframesCarousel({ lang, isDark }) {
  const slides = (WIREFRAMES_SLIDES[lang] ?? WIREFRAMES_SLIDES.en)[isDark ? 'dark' : 'light'];
  const titles = VIEW_SLIDE_TITLES[lang] ?? VIEW_SLIDE_TITLES.en;
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);

  const scrollToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index];
    if (slide) {
      const slideLeft = slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      track.scrollTo({ left: slideLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    setActiveIndex(index);
    isProgrammaticRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { isProgrammaticRef.current = false; }, 400);
  };

  const handleScroll = () => {
    if (isProgrammaticRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children);
    const containerRect = track.getBoundingClientRect();
    let closest = 0, minDist = Infinity;
    items.forEach((item, i) => {
      const itemLeft = item.getBoundingClientRect().left - containerRect.left + track.scrollLeft;
      const dist = Math.abs(itemLeft - track.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  return (
    <div
      role="region"
      aria-label={lang === 'fr' ? 'Carrousel des maquettes filaires' : 'Wireframes carousel'}
      aria-roledescription="carousel"
      className="flex flex-col gap-3 sm:gap-4"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {lang === 'fr' ? `Diapositive ${activeIndex + 1} sur ${slides.length}` : `Slide ${activeIndex + 1} of ${slides.length}`}
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label={lang === 'fr' ? `Carrousel des maquettes filaires — utilisez les flèches pour naviguer, Entrée pour agrandir` : `Wireframes carousel — use arrow keys to navigate, Enter to expand`}
        onScroll={handleScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToSlide(Math.max(0, activeIndex - 1)); }
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollToSlide(Math.min(slides.length - 1, activeIndex + 1)); }
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(activeIndex); }
        }}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory touch-pan-x touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
        style={{ scrollbarWidth: 'none' }}
      >
        {slides.map((slide, i) => (
          <button key={i} tabIndex={-1} onClick={() => setLightboxIndex(i)} aria-label={lang === 'fr' ? `Agrandir : Maquette filaire ${i + 1}` : `Expand: wireframe ${i + 1}`} className="w-full shrink-0 snap-start cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
            <picture>
              <source media="(min-width: 640px)" srcSet={slide.desktop} />
              <img src={slide.mobile} alt={lang === 'fr' ? `Maquette filaire, diapositive ${i + 1} sur ${slides.length}` : `Wireframe mock-up, slide ${i + 1} of ${slides.length}`} draggable="false" loading="lazy" className="w-full h-auto" />
            </picture>
          </button>
        ))}
      </div>
      {lightboxIndex !== null && <Lightbox slides={slides} initialIndex={lightboxIndex} lang={lang} onClose={() => setLightboxIndex(null)} />}

      <div className="flex flex-col gap-2">
        <div className="sm:hidden">
          <span className="inline-block text-[15px] font-semibold leading-none px-3 py-1.5 rounded-md whitespace-nowrap" style={{ backgroundColor: VIEW_SLIDE_COLORS[activeIndex][isDark ? 'bgDark' : 'bg'], color: VIEW_SLIDE_COLORS[activeIndex][isDark ? 'colorDark' : 'color'] }}>
            {titles[activeIndex]}
          </span>
        </div>
        <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto_1fr] items-center">
          <div className="hidden sm:block">
            <span className="inline-block text-[15px] sm:text-[16px] font-semibold leading-none px-3 py-1.5 rounded-md whitespace-nowrap" style={{ backgroundColor: VIEW_SLIDE_COLORS[activeIndex][isDark ? 'bgDark' : 'bg'], color: VIEW_SLIDE_COLORS[activeIndex][isDark ? 'colorDark' : 'color'] }}>
              {titles[activeIndex]}
            </span>
          </div>
          <div className="flex items-center">
            {slides.map((_, i) => { const win = Math.min(5, slides.length); const start = Math.min(Math.max(0, activeIndex - 2), slides.length - win); const inWindow = i >= start && i < start + win; const isEdge = inWindow && ((i === start && start > 0) || (i === start + win - 1 && start + win < slides.length)); return (
              <button key={i} tabIndex={inWindow ? 0 : -1} onClick={() => scrollToSlide(i)} aria-label={lang === 'fr' ? `Aller à la diapositive ${i + 1}` : `Go to slide ${i + 1}`} aria-current={i === activeIndex ? 'true' : undefined} className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6] rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}>
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-[#1f1f1f] dark:bg-[#f6f6f6]' : isEdge ? 'w-1.5 h-1.5 bg-[#1f1f1f]/25 dark:bg-[#f6f6f6]/25' : 'w-2 h-2 bg-[#1f1f1f]/40 dark:bg-[#f6f6f6]/40 group-hover:bg-[#1f1f1f]/60 dark:group-hover:bg-[#f6f6f6]/60'}`} />
              </button>
            ); })}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
            <button data-spring onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label={lang === 'fr' ? 'Diapositive précédente' : 'Previous slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter] forced-colors:brightness-[unset]" />
            </button>
            <button data-spring onClick={() => scrollToSlide(Math.min(slides.length - 1, activeIndex + 1))} disabled={activeIndex === slides.length - 1} aria-label={lang === 'fr' ? 'Diapositive suivante' : 'Next slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <img src={imgChevronRight} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter] forced-colors:brightness-[unset] forced-colors:invert-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Hifi carousel ─────────────────────────────────────────────────────────────
const HIFI_SLIDES = {
  en: {
    light: [
      { desktop: imgHifi01DesktopEnLight, tablet: imgHifi01TabletEnLight, mobile: imgHifi01MobileEnLight },
      { desktop: imgHifi02DesktopEnLight, tablet: imgHifi02TabletEnLight, mobile: imgHifi02MobileEnLight },
      { desktop: imgHifi03DesktopEnLight, tablet: imgHifi03TabletEnLight, mobile: imgHifi03MobileEnLight },
      { desktop: imgHifi04DesktopEnLight, tablet: imgHifi04TabletEnLight, mobile: imgHifi04MobileEnLight },
      { desktop: imgHifi05DesktopEnLight, tablet: imgHifi05TabletEnLight, mobile: imgHifi05MobileEnLight },
      { desktop: imgHifi06DesktopEnLight, tablet: imgHifi06TabletEnLight, mobile: imgHifi06MobileEnLight },
      { desktop: imgHifi07DesktopEnLight, tablet: imgHifi07TabletEnLight, mobile: imgHifi07MobileEnLight },
      { desktop: imgHifi08DesktopEnLight, tablet: imgHifi08TabletEnLight, mobile: imgHifi08MobileEnLight },
      { desktop: imgHifi09DesktopEnLight, tablet: imgHifi09TabletEnLight, mobile: imgHifi09MobileEnLight },
    ],
    dark: [
      { desktop: imgHifi01DesktopEnDark, tablet: imgHifi01TabletEnDark, mobile: imgHifi01MobileEnDark },
      { desktop: imgHifi02DesktopEnDark, tablet: imgHifi02TabletEnDark, mobile: imgHifi02MobileEnDark },
      { desktop: imgHifi03DesktopEnDark, tablet: imgHifi03TabletEnDark, mobile: imgHifi03MobileEnDark },
      { desktop: imgHifi04DesktopEnDark, tablet: imgHifi04TabletEnDark, mobile: imgHifi04MobileEnDark },
      { desktop: imgHifi05DesktopEnDark, tablet: imgHifi05TabletEnDark, mobile: imgHifi05MobileEnDark },
      { desktop: imgHifi06DesktopEnDark, tablet: imgHifi06TabletEnDark, mobile: imgHifi06MobileEnDark },
      { desktop: imgHifi07DesktopEnDark, tablet: imgHifi07TabletEnDark, mobile: imgHifi07MobileEnDark },
      { desktop: imgHifi08DesktopEnDark, tablet: imgHifi08TabletEnDark, mobile: imgHifi08MobileEnDark },
      { desktop: imgHifi09DesktopEnDark, tablet: imgHifi09TabletEnDark, mobile: imgHifi09MobileEnDark },
    ],
  },
  fr: {
    light: [
      { desktop: imgHifi01DesktopFrLight, tablet: imgHifi01TabletFrLight, mobile: imgHifi01MobileFrLight },
      { desktop: imgHifi02DesktopFrLight, tablet: imgHifi02TabletFrLight, mobile: imgHifi02MobileFrLight },
      { desktop: imgHifi03DesktopFrLight, tablet: imgHifi03TabletFrLight, mobile: imgHifi03MobileFrLight },
      { desktop: imgHifi04DesktopFrLight, tablet: imgHifi04TabletFrLight, mobile: imgHifi04MobileFrLight },
      { desktop: imgHifi05DesktopFrLight, tablet: imgHifi05TabletFrLight, mobile: imgHifi05MobileFrLight },
      { desktop: imgHifi06DesktopFrLight, tablet: imgHifi06TabletFrLight, mobile: imgHifi06MobileFrLight },
      { desktop: imgHifi07DesktopFrLight, tablet: imgHifi07TabletFrLight, mobile: imgHifi07MobileFrLight },
      { desktop: imgHifi08DesktopFrLight, tablet: imgHifi08TabletFrLight, mobile: imgHifi08MobileFrLight },
      { desktop: imgHifi09DesktopFrLight, tablet: imgHifi09TabletFrLight, mobile: imgHifi09MobileFrLight },
    ],
    dark: [
      { desktop: imgHifi01DesktopFrDark, tablet: imgHifi01TabletFrDark, mobile: imgHifi01MobileFrDark },
      { desktop: imgHifi02DesktopFrDark, tablet: imgHifi02TabletFrDark, mobile: imgHifi02MobileFrDark },
      { desktop: imgHifi03DesktopFrDark, tablet: imgHifi03TabletFrDark, mobile: imgHifi03MobileFrDark },
      { desktop: imgHifi04DesktopFrDark, tablet: imgHifi04TabletFrDark, mobile: imgHifi04MobileFrDark },
      { desktop: imgHifi05DesktopFrDark, tablet: imgHifi05TabletFrDark, mobile: imgHifi05MobileFrDark },
      { desktop: imgHifi06DesktopFrDark, tablet: imgHifi06TabletFrDark, mobile: imgHifi06MobileFrDark },
      { desktop: imgHifi07DesktopFrDark, tablet: imgHifi07TabletFrDark, mobile: imgHifi07MobileFrDark },
      { desktop: imgHifi08DesktopFrDark, tablet: imgHifi08TabletFrDark, mobile: imgHifi08MobileFrDark },
      { desktop: imgHifi09DesktopFrDark, tablet: imgHifi09TabletFrDark, mobile: imgHifi09MobileFrDark },
    ],
  },
};

function HifiCarousel({ lang, isDark }) {
  const slides = (HIFI_SLIDES[lang] ?? HIFI_SLIDES.en)[isDark ? 'dark' : 'light'];
  const titles = VIEW_SLIDE_TITLES[lang] ?? VIEW_SLIDE_TITLES.en;
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);

  const scrollToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index];
    if (slide) {
      const slideLeft = slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      track.scrollTo({ left: slideLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    setActiveIndex(index);
    isProgrammaticRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { isProgrammaticRef.current = false; }, 400);
  };

  const handleScroll = () => {
    if (isProgrammaticRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children);
    const containerRect = track.getBoundingClientRect();
    let closest = 0, minDist = Infinity;
    items.forEach((item, i) => {
      const itemLeft = item.getBoundingClientRect().left - containerRect.left + track.scrollLeft;
      const dist = Math.abs(itemLeft - track.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  return (
    <div
      role="region"
      aria-label={lang === 'fr' ? 'Carrousel des maquettes haute-fidélité' : 'High-fidelity mock-ups carousel'}
      aria-roledescription="carousel"
      className="flex flex-col gap-3 sm:gap-4"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {lang === 'fr' ? `Diapositive ${activeIndex + 1} sur ${slides.length}` : `Slide ${activeIndex + 1} of ${slides.length}`}
      </div>

      <div style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
        <div
          ref={trackRef}
          role="region"
          onScroll={handleScroll}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToSlide(Math.max(0, activeIndex - 1)); }
            if (e.key === 'ArrowRight') { e.preventDefault(); scrollToSlide(Math.min(slides.length - 1, activeIndex + 1)); }
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(activeIndex); }
          }}
          aria-label={lang === 'fr' ? `Carrousel des maquettes haute-fidélité — utilisez les flèches pour naviguer, Entrée pour agrandir` : `High-fidelity mock-ups carousel — use arrow keys to navigate, Enter to expand`}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory rounded-xl sm:rounded-2xl lg:rounded-3xl touch-pan-x touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
          style={{ scrollbarWidth: 'none' }}
        >
          {slides.map((slide, i) => (
            <button key={i} tabIndex={-1} onClick={() => setLightboxIndex(i)} aria-label={lang === 'fr' ? `Agrandir : Maquette haute-fidélité ${i + 1}` : `Expand: high-fidelity mock-up ${i + 1}`} className="w-full shrink-0 snap-start cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <picture>
                <source media="(min-width: 1024px)" srcSet={slide.desktop} />
                <source media="(min-width: 640px)" srcSet={slide.tablet} />
                <img src={slide.mobile} alt={lang === 'fr' ? `Maquette haute-fidélité, diapositive ${i + 1} sur ${slides.length}` : `High-fidelity mock-up, slide ${i + 1} of ${slides.length}`} draggable="false" loading="lazy" className="w-full h-auto" />
              </picture>
            </button>
          ))}
        </div>
      </div>
      {lightboxIndex !== null && <Lightbox slides={slides} initialIndex={lightboxIndex} lang={lang} onClose={() => setLightboxIndex(null)} />}

      <div className="flex flex-col gap-2">
        <div className="sm:hidden">
          <span className="inline-block text-[15px] font-semibold leading-none px-3 py-1.5 rounded-md whitespace-nowrap" style={{ backgroundColor: VIEW_SLIDE_COLORS[activeIndex][isDark ? 'bgDark' : 'bg'], color: VIEW_SLIDE_COLORS[activeIndex][isDark ? 'colorDark' : 'color'] }}>
            {titles[activeIndex]}
          </span>
        </div>
        <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto_1fr] items-center">
          <div className="hidden sm:block">
            <span className="inline-block text-[15px] sm:text-[16px] font-semibold leading-none px-3 py-1.5 rounded-md whitespace-nowrap" style={{ backgroundColor: VIEW_SLIDE_COLORS[activeIndex][isDark ? 'bgDark' : 'bg'], color: VIEW_SLIDE_COLORS[activeIndex][isDark ? 'colorDark' : 'color'] }}>
              {titles[activeIndex]}
            </span>
          </div>
          <div className="flex items-center">
            {slides.map((_, i) => { const win = Math.min(5, slides.length); const start = Math.min(Math.max(0, activeIndex - 2), slides.length - win); const inWindow = i >= start && i < start + win; const isEdge = inWindow && ((i === start && start > 0) || (i === start + win - 1 && start + win < slides.length)); return (
              <button key={i} tabIndex={inWindow ? 0 : -1} onClick={() => scrollToSlide(i)} aria-label={lang === 'fr' ? `Aller à la diapositive ${i + 1}` : `Go to slide ${i + 1}`} aria-current={i === activeIndex ? 'true' : undefined} className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6] rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}>
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-[#1f1f1f] dark:bg-[#f6f6f6]' : isEdge ? 'w-1.5 h-1.5 bg-[#1f1f1f]/25 dark:bg-[#f6f6f6]/25' : 'w-2 h-2 bg-[#1f1f1f]/40 dark:bg-[#f6f6f6]/40 group-hover:bg-[#1f1f1f]/60 dark:group-hover:bg-[#f6f6f6]/60'}`} />
              </button>
            ); })}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
            <button data-spring onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label={lang === 'fr' ? 'Diapositive précédente' : 'Previous slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter] forced-colors:brightness-[unset]" />
            </button>
            <button data-spring onClick={() => scrollToSlide(Math.min(slides.length - 1, activeIndex + 1))} disabled={activeIndex === slides.length - 1} aria-label={lang === 'fr' ? 'Diapositive suivante' : 'Next slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <img src={imgChevronRight} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter] forced-colors:brightness-[unset] forced-colors:invert-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Design section content ────────────────────────────────────────────────────
const DESIGN = {
  en: {
    userFlow: { eyebrow: "User flow", body: <>The platform was designed to allow users to <strong>explore client projects worldwide</strong>, progressing seamlessly from <strong>macro to micro views</strong>. This hierarchical structure supported <strong>scalability</strong> and an <strong>intuitive browsing experience</strong>.</>, footer: <>💡 <strong>Design Principle:</strong> Layered, <strong>progressive flow</strong> lets users explore at their own pace while supporting future <strong>global expansion</strong>.</> },
    concepts: {
      eyebrow: "Concepts",
      subsections: [
        { h4: "Back layer: computer generated images (CGI)", body: <>In collaboration with the 3D studio team, we ideated how each view could incorporate <strong>dynamic CGI elements</strong> to enhance immersion, such as <strong>lighting changes</strong> and <strong>day/night cycles</strong>. This approach allowed us to simulate <strong>real-world environments</strong>, offering users an <strong>engaging experience</strong> of unbuilt spaces.</>, after: "conceptsCarousel" },
        { h4: "Front layer: user interface", topSpacing: true, body: <>In an initial <strong>brainstorming session</strong> with the design team, we defined the <strong>key features</strong> for each of the <strong>9 sequential views</strong>. Each view progressively introduced new capabilities, allowing users to navigate from a <strong>global overview</strong> to <strong>detailed interior spaces</strong>.</>, after: "grid9" },
        { h3: "Wireframes", body: <>For this project, <strong>wireframing was an essential part</strong> of the design process allowing <strong>better coordination</strong> between internal teams (design, studio and dev), as well as with external stakeholders.</>, after: "wireframesCarousel", topSpacing: true },
        { h3: "High-fidelity mock-ups", topSpacing: true, body: <>By building a comprehensive <strong>design system</strong>, we streamlined the creation and testing of <strong>high-fidelity mockups and prototypes</strong>, ensuring <strong>consistency</strong> and <strong>efficient iteration</strong> across the product.</>, after: "hifiCarousel" },
      ],
    },
  },
  fr: {
    userFlow: { eyebrow: "Flux utilisateur", body: <>La plateforme a été conçue pour permettre aux utilisateurs d’<strong>explorer les projets clients à travers le monde</strong>, en progressant de manière fluide des <strong>vues macro aux vues micro</strong>. Cette structure hiérarchique favorise l’<strong>évolutivité</strong> et une <strong>expérience de navigation intuitive</strong>.</>, footer: <>💡 <strong>Principe de design :</strong> Un <strong>flux progressif</strong> en couches permet aux utilisateurs d’explorer à leur propre rythme tout en soutenant une future <strong>expansion mondiale</strong>.</> },
    concepts: {
      eyebrow: "Conceptualisation",
      subsections: [
        { h4: "Arrière-plan : images de synthèse", body: <>En collaboration avec l'équipe 3D, nous avons réfléchi à la manière dont chaque vue pourrait intégrer des <strong>éléments CGI dynamiques</strong> pour renforcer l'immersion, tels que des <strong>changements d'éclairage</strong> et des <strong>cycles jour/nuit</strong>. Cette approche nous a permis de simuler des <strong>environnements réels</strong>, offrant aux utilisateurs une <strong>expérience engageante</strong> d'espaces non construits.</>, after: "conceptsCarousel" },
        { h4: "Premier-plan : interface utilisateur", topSpacing: true, body: <>Lors d'une première <strong>séance de brainstorming</strong> avec l'équipe design, nous avons défini les <strong>fonctionnalités clés</strong> pour chacune des <strong>9 vues séquentielles</strong>. Chaque vue introduisait progressivement de nouvelles capacités, permettant aux utilisateurs de naviguer d'une <strong>vue d'ensemble globale</strong> jusqu'aux <strong>espaces intérieurs détaillés</strong>.</>, after: "grid9" },
        { h3: "Maquettes filaires", body: <>Pour ce projet, la création de maquettes était un <strong>élément essentiel du processus de conception</strong>, permettant une <strong>meilleure coordination</strong> entre les équipes internes (design, studio and dev), ainsi qu'avec les parties prenantes externes.</>, after: "wireframesCarousel", topSpacing: true },
        { h3: "Maquettes haute-fidélité", topSpacing: true, body: <>En développant un <strong>design system</strong> complet, nous avons rationalisé la création et les tests de <strong>maquettes et prototypes haute-fidélité</strong>, garantissant la <strong>cohérence</strong> et une <strong>itération efficace</strong> sur l'ensemble du produit.</>, after: "hifiCarousel" },
      ],
    },
  },
};

function UiConceptCard({ card, isDark }) {
  const titleBg    = isDark ? card.titleBgDark    : card.titleBg;
  const titleColor = isDark ? card.titleColorDark : card.titleColor;
  return (
    <div className="rounded-xl sm:rounded-2xl overflow-hidden">
      <div className="aspect-[8/5] overflow-hidden">
        {card.img
          ? <img src={card.img} alt={card.title} draggable="false" loading="lazy" className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-[#e0e0e0] dark:bg-[#2a2a2a]" />
        }
      </div>
      <div className="flex flex-col gap-1.5 px-3 py-2.5" style={{ backgroundColor: titleBg }}>
        <h5 className="font-bold text-[13px] sm:text-[14px] lg:text-[15px] leading-snug" style={{ color: titleColor }}>
          {card.title}
        </h5>
        <ul className="flex flex-col gap-0.5 text-[12px] sm:text-[13px] leading-snug list-disc list-inside" style={{ color: titleColor }}>
          {card.bullets.filter(Boolean).map((b, k) => <li key={k}>{b}</li>)}
        </ul>
      </div>
    </div>
  );
}

function DesignContent({ lang, isDark }) {
  const d = DESIGN[lang] ?? DESIGN.en;
  const uf = isDark
    ? (lang === 'fr' ? { desktop: imgUserflowDesktopDarkFr, tablet: imgUserflowTabletDarkFr, mobile: imgUserflowMobileDarkFr }
                     : { desktop: imgUserflowDesktopDarkEn, tablet: imgUserflowTabletDarkEn, mobile: imgUserflowMobileDarkEn })
    : (lang === 'fr' ? { desktop: imgUserflowDesktopLightFr, tablet: imgUserflowTabletLightFr, mobile: imgUserflowMobileLightFr }
                     : { desktop: imgUserflowDesktopLightEn, tablet: imgUserflowTabletLightEn, mobile: imgUserflowMobileLightEn });
  return (
    <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
      <Tile bgClass="bg-[#f6f6f6] dark:bg-[#1f1f1f]">
        <TileEyebrow>{d.userFlow.eyebrow}</TileEyebrow>
        <p className={tileBodyText}>{d.userFlow.body}</p>
        <div className="mt-6 sm:mt-8">
          <picture>
            <source media="(min-width: 1024px)" srcSet={uf.desktop} />
            <source media="(min-width: 640px)"  srcSet={uf.tablet} />
            <img src={uf.mobile} alt={d.userFlow.eyebrow} className="w-full h-auto rounded-lg" />
          </picture>
        </div>
        <div className="mt-6 sm:mt-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] px-4 py-3 text-[14px] sm:text-[15px] leading-relaxed text-[#5c5c5c] dark:text-[#adadad]">{d.userFlow.footer}</div>
      </Tile>

      <Tile>
        <TileEyebrow>{d.concepts.eyebrow}</TileEyebrow>
        {d.concepts.subsections.map((s, i) => (
          <div key={i} className={`flex flex-col gap-4 sm:gap-5 lg:gap-6 ${s.topSpacing ? 'pt-16 sm:pt-20 lg:pt-24' : 'pt-2'}`}>
            {s.h3 ? <TileEyebrow>{s.h3}</TileEyebrow> : <TileH4>{s.h4}</TileH4>}
            <TileBody>{s.body}</TileBody>
            {s.after === "conceptsCarousel" && <div className="mt-4 sm:mt-6 lg:mt-8"><ConceptsCarousel lang={lang} isDark={isDark} /></div>}
            {s.after === "wireframesCarousel" && <div className="mt-6 sm:mt-8 lg:mt-10"><WireframesCarousel lang={lang} isDark={isDark} /></div>}
            {s.after === "hifiCarousel" && <HifiCarousel lang={lang} isDark={isDark} />}
            {s.after === "grid9" && (
              <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {(UI_CONCEPTS[lang] ?? UI_CONCEPTS.en).map((card, j) => (
                  <UiConceptCard key={j} card={card} isDark={isDark} />
                ))}
              </div>
            )}
          </div>
        ))}
      </Tile>

    </div>
  );
}

// ── Emphasise section content ─────────────────────────────────────────────────
const EMPHASISE = {
  en: {
    audience: {
      eyebrow: 'The audience',
      title:   'Who is the platform for?',
      body: <><p>The platform served <strong>two primary audiences</strong>:</p><ul className="list-disc list-inside space-y-1"><li><strong>Sales agents:</strong> Required a <strong>logged-in experience</strong> with availability features during launches.</li><li><strong>Buyers:</strong> Needed an <strong>intuitive, engaging</strong> way to explore properties and <strong>request a callback</strong> from agents quickly.</li></ul></>,
    },
    goal: {
      eyebrow: 'The goal',
      title:   'What value will the platform provide to users?',
      body:    <><p>Create a platform that delivered value to both user groups by:</p><ul className="list-disc list-inside space-y-1"><li>Supporting sales agents in <strong>high-pressure launch events</strong>.</li><li>Enabling buyers to <strong>explore projects worldwide</strong>, progressively drilling down from <strong>global to interior views</strong>.</li><li>Maintaining a <strong>luxury, user-friendly experience</strong> that aligned with the client's brand.</li></ul></>,
    },
    market: {
      eyebrow: 'The market',
      body:    <><p>Competitor analysis revealed that existing platforms were <strong>visually appealing</strong> but lacked <strong>interactive, immersive experiences</strong> for unbuilt properties.</p><p><strong>Vision:</strong> Create a <strong>3D-first</strong>, <strong>user-centric experience</strong>, with smooth navigation from <strong>global overviews</strong> to <strong>detailed interiors</strong>.</p><p><strong>Key Design Prerequisites:</strong></p><ul className="list-disc list-inside space-y-1"><li><strong>Scalability:</strong> Users could navigate from a <strong>macro, global view</strong> down to <strong>micro, interior-level</strong> detail.</li><li><strong>Immersive 3D visuals:</strong> Computer-generated imagery enhanced both <strong>navigation clarity</strong> and <strong>emotional engagement</strong> with the properties.</li></ul></>,
    },
  },
  fr: {
    audience: {
      eyebrow: "L'audience",
      title:   'À qui s’adresse la plateforme ?',
      body:    <><p>La plateforme s’adressait à <strong>deux audiences principales</strong> :</p><ul className="list-disc list-inside space-y-1"><li><strong>Agents commerciaux :</strong> Nécessitaient une <strong>expérience connectée</strong> avec les disponibilités lors des lancements.</li><li><strong>Acheteurs :</strong> Avaient besoin d’une façon <strong>intuitive et engageante</strong> d’explorer les biens et de <strong>demander à être rappelés</strong> rapidement.</li></ul></>,
    },
    goal: {
      eyebrow: "L'objectif",
      title:   'Quelle valeur pour les utilisateurs ?',
      body: <><p>Créer une plateforme apportant de la valeur aux deux groupes d’utilisateurs en :</p><ul className="list-disc list-inside space-y-1"><li>Accompagnant les agents commerciaux lors des <strong>lancements sous haute pression</strong>.</li><li>Permettant aux acheteurs d’<strong>explorer des projets dans le monde entier</strong>, en progressant de la <strong>vue globale aux vues intérieures</strong>.</li><li>Offrant une <strong>expérience luxueuse et intuitive</strong> alignée avec la marque du client.</li></ul></>,
    },
    market: {
      eyebrow: 'Le marché',
      body:    <><p>L’analyse concurrentielle a révélé que les plateformes existantes étaient <strong>visuellement attrayantes</strong> mais manquaient d’<strong>expériences interactives et immersives</strong> pour les biens non construits.</p><p><strong>Vision :</strong> Créer une <strong>expérience 3D-first</strong> et <strong>centrée utilisateur</strong>, avec une navigation fluide des <strong>vues globales</strong> jusqu’aux <strong>intérieurs détaillés</strong>.</p><p><strong>Prérequis de design clés :</strong></p><ul className="list-disc list-inside space-y-1"><li><strong>Évolutivité :</strong> Navigation possible d’une <strong>vue macro et globale</strong> jusqu’aux <strong>détails micro et intérieurs</strong>.</li><li><strong>Visuels 3D immersifs :</strong> L’imagerie de synthèse a renforcé à la fois la <strong>clarté de navigation</strong> et l’<strong>engagement émotionnel</strong> envers les biens.</li></ul></>,
    },
  },
};

function EmphasiseContent({ lang }) {
  const d = EMPHASISE[lang] ?? EMPHASISE.en;
  return (
    <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
      <Tile>
        <TileEyebrow>{d.audience.eyebrow}</TileEyebrow>
        <TileTitle>{d.audience.title}</TileTitle>
        <TileBody>{d.audience.body}</TileBody>
      </Tile>
      <Tile>
        <TileEyebrow>{d.goal.eyebrow}</TileEyebrow>
        <TileTitle>{d.goal.title}</TileTitle>
        <TileBody>{d.goal.body}</TileBody>
      </Tile>
      <Tile fullWidth>
        <TileEyebrow>{d.market.eyebrow}</TileEyebrow>
        <TileBody>{d.market.body}</TileBody>
      </Tile>
    </div>
  );
}

// ── Collapsible section ───────────────────────────────────────────────────────
// ── Scroll utility ────────────────────────────────────────────────────────────
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  el.focus({ preventScroll: true });
};

// ── Desktop secondary nav ─────────────────────────────────────────────────────
function SecondaryNav({ sections, activeId, onNavigate }) {
  return (
    <nav aria-label="Page sections">
      <ol className="grid gap-2" style={{ gridTemplateColumns: 'max-content' }}>
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => onNavigate(s.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative text-[13px] leading-snug py-1.5 px-2 rounded-lg text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] ${
                  isActive
                    ? 'text-[#1f1f1f] dark:text-[#f6f6f6] font-semibold bg-black/[0.04] dark:bg-white/[0.06]'
                    : 'text-[#5c5c5c] dark:text-[#adadad] font-normal hover:text-[#1f1f1f] dark:hover:text-[#f6f6f6] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                }`}
              >
                <span aria-hidden="true" className="font-semibold invisible block select-none whitespace-nowrap">{s.title}</span>
                <span className="absolute inset-0 py-1.5 px-2 whitespace-nowrap">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ── Mobile secondary nav ──────────────────────────────────────────────────────
function MobileSecondaryNav({ sections, activeId, onNavigate }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current || !activeId) return;
    const btn = trackRef.current.querySelector(`[data-section="${activeId}"]`);
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  return (
    <nav aria-label="Page sections" className="w-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] rounded-3xl shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)] dark:ring-1 dark:ring-white/[0.16] p-[10px]">
      <div className="overflow-hidden rounded-[16px]">
        <ul ref={trackRef} className="w-full flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <button
                  data-section={s.id}
                  onClick={() => onNavigate(s.id)}
                  aria-label={s.title}
                  aria-current={isActive ? 'location' : undefined}
                  className={`h-8 px-3 rounded-2xl text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] ${
                    isActive
                      ? 'bg-[#161616] dark:bg-white text-white dark:text-[#161616]'
                      : 'text-[#5c5c5c] dark:text-[#adadad]'
                  }`}
                >
                  {s.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// ── Accordion section ─────────────────────────────────────────────────────────
function Section({ id, title, lang, children, headerBgClass = '', openHeaderBgClass, openHeaderDark = false, contentBgClass = 'bg-[#f6f6f6] dark:bg-[#1f1f1f]', contentInnerBgClass }) {
  const [open, setOpen] = useState(true);
  const [hidden, setHidden] = useState(false);
  const darkHeader = open && openHeaderDark;
  const btnRef = useRef(null);
  const contentRef = useRef(null);
  const gridRef = useRef(null);
  const headingId = `${id}-heading`;

  const handleToggle = () => {
    if (open) {
      // Collapsing — focus management first
      if (contentRef.current?.contains(document.activeElement)) {
        btnRef.current?.focus();
      }
      setOpen(false);
      // After animation ends, set display:none to guarantee zero layout contribution
      const el = gridRef.current;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setHidden(true);
      } else {
        const onEnd = (e) => {
          if (e.propertyName !== 'grid-template-rows') return;
          el?.removeEventListener('transitionend', onEnd);
          setHidden(true);
        };
        el?.addEventListener('transitionend', onEnd);
      }
    } else {
      // Expanding — remove display:none first, then animate in next frame
      setHidden(false);
      requestAnimationFrame(() => setOpen(true));
    }
  };

  return (
    <section id={id} aria-labelledby={headingId} className="overflow-hidden">

      {/* Header row, fully clickable */}
      <div className={open && openHeaderBgClass ? openHeaderBgClass : headerBgClass}>
      <button
        ref={btnRef}
        onClick={handleToggle}
        aria-label={open
          ? (lang === 'fr' ? `Réduire ${title}` : `Collapse ${title}`)
          : (lang === 'fr' ? `Développer ${title}` : `Expand ${title}`)
        }
        aria-expanded={open}
        aria-controls={`${id}-content`}
        className="w-full max-w-5xl mx-auto px-6 py-6 sm:py-7 lg:py-8 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
      >
        <h2 id={headingId} className={`text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-tight ${darkHeader ? 'text-white' : 'text-[#1f1f1f] dark:text-[#f6f6f6]'}`}>
          {title}
        </h2>
        <div className={`group shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors ${darkHeader ? 'hover:bg-white/20' : 'hover:bg-[#1f1f1f] dark:hover:bg-[#f6f6f6]'}`}>
          <img
            src={imgChevronUp}
            alt=""
            className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-[filter,transform] duration-300 forced-colors:brightness-[unset] forced-colors:invert-0 ${open ? '' : 'rotate-180'} ${darkHeader ? 'brightness-0 invert' : 'brightness-0 dark:invert group-hover:invert dark:group-hover:brightness-0 dark:group-hover:invert-0'}`}
          />
        </div>
      </button>
      </div>

      <div
        ref={gridRef}
        id={`${id}-content`}
        style={hidden ? { display: 'none' } : undefined}
        className={`grid overflow-hidden [overflow-anchor:none] motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} ${contentBgClass}`}
        inert={!open}
      >
        <div ref={contentRef} className="overflow-hidden min-h-0">
          <div className={contentInnerBgClass ?? contentBgClass}>
            <div className="max-w-5xl mx-auto px-6 py-8 sm:py-10 lg:py-12">
              {children ?? (
                <p className="text-[#5c5c5c] dark:text-[#adadad] text-[16px] sm:text-[17px] lg:text-[18px]">Content coming soon.</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const SECTIONS = {
  en: [
    { id: 'context',   title: 'Context' },
    { id: 'emphasise', title: 'Emphasise' },
    { id: 'define',    title: 'Define' },
    { id: 'design',    title: 'Design' },
    { id: 'impact',    title: 'Impact' },
  ],
  fr: [
    { id: 'context',   title: 'Contexte' },
    { id: 'emphasise', title: 'Comprendre' },
    { id: 'define',    title: 'Définir' },
    { id: 'design',    title: 'Concevoir' },
    { id: 'impact',    title: 'Impact' },
  ],
};

function SalesPlatform({ lang, isDark }) {
  const sections = SECTIONS[lang] ?? SECTIONS.en;
  const [activeId, setActiveId]         = useState('');
  const [scrolledDown, setScrolledDown] = useState(false);
  const [atBottom, setAtBottom]         = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const scrollTarget = useRef(null);

  const handleNavigate = (id) => {
    setActiveId(id);
    scrollTarget.current = id;
    scrollToSection(id);
    setTimeout(() => { scrollTarget.current = null; }, 2000);
  };

  useEffect(() => {
    document.title = lang === 'fr' ? 'Web App • Atelier Digital' : 'Web App • Atelier Digital';
    trackEvent('case_study_view', { study: 'sales_platform' });
  }, [lang]);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers = sections.map(s => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          if (scrollTarget.current) {
            if (s.id === scrollTarget.current) { scrollTarget.current = null; setActiveId(s.id); }
          } else {
            setActiveId(s.id);
          }
        },
        { rootMargin: '-10% 0px -70% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [lang]);

  // Show/hide navs based on scroll position
  useEffect(() => {
    const firstEl = document.getElementById(sections[0].id);
    const lastEl  = document.getElementById(sections[sections.length - 1].id);
    if (!firstEl || !lastEl) return;
    const update = () => {
      setScrolledDown(firstEl.getBoundingClientRect().top < 150);
      setAtBottom(lastEl.getBoundingClientRect().bottom < 200);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [lang]);

  // Mobile only: track scroll direction
  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrollingDown(y > lastY);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1f1f1f] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        {lang === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>

      <Hero lang={lang} />

      <main id="main-content" lang={lang} aria-label={lang === 'fr' ? 'Étude de cas, Plateforme web' : 'Sales Platform case study'} tabIndex={-1}>
        {sections.map(({ id, title }) => (
          <Section
            key={id} id={id} title={title} lang={lang}
            headerBgClass={
              id === 'context'   ? 'bg-[#f6f6f6] dark:bg-[#1f1f1f]' :
              id === 'emphasise' ? 'bg-[#f6f6f6] dark:bg-[#1f1f1f]' :
              id === 'define'    ? 'bg-gradient-to-b from-[#f6f6f6] to-white dark:from-[#1f1f1f] dark:to-[#141414]' : ''
            }
            openHeaderBgClass={id === 'impact' ? 'bg-gradient-to-b from-white to-[#f6f6f6] dark:from-[#141414] dark:to-[#1f1f1f]' : undefined}
            contentBgClass={
              id === 'define' || id === 'design' ? 'bg-white dark:bg-[#141414]' :
              id === 'impact' ? 'bg-gradient-to-b from-[#f6f6f6] to-white dark:from-[#1f1f1f] dark:to-[#141414]' :
              'bg-[#f6f6f6] dark:bg-[#1f1f1f]'
            }
            contentInnerBgClass={id === 'impact' ? '' : undefined}
          >
            {id === 'context'   && <ContextContent lang={lang} isDark={isDark} />}
            {id === 'emphasise' && <EmphasiseContent lang={lang} />}
            {id === 'define'    && <DefineContent lang={lang} />}
            {id === 'design'    && <DesignContent lang={lang} isDark={isDark} />}
            {id === 'impact'    && <ImpactContent lang={lang} />}
          </Section>
        ))}

        {/* ── Tools row ── */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 pt-16 sm:pt-20 pb-16 sm:pb-20 flex justify-center">
          <ToolsGrid lang={lang} />
        </div>

        {/* ── Outro ── */}
        <div className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
            <Link
              data-spring
              to="/#case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0152EC] hover:bg-[#0142cc] text-white font-medium text-[15px] sm:text-[16px] rounded-full border border-[#5289f2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] focus-visible:ring-offset-2"
            >
              <img src={imgArrowRight} alt="" width={16} height={16} className="brightness-0 invert" style={{ transform: 'rotate(180deg)' }} />
              {lang === 'fr' ? 'Retour aux études de cas' : 'Back to case studies'}
            </Link>
          </div>
        </div>
      </main>

      {/* ── Desktop secondary nav — fixed, visible once scrolled past hero ── */}
      <div
        inert={scrolledDown && !atBottom ? undefined : true}
        className={`hidden xl:block fixed z-10 transition-opacity duration-300 ${scrolledDown && !atBottom ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ top: '80px', right: 'max(16px, calc(50% - 32rem - 10rem))' }}
      >
        <SecondaryNav sections={sections} activeId={activeId} onNavigate={handleNavigate} />
      </div>

      {/* ── Mobile floating nav ── */}
      <div
        inert={scrolledDown && !atBottom && !scrollingDown ? undefined : true}
        className={`md:hidden fixed bottom-2 left-[68px] right-4 z-40 flex justify-center pointer-events-none transition-opacity duration-300 ${scrolledDown && !atBottom && !scrollingDown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="pointer-events-auto w-full">
          <MobileSecondaryNav sections={sections} activeId={activeId} onNavigate={handleNavigate} />
        </div>
      </div>

      {/* ── Chat button backdrop circle ── */}
      <div
        aria-hidden="true"
        className={`md:hidden fixed z-[39] pointer-events-none transition-opacity duration-300 rounded-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)] dark:ring-1 dark:ring-white/[0.16] ${scrolledDown && !atBottom && !scrollingDown ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: 52, height: 52, left: 8, bottom: 8 }}
      />

      <Footer lang={lang} />
    </>
  );
}

export default SalesPlatform;
