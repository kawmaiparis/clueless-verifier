import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { primaryGradientArray } from '../utils/Colors'

import Header from '../components/Header.js'
import ProofButton from '../components/ProofButton.js'
import { serverIP } from '../utils/Config'

class Proof extends React.Component {
	state = {
		license: '',
		proofs: []
	}

	componentDidMount() {
		const { navigation } = this.props
		const license = navigation.getParam('license', 'No License was passed here')
		this.setState({ license }, this.getProofs)
	}

	getProofs = async () => {
		const url = `${serverIP}get-proofs?licence=${this.state.license}`
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
					this.setState({ proofs: response })
				} else {
					alert(`Error fetching Proofs.`)
				}
			})
			.catch(() => {
				alert('Error fetching Proofs.')
			})
	}
	render() {
		return (
			<LinearGradient colors={primaryGradientArray} style={styles.container}>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<View style={styles.centered}>
						<Header title={`Proofs for ${this.state.license}`} />
					</View>
					{this.state.proofs.map(proof => (
						<ProofButton
							key={proof}
							title={proof}
							onPress={async next => {
								await new Promise(resolve => setTimeout(resolve, 1000))
								next()
								this.props.navigation.navigate('Proof', {
									itemId: 86,
									otherParam: 'anything you want here',
									proof: proof
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

export default Proof
