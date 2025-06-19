export const breakpoints = {
  mobile: 640,           // ~640px (세로 모드 스마트폰)
  mobileLandscape: 932,  // ~932px (가로 모드 스마트폰)
  tablet: 1024,          // 641px ~ 1024px (태블릿)
  desktop: 1280          // 1025px 이상 (데스크탑)
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile}px)`,
  mobileLandscape: `@media (min-width: ${breakpoints.mobile + 1}px) and (max-width: ${breakpoints.mobileLandscape}px)`,
  tablet: `@media (min-width: ${breakpoints.mobileLandscape + 1}px) and (max-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.tablet + 1}px)`
};