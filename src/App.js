import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5';
import StopWatchScreen from './screens/StopWatchScreen/StopWatchScreen';
import AlarmScreen from './screens/AlarmScreen';
import CountdownScreen from './screens/CountdownScreen/CountdownScreen';

const Tab = createBottomTabNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Bấm giờ"
				screenOptions={({route}) => ({
					tabBarIcon: ({focused}) => {
						switch (route.name) {
							case 'Bấm giờ':
								return (
									<FontAwesome5Pro
										name="stopwatch"
										size={focused ? 30 : 20}
										color={focused ? 'tomato' : 'gray'}
									/>
								);
							case 'Báo thức':
								return (
									<FontAwesome5Pro
										name="bell"
										size={focused ? 30 : 20}
										color={focused ? 'tomato' : 'gray'}
									/>
								);
							case 'Hẹn giờ':
								return (
									<FontAwesome5Pro
										name="clock"
										size={focused ? 30 : 20}
										color={focused ? 'tomato' : 'gray'}
									/>
								);
						}
					},
				})}
				swipeEnabled={true}
				tabBarOptions={{
					activeTintColor: 'tomato',
					inactiveTintColor: 'gray',
					style: {
						backgroundColor: 'white',
					},
				}}>
				<Tab.Screen name="Bấm giờ" component={StopWatchScreen} />
				<Tab.Screen name="Báo thức" component={AlarmScreen} />
				<Tab.Screen name="Hẹn giờ" component={CountdownScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
