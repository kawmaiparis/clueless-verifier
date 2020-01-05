// app/components/Input.js
import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, TextInput, View } from 'react-native'
import { inputPlaceholder } from '../utils/Colors'
const InputPassword = ({ title, inputValue, onChangeText, onDoneAddItem }) => (
	<Input
		placeholder={title}
		leftIcon={{ type: 'antdesign', name: 'key', color: 'grey' }}
		leftIconContainerStyle={{ marginRight: 5 }}
		secureTextEntry={true}
		onChangeText={onChangeText}
		value={inputValue}
	/>
	// <View style={styles.view}>
	// 	<TextInput
	// 		style={styles.input}
	// 		value={inputValue}
	// 		onChangeText={onChangeText}
	// 		placeholder={title + '.'}
	// 		placeholderTextColor={'black'}
	// 		multiline={true}
	// 		autoCapitalize='sentences'
	// 		underlineColorAndroid='transparent'
	// 		selectionColor={'white'}
	// 		maxLength={30}
	// 		returnKeyType='done'
	// 		autoCorrect={false}
	// 		blurOnSubmit={true}
	// 		secureTextEntry
	// 		onSubmitEditing={onDoneAddItem}
	// 	/>
	// </View>
)
const styles = StyleSheet.create({
	view: {
		// backgroundColor: 'red',
		// borderRadius: 20,
		borderBottomColor: 'black',
		borderBottomWidth: 1
	},
	input: {
		// paddingTop: 10,
		paddingLeft: 15,
		paddingRight: 15,
		fontSize: 20,
		color: 'black',
		fontWeight: '500',
		textAlign: 'left',
		width: '100%'
	}
})
export default InputPassword
