import React from 'react'

import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from './utils/Colors'

import Header from './components/Header.js'
import InputText from './components/InputText.js'
import InputPassword from './components/InputPassword.js'
import MyButton from './components/MyButton.js'

class HomeScreen extends React.Component {
	state = {
		username: '',
		password: '',
		DID: ''
	}
	newInputValue = value => {
		this.setState({
			inputValue: value
		})
	}

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
						<Header title='Verifier Login' />
					</View>
					<View style={styles.inputContainer}>
						<InputText
							title='Username'
							value={this.state.username}
							onChangeText={username => this.setState({ username })}
						/>
					</View>
					<View style={styles.inputContainer}>
						<InputPassword
							title='Password'
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
						/>
					</View>
					<View style={styles.inputContainer}>
						<InputText
							title='Your DID'
							value={this.state.DID}
							onChangeText={DID => this.setState({ DID })}
						/>
					</View>
					<MyButton
						title='Submit'
						onPress={async next => {
							// Simulate server request
							await new Promise(resolve => setTimeout(resolve, 3000))
							next()
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
	},
	inputContainer: {
		marginTop: 40,
		paddingLeft: 15,
		width: '100%',
		height: 50
	}
})

export default HomeScreen
