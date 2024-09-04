// src/screen/CalendarScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeContext'; 

const CalendarScreen: React.FC = () => {
  const [selected, setSelected] = useState('');
  const { isDarkTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <Text style={[styles.header, { color: isDarkTheme ? '#fff' : '#000' }]}>
        Calendário
      </Text>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: isDarkTheme ? '#333' : '#fff',
          calendarBackground: isDarkTheme ? '#444' : '#fff',
          textSectionTitleColor: isDarkTheme ? '#ddd' : '#b6c1cd',
          selectedDayBackgroundColor: '#5218fa',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#5218fa',
          dayTextColor: isDarkTheme ? '#ddd' : '#2d4150', 
          arrowColor: 'purple',
        }}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'purple'}
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
  },
  calendar:{
    borderWidth:  1,
    borderColor: 'purple',
    marginHorizontal: 6,
    borderRadius: 10,
  },
  header:{
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    textAlign: 'center',
    paddingTop: 60,
    marginBottom: 12,
  }
});

export default CalendarScreen;
