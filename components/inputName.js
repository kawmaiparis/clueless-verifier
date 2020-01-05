// app/components/Input.js
import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, TextInput, View } from 'react-native'
import { inputPlaceholder } from '../utils/Colors'
const InputName = ({ title, inputValue, onChangeText, onDoneAddItem }) => (
	<Input
		placeholder={title}
		leftIcon={{
			type: 'antdesign',
			name: 'meho',
			color: 'grey'
		}}
		leftIconContainerStyle={{ marginRight: 5 }}
		inputStyle={styles.input}
		onChangeText={onChangeText}
		value={inputValue}
		// color={white}
	/>
)
const styles = StyleSheet.create({
	input: {
		color: 'white'
	}
})

export default InputName
