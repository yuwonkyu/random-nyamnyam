import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const KEY_SOUND = '@settings:sound';
const KEY_HAPTIC = '@settings:haptic';
const KEY_ANIMATION = '@settings:animation';

export function useSettings() {
  const [sound, setSound] = useState(true);
  const [haptic, setHaptic] = useState(true);
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    (async () => {
      const [s, h, a] = await Promise.all([
        AsyncStorage.getItem(KEY_SOUND),
        AsyncStorage.getItem(KEY_HAPTIC),
        AsyncStorage.getItem(KEY_ANIMATION),
      ]);
      if (s !== null) setSound(s === 'true');
      if (h !== null) setHaptic(h === 'true');
      if (a !== null) setAnimation(a === 'true');
    })();
  }, []);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    AsyncStorage.setItem(KEY_SOUND, String(next));
  };

  const toggleHaptic = () => {
    const next = !haptic;
    setHaptic(next);
    AsyncStorage.setItem(KEY_HAPTIC, String(next));
  };

  const toggleAnimation = () => {
    const next = !animation;
    setAnimation(next);
    AsyncStorage.setItem(KEY_ANIMATION, String(next));
  };

  return {
    sound,
    haptic,
    animation,
    toggleSound,
    toggleHaptic,
    toggleAnimation,
  };
}
