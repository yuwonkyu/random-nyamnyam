import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, TABS, TabName } from '../constants';

type Props = {
  activeTab: TabName;
  onChange: (tab: TabName) => void;
};

export function CategoryTabs({ activeTab, onChange }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <Pressable
          key={tab}
          style={[styles.tab, activeTab === tab && styles.tabActive]}
          onPress={() => onChange(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.tabBg,
    borderRadius: 20,
    padding: 4,
    marginBottom: 4,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primarySoft,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});
