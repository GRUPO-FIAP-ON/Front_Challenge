// FilterBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type FilterType = 'all' | 'unread' | 'flagged' | 'pinned' | 'attachments';

interface FilterBarProps {
  currentFilter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, onChangeFilter }) => {
  const filters = [
    { label: 'Todos', type: 'all' },
    { label: 'Não Lidos', type: 'unread' },
    { label: 'Sinalizados', type: 'flagged' },
    { label: 'Fixos', type: 'pinned' },
    { label: 'Com Anexos', type: 'attachments' },
  ];

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.type}
          style={[
            styles.button,
            currentFilter === filter.type && styles.activeButton,
          ]}
          onPress={() => onChangeFilter(filter.type as FilterType)}
        >
          <Text
            style={[
              styles.buttonText,
              currentFilter === filter.type && styles.activeButtonText,
            ]}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  activeButton: {
    backgroundColor: '#6200EA',
  },
  buttonText: {
    color: '#383838',
    fontSize: 14,
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
});

export default FilterBar;
