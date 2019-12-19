import React from 'react'
import { Button, View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen.js'

const RootStack = createStackNavigator(
	{
		Home: HomeScreen,
		Details: DetailsScreen
	},
	{
		initialRouteName: 'Home',
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
