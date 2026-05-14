import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

let tickSound: Audio.Sound | null = null;
let dingSound: Audio.Sound | null = null;
let isLoading = false;

async function loadSounds() {
  if (isLoading || (tickSound && dingSound)) return;
  isLoading = true;
  try {
    const tick = await Audio.Sound.createAsync(
      require('../assets/sounds/tick.mp3'),
      { volume: 0.5 }
    );
    tickSound = tick.sound;
    const ding = await Audio.Sound.createAsync(
      require('../assets/sounds/ding.mp3'),
      { volume: 0.7 }
    );
    dingSound = ding.sound;
  } catch {
    // 사운드 파일 없으면 조용히 무시
  } finally {
    isLoading = false;
  }
}

export async function playTick(enabled: boolean) {
  if (!enabled) return;
  try {
    if (!tickSound) await loadSounds();
    await tickSound?.replayAsync();
  } catch {}
}

export async function playDing(enabled: boolean) {
  if (!enabled) return;
  try {
    if (!dingSound) await loadSounds();
    await dingSound?.replayAsync();
  } catch {}
}

export function hapticTick(enabled: boolean) {
  if (!enabled) return;
  Haptics.selectionAsync();
}

export function hapticDing(enabled: boolean) {
  if (!enabled) return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}
