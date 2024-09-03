import React, { useState } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { View, Text, StyleSheet } from 'react-native';

const CalendarScreen: React.FC = () => {
  const [selected, setSelected] = useState('');

  return (
    <View>
      <Text
      style={styles.header}>Calendário</Text>
      <Calendar
    style={styles.calendar}
      theme={{
      backgroundColor: '#ffffff',
      calendarBackground: '#ffffff',
      textSectionTitleColor: '#b6c1cd',
      selectedDayBackgroundColor: '#5218fa',
      selectedDayTextColor: '#ffffff',
      todayTextColor: '#5218fa',
      dayTextColor: '#2d4150', 
      arrowColor: 'purple'
    }}
      onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
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
  text: {
    fontSize: 18,
    fontFamily: 'Ubuntu_400Regular',
  },
  calendar:{
    borderWidth:  1,
    borderColor: 'purple',
    marginHorizontal: 6,
    borderRadius: 10,
  },
  header:{
    fontSize: 18,
    fontFamily: 'Ubuntu',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 60,
    marginBottom: 12,
    backgroundColor: 'white',
    flex: 1,
    padding: 30,
  }
});

export default CalendarScreen;
