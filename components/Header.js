// app/components/Header.js
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
const Header = ({ title }) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>{title.toUpperCase()}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		marginBottom: 40,
		width: 300
	},
	headerText: {
		color: 'white',
		fontSize: 22,
		fontWeight: '500',
		textAlign: 'center'
	}
})
export default Header
