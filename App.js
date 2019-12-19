import React from 'react'
import { Button, View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './Login'
import DetailsScreen from './DetailsScreen.js'

/* LOGIN ->  LICENSES -> SCHEMA -> PROOFS -> SHOW QR -> READER */

const RootStack = createStackNavigator(
	{
		Login: Login,
		Details: DetailsScreen
	},
	{
		initialRouteName: 'Login',
		defaultNavigationOptions: {
			headerTransparent: true
		}
	}
)

const AppContainer = createAppContainer(RootStack)

export default class App extends React.Component {
	render() {
		return <AppContainer />
	}
}
