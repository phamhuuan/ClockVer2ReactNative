import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import storage from '../../storage';
import styles from './styles';
import Header from './Header';
import {handleData, handleTime} from './handle';
import ListResult from './ListResult';
import ShowTime from './ShowTime';
import Control from './Control';

export default function StopWatch() {
	const [time, setTime] = useState(0);
	const [isStart, setIsStart] = useState(false);
	const [reset, setReset] = useState(true);
	const [lap, setLap] = useState([]);
	const [id, setId] = useState(0);
	const [buttonName, setButtonName] = useState('Best to worst');
	// const [startTime, setStartTime] = useState(null);
	useEffect(() => {
		async function getIsStart() {
			let tmpIsStart = await storage.get('is-start');
			tmpIsStart =
				tmpIsStart === null || tmpIsStart === 'NaN'
					? false
					: tmpIsStart === 'true'
					? true
					: false;
			setIsStart(tmpIsStart);
		}
		getIsStart();
	}, []);
	useEffect(() => {
		async function getReset() {
			let tmpReset = await storage.get('reset');
			tmpReset =
				tmpReset === null || tmpReset === 'NaN'
					? true
					: tmpReset === 'true'
					? true
					: false;
			setReset(tmpReset);
		}
		getReset();
	}, []);
	useEffect(() => {
		async function getLap() {
			let tmpLap = await storage.get('lap');
			tmpLap = tmpLap === null || tmpLap === 'NaN' ? [] : JSON.parse(tmpLap);
			setLap(tmpLap);
		}
		getLap();
	}, []);
	useEffect(() => {
		async function getId() {
			let tmpId = await storage.get('id');
			tmpId = tmpId === null || tmpId === 'NaN' ? 0 : parseInt(tmpId, 10);
			setId(tmpId);
		}
		getId();
	}, []);
	useEffect(() => {
		async function getButtonName() {
			let tmpButtonName = await storage.get('button-name');
			tmpButtonName =
				tmpButtonName === null || tmpButtonName === 'NaN'
					? 'Best to worst'
					: tmpButtonName;
			setButtonName(tmpButtonName);
		}
		getButtonName();
	}, []);
	useEffect(() => {
		let interval;
		if (isStart) {
			// async function getTime() {
			// let startTime = await storage.get('start-time');
			// 	let totalTime = await storage.get('total-time');
			// 	let now = new Date();
			// 	now = now.getTime();
			// startTime =
			// 	startTime === null || startTime === 'NaN'
			// 		? 0
			// 		: parseInt(startTime, 10);
			// 	totalTime =
			// 		totalTime === null || totalTime === 'NaN'
			// 			? 0
			// 			: parseInt(totalTime, 10);
			// 	if (startTime !== 0) {
			// 		setTime(Math.round((totalTime + now - startTime) / 100));
			// 	} else {
			// 		setTime(Math.round(totalTime / 100));
			// 	}
			// }
			// getTime();
			interval = setInterval(() => {
				// setTime(time + 1);
				async function getTime() {
					let startTime = await storage.get('start-time');
					let totalTime = await storage.get('total-time');
					let now = new Date();
					now = now.getTime();
					startTime =
						startTime === null || startTime === 'NaN'
							? 0
							: parseInt(startTime, 10);
					totalTime =
						totalTime === null || totalTime === 'NaN'
							? 0
							: parseInt(totalTime, 10);
					if (startTime !== 0) {
						setTime(Math.round((totalTime + now - startTime) / 10));
					} else {
						setTime(Math.round(totalTime / 10));
					}
				}
				getTime();
			}, 10);
		} else {
			async function getTime() {
				let totalTime = await storage.get('total-time');
				totalTime =
					totalTime === null || totalTime === 'NaN'
						? 0
						: parseInt(totalTime, 10);
				setTime(Math.round(totalTime / 10));
			}
			getTime();
		}
		return () => clearInterval(interval);
	}, [isStart, time]);
	function onStart() {
		async function handleOnStart() {
			setIsStart(true);
			setReset(false);
			let now = new Date();
			now = now.getTime();
			now = now.toString();
			await storage.set('start-time', now);
			await storage.set('is-start', 'true');
			await storage.set('reset', 'false');
		}
		handleOnStart();
	}
	function onStop() {
		async function handleOnStop() {
			let now = new Date();
			let startTime = parseInt(await storage.get('start-time'), 10);
			now = now.getTime();
			let totalTime = await storage.get('total-time');
			totalTime =
				totalTime === null || totalTime === 'NaN' ? 0 : parseInt(totalTime, 10);
			totalTime = (now - startTime + totalTime).toString();
			await storage.set('total-time', totalTime);
			await storage.set('is-start', 'false');
			setIsStart(false);
		}
		handleOnStop();
	}
	function onReset() {
		async function handleOnReset() {
			await storage.set('start-time', '0');
			await storage.set('total-time', '0');
			await storage.set('is-start', 'false');
			await storage.set('reset', 'true');
			await storage.set('lap', JSON.stringify([]));
			setIsStart(false);
			setReset(true);
			setTime(0);
			setLap([]);
		}
		handleOnReset();
	}
	function onAddLap() {
		async function handleOnAddLap() {
			let tmpNow = new Date();
			tmpNow = tmpNow.getTime().toString();
			await storage.set('start-time', tmpNow);
			await storage.set('total-time', '0');
			await storage.set(
				'lap',
				JSON.stringify([
					...lap,
					{
						lap: lap.length + 1,
						time: time / 100,
						color: 'rgb(0,255,0)',
						index: 1,
					},
				]),
			);
			setTime(0);
			setLap([
				...lap,
				{
					lap: lap.length + 1,
					time: time / 100,
					color: 'rgb(0,255,0)',
					index: 1,
				},
			]);
		}
		handleOnAddLap();
	}
	function onStartOrStop() {
		isStart ? onStop() : onStart();
	}
	function onResetOrAddLap() {
		isStart ? onAddLap() : onReset();
	}
	function onSortLap() {
		async function handleOnSortLap() {
			await storage.set('id', '0');
			setId(0);
		}
		handleOnSortLap();
	}
	function onSortTime() {
		async function handleOnSortTime() {
			switch (buttonName) {
				case 'Best to worst':
					await storage.set('id', '1');
					await storage.set('button-name', 'Worst to best');
					setId(1);
					setButtonName('Worst to best');
					break;
				case 'Worst to best':
					await storage.set('id', '2');
					await storage.set('button-name', 'Best to worst');
					setId(2);
					setButtonName('Best to worst');
					break;
			}
		}
		handleOnSortTime();
	}
	let stopWatch = handleTime(time / 100);
	let data = handleData(lap, id);
	return (
		<View style={styles.container}>
			<Header />
			<ShowTime stopWatch={stopWatch} />
			<ListResult data={data} />
			<Control
				onStartOrStop={onStartOrStop}
				isStart={isStart}
				onResetOrAddLap={onResetOrAddLap}
				onSortLap={onSortLap}
				reset={reset}
				onSortTime={onSortTime}
				buttonName={buttonName}
			/>
		</View>
	);
}
