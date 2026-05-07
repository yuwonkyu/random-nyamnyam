import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const ADMOB_BANNER_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-6359377859402977/4573701257';

const KAKAOPAY_URL = 'https://qr.kakaopay.com/FQKB2yNrE';

const { width } = Dimensions.get('window');

// 🍱 슬라임 캐릭터 데이터
const SLIMES = [
  { id: 'a1', name: '초밥', emoji: '🍣', image: require('./assets/slimes/a1_sushi.png') },
  { id: 'a2', name: '파스타', emoji: '🍝', image: require('./assets/slimes/a2_pasta.png') },
  { id: 'a3', name: '삼겹살', emoji: '🥓', image: require('./assets/slimes/a3_samgyeopsal.png') },
  { id: 'a4', name: '커피', emoji: '☕', image: require('./assets/slimes/a4_coffee.png') },
  { id: 'a5', name: '아이스크림', emoji: '🍦', image: require('./assets/slimes/a5_icecream.png') },
  { id: 'b1', name: '피자', emoji: '🍕', image: require('./assets/slimes/b1_pizza.png') },
  { id: 'b2', name: '치킨', emoji: '🍗', image: require('./assets/slimes/b2_chicken.png') },
  { id: 'b3', name: '떡볶이', emoji: '🌶️', image: require('./assets/slimes/b3_tteokbokki.png') },
  { id: 'b4', name: '라멘', emoji: '🍜', image: require('./assets/slimes/b4_ramen.png') },
  { id: 'b5', name: '짜장면', emoji: '🍲', image: require('./assets/slimes/b5_jjajang.png') },
  { id: 'c1', name: '비빔밥', emoji: '🥗', image: require('./assets/slimes/c1-bibimbab.png') },
];

export default function App() {
  const [current, setCurrent] = useState(SLIMES[0]);
  const [isPicking, setIsPicking] = useState(false);

  // 애니메이션 값들
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const bgColorAnim = useRef(new Animated.Value(0)).current;

  const pickRandom = () => {
    if (isPicking) return;
    setIsPicking(true);

    // 흔들기 애니메이션
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();

    // 스케일 + 페이드
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 랜덤 선택
      const others = SLIMES.filter((s) => s.id !== current.id);
      const next = others[Math.floor(Math.random() * others.length)];
      setCurrent(next);

      // 바운스로 등장
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 200,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: -20, duration: 200, useNativeDriver: true }),
          Animated.spring(bounceAnim, {
            toValue: 0,
            friction: 5,
            tension: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setIsPicking(false);
      });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>랜덤냠냠 🍱</Text>
        <Text style={styles.headerSub}>오늘 뭐 먹지?</Text>
      </View>

      {/* 슬라임 카드 */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {/* 슬라임 이미지 */}
          <Animated.View
            style={[
              styles.slimeContainer,
              {
                transform: [
                  { scale: scaleAnim },
                  { translateY: bounceAnim },
                  { translateX: shakeAnim },
                ],
                opacity: fadeAnim,
              },
            ]}
          >
            <Image
              source={current.image}
              style={styles.slimeImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* 음식 이름 */}
          <View style={styles.nameContainer}>
            <Text style={styles.foodEmoji}>{current.emoji}</Text>
            <Text style={styles.foodName}>{current.name}</Text>
          </View>

          {/* 배경 데코 도트 */}
          <View style={styles.dot1} />
          <View style={styles.dot2} />
          <View style={styles.dot3} />
        </View>
      </View>

      {/* 버튼 영역 */}
      <View style={styles.buttonArea}>
        <Pressable
          style={({ pressed }) => [
            styles.mainButton,
            pressed && styles.mainButtonPressed,
          ]}
          onPress={pickRandom}
          disabled={isPicking}
        >
          <Text style={styles.mainButtonText}>
            {isPicking ? '뽑는 중...' : '냠냠 뽑기! 🎲'}
          </Text>
        </Pressable>

        <Text style={styles.hint}>버튼을 눌러서 오늘의 메뉴를 뽑아봐요</Text>
      </View>

      {/* 하단 슬라임 카운터 */}
      <View style={styles.counter}>
        {SLIMES.map((s) => (
          <View
            key={s.id}
            style={[styles.dot, s.id === current.id && styles.dotActive]}
          />
        ))}
      </View>

      {/* 팁jar 버튼 */}
      <Pressable
        onPress={() => Linking.openURL(KAKAOPAY_URL)}
        style={styles.tipButton}
      >
        <Text style={styles.tipText}>☕ 슬라임한테 밥 사주기</Text>
      </Pressable>

      {/* 배너 광고 */}
      <BannerAd
        unitId={ADMOB_BANNER_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },

  // 헤더
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF6B6B',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: '#FFAB9A',
    marginTop: 2,
    fontWeight: '500',
  },

  // 카드
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },

  // 슬라임
  slimeContainer: {
    width: width * 0.55,
    height: width * 0.55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slimeImage: {
    width: '100%',
    height: '100%',
  },

  // 음식 이름
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  foodEmoji: {
    fontSize: 28,
    marginRight: 8,
  },
  foodName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D2D2D',
    letterSpacing: -1,
  },

  // 배경 데코
  dot1: {
    position: 'absolute',
    top: 16,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0ED',
  },
  dot2: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFE8E4',
  },
  dot3: {
    position: 'absolute',
    top: 50,
    left: 24,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFDDD6',
  },

  // 버튼
  buttonArea: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  mainButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 48,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  mainButtonPressed: {
    backgroundColor: '#E85E5E',
    transform: [{ scale: 0.97 }],
    shadowOpacity: 0.15,
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  hint: {
    fontSize: 13,
    color: '#FFAB9A',
    textAlign: 'center',
    marginTop: 12,
  },

  // 도트 인디케이터
  counter: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD5CC',
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: '#FF6B6B',
    width: 18,
  },

  // 팁jar
  tipButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FFAB9A',
  },
  tipText: {
    fontSize: 13,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});
