import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from '../utils/Colors'

import Header from '../components/Header.js'
import MyButton from '../components/ListElement.js'
import { serverIP } from '../utils/Config'

import Reddish from './../assets/svgs/secondA.svg'
import Darkish from './../assets/svgs/secondDark.svg'

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
		const username = navigation.getParam('username', 'default username')
		const password = navigation.getParam('password', 'default password')
		const DID = navigation.getParam('DID', 'default DID')

		return (
			<LinearGradient colors={['#f0f0f0', '#f0f0f0']} style={styles.container}>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<View style={styles.reddish}>
						<Reddish width={200} height={200} />
					</View>
					<View style={styles.darkish}>
						<Darkish width={200} height={200} />
					</View>

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
									username: username,
									password: password,
									DID: DID,
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
		width: 300,
		marginBottom: -40
	},
	reddish: {
		position: 'absolute',
		left: 0,
		top: 0
	},
	darkish: {
		position: 'absolute',
		right: 0,
		bottom: 0
	}
})

export default License
