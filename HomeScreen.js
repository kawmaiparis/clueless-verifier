import React from 'react'

import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from './utils/Colors'

import Header from './components/Header.js'

class HomeScreen extends React.Component {
	static navigationOptions = {
		headerTransparent: true
	}

	render() {
		return (
			<LinearGradient colors={primaryGradientArray} style={styles.container}>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<StatusBar barStyle='light-content' />
					<View style={styles.centered}>
						<Header title='HomeScreen' />
					</View>
					<Button
						title='Go to Details'
						onPress={() => {
							/* 1. Navigate to the Details route with params */
							this.props.navigation.navigate('Details', {
								itemId: 86,
								otherParam: 'anything you want here'
							})
						}}
					/>
				</View>
			</LinearGradient>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	centered: {
		alignItems: 'center',
		width: 300
	}
})

export default HomeScreen
