import { useState, useRef, useEffect } from 'react';
import Footer from '../components/Footer';
import imgHero           from '../assets/photos/photo-cgi-sales-platform-hero.png';
import imgChevronUp      from '../assets/icons/icon-chevron-up.svg';
import imgChevronLeft    from '../assets/icons/icon-chevron-left.svg';
import imgChevronRight   from '../assets/icons/icon-chevron-right.svg';
import imgClientLogo     from '../assets/projects/sales-platform/logo-client.svg';
import imgToolFigma        from '../assets/logos/tools/logo-figma.png';
import imgToolIllustrator  from '../assets/logos/tools/logo-adobe-illustrator.png';
import imgToolPhotoshop    from '../assets/logos/tools/logo-adobe-photoshop.png';
import imgToolDaVinci      from '../assets/logos/tools/logo-davinci-resolve.png';
import imgToolConfluence   from '../assets/logos/tools/logo-atlassian-confluence.png';
import imgToolJira         from '../assets/logos/tools/logo-atlassian-jira.png';
import imgTool3dsMax       from '../assets/logos/tools/logo-autodesk-3dsmax.png';
import imgToolMiro         from '../assets/logos/tools/logo-miro.png';
import imgToolVSCode       from '../assets/logos/tools/logo-visual-studio-code.png';
import imgToolUnreal       from '../assets/logos/tools/logo-unreal-engine.svg';
import imgUserflowDesktopLightEn from '../assets/projects/sales-platform/userflow/desktop-light-en.png';
import imgUserflowTabletLightEn  from '../assets/projects/sales-platform/userflow/tablet-light-en.png';
import imgUserflowMobileLightEn  from '../assets/projects/sales-platform/userflow/mobile-light-en.png';
import imgUserflowDesktopDarkEn  from '../assets/projects/sales-platform/userflow/desktop-dark-en.png';
import imgUserflowTabletDarkEn   from '../assets/projects/sales-platform/userflow/tablet-dark-en.png';
import imgUserflowMobileDarkEn   from '../assets/projects/sales-platform/userflow/mobile-dark-en.png';
import imgUserflowDesktopLightFr from '../assets/projects/sales-platform/userflow/desktop-light-fr.png';
import imgUserflowTabletLightFr  from '../assets/projects/sales-platform/userflow/tablet-light-fr.png';
import imgUserflowMobileLightFr  from '../assets/projects/sales-platform/userflow/mobile-light-fr.png';
import imgUserflowDesktopDarkFr  from '../assets/projects/sales-platform/userflow/desktop-dark-fr.png';
import imgUserflowTabletDarkFr   from '../assets/projects/sales-platform/userflow/tablet-dark-fr.png';
import imgUserflowMobileDarkFr   from '../assets/projects/sales-platform/userflow/mobile-dark-fr.png';
import imgUiCard01 from '../assets/projects/sales-platform/ui-cards/card-01.png';
import imgUiCard02 from '../assets/projects/sales-platform/ui-cards/card-02.png';
import imgUiCard03 from '../assets/projects/sales-platform/ui-cards/card-03.png';
import imgUiCard04 from '../assets/projects/sales-platform/ui-cards/card-04.png';
import imgUiCard05 from '../assets/projects/sales-platform/ui-cards/card-05.png';
import imgUiCard06 from '../assets/projects/sales-platform/ui-cards/card-06.png';
import imgUiCard07 from '../assets/projects/sales-platform/ui-cards/card-07.png';
import imgUiCard08 from '../assets/projects/sales-platform/ui-cards/card-08.png';
import imgUiCard09 from '../assets/projects/sales-platform/ui-cards/card-09.png';
import imgConcepts01DesktopEn from '../assets/projects/sales-platform/concepts/slide-01-desktop-en.png';
import imgConcepts02DesktopEn from '../assets/projects/sales-platform/concepts/slide-02-desktop-en.png';
import imgConcepts03DesktopEn from '../assets/projects/sales-platform/concepts/slide-03-desktop-en.png';
import imgConcepts04DesktopEn from '../assets/projects/sales-platform/concepts/slide-04-desktop-en.png';
import imgConcepts05DesktopEn from '../assets/projects/sales-platform/concepts/slide-05-desktop-en.png';
import imgConcepts01TabletEn  from '../assets/projects/sales-platform/concepts/slide-01-tablet-en.png';
import imgConcepts02TabletEn  from '../assets/projects/sales-platform/concepts/slide-02-tablet-en.png';
import imgConcepts03TabletEn  from '../assets/projects/sales-platform/concepts/slide-03-tablet-en.png';
import imgConcepts04TabletEn  from '../assets/projects/sales-platform/concepts/slide-04-tablet-en.png';
import imgConcepts05TabletEn  from '../assets/projects/sales-platform/concepts/slide-05-tablet-en.png';
import imgConcepts01MobileEn  from '../assets/projects/sales-platform/concepts/slide-01-mobile-en.png';
import imgConcepts02MobileEn  from '../assets/projects/sales-platform/concepts/slide-02-mobile-en.png';
import imgConcepts03MobileEn  from '../assets/projects/sales-platform/concepts/slide-03-mobile-en.png';
import imgConcepts04MobileEn  from '../assets/projects/sales-platform/concepts/slide-04-mobile-en.png';
import imgConcepts05MobileEn  from '../assets/projects/sales-platform/concepts/slide-05-mobile-en.png';
import imgConcepts01DesktopFr from '../assets/projects/sales-platform/concepts/slide-01-desktop-fr.png';
import imgConcepts02DesktopFr from '../assets/projects/sales-platform/concepts/slide-02-desktop-fr.png';
import imgConcepts03DesktopFr from '../assets/projects/sales-platform/concepts/slide-03-desktop-fr.png';
import imgConcepts04DesktopFr from '../assets/projects/sales-platform/concepts/slide-04-desktop-fr.png';
import imgConcepts05DesktopFr from '../assets/projects/sales-platform/concepts/slide-05-desktop-fr.png';
import imgConcepts01TabletFr  from '../assets/projects/sales-platform/concepts/slide-01-tablet-fr.png';
import imgConcepts02TabletFr  from '../assets/projects/sales-platform/concepts/slide-02-tablet-fr.png';
import imgConcepts03TabletFr  from '../assets/projects/sales-platform/concepts/slide-03-tablet-fr.png';
import imgConcepts04TabletFr  from '../assets/projects/sales-platform/concepts/slide-04-tablet-fr.png';
import imgConcepts05TabletFr  from '../assets/projects/sales-platform/concepts/slide-05-tablet-fr.png';
import imgConcepts01MobileFr  from '../assets/projects/sales-platform/concepts/slide-01-mobile-fr.png';
import imgConcepts02MobileFr  from '../assets/projects/sales-platform/concepts/slide-02-mobile-fr.png';
import imgConcepts03MobileFr  from '../assets/projects/sales-platform/concepts/slide-03-mobile-fr.png';
import imgConcepts04MobileFr  from '../assets/projects/sales-platform/concepts/slide-04-mobile-fr.png';
import imgConcepts05MobileFr  from '../assets/projects/sales-platform/concepts/slide-05-mobile-fr.png';
import imgWf01DesktopEnLight from '../assets/projects/sales-platform/wireframes/slide-01-desktop-en-light.png';
import imgWf02DesktopEnLight from '../assets/projects/sales-platform/wireframes/slide-02-desktop-en-light.png';
import imgWf03DesktopEnLight from '../assets/projects/sales-platform/wireframes/slide-03-desktop-en-light.png';
import imgWf04DesktopEnLight from '../assets/projects/sales-platform/wireframes/slide-04-desktop-en-light.png';
import imgWf05DesktopEnLight from '../assets/projects/sales-platform/wireframes/slide-05-desktop-en-light.png';
import imgWf06DesktopEnLight from '../assets/projects/sales-platform/wireframes/slide-06-desktop-en-light.png';
import imgWf07DesktopEnLight from '../assets/projects/sales-platform/wireframes/slide-07-desktop-en-light.png';
import imgWf08DesktopEnLight from '../assets/projects/sales-platform/wireframes/slide-08-desktop-en-light.png';
import imgWf09DesktopEnLight from '../assets/projects/sales-platform/wireframes/slide-09-desktop-en-light.png';
import imgWf01DesktopEnDark  from '../assets/projects/sales-platform/wireframes/slide-01-desktop-en-dark.png';
import imgWf02DesktopEnDark  from '../assets/projects/sales-platform/wireframes/slide-02-desktop-en-dark.png';
import imgWf03DesktopEnDark  from '../assets/projects/sales-platform/wireframes/slide-03-desktop-en-dark.png';
import imgWf04DesktopEnDark  from '../assets/projects/sales-platform/wireframes/slide-04-desktop-en-dark.png';
import imgWf05DesktopEnDark  from '../assets/projects/sales-platform/wireframes/slide-05-desktop-en-dark.png';
import imgWf06DesktopEnDark  from '../assets/projects/sales-platform/wireframes/slide-06-desktop-en-dark.png';
import imgWf07DesktopEnDark  from '../assets/projects/sales-platform/wireframes/slide-07-desktop-en-dark.png';
import imgWf08DesktopEnDark  from '../assets/projects/sales-platform/wireframes/slide-08-desktop-en-dark.png';
import imgWf09DesktopEnDark  from '../assets/projects/sales-platform/wireframes/slide-09-desktop-en-dark.png';
import imgWf01DesktopFrLight from '../assets/projects/sales-platform/wireframes/slide-01-desktop-fr-light.png';
import imgWf02DesktopFrLight from '../assets/projects/sales-platform/wireframes/slide-02-desktop-fr-light.png';
import imgWf03DesktopFrLight from '../assets/projects/sales-platform/wireframes/slide-03-desktop-fr-light.png';
import imgWf04DesktopFrLight from '../assets/projects/sales-platform/wireframes/slide-04-desktop-fr-light.png';
import imgWf05DesktopFrLight from '../assets/projects/sales-platform/wireframes/slide-05-desktop-fr-light.png';
import imgWf06DesktopFrLight from '../assets/projects/sales-platform/wireframes/slide-06-desktop-fr-light.png';
import imgWf07DesktopFrLight from '../assets/projects/sales-platform/wireframes/slide-07-desktop-fr-light.png';
import imgWf08DesktopFrLight from '../assets/projects/sales-platform/wireframes/slide-08-desktop-fr-light.png';
import imgWf09DesktopFrLight from '../assets/projects/sales-platform/wireframes/slide-09-desktop-fr-light.png';
import imgWf01DesktopFrDark  from '../assets/projects/sales-platform/wireframes/slide-01-desktop-fr-dark.png';
import imgWf02DesktopFrDark  from '../assets/projects/sales-platform/wireframes/slide-02-desktop-fr-dark.png';
import imgWf03DesktopFrDark  from '../assets/projects/sales-platform/wireframes/slide-03-desktop-fr-dark.png';
import imgWf04DesktopFrDark  from '../assets/projects/sales-platform/wireframes/slide-04-desktop-fr-dark.png';
import imgWf05DesktopFrDark  from '../assets/projects/sales-platform/wireframes/slide-05-desktop-fr-dark.png';
import imgWf06DesktopFrDark  from '../assets/projects/sales-platform/wireframes/slide-06-desktop-fr-dark.png';
import imgWf07DesktopFrDark  from '../assets/projects/sales-platform/wireframes/slide-07-desktop-fr-dark.png';
import imgWf08DesktopFrDark  from '../assets/projects/sales-platform/wireframes/slide-08-desktop-fr-dark.png';
import imgWf09DesktopFrDark  from '../assets/projects/sales-platform/wireframes/slide-09-desktop-fr-dark.png';
import imgWf01MobileEnLight  from '../assets/projects/sales-platform/wireframes/slide-01-mobile-en-light.png';
import imgWf02MobileEnLight  from '../assets/projects/sales-platform/wireframes/slide-02-mobile-en-light.png';
import imgWf03MobileEnLight  from '../assets/projects/sales-platform/wireframes/slide-03-mobile-en-light.png';
import imgWf04MobileEnLight  from '../assets/projects/sales-platform/wireframes/slide-04-mobile-en-light.png';
import imgWf05MobileEnLight  from '../assets/projects/sales-platform/wireframes/slide-05-mobile-en-light.png';
import imgWf06MobileEnLight  from '../assets/projects/sales-platform/wireframes/slide-06-mobile-en-light.png';
import imgWf07MobileEnLight  from '../assets/projects/sales-platform/wireframes/slide-07-mobile-en-light.png';
import imgWf08MobileEnLight  from '../assets/projects/sales-platform/wireframes/slide-08-mobile-en-light.png';
import imgWf09MobileEnLight  from '../assets/projects/sales-platform/wireframes/slide-09-mobile-en-light.png';
import imgWf01MobileEnDark   from '../assets/projects/sales-platform/wireframes/slide-01-mobile-en-dark.png';
import imgWf02MobileEnDark   from '../assets/projects/sales-platform/wireframes/slide-02-mobile-en-dark.png';
import imgWf03MobileEnDark   from '../assets/projects/sales-platform/wireframes/slide-03-mobile-en-dark.png';
import imgWf04MobileEnDark   from '../assets/projects/sales-platform/wireframes/slide-04-mobile-en-dark.png';
import imgWf05MobileEnDark   from '../assets/projects/sales-platform/wireframes/slide-05-mobile-en-dark.png';
import imgWf06MobileEnDark   from '../assets/projects/sales-platform/wireframes/slide-06-mobile-en-dark.png';
import imgWf07MobileEnDark   from '../assets/projects/sales-platform/wireframes/slide-07-mobile-en-dark.png';
import imgWf08MobileEnDark   from '../assets/projects/sales-platform/wireframes/slide-08-mobile-en-dark.png';
import imgWf09MobileEnDark   from '../assets/projects/sales-platform/wireframes/slide-09-mobile-en-dark.png';
import imgWf01MobileFrLight  from '../assets/projects/sales-platform/wireframes/slide-01-mobile-fr-light.png';
import imgWf02MobileFrLight  from '../assets/projects/sales-platform/wireframes/slide-02-mobile-fr-light.png';
import imgWf03MobileFrLight  from '../assets/projects/sales-platform/wireframes/slide-03-mobile-fr-light.png';
import imgWf04MobileFrLight  from '../assets/projects/sales-platform/wireframes/slide-04-mobile-fr-light.png';
import imgWf05MobileFrLight  from '../assets/projects/sales-platform/wireframes/slide-05-mobile-fr-light.png';
import imgWf06MobileFrLight  from '../assets/projects/sales-platform/wireframes/slide-06-mobile-fr-light.png';
import imgWf07MobileFrLight  from '../assets/projects/sales-platform/wireframes/slide-07-mobile-fr-light.png';
import imgWf08MobileFrLight  from '../assets/projects/sales-platform/wireframes/slide-08-mobile-fr-light.png';
import imgWf09MobileFrLight  from '../assets/projects/sales-platform/wireframes/slide-09-mobile-fr-light.png';
import imgWf01MobileFrDark   from '../assets/projects/sales-platform/wireframes/slide-01-mobile-fr-dark.png';
import imgWf02MobileFrDark   from '../assets/projects/sales-platform/wireframes/slide-02-mobile-fr-dark.png';
import imgWf03MobileFrDark   from '../assets/projects/sales-platform/wireframes/slide-03-mobile-fr-dark.png';
import imgWf04MobileFrDark   from '../assets/projects/sales-platform/wireframes/slide-04-mobile-fr-dark.png';
import imgWf05MobileFrDark   from '../assets/projects/sales-platform/wireframes/slide-05-mobile-fr-dark.png';
import imgWf06MobileFrDark   from '../assets/projects/sales-platform/wireframes/slide-06-mobile-fr-dark.png';
import imgWf07MobileFrDark   from '../assets/projects/sales-platform/wireframes/slide-07-mobile-fr-dark.png';
import imgWf08MobileFrDark   from '../assets/projects/sales-platform/wireframes/slide-08-mobile-fr-dark.png';
import imgWf09MobileFrDark   from '../assets/projects/sales-platform/wireframes/slide-09-mobile-fr-dark.png';
import imgHifi01DesktopEnLight from '../assets/projects/sales-platform/hifi/hifi-slide01-desktop-en-light.png';
import imgHifi02DesktopEnLight from '../assets/projects/sales-platform/hifi/hifi-slide02-desktop-en-light.png';
import imgHifi03DesktopEnLight from '../assets/projects/sales-platform/hifi/hifi-slide03-desktop-en-light.png';
import imgHifi04DesktopEnLight from '../assets/projects/sales-platform/hifi/hifi-slide04-desktop-en-light.png';
import imgHifi05DesktopEnLight from '../assets/projects/sales-platform/hifi/hifi-slide05-desktop-en-light.png';
import imgHifi06DesktopEnLight from '../assets/projects/sales-platform/hifi/hifi-slide06-desktop-en-light.png';
import imgHifi07DesktopEnLight from '../assets/projects/sales-platform/hifi/hifi-slide07-desktop-en-light.png';
import imgHifi08DesktopEnLight from '../assets/projects/sales-platform/hifi/hifi-slide08-desktop-en-light.png';
import imgHifi09DesktopEnLight from '../assets/projects/sales-platform/hifi/hifi-slide09-desktop-en-light.png';
import imgHifi01DesktopEnDark  from '../assets/projects/sales-platform/hifi/hifi-slide01-desktop-en-dark.png';
import imgHifi02DesktopEnDark  from '../assets/projects/sales-platform/hifi/hifi-slide02-desktop-en-dark.png';
import imgHifi03DesktopEnDark  from '../assets/projects/sales-platform/hifi/hifi-slide03-desktop-en-dark.png';
import imgHifi04DesktopEnDark  from '../assets/projects/sales-platform/hifi/hifi-slide04-desktop-en-dark.png';
import imgHifi05DesktopEnDark  from '../assets/projects/sales-platform/hifi/hifi-slide05-desktop-en-dark.png';
import imgHifi06DesktopEnDark  from '../assets/projects/sales-platform/hifi/hifi-slide06-desktop-en-dark.png';
import imgHifi07DesktopEnDark  from '../assets/projects/sales-platform/hifi/hifi-slide07-desktop-en-dark.png';
import imgHifi08DesktopEnDark  from '../assets/projects/sales-platform/hifi/hifi-slide08-desktop-en-dark.png';
import imgHifi09DesktopEnDark  from '../assets/projects/sales-platform/hifi/hifi-slide09-desktop-en-dark.png';
import imgHifi01DesktopFrLight from '../assets/projects/sales-platform/hifi/hifi-slide01-desktop-fr-light.png';
import imgHifi02DesktopFrLight from '../assets/projects/sales-platform/hifi/hifi-slide02-desktop-fr-light.png';
import imgHifi03DesktopFrLight from '../assets/projects/sales-platform/hifi/hifi-slide03-desktop-fr-light.png';
import imgHifi04DesktopFrLight from '../assets/projects/sales-platform/hifi/hifi-slide04-desktop-fr-light.png';
import imgHifi05DesktopFrLight from '../assets/projects/sales-platform/hifi/hifi-slide05-desktop-fr-light.png';
import imgHifi06DesktopFrLight from '../assets/projects/sales-platform/hifi/hifi-slide06-desktop-fr-light.png';
import imgHifi07DesktopFrLight from '../assets/projects/sales-platform/hifi/hifi-slide07-desktop-fr-light.png';
import imgHifi08DesktopFrLight from '../assets/projects/sales-platform/hifi/hifi-slide08-desktop-fr-light.png';
import imgHifi09DesktopFrLight from '../assets/projects/sales-platform/hifi/hifi-slide09-desktop-fr-light.png';
import imgHifi01DesktopFrDark  from '../assets/projects/sales-platform/hifi/hifi-slide01-desktop-fr-dark.png';
import imgHifi02DesktopFrDark  from '../assets/projects/sales-platform/hifi/hifi-slide02-desktop-fr-dark.png';
import imgHifi03DesktopFrDark  from '../assets/projects/sales-platform/hifi/hifi-slide03-desktop-fr-dark.png';
import imgHifi04DesktopFrDark  from '../assets/projects/sales-platform/hifi/hifi-slide04-desktop-fr-dark.png';
import imgHifi05DesktopFrDark  from '../assets/projects/sales-platform/hifi/hifi-slide05-desktop-fr-dark.png';
import imgHifi06DesktopFrDark  from '../assets/projects/sales-platform/hifi/hifi-slide06-desktop-fr-dark.png';
import imgHifi07DesktopFrDark  from '../assets/projects/sales-platform/hifi/hifi-slide07-desktop-fr-dark.png';
import imgHifi08DesktopFrDark  from '../assets/projects/sales-platform/hifi/hifi-slide08-desktop-fr-dark.png';
import imgHifi09DesktopFrDark  from '../assets/projects/sales-platform/hifi/hifi-slide09-desktop-fr-dark.png';
import imgHifi01TabletEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide01-tablet-en-light.png';
import imgHifi02TabletEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide02-tablet-en-light.png';
import imgHifi03TabletEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide03-tablet-en-light.png';
import imgHifi04TabletEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide04-tablet-en-light.png';
import imgHifi05TabletEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide05-tablet-en-light.png';
import imgHifi06TabletEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide06-tablet-en-light.png';
import imgHifi07TabletEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide07-tablet-en-light.png';
import imgHifi08TabletEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide08-tablet-en-light.png';
import imgHifi09TabletEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide09-tablet-en-light.png';
import imgHifi01TabletEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide01-tablet-en-dark.png';
import imgHifi02TabletEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide02-tablet-en-dark.png';
import imgHifi03TabletEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide03-tablet-en-dark.png';
import imgHifi04TabletEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide04-tablet-en-dark.png';
import imgHifi05TabletEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide05-tablet-en-dark.png';
import imgHifi06TabletEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide06-tablet-en-dark.png';
import imgHifi07TabletEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide07-tablet-en-dark.png';
import imgHifi08TabletEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide08-tablet-en-dark.png';
import imgHifi09TabletEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide09-tablet-en-dark.png';
import imgHifi01TabletFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide01-tablet-fr-light.png';
import imgHifi02TabletFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide02-tablet-fr-light.png';
import imgHifi03TabletFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide03-tablet-fr-light.png';
import imgHifi04TabletFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide04-tablet-fr-light.png';
import imgHifi05TabletFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide05-tablet-fr-light.png';
import imgHifi06TabletFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide06-tablet-fr-light.png';
import imgHifi07TabletFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide07-tablet-fr-light.png';
import imgHifi08TabletFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide08-tablet-fr-light.png';
import imgHifi09TabletFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide09-tablet-fr-light.png';
import imgHifi01TabletFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide01-tablet-fr-dark.png';
import imgHifi02TabletFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide02-tablet-fr-dark.png';
import imgHifi03TabletFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide03-tablet-fr-dark.png';
import imgHifi04TabletFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide04-tablet-fr-dark.png';
import imgHifi05TabletFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide05-tablet-fr-dark.png';
import imgHifi06TabletFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide06-tablet-fr-dark.png';
import imgHifi07TabletFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide07-tablet-fr-dark.png';
import imgHifi08TabletFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide08-tablet-fr-dark.png';
import imgHifi09TabletFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide09-tablet-fr-dark.png';
import imgHifi01MobileEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide01-mobile-en-light.png';
import imgHifi02MobileEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide02-mobile-en-light.png';
import imgHifi03MobileEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide03-mobile-en-light.png';
import imgHifi04MobileEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide04-mobile-en-light.png';
import imgHifi05MobileEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide05-mobile-en-light.png';
import imgHifi06MobileEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide06-mobile-en-light.png';
import imgHifi07MobileEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide07-mobile-en-light.png';
import imgHifi08MobileEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide08-mobile-en-light.png';
import imgHifi09MobileEnLight  from '../assets/projects/sales-platform/hifi/hifi-slide09-mobile-en-light.png';
import imgHifi01MobileEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide01-mobile-en-dark.png';
import imgHifi02MobileEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide02-mobile-en-dark.png';
import imgHifi03MobileEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide03-mobile-en-dark.png';
import imgHifi04MobileEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide04-mobile-en-dark.png';
import imgHifi05MobileEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide05-mobile-en-dark.png';
import imgHifi06MobileEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide06-mobile-en-dark.png';
import imgHifi07MobileEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide07-mobile-en-dark.png';
import imgHifi08MobileEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide08-mobile-en-dark.png';
import imgHifi09MobileEnDark   from '../assets/projects/sales-platform/hifi/hifi-slide09-mobile-en-dark.png';
import imgHifi01MobileFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide01-mobile-fr-light.png';
import imgHifi02MobileFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide02-mobile-fr-light.png';
import imgHifi03MobileFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide03-mobile-fr-light.png';
import imgHifi04MobileFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide04-mobile-fr-light.png';
import imgHifi05MobileFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide05-mobile-fr-light.png';
import imgHifi06MobileFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide06-mobile-fr-light.png';
import imgHifi07MobileFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide07-mobile-fr-light.png';
import imgHifi08MobileFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide08-mobile-fr-light.png';
import imgHifi09MobileFrLight  from '../assets/projects/sales-platform/hifi/hifi-slide09-mobile-fr-light.png';
import imgHifi01MobileFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide01-mobile-fr-dark.png';
import imgHifi02MobileFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide02-mobile-fr-dark.png';
import imgHifi03MobileFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide03-mobile-fr-dark.png';
import imgHifi04MobileFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide04-mobile-fr-dark.png';
import imgHifi05MobileFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide05-mobile-fr-dark.png';
import imgHifi06MobileFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide06-mobile-fr-dark.png';
import imgHifi07MobileFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide07-mobile-fr-dark.png';
import imgHifi08MobileFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide08-mobile-fr-dark.png';
import imgHifi09MobileFrDark   from '../assets/projects/sales-platform/hifi/hifi-slide09-mobile-fr-dark.png';

