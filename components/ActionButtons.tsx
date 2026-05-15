import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { Slime } from '../data/slimes';
import { openKakaoMap } from '../utils/map';
import { shareSlime } from '../utils/share';

type Props = {
  slime: Slime;
  disabled?: boolean;
};

export function ActionButtons({ slime, disabled }: Props) {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.btn,
          styles.shareBtn,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
        onPress={() => shareSlime(slime)}
        disabled={disabled}
        hitSlop={6}
      >
        <Feather name="share-2" size={18} color={COLORS.primary} />
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.btn,
          styles.mapBtn,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
        onPress={() => openKakaoMap(slime.name)}
        disabled={disabled}
        hitSlop={6}
      >
        <Feather name="map-pin" size={18} color={COLORS.primary} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    top: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.tabBg,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  shareBtn: {
    left: 14,
  },
  mapBtn: {
    right: 14,
  },
  pressed: {
    backgroundColor: COLORS.dot3,
  },
  disabled: {
    opacity: 0.4,
  },
});
