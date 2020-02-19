import React from 'react';
import Countdown from '../../components/Countdown/Countdown';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function CountdownScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Hẹn giờ"
				component={Countdown}
				options={{headerShown: false}}
			/>
			{/* <Stack.Screen
				name="Hẹn giờ"
				component={Countdown}
				options={{headerShown: false}}
			/> */}
			{/* <Stack.Screen
				name="Hẹn giờ"
				component={Countdown}
				options={{headerShown: false}}
			/> */}
		</Stack.Navigator>
	);
}