// ── Hero ──────────────────────────────────────────────────────────────────────
const HERO = {
  en: {
    category: 'Real Estate · Sales Platform',
    title: 'A digital sales platform for luxury real estate developments',
    stats: [
      { prefix: '£', countTo: 6.8, decimals: 1, suffix: 'B',  label: 'in sales generated'      },
      { prefix: '+', countTo: 20,  decimals: 0, suffix: '%',   label: 'YoY sales increase'       },
      { prefix: '',  countTo: 48,  decimals: 0, suffix: 'h',   label: 'to sell out first launch' },
    ],
  },
  fr: {
    category: 'Immobilier · Plateforme de vente',
    title: 'Une plateforme de vente digitale pour des projets immobiliers de luxe',
    stats: [
      { prefix: '',  countTo: 8,  decimals: 0, suffix: ' Mds €', label: 'de ventes générées'           },
      { prefix: '+', countTo: 20, decimals: 0, suffix: ' %',      label: 'de hausse des ventes en un an' },
      { prefix: '',  countTo: 48, decimals: 0, suffix: 'h',       label: 'pour vendre le 1er lancement'  },
    ],
  },
};

function useCountUp(target, duration = 1800, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
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
  }, [target, duration, decimals]);
  return count;
}

function AnimatedStat({ prefix, countTo, decimals, suffix }) {
  const value = useCountUp(countTo, 1800, decimals);
  return (
    <span>{prefix}{decimals > 0 ? value.toFixed(decimals) : value}{suffix}</span>
  );
}

