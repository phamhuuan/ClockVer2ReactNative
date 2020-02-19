/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function Control(props) {
	const {
		onStartOrStop,
		isStart,
		onResetOrAddLap,
		onSortLap,
		reset,
		onSortTime,
		buttonName,
	} = props;
	return (
		<View style={styles.controlView}>
			<View style={{flexDirection: 'row'}}>
				<View style={styles.buttonView}>
					<TouchableOpacity
						onPress={onStartOrStop}
						style={[
							styles.startButton,
							{backgroundColor: isStart ? 'green' : 'red'},
						]}>
						<Text>{isStart ? 'Pause' : 'Start'}</Text>
					</TouchableOpacity>
				</View>
				<View style={{height: 50, width: 20}} />
				<View style={styles.buttonView}>
					<TouchableOpacity
						onPress={onResetOrAddLap}
						disabled={reset}
						style={[styles.resetButton, {opacity: reset ? 0.2 : 1}]}>
						<Text>{isStart ? '+Lap' : 'Reset'}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{height: 20}} />
			<View style={{flexDirection: 'row'}}>
				<View style={styles.buttonView}>
					<TouchableOpacity
						onPress={onSortLap}
						style={[styles.startButton, {backgroundColor: '#ff8500'}]}>
						<Text>Sort by lap</Text>
					</TouchableOpacity>
				</View>
				<View style={{height: 50, width: 20}} />
				<View style={styles.buttonView}>
					<TouchableOpacity
						onPress={onSortTime}
						style={[styles.resetButton, {backgroundColor: '#ff8500'}]}>
						<Text>{buttonName}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
