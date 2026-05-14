import { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { SLIMES, Slime } from '../data/slimes';
import { TabName } from '../constants';
import { hapticDing, hapticTick, playDing, playRoll, stopRoll } from '../utils/feedback';

type Options = {
  sound: boolean;
  haptic: boolean;
  animation: boolean;
};

export function useRandomPick({ sound, haptic, animation }: Options) {
  const [current, setCurrent] = useState<Slime>(SLIMES[0]);
  const [isPicking, setIsPicking] = useState(false);
  const [activeTab, setActiveTabState] = useState<TabName>('전체');

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const getPool = (tab: TabName) =>
    tab === '전체' ? SLIMES : SLIMES.filter((s) => s.category === tab);

  const setActiveTab = (tab: TabName) => {
    setActiveTabState(tab);
    const pool = getPool(tab);
    if (pool.length > 0) {
      setCurrent(pool[Math.floor(Math.random() * pool.length)]);
    }
  };

  const pickSimple = (pool: Slime[]) => {
    // 짧은 흔들기 + 즉시 교체
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start(() => {
      const next = pool[Math.floor(Math.random() * pool.length)];
      setCurrent(next);
      hapticTick(haptic);

      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsPicking(false);
      });
    });
  };

  const pickRoulette = (pool: Slime[]) => {
    playRoll(sound);

    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();

    const intervals = [60, 60, 70, 80, 90, 110, 130, 160, 200, 250, 320, 420];
    let step = 0;

    const tick = () => {
      const next = pool[Math.floor(Math.random() * pool.length)];
      setCurrent(next);
      hapticTick(haptic);

      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.92, duration: 40, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 40, useNativeDriver: true }),
      ]).start();

      step++;
      if (step < intervals.length) {
        setTimeout(tick, intervals[step]);
      } else {
        stopRoll();
        hapticDing(haptic);
        playDing(sound);

        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 200,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(bounceAnim, { toValue: -24, duration: 200, useNativeDriver: true }),
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
      }
    };

    setTimeout(tick, intervals[0]);
  };

  const pickRandom = () => {
    if (isPicking) return;
    const pool = getPool(activeTab);
    if (pool.length === 0) return;
    setIsPicking(true);

    if (animation) {
      pickRoulette(pool);
    } else {
      pickSimple(pool);
    }
  };

  const animatedStyle = {
    transform: [
      { scale: scaleAnim },
      { translateY: bounceAnim },
      { translateX: shakeAnim },
    ],
    opacity: fadeAnim,
  };

  return {
    current,
    isPicking,
    activeTab,
    setActiveTab,
    pickRandom,
    animatedStyle,
  };
}
