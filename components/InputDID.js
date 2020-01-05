// app/components/Input.js
import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet } from 'react-native'
const InputDID = ({ title, inputValue, onChangeText, onDoneAddItem }) => (
	<Input
		placeholder={title}
		leftIcon={{ type: 'antdesign', name: 'questioncircle', color: 'grey' }}
		leftIconContainerStyle={{ marginRight: 5 }}
		onChangeText={onChangeText}
		value={inputValue}
	/>
)

export default InputDID