function Hero({ lang }) {
  const h = HERO[lang] ?? HERO.en;
  return (
    <section aria-labelledby="hero-heading" lang={lang} className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Background image */}
      <img
        src={imgHero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable="false"
      />

      {/* Gradient overlay — darkens bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Main content — bottom */}
      <div className="relative z-10 mt-auto max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-10 pb-24 sm:pb-28 lg:pb-24 flex flex-col gap-6 sm:gap-8">

        <p className="text-[13px] sm:text-[14px] font-semibold tracking-widest uppercase text-white">
          {h.category}
        </p>

        <h1 id="hero-heading" className="text-[32px] sm:text-[44px] lg:text-[56px] font-semibold leading-[1.1] text-white max-w-3xl">
          {h.title}
        </h1>

        <ul role="list" className="flex items-start gap-8 sm:gap-12 lg:gap-16 pt-2 list-none">
          {h.stats.map((s, i) => {
            const finalValue = s.decimals > 0 ? s.countTo.toFixed(s.decimals) : s.countTo;
            return (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-tight text-white tabular-nums">
                  <span className="sr-only">{s.prefix}{finalValue}{s.suffix}</span>
                  <span><AnimatedStat prefix={s.prefix} countTo={s.countTo} decimals={s.decimals} suffix={s.suffix} /></span>
                </span>
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] text-white leading-snug max-w-[100px] sm:max-w-none">{s.label}</span>
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

// ── Tool icon with tooltip (same as Resume) ───────────────────────────────────
function ToolIcon({ name, icon, darkInvert = false, circle = false }) {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);
  const tooltipId = `tooltip-${name.replace(/\s+/g, '-').toLowerCase()}`;

  useEffect(() => {
    if (!visible) return;
    const handler = (e) => { if (btnRef.current && !btnRef.current.contains(e.target)) setVisible(false); };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [visible]);

  return (
    <div className="relative flex flex-col items-center">
      <div
        id={tooltipId}
        role="tooltip"
        className={`absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 motion-safe:transition-opacity motion-safe:duration-150 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="bg-[#1f1f1f] dark:bg-[#f6f6f6] text-[#f6f6f6] dark:text-[#1f1f1f] text-[12px] font-semibold px-2 py-[3px] rounded-[6px] whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">{name}</div>
        <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#1f1f1f] dark:border-t-[#f6f6f6]" />
      </div>
      <button
        ref={btnRef}
        aria-label={name}
        aria-describedby={tooltipId}
        onMouseEnter={() => { if (!window.matchMedia('(pointer: coarse)').matches) setVisible(true); }}
        onMouseLeave={() => { if (!window.matchMedia('(pointer: coarse)').matches) setVisible(false); }}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onClick={() => { if (window.matchMedia('(pointer: coarse)').matches) setVisible(v => !v); }}
        className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center shrink-0 overflow-hidden bg-[#f6f6f6] dark:bg-[#2a2a2a] shadow-[1px_1px_8px_0px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1f1f] dark:focus-visible:outline-[#f6f6f6] ${circle ? 'rounded-full' : 'rounded-[8px] sm:rounded-[10px] lg:rounded-[12px]'}`}
      >
        {icon
          ? <img src={icon} alt="" className={`w-full h-full object-cover${darkInvert ? ' dark:invert' : ''}`} />
          : <span className="text-[7px] font-bold text-[#5c5c5c] dark:text-[#adadad] text-center leading-tight px-[2px]" aria-hidden="true">{name}</span>
        }
      </button>
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
  body:     { en: <>At the start of the project, the client was experiencing annual <strong>revenue growth</strong> and expanding operations across three Emirates. The goal of the platform was to support <strong>this growth</strong>, and extend beyond the UAE.</>, fr: <>Au début du projet, le client enregistrait une <strong>croissance annuelle</strong> de son chiffre d'affaires et étendait ses activités à trois Émirats. L'objectif de la plateforme était de <strong>soutenir cette croissance</strong>, au-delà des EAU.</> },
  footnote: { en: '*client\'s revenues YoY, before the platform.',   fr: "*chiffre d'affaires annuel du client, avant la plateforme." },
};
const CONTEXT_BODIES = {
  // index matches eyebrows array (0 = client — body handled inline, 1 = industry — handled inline)
  mission:      { en: <>From concept to completion, our mission is to <strong>supercharge property sales</strong> by providing an <strong>interactive 3D experience</strong> of spaces before they are built.</>, fr: <>Du concept à la production, <strong>booster les ventes</strong> en offrant une <strong>expérience interactive 3D</strong> des lieux avant la construction des villas et appartements.</> },
  stakeholders: { en: <ul className="space-y-1 list-disc list-inside"><li>The client’s <strong>digital team</strong> & <strong>architects</strong>.</li><li>Our product team, project manager, and dev, studio, design, marketing and customer success teams.</li></ul>, fr: <ul className="space-y-1 list-disc list-inside"><li>L’<strong>équipe client digitale</strong> et <strong>architectes</strong>.</li><li>Nos chef de produit, de projet, et nos équipes dev, studio, design, marketing, et customer success.</li></ul> },
  myRole: {
    en: {
      stats: [
        { value: "15 weeks", label: "to first launch" },
        { value: "10 projects", label: "in first year" },
      ],
      body: <>As <strong>Senior <abbr title="User Experience / User Interface" className="no-underline">UX/UI</abbr> Designer</strong> and <strong>Design Team Manager</strong>, I led a team of 4 designers, covering UX, UI, interaction design, and graphics, from initial concept through successive product launches.</>,
    },
    fr: {
      stats: [
        { value: "15 semaines", label: "jusqu’au premier lancement" },
        { value: "10 projets",   label: "la premi\u00e8re ann\u00e9e" },
      ],
      body: <>En tant que <strong>Senior <abbr title="User Experience / User Interface" className="no-underline">UX/UI</abbr> Designer</strong> et <strong>responsable de l&apos;équipe design</strong>, j&apos;ai dirigé une équipe de 4 designers, couvrant l&apos;UX, l&apos;UI, le design d&apos;interaction et le graphisme, du concept initial jusqu&apos;aux lancements successifs.</>,
    },
  },
  team: {
    en: <><p>The entire team worked remotely.</p>We worked together across a global network, with colleagues based in Brazil 🇧🇷, Canada 🇨🇦, the United Kingdom 🇬🇧, Europe 🇪🇺, the United Arab Emirates 🇦🇪, India 🇮🇳, Vietnam 🇻🇳, and Australia 🇦🇺.</>,
    fr: <><p>100% télétravail.</p>Nous étions répartis sur quatre continents, avec des collègues au Brésil 🇧🇷, Canada 🇨🇦, Royaume-Uni 🇬🇧, Europe 🇪🇺, Émirats arabes unis 🇦🇪, Inde 🇮🇳, Vietnam 🇻🇳 et Australie 🇦🇺.</>,
  },
};

const CONTEXT_TOOLS = [
  { name: "Figma",                icon: imgToolFigma },
  { name: "Adobe Illustrator",    icon: imgToolIllustrator },
  { name: "Adobe Photoshop",      icon: imgToolPhotoshop },
  { name: "DaVinci Resolve",      icon: imgToolDaVinci },
  { name: "Atlassian Confluence", icon: imgToolConfluence },
  { name: "Atlassian Jira",       icon: imgToolJira },
  { name: "Visual Studio Code",   icon: imgToolVSCode },
  { name: "Unreal Engine",        icon: imgToolUnreal, darkInvert: true, circle: true },
  { name: "Autodesk 3DS Max",     icon: imgTool3dsMax },
  { name: "Miro",                 icon: imgToolMiro },
];

function ContextContent({ lang }) {
  const eyebrows = CONTEXT_EYEBROWS[lang] ?? CONTEXT_EYEBROWS.en;
  const clientPill = CONTEXT_CLIENT_PILL[lang] ?? CONTEXT_CLIENT_PILL.en;
  const l = lang in CONTEXT_BODIES.mission ? lang : 'en';
  return (
    <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 sm:gap-7 lg:gap-8">
        <Tile>
          <img src={imgClientLogo} alt="Client logo" width={80} height={80} className="brightness-0 dark:invert" />
          <TileEyebrow>{eyebrows[0]}</TileEyebrow>
          <TileBody>One of the <strong>leading real estate developers</strong> in the United Arab Emirates (UAE).</TileBody>
          <span className="self-start px-4 py-2 bg-[#f6f6f6] dark:bg-[#1f1f1f] border border-black/[0.08] dark:border-white/[0.08] rounded-full text-[14px] sm:text-[15px] font-medium text-[#1f1f1f] dark:text-[#f6f6f6]">
            {clientPill}
          </span>
        </Tile>
        <Tile>
          <p className="text-right text-[30px] sm:text-[36px] lg:text-[44px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">
            {CONTEXT_INDUSTRY.stat[lang] ?? CONTEXT_INDUSTRY.stat.en}
          </p>
          <p className="text-right text-[24px] sm:text-[26px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">{eyebrows[1]}</p>
          <TileBody>{CONTEXT_INDUSTRY.body[l]}</TileBody>
          <p className="text-right text-[13px] sm:text-[14px] text-[#5c5c5c] dark:text-[#adadad]">
            {CONTEXT_INDUSTRY.footnote[lang] ?? CONTEXT_INDUSTRY.footnote.en}
          </p>
        </Tile>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 lg:gap-8">
        <Tile><TileEyebrow>{eyebrows[2]}</TileEyebrow><TileBody>{CONTEXT_BODIES.mission[l]}</TileBody></Tile>
        <Tile><TileEyebrow>{eyebrows[3]}</TileEyebrow><TileBody>{CONTEXT_BODIES.stakeholders[l]}</TileBody></Tile>
      </div>

      <Tile>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
          <TileEyebrow>{eyebrows[4]}</TileEyebrow>
          <div className="flex items-start gap-8 sm:gap-12 shrink-0">
            {CONTEXT_BODIES.myRole[l].stats.map((s, i) => (
              <div key={i} className="flex flex-col items-end gap-0.5">
                <span className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">{s.value}</span>
                <span className="text-[13px] sm:text-[14px] text-[#5c5c5c] dark:text-[#adadad] text-right">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <TileBody>{CONTEXT_BODIES.myRole[l].body}</TileBody>
      </Tile>

      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 sm:gap-7 lg:gap-8">
        <Tile>
          <TileEyebrow>{eyebrows[5]}</TileEyebrow>
          {/* mobile: 5×2 · tablet (md): 10×1 · desktop (lg): 4×3 */}
          <ul role="list" aria-label={eyebrows[5]} className="list-none grid grid-cols-5 md:grid-cols-10 lg:grid-cols-4 mt-3 sm:mt-0 gap-x-3 gap-y-8 md:gap-x-2 md:gap-y-4 lg:gap-x-3 lg:gap-y-6">
            {CONTEXT_TOOLS.map(tool => <li key={tool.name}><ToolIcon name={tool.name} icon={tool.icon} darkInvert={tool.darkInvert} circle={tool.circle} /></li>)}
          </ul>
        </Tile>
        <Tile><TileEyebrow>{eyebrows[6]}</TileEyebrow><TileBody>{CONTEXT_BODIES.team[l]}</TileBody></Tile>
      </div>
    </div>
  );
}

// ── Impact section content ────────────────────────────────────────────────────
const IMPACT = {
  en: {
    outcome: {
      eyebrow: "Outcome",
      body: <><p>Following validation and user testing within our development environment, we successfully launched the first two projects — both of which <strong>sold out within the first 48 hours</strong> of release.</p><p>Building on that momentum, project delivery accelerated. And by the end of our first year of collaboration, the platform contributed to a <strong>20% YoY increase</strong> in sales, generating <strong>£6.8 Billions</strong>.</p></>,
    },
    retrospective: {
      eyebrow: "Retrospective",
      body: <><p><strong>Strong coordination</strong> between internal and external stakeholders was crucial to the successful launch of the initial project and to scaling subsequent deliveries.</p><p>The design team played a pivotal role in aligning stakeholders, shaping <strong>strategic decisions</strong>, and contributing to <strong>automation efforts</strong> that streamlined the pace of future launches.</p><p>A huge credit goes to our <strong>cross-functional team</strong> — project managers, product owners, QA testers, developers, artists, engineers, and designers — who consistently delivered <strong>high-volume</strong>, <strong>high-impact</strong> projects at an accelerated pace. This was achieved while simultaneously supporting parallel initiatives for other clients, including those involving <strong>cutting-edge</strong> XR technologies and <strong>digital twin solutions</strong>.</p><p>This project reaffirmed the power of <strong>collaborative iteration</strong> and the importance of early alignment between development and design teams.</p><p>Throughout the project, several <strong>trade-offs</strong> were made, carefully balancing user needs, business priorities, and technical constraints. Happy to discuss these in more detail.</p></>
,
    },
  },
  fr: {
    outcome: {
      eyebrow: "Bilan",
      body: <><p>Après validation et tests utilisateurs dans notre environnement de développement, nous avons lancé avec succès les deux premiers projets — tous deux <strong>vendus intégralement dans les 48 premières heures</strong> suivant leur lancement. 🚀</p><p>Portés par cette dynamique, les livraisons de projets se sont accélérées. À la fin de notre première année de collaboration, la plateforme avait contribué à une <strong>augmentation des ventes de 20 %</strong>, générant plus de <strong>8 milliards d'euros</strong> de chiffre d'affaires.</p></>,
    },
    retrospective: {
      eyebrow: "Rétrospective",
      body: <><p><strong>Une coordination étroite</strong> entre les parties prenantes internes et externes a été essentielle au lancement réussi du projet initial ainsi qu'à la montée en puissance des projets suivants.</p><p>L'équipe design a joué un rôle clé dans l'alignement des parties prenantes, l'orientation des <strong>décisions stratégiques</strong>, et la contribution aux <strong>efforts d'automatisation</strong> qui ont permis d'accélérer le rythme des lancements futurs.</p><p>Un grand bravo à notre équipe pluridisciplinaire — chefs de projet, responsables produit, testeurs qualité, développeurs, artistes, ingénieurs et designers — qui ont livré de manière constante des projets à <strong>fort volume</strong> et à <strong>fort impact</strong>, à un rythme soutenu. Cela a été accompli tout en soutenant en parallèle d'autres initiatives pour d'autres clients, notamment dans les domaines de la <strong>technologie XR</strong> et des solutions de <strong>jumeaux numériques</strong>.</p><p>Ce projet a réaffirmé la puissance de l'<strong>itération collaborative</strong> et souligné l'importance d'un alignement entre les équipes de développement et de design dès le début.</p><p>Tout au long du projet, plusieurs <strong>compromis</strong> ont été nécessaires, en équilibrant soigneusement les besoins des utilisateurs, les priorités métier et les contraintes techniques. Je serais ravi d'en parler plus en détail.</p></>
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
      body: "How can we help real estate buyers experience unbuilt spaces, across multiple geographies, emotionally and contextually?",
    },
    exploration: {
      eyebrow: "Exploration",
      subsections: [
        {
          h4: "Integrating 3D without compromising performance",
          body: <><p>Unreal Engine's <strong>real-time rendering</strong> offered impressive lighting quality improvements, approaching that of traditionally rendered CG images (e.g. 3dsMax + VRay).</p><p>We imported city-scale 3D datasets into Unreal and tested <strong>Pixel-streaming</strong> for real-time web playback.</p><p><span aria-hidden="true">🛑</span> Two major challenges emerged:</p><ul className="list-disc list-inside space-y-1"><li>Long <strong>loading times</strong> for large 3D datasets (several minutes).</li><li>High streaming <strong>costs per user</strong>, making it unfeasible at scale.</li></ul><p><span aria-hidden="true">✅</span> To provide browser-based access to large 3D scenes, <strong>pre-rendering images</strong> from Unreal would be a better <strong>short-term solution</strong>, while <strong>Pixel-streaming</strong> could be reserved for <strong>exclusive audiences</strong>.</p></>,
        },
      ],
    },
    uxStrategy: {
      eyebrow: "UX strategy",
      subsections: [
        {
          h4: "Firm deadlines",
          body: <>The nature of the market meant project deliveries had <strong>strict deadlines</strong>. The client expected to <strong>sell lots of units on launch day</strong>, so every unit (~1000/project) should be viewable in-app from day one.</>,
        },
        {
          h4: "MVP",
          body: <>Given our resources at the time, the 15 weeks from the start of the project to the launch event would likely not suffice to fully design, implement and test the platform we wanted for the users. Therefore, we designed a <strong>Minimum Viable Product</strong> that would be <strong>desktop-first</strong> so that at the first launch event, the sales agent would be able to showcase the project and make sales.</>,
        },
        {
          h4: "Incremental iterations",
          body: <>The schedule of upcoming projects for the year would be <strong>accelerating</strong> and it was expected that some projects would bring <strong>new design and development challenges</strong>. Past the first project launch, we would incrementally introduce features to <strong>meet prioritised users' and client's goals</strong>.</>,
        },
        { h4: "Launches timeline", body: null },
      ],
    },
  },
  fr: {
    challenge: {
      eyebrow: "Le défi",
      body: "Comment pouvons-nous aider des acheteurs immobiliers à se projeter émotionnellement et contextuellement dans des espaces non-bâtis, et ce dans divers environnements géographiques ?",
    },
    exploration: {
      eyebrow: "Exploration",
      subsections: [
        {
          h4: "Intégration 3D sans compromettre les perfs",
          body: <><p>Le rendu en <strong>temps réel</strong> d'Unreal Engine offrait une qualité d'éclairage se rapprochant des images de synthèse traditionnelles (3dsMax + VRay par exemple).</p><p>Nous avons importé les données 3D d'une ville dans Unreal et testé le <strong>Pixel-streaming</strong> pour une lecture en temps réel dans le navigateur.</p><p><span aria-hidden="true">🛑</span> Deux défis majeurs sont apparus :</p><ul className="list-disc list-inside space-y-1"><li>Les temps de <strong>chargement</strong> trop longs pour de larges projets 3D (plusieurs minutes).</li><li>Les <strong>coûts de streaming élevés par utilisateur</strong>, rendant cela non viable à grande échelle.</li></ul><p><span aria-hidden="true">✅</span> Pour offrir un accès à de grandes scènes 3D dans le navigateur, le <strong>pré-rendu d'images</strong> depuis Unreal serait une meilleure <strong>solution à court terme</strong>, tandis que le <strong>Pixel-streaming</strong> pourrait être réservé à un <strong>public exclusif</strong>.</p></>,
        },
      ],
    },
    uxStrategy: {
      eyebrow: "Stratégie UX",
      subsections: [
        {
          h4: "Échéances strictes",
          body: <>La nature du marché impliquait que les lancements de projets aient des <strong>délais stricts</strong>. Le client s'attendait à <strong>vendre de nombreux logements dès le jour du lancement</strong> — chaque logement (~1000 par projet) devait être terminé et visible dans l'application dès le premier jour.</>,
        },
        {
          h4: "MVP",
          body: <>Compte tenu de nos ressources, les 15 semaines entre le début du premier projet et le lancement étaient insuffisantes pour concevoir, mettre en œuvre et tester la plateforme que nous souhaitions pour tous les utilisateurs. Par conséquent, nous avons conçu un <strong>Produit Minimum Viable</strong> qui serait <strong>d'abord destiné aux PCs</strong>, afin qu'au lancement, les commerciaux puissent présenter le projet et réaliser des ventes.</>,
        },
        {
          h4: "Itérations incrémentales",
          body: <>Le calendrier de projets pour l'année allait <strong>accélérer</strong> — il était prévu que de nouveaux <strong>défis en termes de conception et de développement</strong> accompagnent certains projets. Une fois le premier projet lancé, nous introduirions des fonctionnalités pour <strong>répondre aux objectifs priorisés des utilisateurs et du client</strong>.</>,
        },
        { h4: "Chronologie des lancements", body: null },
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
            {s.body ? <TileBody>{s.body}</TileBody> : <LaunchesTimeline />}
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

function ConceptsCarousel({ lang, isDark }) {
  const slides = CONCEPTS_SLIDES[lang] ?? CONCEPTS_SLIDES.en;
  const titles = CONCEPTS_TITLES[lang] ?? CONCEPTS_TITLES.en;
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
        aria-label={lang === 'fr' ? 'Carrousel des concepts CGI' : 'CGI concepts carousel'}
        onScroll={handleScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToSlide(Math.max(0, activeIndex - 1)); }
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollToSlide(Math.min(slides.length - 1, activeIndex + 1)); }
        }}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory rounded-xl sm:rounded-2xl lg:rounded-3xl touch-pan-x focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
        style={{ scrollbarWidth: 'none' }}
      >
        {slides.map((slide, i) => (
          <picture key={i} className="w-full shrink-0 snap-start">
            <source media="(min-width: 1024px)" srcSet={slide.desktop} />
            <source media="(min-width: 640px)"  srcSet={slide.tablet} />
            <img src={slide.mobile} alt={lang === 'fr' ? `Concept CGI, diapositive ${i + 1} sur ${slides.length}` : `CGI concept, slide ${i + 1} of ${slides.length}`} draggable="false" className="w-full h-auto" />
          </picture>
        ))}
      </div>

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
              <button key={i} onClick={() => scrollToSlide(i)} aria-label={lang === 'fr' ? `Aller à la diapositive ${i + 1}` : `Go to slide ${i + 1}`} aria-current={i === activeIndex ? 'true' : undefined} className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6] rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}>
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-[#1f1f1f] dark:bg-[#f6f6f6]' : isEdge ? 'w-1.5 h-1.5 bg-[#1f1f1f]/25 dark:bg-[#f6f6f6]/25' : 'w-2 h-2 bg-[#1f1f1f]/40 dark:bg-[#f6f6f6]/40 group-hover:bg-[#1f1f1f]/60 dark:group-hover:bg-[#f6f6f6]/60'}`} />
              </button>
            ); })}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
            <button onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label={lang === 'fr' ? 'Diapositive précédente' : 'Previous slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter] forced-colors:brightness-[unset]" />
            </button>
            <button onClick={() => scrollToSlide(Math.min(slides.length - 1, activeIndex + 1))} disabled={activeIndex === slides.length - 1} aria-label={lang === 'fr' ? 'Diapositive suivante' : 'Next slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
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
        aria-label={lang === 'fr' ? 'Carrousel des maquettes filaires' : 'Wireframes carousel'}
        onScroll={handleScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToSlide(Math.max(0, activeIndex - 1)); }
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollToSlide(Math.min(slides.length - 1, activeIndex + 1)); }
        }}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory touch-pan-x focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
        style={{ scrollbarWidth: 'none' }}
      >
        {slides.map((slide, i) => (
          <picture key={i} className="w-full shrink-0 snap-start">
            <source media="(min-width: 640px)" srcSet={slide.desktop} />
            <img src={slide.mobile} alt={lang === 'fr' ? `Maquette filaire, diapositive ${i + 1} sur ${slides.length}` : `Wireframe mock-up, slide ${i + 1} of ${slides.length}`} draggable="false" className="w-full h-auto" />
          </picture>
        ))}
      </div>

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
              <button key={i} onClick={() => scrollToSlide(i)} aria-label={lang === 'fr' ? `Aller à la diapositive ${i + 1}` : `Go to slide ${i + 1}`} aria-current={i === activeIndex ? 'true' : undefined} className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6] rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}>
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-[#1f1f1f] dark:bg-[#f6f6f6]' : isEdge ? 'w-1.5 h-1.5 bg-[#1f1f1f]/25 dark:bg-[#f6f6f6]/25' : 'w-2 h-2 bg-[#1f1f1f]/40 dark:bg-[#f6f6f6]/40 group-hover:bg-[#1f1f1f]/60 dark:group-hover:bg-[#f6f6f6]/60'}`} />
              </button>
            ); })}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
            <button onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label={lang === 'fr' ? 'Diapositive précédente' : 'Previous slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter] forced-colors:brightness-[unset]" />
            </button>
            <button onClick={() => scrollToSlide(Math.min(slides.length - 1, activeIndex + 1))} disabled={activeIndex === slides.length - 1} aria-label={lang === 'fr' ? 'Diapositive suivante' : 'Next slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
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
          aria-label={lang === 'fr' ? 'Carrousel des maquettes haute-fidélité' : 'High-fidelity mock-ups carousel'}
          onScroll={handleScroll}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToSlide(Math.max(0, activeIndex - 1)); }
            if (e.key === 'ArrowRight') { e.preventDefault(); scrollToSlide(Math.min(slides.length - 1, activeIndex + 1)); }
          }}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory rounded-xl sm:rounded-2xl lg:rounded-3xl touch-pan-x focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
          style={{ scrollbarWidth: 'none' }}
        >
          {slides.map((slide, i) => (
            <picture key={i} className="w-full shrink-0 snap-start">
              <source media="(min-width: 1024px)" srcSet={slide.desktop} />
              <source media="(min-width: 640px)" srcSet={slide.tablet} />
              <img src={slide.mobile} alt={`High-fidelity mock-up slide ${i + 1} of ${slides.length}`} draggable="false" className="w-full h-auto" />
            </picture>
          ))}
        </div>
      </div>

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
              <button key={i} onClick={() => scrollToSlide(i)} aria-label={lang === 'fr' ? `Aller à la diapositive ${i + 1}` : `Go to slide ${i + 1}`} aria-current={i === activeIndex ? 'true' : undefined} className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6] rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}>
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-[#1f1f1f] dark:bg-[#f6f6f6]' : isEdge ? 'w-1.5 h-1.5 bg-[#1f1f1f]/25 dark:bg-[#f6f6f6]/25' : 'w-2 h-2 bg-[#1f1f1f]/40 dark:bg-[#f6f6f6]/40 group-hover:bg-[#1f1f1f]/60 dark:group-hover:bg-[#f6f6f6]/60'}`} />
              </button>
            ); })}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
            <button onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label={lang === 'fr' ? 'Diapositive précédente' : 'Previous slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
              <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter] forced-colors:brightness-[unset]" />
            </button>
            <button onClick={() => scrollToSlide(Math.min(slides.length - 1, activeIndex + 1))} disabled={activeIndex === slides.length - 1} aria-label={lang === 'fr' ? 'Diapositive suivante' : 'Next slide'} className="group p-2 sm:p-2.5 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]">
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
    userFlow: { eyebrow: "User flow" },
    concepts: {
      eyebrow: "Concepts",
      subsections: [
        { h4: "Back layer: computer generated images (CGI)", body: <>Collaborating with the 3D studio team, an <strong>ideation session</strong> provided an opportunity to <strong>conceptualise</strong> how each view could introduce dynamic elements.</>, after: "conceptsCarousel" },
        { h4: "Front layer: user interface", topSpacing: true, body: <>An initial <strong>brainstorming session</strong> within the design team helped <strong>define the features</strong> each view introduces. The <strong>9 views are sequential</strong>, with each view adding new capabilities as users navigate deeper, from a global overview down to interior spaces.</>, after: "grid9" },
        { h3: "Wireframes", body: <>For this project, <strong>wireframing was an essential part</strong> of the design process allowing <strong>better coordination</strong> between internal teams (design, studio and dev), as well as with external stakeholders.</>, after: "wireframesCarousel", topSpacing: true },
        { h3: "High-fidelity mock-ups", topSpacing: true, body: <>Building a comprehensive <strong>design system</strong> enabled efficient previewing and testing of high-fidelity mockups and prototypes at scale, <strong>streamlining</strong> iteration and <strong>ensuring consistency</strong> across the product.</>, after: "hifiCarousel" },
      ],
    },
  },
  fr: {
    userFlow: { eyebrow: "Flux utilisateur" },
    concepts: {
      eyebrow: "Conceptualisation",
      subsections: [
        { h4: "Arrière-plan : images de synthèse", body: <>En collaboration avec l'équipe 3D, une <strong>session d'idéation</strong> nous a permis de <strong>conceptualiser</strong> comment chaque vue pouvait apporter du dynamisme.</>, after: "conceptsCarousel" },
        { h4: "Premier-plan : interface utilisateur", topSpacing: true, body: <>Une première <strong>séance de brainstorming</strong> au sein de l'équipe de conception a permis de <strong>définir les fonctionnalités</strong> propres à chaque vue. Les <strong>9 vues sont séquentielles</strong>, chaque vue ajoutant de nouvelles fonctionnalités à mesure que l'utilisateur navigue, d'une vue globale jusqu'aux espaces intérieurs.</>, after: "grid9" },
        { h3: "Maquettes filaires", body: <>Pour ce projet, la création de maquettes était un <strong>élément essentiel du processus de conception</strong>, permettant une <strong>meilleure coordination</strong> entre les équipes internes (design, studio and dev), ainsi qu'avec les parties prenantes externes.</>, after: "wireframesCarousel", topSpacing: true },
        { h3: "Maquettes haute-fidélité", topSpacing: true, body: <>La création d'un <strong>design system</strong> a permis de prévisualiser et de tester efficacement des maquettes et prototypes haute fidélité à grande échelle, facilitant ainsi les itérations et garantissant la <strong>cohérence du produit</strong>.</>, after: "hifiCarousel" },
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
          ? <img src={card.img} alt={card.title} draggable="false" className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-[#e0e0e0] dark:bg-[#2a2a2a]" />
        }
      </div>
      <div className="flex flex-col gap-1.5 px-3 py-2.5" style={{ backgroundColor: titleBg }}>
        <h5 className="font-bold text-[13px] sm:text-[14px] lg:text-[15px] leading-snug" style={{ color: titleColor }}>
          {card.title}
        </h5>
        <ul className="flex flex-col gap-0.5 text-[12px] sm:text-[13px] leading-snug list-disc list-inside" style={{ color: titleColor }}>
          {card.bullets.map((b, k) => <li key={k}>{b}</li>)}
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
        <picture>
          <source media="(min-width: 1024px)" srcSet={uf.desktop} />
          <source media="(min-width: 640px)"  srcSet={uf.tablet} />
          <img src={uf.mobile} alt={d.userFlow.eyebrow} className="w-full h-auto rounded-lg" />
        </picture>
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
      body: <>
        <p>The user base was identified through client alignment sessions.</p>
        <p><span aria-hidden="true">💡</span>Findings: <strong>internal stakeholders</strong> (sales agents) and <strong>external users</strong> (homeowners, investors).</p>
      </>,
    },
    goal: {
      eyebrow: 'The goal',
      title:   'What value will the platform provide to users?',
      body:    <><p>We found that most sales occur during client launch events, with additional sales expected in the days following launch.</p><ul className="list-disc list-inside space-y-1"><li>Sales agents require a <strong>logged-in experience</strong> with availability features, at launch.</li><li>Buyers need a simple and efficient <strong>way to request callback</strong> from sales agents.</li></ul></>,
    },
    market: {
      eyebrow: 'The market',
      body:    <><p>We conducted a <strong>competitors analysis</strong> to gain a better understanding of the sector’s landscape, industry standards, and opportunities to surpass both client and user expectations.</p><p>The real-estate market would benefit a more engaging way to present and sell properties. Our vision was to create a <strong>user-centric</strong>, <strong>3D-first</strong> experience that allows users to explore unbuilt spaces interactively, transitioning seamlessly from a global view to interior views.</p><p><span aria-hidden="true">📋</span>Prerequisites:</p><ul className="list-disc list-inside space-y-1"><li>Scalability <strong>from a macro</strong>, globe view, <strong>to micro</strong> interior views.</li><li><strong>3D computer-generated</strong> imagery to enhance immersion, navigation and UX clarity.</li></ul></>,
    },
  },
  fr: {
    audience: {
      eyebrow: "L'audience",
      title:   'À qui s’adresse la plateforme ?',
      body:    <><p>La base d’utilisateurs de la plateforme a été définie lors de sessions d'alignement avec le client.</p> <p><span aria-hidden="true">💡</span>Ce qu’on a appris : </p> <p> Deux groupes, les <strong>parties prenantes internes</strong> (agents commerciaux) et les <strong>utilisateurs externes</strong> (propriétaires, investisseurs).</p></>,
    },
    goal: {
      eyebrow: "L'objectif",
      title:   'Quelle valeur pour les utilisateurs ?',
      body: <><p>Nous avons appris que la majorité des ventes se produisaient lors des journées de lancement. La plupart des ventes restantes pourraient se faire dans les jours suivants.</p><ul className="list-disc list-inside space-y-1"><li>Les commerciaux ont besoin d’une <strong>expérience connectée</strong> avec les disponibilités dès le lancement.</li><li>Les acheteurs ont besoin d’un moyen simple de <strong>demander à être rappelés</strong> par un commercial.</li></ul></>,
    },
    market: {
      eyebrow: 'Le marché',
      body:    <><p>Nous avons mené une <strong>analyse concurentielle</strong> afin de mieux comprendre le secteur, les normes, et les opportunités pour dépasser les attentes du client et des utilisateurs.</p><p>Le marché bénéficierait d’une maniére plus engageante de présenter et vendre des biens. Notre vision était de créer une <strong>expérience 3D centrée sur l’utilisateur</strong>, permettant d’explorer des bien non-construits, en passant de manière fluide d’une vue globale à des vues intérieures.</p><p><span aria-hidden="true">📋</span> Prérequis :</p><ul className="list-disc list-inside space-y-1"><li>Passer d’une échelle <strong>macro</strong> (vue globale) <strong>à micro</strong> (vues intérieures).</li><li>Une <strong>imagerie 3D</strong> pour améliorer l’immersion, la clarté de l’expérience utilisateur.</li></ul></>,
    },
  },
};

function EmphasiseContent({ lang }) {
  const d = EMPHASISE[lang] ?? EMPHASISE.en;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 sm:gap-7 lg:gap-8">
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
function Section({ id, title, lang, children, headerBgClass = '', openHeaderBgClass, openHeaderDark = false, contentBgClass = 'bg-[#f6f6f6] dark:bg-[#1f1f1f]' }) {
  const [open, setOpen] = useState(true);
  const darkHeader = open && openHeaderDark;
  const btnRef = useRef(null);
  const contentRef = useRef(null);
  const headingId = `${id}-heading`;

  const handleToggle = () => {
    setOpen(v => {
      if (v && contentRef.current?.contains(document.activeElement)) {
        btnRef.current?.focus();
      }
      return !v;
    });
  };

  return (
    <section id={id} aria-labelledby={headingId}>

      {/* Header row — fully clickable */}
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
        id={`${id}-content`}
        className={`grid overflow-hidden motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} ${contentBgClass}`}
        inert={open ? undefined : ""}
      >
        <div ref={contentRef} className="overflow-hidden min-h-0">
          <div className={contentBgClass}>
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

  useEffect(() => {
    document.title = lang === 'fr' ? 'Web App • Atelier Digital' : 'Web App • Atelier Digital';
  }, [lang]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1f1f1f] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        {lang === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>

      <Hero lang={lang} />

      <main id="main-content" lang={lang} aria-label={lang === 'fr' ? 'Étude de cas — Plateforme web' : 'Sales Platform case study'} tabIndex={-1}>
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
              id === 'define' || id === 'design' ? 'bg-white dark:bg-[#141414]' : 'bg-[#f6f6f6] dark:bg-[#1f1f1f]'
            }
          >
            {id === 'context'   && <ContextContent lang={lang} />}
            {id === 'emphasise' && <EmphasiseContent lang={lang} />}
            {id === 'define'    && <DefineContent lang={lang} />}
            {id === 'design'    && <DesignContent lang={lang} isDark={isDark} />}
            {id === 'impact'    && <ImpactContent lang={lang} />}
          </Section>
        ))}
      </main>

      <Footer lang={lang} />
    </>
  );
}

export default SalesPlatform;
