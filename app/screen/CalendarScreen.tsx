import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeContext';

const CalendarScreen: React.FC = () => {
  const [selected, setSelected] = useState<string>('');
  const { isDarkTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#FFFFFF' }]}>
      <Text style={[styles.header, { color: isDarkTheme ? '#FFFFFF' : '#000000' }]}>
        Calendário
      </Text>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: isDarkTheme ? '#333' : '#FFFFFF',
          calendarBackground: isDarkTheme ? '#444' : '#FFFFFF',
          textSectionTitleColor: isDarkTheme ? '#ddd' : '#b6c1cd',
          selectedDayBackgroundColor: '#5218fa',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#5218fa',
          dayTextColor: isDarkTheme ? '#ddd' : '#2d4150',
          arrowColor: '#5218fa',
          monthTextColor: isDarkTheme ? '#ddd' : '#2d4150',
          indicatorColor: '#5218fa',
        }}
        onDayPress={(day: any) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: '#5218fa',
            selectedColor: '#5218fa',
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#5218fa',
    borderRadius: 10,
    width: '100%',
  },
  header: {
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    textAlign: 'center',
    paddingVertical: 20,
  }
});

export default CalendarScreen;
