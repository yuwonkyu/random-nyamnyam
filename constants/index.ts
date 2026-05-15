export const ADMOB_BANNER_ID = __DEV__
  ? 'ca-app-pub-3940256099942544/6300978111'
  : 'ca-app-pub-6359377859402977/4573701257';

export const KAKAOPAY_URL = 'https://qr.kakaopay.com/FQKB2yNrE';

export const TABS = ['전체', '음식', '디저트'] as const;
export type TabName = (typeof TABS)[number];

export const COLORS = {
  bg: '#FFF5F0',
  primary: '#FF6B6B',
  primaryPressed: '#E85E5E',
  primarySoft: '#FFAB9A',
  tabBg: '#FFE8E4',
  card: '#FFFFFF',
  text: '#2D2D2D',
  dot1: '#FFF0ED',
  dot2: '#FFE8E4',
  dot3: '#FFDDD6',
};
