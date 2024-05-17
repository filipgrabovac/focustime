import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import {spacing} from "../utils/sizes";

export const Focus = ({addSubject}) => {
  const [inputValue, setInputValue] = useState('');
  const styles = StyleSheet.create({
    container: {
    },
    inputContainer: {
      flexDirection: 'row',
      padding: spacing.lg,
      justifyContent: 'center',
    },
    textInput: {
      flex: 1,
      marginRight: spacing.sm,
    },
    button: {
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setInputValue}
          style={styles.textInput}
          label="What would you like to focus on?"
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={50} onPress={()=>{addSubject(inputValue)}} />
        </View>
      </View>
    </View>
  );
};

// react-native-paper library for input components and stuff
