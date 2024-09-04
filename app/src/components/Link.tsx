import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LinkProps {
  title: string;
  onPress: () => void;
}

const Link: React.FC<LinkProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#6200EE',
    marginTop: 10,
  },
});

export default Link;
