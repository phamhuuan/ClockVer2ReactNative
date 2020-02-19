/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default function ShowTime(props) {
	const {stopWatch} = props;
	return (
		<View style={styles.body}>
			<Text style={{fontSize: 50}}>{stopWatch}</Text>
		</View>
	);
}
