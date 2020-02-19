/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {handleTime} from './handle';

export default function ShowTime(props) {
	const {time} = props;
	return (
		<View style={styles.countdown}>
			<View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{fontSize: 50}}>{handleTime(time)}</Text>
			</View>
			<View style={{flex: 2}} />
		</View>
	);
}
