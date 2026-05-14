import { Pressable, StyleSheet, Text, View } from 'react-native';
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
    <View style={styles.row}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
        onPress={() => shareSlime(slime)}
        disabled={disabled}
      >
        <Text style={styles.text}>📤 공유</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
        onPress={() => openKakaoMap(slime.name)}
        disabled={disabled}
      >
        <Text style={styles.text}>🗺️ 근처 찾기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: COLORS.tabBg,
  },
  buttonPressed: {
    backgroundColor: COLORS.dot3,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
