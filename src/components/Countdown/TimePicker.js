/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {WheelPicker} from 'react-native-wheel-picker-android';
import * as wheelState from './wheelState';

function TimeWheel(props) {
	const {select, data, onSelect} = props;
	return (
		<WheelPicker
			style={{width: 60}}
			isCyclic={true}
			selectedItemTextColor="#ff7800"
			selectedItemTextSize={24}
			itemTextColor="gray"
			itemTextSize={16}
			selectedItem={select}
			data={data}
			onItemSelected={onSelect}
		/>
	);
}

export default function TimePicker(props) {
	const {
		selectedHours,
		onSelectHours,
		selectedMinutes,
		onSelectMinutes,
		selectedSeconds,
		onSelectSeconds,
	} = props;
	return (
		<View style={styles.timePicker}>
			<TimeWheel
				select={selectedHours}
				data={wheelState.hours}
				onSelect={item => onSelectHours(item)}
			/>
			<WheelPicker
				style={{flex: 1}}
				selectedItemTextColor="#ff7800"
				selectedItemTextSize={24}
				data={wheelState.textHours}
			/>
			<TimeWheel
				select={selectedMinutes}
				data={wheelState.minutes}
				onSelect={item => onSelectMinutes(item)}
			/>
			<WheelPicker
				style={{flex: 1}}
				selectedItemTextColor="#ff7800"
				selectedItemTextSize={24}
				data={wheelState.textMinutes}
			/>
			<TimeWheel
				select={selectedSeconds}
				data={wheelState.seconds}
				onSelect={item => onSelectSeconds(item)}
			/>
			<WheelPicker
				style={{flex: 1}}
				selectedItemTextColor="#ff7800"
				selectedItemTextSize={24}
				data={wheelState.textSeconds}
			/>
		</View>
	);
}
