/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function Control(props) {
	const {onStartOrCancel, onPauseOrContinue, start, pause} = props;
	return (
		<View style={styles.controlView}>
			<View style={styles.buttonView}>
				<TouchableOpacity
					onPress={onStartOrCancel}
					style={[styles.button, {backgroundColor: '#ff4d4d'}]}>
					<Text>{start ? 'Cancel' : 'Start'}</Text>
				</TouchableOpacity>
			</View>
			<View style={{height: 50, width: 20}} />
			<View style={styles.buttonView}>
				<TouchableOpacity
					disabled={start ? false : true}
					onPress={onPauseOrContinue}
					style={[
						styles.button,
						{backgroundColor: '#0099ff', opacity: start ? 1 : 0.2},
					]}>
					<Text>{pause ? 'Continue' : 'Pause'}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
