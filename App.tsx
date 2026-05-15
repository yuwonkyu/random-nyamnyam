import { StatusBar } from 'expo-status-bar';
import {
  Animated,
  Dimensions,
  Image,
  Linking,
  NativeModules,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ActionButtons } from './components/ActionButtons';
import { CategoryTabs } from './components/CategoryTabs';
import { SettingsMenu } from './components/SettingsMenu';
import { ADMOB_BANNER_ID, COLORS, KAKAOPAY_URL } from './constants';
import { useRandomPick } from './hooks/useRandomPick';
import { useSettings } from './hooks/useSettings';

const MobileAdsModule = NativeModules.RNGoogleMobileAdsModule
  ? require('react-native-google-mobile-ads')
  : null;

const BannerAd = MobileAdsModule?.BannerAd;
const BannerAdSize = MobileAdsModule?.BannerAdSize;

const { width } = Dimensions.get('window');

export default function App() {
  const settings = useSettings();
  const {
    current,
    isPicking,
    activeTab,
    setActiveTab,
    pickRandom,
    animatedStyle,
  } = useRandomPick({
    sound: settings.sound,
    haptic: settings.haptic,
    animation: settings.animation,
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>랜덤냠냠 🍱</Text>
        <Text style={styles.headerSub}>오늘 뭐 먹지?</Text>
      </View>

      <CategoryTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* 슬라임 카드 */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Animated.View style={[styles.slimeContainer, animatedStyle]}>
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

          <View style={styles.dot2} />

          <ActionButtons slime={current} disabled={isPicking} />
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
      {BannerAd && BannerAdSize ? (
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      ) : null}

      {/* 설정 메뉴 — 항상 최상단에 렌더링 */}
      <SettingsMenu
        sound={settings.sound}
        haptic={settings.haptic}
        animation={settings.animation}
        onToggleSound={settings.toggleSound}
        onToggleHaptic={settings.toggleHaptic}
        onToggleAnimation={settings.toggleAnimation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
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
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: COLORS.primarySoft,
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
    backgroundColor: COLORS.card,
    borderRadius: 32,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: COLORS.primary,
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
    color: COLORS.text,
    letterSpacing: -1,
  },

  // 배경 데코
  dot2: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.dot2,
  },

  // 버튼
  buttonArea: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 48,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  mainButtonPressed: {
    backgroundColor: COLORS.primaryPressed,
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
    color: COLORS.primarySoft,
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
    borderColor: COLORS.primarySoft,
  },
  tipText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
