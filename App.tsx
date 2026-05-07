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

// 🍱 슬라임 캐릭터 데이터 (카테고리 추가)
const SLIMES = [
  { id: 'a1', name: '초밥', emoji: '🍣', category: '음식', image: require('./assets/slimes/a1_sushi.png') },
  { id: 'a2', name: '파스타', emoji: '🍝', category: '음식', image: require('./assets/slimes/a2_pasta.png') },
  { id: 'a3', name: '삼겹살', emoji: '🥓', category: '음식', image: require('./assets/slimes/a3_samgyeopsal.png') },
  { id: 'a4', name: '커피', emoji: '☕', category: '디저트', image: require('./assets/slimes/a4_coffee.png') },
  { id: 'a5', name: '아이스크림', emoji: '🍦', category: '디저트', image: require('./assets/slimes/a5_icecream.png') },
  { id: 'b1', name: '피자', emoji: '🍕', category: '음식', image: require('./assets/slimes/b1_pizza.png') },
  { id: 'b2', name: '치킨', emoji: '🍗', category: '음식', image: require('./assets/slimes/b2_chicken.png') },
  { id: 'b3', name: '떡볶이', emoji: '🌶️', category: '음식', image: require('./assets/slimes/b3_tteokbokki.png') },
  { id: 'b4', name: '라멘', emoji: '🍜', category: '음식', image: require('./assets/slimes/b4_ramen.png') },
  { id: 'b5', name: '짜장면', emoji: '🍲', category: '음식', image: require('./assets/slimes/b5_jjajang.png') },
  { id: 'c1', name: '비빔밥', emoji: '🥗', category: '음식', image: require('./assets/slimes/c1-bibimbab.png') },
  { id: 'd01', name: '김밥', emoji: '🍙', category: '음식', image: require('./assets/slimes/d01_gimbap.png') },
  { id: 'd02', name: '순대', emoji: '🌭', category: '음식', image: require('./assets/slimes/d02_soondae.png') },
  { id: 'd03', name: '튀김', emoji: '🍤', category: '음식', image: require('./assets/slimes/d03_twigim.png') },
  { id: 'd04', name: '우동', emoji: '🍜', category: '음식', image: require('./assets/slimes/d04_udon.png') },
  { id: 'd05', name: '샌드위치', emoji: '🥪', category: '음식', image: require('./assets/slimes/d05_sandwich.png') },
  { id: 'd06', name: '라면', emoji: '🍜', category: '음식', image: require('./assets/slimes/d06_ramyeon.png') },
  { id: 'd07', name: '곱창', emoji: '🥩', category: '음식', image: require('./assets/slimes/d07_gopchang.png') },
  { id: 'd08', name: '보쌈', emoji: '🥬', category: '음식', image: require('./assets/slimes/d08_bossam.png') },
  { id: 'd09', name: '짬뽕', emoji: '🍲', category: '음식', image: require('./assets/slimes/d09_jjambbong.png') },
  { id: 'd10', name: '탕수육', emoji: '🍖', category: '음식', image: require('./assets/slimes/d10_tangsuyuk.png') },
  { id: 'd11', name: '식빵', emoji: '🍞', category: '디저트', image: require('./assets/slimes/d11_sikppang.png') },
  { id: 'd12', name: '만두', emoji: '🥟', category: '음식', image: require('./assets/slimes/d12_mandu.png') },
  { id: 'd13', name: '마라탕', emoji: '🌶️', category: '음식', image: require('./assets/slimes/d13_maratang.png') },
  { id: 'd14', name: '마라샹궈', emoji: '🥘', category: '음식', image: require('./assets/slimes/d14_marashangguo.png') },
  { id: 'd15', name: '솜사탕', emoji: '🍭', category: '디저트', image: require('./assets/slimes/d15_솜사탕.png') },
  { id: 'd16', name: '쌀국수', emoji: '🍜', category: '음식', image: require('./assets/slimes/d16_ssalnoodle.png') },
  { id: 'd17', name: '김치볶음밥', emoji: '🍳', category: '음식', image: require('./assets/slimes/d17_kimchifry.png') },
  { id: 'e01', name: '불고기', emoji: '🥩', category: '음식', image: require('./assets/slimes/e01_bulgogi.png') },
  { id: 'e02', name: '냉면', emoji: '🍜', category: '음식', image: require('./assets/slimes/e02_naengmyeon.png') },
  { id: 'e03', name: '된장찌개', emoji: '🍲', category: '음식', image: require('./assets/slimes/e03_doenjang.png') },
  { id: 'e04', name: '김치찌개', emoji: '🍲', category: '음식', image: require('./assets/slimes/e04_kimchijjigae.png') },
];

const TABS = ['전체', '음식', '디저트'];

export default function App() {
  const [current, setCurrent] = useState(SLIMES[0]);
  const [isPicking, setIsPicking] = useState(false);
  const [activeTab, setActiveTab] = useState('전체');

  // 애니메이션 값들
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const getFilteredSlimes = () => {
    if (activeTab === '전체') return SLIMES;
    return SLIMES.filter((s) => s.category === activeTab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const filtered = tab === '전체' ? SLIMES : SLIMES.filter((s) => s.category === tab);
    if (filtered.length > 0) {
      setCurrent(filtered[Math.floor(Math.random() * filtered.length)]);
    }
  };

  const pickRandom = () => {
    if (isPicking) return;
    setIsPicking(true);
    const pool = getFilteredSlimes();

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
      const others = pool.filter((s) => s.id !== current.id);
      const list = others.length > 0 ? others : pool;
      const next = list[Math.floor(Math.random() * list.length)];
      setCurrent(next);

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

      {/* 카테고리 탭 */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => handleTabChange(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 슬라임 카드 */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
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

          <View style={styles.nameContainer}>
            <Text style={styles.foodEmoji}>{current.emoji}</Text>
            <Text style={styles.foodName}>{current.name}</Text>
          </View>

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

  // 카테고리 탭
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFE8E4',
    borderRadius: 20,
    padding: 4,
    marginBottom: 4,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  tabActive: {
    backgroundColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFAB9A',
  },
  tabTextActive: {
    color: '#FFFFFF',
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
