# 🍱 랜덤냠냠 (Random Nyamnyam)

오늘 뭐 먹지? 귀여운 슬라임이 오늘의 메뉴를 랜덤으로 골라주는 모바일 앱입니다.

## 📱 소개

매일 반복되는 메뉴 고민, 랜덤냠냠이 해결해드립니다. 버튼 하나로 30가지 이상의 음식과 디저트 중 랜덤 추천을 받을 수 있으며, 각 메뉴마다 고유한 슬라임 캐릭터가 등장합니다.

## 🛠️ 기술 스택

- **프레임워크**: [Expo](https://expo.dev/) ~54.0
- **언어**: TypeScript ~5.9
- **UI**: React Native 0.81, React 19
- **애니메이션**: Lottie, React Native Reanimated
- **광고**: react-native-google-mobile-ads (AdMob)

## 🚀 시작하기

### 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn
- (안드로이드 빌드 시) Android Studio, JDK 17

### 설치
```bash
git clone https://github.com/yuwonkyu/random-nyamnyam.git
cd random-nyamnyam
npm install
```

### 실행
```bash
npm start          # Expo 개발 서버
npm run android    # 안드로이드 실행
npm run web        # 웹 실행
```

## 📂 프로젝트 구조

```
random-nyamnyam/
├── App.tsx                 # 메인 앱 컴포넌트
├── index.ts                # 진입점
├── app.json                # Expo 설정
├── eas.json                # EAS 빌드 설정
├── assets/                 # 이미지, 슬라임 아이콘 등
├── privacy-policy.html     # 개인정보처리방침
└── store-listing.md        # 플레이스토어 등록 정보
```

## 📦 빌드

EAS Build를 사용합니다.

```bash
eas build --platform android
```

## 📄 라이선스 / 저작권

© 2026 KKU Studio

## 🔗 링크

- [개인정보처리방침](https://yuwonkyu.github.io/random-nyamnyam/privacy-policy.html)
