/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ReactNativeAN from 'react-native-alarm-notification';

const fireDate = '13-02-2020 12:02:00'; // set exact date time | Format: dd-MM-yyyy HH:mm:ss

const alarmNotifData = {
	id: '12345', // Required
	title: 'My Notification Title', // Required
	message: 'My Notification Message', // Required
	channel: 'my_channel_id', // Required. Same id as specified in MainApplication's onCreate method
	ticker: 'My Notification Ticker',
	auto_cancel: true, // default: true
	vibrate: true,
	vibration: 100, // default: 100, no vibration if vibrate: false
	small_icon: 'ic_launcher', // Required
	large_icon: 'ic_launcher',
	play_sound: true,
	sound_name: 'twinbellalarmclock.mp3', // Plays custom notification ringtone if sound_name: null
	color: 'red',
	schedule_once: true, // Works with ReactNativeAN.scheduleAlarm so alarm fires once
	tag: 'some_tag',
	fire_date: fireDate, // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.

	// You can add any additional data that is important for the notification
	// It will be added to the PendingIntent along with the rest of the bundle.
	// e.g.
	data: {foo: 'bar'},
};

export default function StopWatch() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Báo thức</Text>
			</View>
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{fontSize: 30}}>Comming soon</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: 65,
		backgroundColor: '#eceff1',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
