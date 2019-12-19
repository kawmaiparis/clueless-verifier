// app/components/Input.js
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { inputPlaceholder } from '../utils/Colors'
const InputPassword = ({ title, inputValue, onChangeText, onDoneAddItem }) => (
	<TextInput
		style={styles.input}
		value={inputValue}
		onChangeText={onChangeText}
		placeholder={title + '.'}
		placeholderTextColor={inputPlaceholder}
		multiline={true}
		autoCapitalize='sentences'
		underlineColorAndroid='transparent'
		selectionColor={'white'}
		maxLength={30}
		returnKeyType='done'
		autoCorrect={false}
		blurOnSubmit={true}
		secureTextEntry={true}
		onSubmitEditing={onDoneAddItem}
	/>
)
const styles = StyleSheet.create({
	input: {
		paddingTop: 10,
		paddingRight: 15,
		fontSize: 34,
		color: 'white',
		fontWeight: '500',
		textAlign: 'left',
		width: '100%'
	}
})
export default InputPassword
