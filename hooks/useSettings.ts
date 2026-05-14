import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const KEY_SOUND = '@settings:sound';
const KEY_HAPTIC = '@settings:haptic';

export function useSettings() {
  const [sound, setSound] = useState(true);
  const [haptic, setHaptic] = useState(true);

  useEffect(() => {
    (async () => {
      const [s, h] = await Promise.all([
        AsyncStorage.getItem(KEY_SOUND),
        AsyncStorage.getItem(KEY_HAPTIC),
      ]);
      if (s !== null) setSound(s === 'true');
      if (h !== null) setHaptic(h === 'true');
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

  return { sound, haptic, toggleSound, toggleHaptic };
}
