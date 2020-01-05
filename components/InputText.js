// app/components/Input.js
import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, TextInput, View } from 'react-native'
import { inputPlaceholder } from '../utils/Colors'
const InputText = ({ title, inputValue, onChangeText, onDoneAddItem }) => (
	<Input
		placeholder={title}
		leftIcon={{ type: 'antdesign', name: 'smile-circle', color: 'grey' }}
		leftIconContainerStyle={{ marginRight: 5 }}
		onChangeText={onChangeText}
		value={inputValue}
	/> // <View style={styles.view}>
	// 	<TextInput
	// 		style={styles.input}
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
		fontFamily: 'Poppins-ExtraLight',
		paddingLeft: 15,
		paddingRight: 15,
		fontSize: 20,
		color: 'black',
		fontWeight: '500',
		textAlign: 'left',
		width: '100%'
	}
})
export default InputText
