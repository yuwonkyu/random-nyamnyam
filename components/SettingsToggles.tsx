import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  sound: boolean;
  haptic: boolean;
  onToggleSound: () => void;
  onToggleHaptic: () => void;
};

export function SettingsToggles({
  sound,
  haptic,
  onToggleSound,
  onToggleHaptic,
}: Props) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.btn} onPress={onToggleSound} hitSlop={8}>
        <Text style={styles.icon}>{sound ? '🔊' : '🔇'}</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={onToggleHaptic} hitSlop={8}>
        <Text style={styles.icon}>{haptic ? '📳' : '📴'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    gap: 12,
    zIndex: 10,
  },
  btn: {
    padding: 4,
  },
  icon: {
    fontSize: 20,
  },
});
