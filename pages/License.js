import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from '../utils/Colors'

import Header from '../components/Header.js'
import MyButton from '../components/MyButton.js'
import { serverIP } from '../utils/Config'

class License extends React.Component {
	state = {
		licenses: []
	}

	componentDidMount() {
		this.getLicenses()
	}

	getLicenses = async () => {
		const url = `${serverIP}get-licence-type`
		await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === undefined) {
					this.setState({ licenses: response })
				} else {
					alert(`Error fetching Licenses.`)
				}
			})
			.catch(() => {
				alert('Error fetching Licenses.')
			})
	}

	render() {
		/* 2. Get the param, provide a fallback value if not available */
		const { navigation } = this.props
		const itemId = navigation.getParam('itemId', 'NO-ID')
		const otherParam = navigation.getParam('otherParam', 'some default value')

		return (
			<LinearGradient colors={primaryGradientArray} style={styles.container}>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<View style={styles.centered}>
						<Header title='Choose your License' />
					</View>
					{this.state.licenses.map(license => (
						<MyButton
							key={license}
							title={license}
							onPress={async next => {
								await new Promise(resolve => setTimeout(resolve, 1000))
								next()
								this.props.navigation.navigate('Proof', {
									itemId: 86,
									otherParam: 'anything you want here',
									license: license
								})
							}}
						/>
					))}
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

export default License
