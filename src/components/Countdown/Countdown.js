/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles';
import Header from './Header';
import storage from '../../storage';
import TimePicker from './TimePicker';
import Control from './Control';
import ShowTime from './ShowTime';
import {scheduleNotification, cancelNotification} from './handle';
import ViewPager from '@react-native-community/viewpager';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let dataRaw = [
	{
		id: 1,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 2,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 3,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 4,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 5,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 6,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 7,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 8,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 9,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 10,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 11,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 12,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 13,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 14,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 15,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 16,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 17,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 18,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 19,
		time: 1400,
		name: 'Rán trứng',
	},
];
let datas = [];
export default function Countdown() {
	const [selectedHours, setSelectedHours] = useState(0);
	const [selectedMinutes, setSelectedMinutes] = useState(2);
	const [selectedSeconds, setSelectedSeconds] = useState(0);
	const [start, setStart] = useState(false);
	const [pause, setPause] = useState(false);
	const [time, setTime] = useState(0);
	const [expectedTime, setExpectedTime] = useState(null);
	const [selectedPage, setSelectedPage] = useState(0);
	const viewPager = useRef();
	useEffect(() => {
		if (selectedHours === 0 && selectedMinutes === 0 && selectedSeconds === 0) {
			setSelectedSeconds(1);
		}
	}, [selectedHours, selectedMinutes, selectedSeconds]);
	useEffect(() => {
		async function getExpectedTime() {
			let tmpExpectedTime = await storage.get('time-expected-countdown');
			tmpExpectedTime =
				tmpExpectedTime === null || tmpExpectedTime === 'NaN'
					? 0
					: JSON.parse(tmpExpectedTime);
			let tmpTimeLeft = await storage.get('time-left-countdown');
			let tmpNow = Math.round(new Date().getTime() / 1000);
			if (tmpNow >= tmpExpectedTime && tmpExpectedTime !== 0) {
				await storage.set('start-countdown', JSON.stringify(false));
				await storage.set('pause-countdown', JSON.stringify(false));
				setStart(false);
				setPause(false);
			} else if (tmpNow < tmpExpectedTime) {
				setTime(tmpExpectedTime - tmpNow);
				await storage.set(
					'time-left-countdown',
					JSON.stringify(tmpExpectedTime - tmpNow),
				);
				await storage.set('start-countdown', JSON.stringify(true));
				await storage.set('pause-countdown', JSON.stringify(false));
				setStart(true);
				setPause(false);
				setExpectedTime(tmpExpectedTime);
			} else if (JSON.parse(tmpTimeLeft) > 0 && tmpExpectedTime === 0) {
				setTime(JSON.parse(tmpTimeLeft));
				await storage.set('start-countdown', JSON.stringify(true));
				await storage.set('pause-countdown', JSON.stringify(true));
				setStart(true);
				setPause(true);
			}
		}
		getExpectedTime();
	}, []);
	useEffect(() => {
		let interval;
		if (start && time >= 0 && !pause) {
			interval = setInterval(() => {
				async function getTime() {
					if (time <= 1) {
						setTime(0);
						setStart(false);
						setPause(false);
						setExpectedTime(null);
						await storage.remove('time-left-countdown');
						await storage.set('start-countdown', JSON.stringify(false));
						await storage.set('pause-countdown', JSON.stringify(false));
						await storage.remove('time-expected-countdown');
					} else {
						let tmp = JSON.parse(await storage.get('time-expected-countdown'));
						tmp = tmp - Math.round(new Date().getTime() / 1000);
						setTime(tmp);
					}
				}
				getTime();
			}, 300);
		}
		return () => clearInterval(interval);
	}, [expectedTime, pause, start, time]);
	function onSelectHours(item) {
		setSelectedHours(item);
	}
	function onSelectMinutes(item) {
		setSelectedMinutes(item);
	}
	function onSelectSeconds(item) {
		setSelectedSeconds(item);
	}
	function onStart() {
		async function handleOnStart() {
			let tmpTime =
				3600 * selectedHours + 60 * selectedMinutes + selectedSeconds;
			let tmp = new Date().getTime();
			let tmpNow = Math.round(tmp / 1000);
			await storage.set(
				'time-expected-countdown',
				JSON.stringify(tmpNow + tmpTime),
			);
			await storage.set(
				'time-countdown',
				JSON.stringify({
					hours: selectedHours,
					minutes: selectedMinutes,
					seconds: selectedSeconds,
				}),
			);
			await storage.set('time-left-countdown', JSON.stringify(tmpTime));
			await storage.set('start-countdown', JSON.stringify(true));
			setExpectedTime(tmpNow + tmpTime);
			setTime(tmpTime);
			setStart(true);
			scheduleNotification(new Date(tmp + tmpTime * 1000));
		}
		handleOnStart();
	}
	function onCancel() {
		async function handleOnCancel() {
			await storage.set('start-countdown', JSON.stringify(false));
			await storage.set('pause-countdown', JSON.stringify(false));
			await storage.remove('time-left-countdown');
			await storage.remove('time-expected-countdown');
			cancelNotification('0');
			setExpectedTime(null);
			setTime(0);
			setStart(false);
			setPause(false);
		}
		handleOnCancel();
	}
	function onPause() {
		async function handleOnPause() {
			await storage.set('time-left-countdown', JSON.stringify(time));
			await storage.set('pause-countdown', JSON.stringify(true));
			await storage.remove('time-expected-countdown');
			cancelNotification('0');
			setPause(true);
		}
		handleOnPause();
	}
	function onContinue() {
		async function handleOnContinue() {
			let tmpNow = Math.round(new Date().getTime() / 1000);
			setExpectedTime(tmpNow + time);
			await storage.set(
				'time-expected-countdown',
				JSON.stringify(tmpNow + time),
			);
			await storage.set('pause-countdown', JSON.stringify(false));
			scheduleNotification(new Date((tmpNow + time) * 1000));
			setPause(false);
		}
		handleOnContinue();
	}
	function onStartOrCancel() {
		start ? onCancel() : onStart();
	}
	function onPauseOrContinue() {
		pause ? onContinue() : onPause();
	}
	function page(i, data) {
		return (
			<View key={i} style={{flex: 1}}>
				<FlatList
					data={data}
					horizontal={false}
					numColumns={3}
					renderItem={({item}) => (
						<TouchableOpacity>
							<View
								style={{
									width: Dimensions.get('window').width / 3 - 10,
									height: (Dimensions.get('window').height - 150) * 0.2 - 20,
									borderWidth: 1,
									borderRadius: 5,
									borderColor: 'gray',
									margin: 5,
								}}>
								<View
									style={{
										height: 30,
										width: Dimensions.get('window').width / 3 - 10,
										padding: 5,
									}}>
									<Text style={{fontWeight: 'bold'}}>{item.name}</Text>
								</View>
							</View>
						</TouchableOpacity>
					)}
					keyExtractor={key => key.id.toString()}
				/>
			</View>
		);
	}
	function showData() {
		let i;
		datas = [];
		for (i = 0; i < Math.ceil(dataRaw.length / 6); i++) {
			datas = [
				...datas,
				{data: dataRaw.slice(6 * i, 6 * i + 6), id: datas.length},
			];
		}
		return datas.map((data, index = 0) => page(index++, data.data));
	}
	function showButton() {
		return (
			<FlatList
				data={datas}
				keyExtractor={key => key.id.toString()}
				horizontal={true}
				renderItem={({item}) => (
					<MaterialCommunityIcons
						key={item.id}
						name={item.id === selectedPage ? 'circle' : 'circle-outline'}
						size={20}
						color="red"
					/>
				)}
			/>
		);
	}
	function onPageSelected(event) {
		setSelectedPage(event.nativeEvent.position);
	}
	return (
		<View style={styles.container}>
			<Header />
			{start ? (
				<ShowTime time={time} />
			) : (
				<View style={styles.body}>
					<TimePicker
						selectedHours={selectedHours}
						onSelectHours={onSelectHours}
						selectedMinutes={selectedMinutes}
						onSelectMinutes={onSelectMinutes}
						selectedSeconds={selectedSeconds}
						onSelectSeconds={onSelectSeconds}
					/>
					<View style={styles.listView}>
						<ViewPager
							style={{flex: 1}}
							ref={viewPager}
							onPageSelected={onPageSelected}>
							{showData()}
						</ViewPager>
						<View style={{alignItems: 'center'}}>{showButton()}</View>
					</View>
				</View>
			)}
			<Control
				onStartOrCancel={onStartOrCancel}
				onPauseOrContinue={onPauseOrContinue}
				start={start}
				pause={pause}
			/>
		</View>
	);
}
