import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  sound: boolean;
  haptic: boolean;
  animation: boolean;
  onToggleSound: () => void;
  onToggleHaptic: () => void;
  onToggleAnimation: () => void;
};

export function SettingsMenu({
  sound,
  haptic,
  animation,
  onToggleSound,
  onToggleHaptic,
  onToggleAnimation,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.wrap}>
      <Pressable
        style={styles.menuBtn}
        onPress={() => setOpen((v) => !v)}
        hitSlop={8}
      >
        <Feather
          name={open ? 'x' : 'menu'}
          size={22}
          color={COLORS.primary}
        />
      </Pressable>

      {open && (
        <View style={styles.dropdown}>
          <Row
            label="🎰 룰렛 효과"
            value={animation}
            onValueChange={onToggleAnimation}
          />
          <Row label="🔊 소리" value={sound} onValueChange={onToggleSound} />
          <Row label="📳 진동" value={haptic} onValueChange={onToggleHaptic} />
        </View>
      )}
    </View>
  );
}

function Row({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: () => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLORS.tabBg, true: COLORS.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 56,
    right: 20,
    zIndex: 100,
    elevation: 100,
    alignItems: 'flex-end',
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.tabBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 4,
    width: 200,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});
