import React from 'react'
import BabyButton from 'react-native-really-awesome-button'
import { View } from 'react-native'
const MyButton = ({ title, onPress }) => (
	<View width='85%' style={{ marginTop: 40 }}>
		<BabyButton
			raiseLevel={6}
			activityColor='#fff'
			borderRadius={25}
			textSize={20}
			backgroundColor='#EE3253'
			backgroundDarker='#fff'
			backgroundPlaceholder='#8dbdd9'
			textColor='#fff'
			backgroundProgress='#fff'
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
