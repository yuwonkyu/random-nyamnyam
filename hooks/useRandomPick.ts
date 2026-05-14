import { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { SLIMES, Slime } from '../data/slimes';
import { TabName } from '../constants';

export function useRandomPick() {
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

  const pickRandom = () => {
    if (isPicking) return;
    setIsPicking(true);
    const pool = getPool(activeTab);

    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();

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
