import { Linking } from 'react-native';

export async function openKakaoMap(query: string) {
  const q = encodeURIComponent(query);
  const appUrl = `kakaomap://search?q=${q}`;
  const webUrl = `https://map.kakao.com/?q=${q}`;
  try {
    const supported = await Linking.canOpenURL(appUrl);
    await Linking.openURL(supported ? appUrl : webUrl);
  } catch {
    Linking.openURL(webUrl);
  }
}
