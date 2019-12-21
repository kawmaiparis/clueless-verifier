import React from 'react'
import BabyButton from 'react-native-really-awesome-button'
import { View } from 'react-native'
const MyButton = ({ title, onPress }) => (
	<View width='85%' style={{ marginTop: 40 }}>
		<BabyButton
			raiseLevel={6}
			activityColor='#FFFFFF'
			borderRadius={25}
			textSize={40}
			backgroundColor='#aad3ea'
			backgroundDarker='#57a9d4'
			backgroundPlaceholder='#8dbdd9'
			textColor='#2e84b1'
			backgroundProgress='#57a9d4'
			height={100}
			stretch
			progress
			onPress={next => {
				onPress(next)
			}}
		>
			{title.toUpperCase()}
		</BabyButton>
	</View>
)

export default MyButton
