import { Share } from 'react-native';
import { Slime } from '../data/slimes';

export async function shareSlime(slime: Slime) {
  try {
    await Share.share({
      message: `오늘 뭐 먹지? ${slime.emoji} ${slime.name} 어때요?\n랜덤냠냠에서 뽑았어요 🎲`,
    });
  } catch {
    // 사용자가 취소하면 무시
  }
}
