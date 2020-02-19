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
	const [startTime, setStartTime] = useState(null);
	const [totalTime, setTotalTime] = useState(null);
	useEffect(() => {
		async function getIsStart() {
			let tmpIsStart = await storage.get('is-start-stopwatch');
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
			let tmpReset = await storage.get('reset-stopwatch');
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
			let tmpLap = await storage.get('lap-stopwatch');
			tmpLap = tmpLap === null || tmpLap === 'NaN' ? [] : JSON.parse(tmpLap);
			setLap(tmpLap);
		}
		getLap();
	}, []);
	useEffect(() => {
		async function getId() {
			let tmpId = await storage.get('id-stopwatch');
			tmpId = tmpId === null || tmpId === 'NaN' ? 0 : parseInt(tmpId, 10);
			setId(tmpId);
		}
		getId();
	}, []);
	useEffect(() => {
		async function getButtonName() {
			let tmpButtonName = await storage.get('button-name-stopwatch');
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
			interval = setInterval(() => {
				async function getTime() {
					if (startTime === null) {
						setStartTime(
							parseInt(await storage.get('start-time-stopwatch'), 10),
						);
					}
					if (totalTime === null) {
						setTotalTime(
							parseInt(await storage.get('total-time-stopwatch'), 10),
						);
					}
					if (startTime !== 0) {
						let now = new Date();
						now = now.getTime();
						setTime(Math.round((totalTime + now - startTime) / 10));
					} else {
						setTime(Math.round(totalTime / 10));
					}
				}
				getTime();
			}, 10);
		} else {
			async function getTime() {
				if (startTime === null) {
					let tmp = await storage.get('total-time-stopwatch');
					tmp = tmp === null || tmp === 'NaN' ? 0 : parseInt(tmp, 10);
					setTotalTime(tmp);
					setTime(Math.round(totalTime / 10));
				}
			}
			getTime();
		}
		return () => clearInterval(interval);
	}, [isStart, startTime, totalTime, time]);
	function onStart() {
		async function handleOnStart() {
			let now = new Date();
			now = now.getTime();
			setStartTime(now);
			now = now.toString();
			await storage.set('start-time-stopwatch', now);
			await storage.set('is-start-stopwatch', 'true');
			await storage.set('reset-stopwatch', 'false');
			setIsStart(true);
			setReset(false);
		}
		handleOnStart();
	}
	function onStop() {
		async function handleOnStop() {
			setIsStart(false);
			let now = new Date();
			now = now.getTime();
			let tmp = now - startTime + totalTime;
			setTotalTime(tmp);
			await storage.set('total-time-stopwatch', tmp.toString());
			await storage.set('is-start-stopwatch', 'false');
			setTime(Math.round(tmp / 10));
		}
		handleOnStop();
	}
	function onReset() {
		async function handleOnReset() {
			await storage.set('start-time-stopwatch', '0');
			await storage.set('total-time-stopwatch', '0');
			await storage.set('is-start-stopwatch', 'false');
			await storage.set('reset-stopwatch', 'true');
			await storage.set('lap-stopwatch', JSON.stringify([]));
			setTotalTime(0);
			setIsStart(false);
			setReset(true);
			setLap([]);
			setTime(0);
		}
		handleOnReset();
	}
	function onAddLap() {
		async function handleOnAddLap() {
			let tmpNow = new Date();
			tmpNow = tmpNow.getTime();
			setStartTime(tmpNow);
			setTotalTime(0);
			tmpNow = tmpNow.toString();
			await storage.set('start-time-stopwatch', tmpNow);
			await storage.set('total-time-stopwatch', '0');
			await storage.set(
				'lap-stopwatch',
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
			await storage.set('id-stopwatch', '0');
			setId(0);
		}
		handleOnSortLap();
	}
	function onSortTime() {
		async function handleOnSortTime() {
			switch (buttonName) {
				case 'Best to worst':
					await storage.set('id-stopwatch', '1');
					await storage.set('button-name-stopwatch', 'Worst to best');
					setId(1);
					setButtonName('Worst to best');
					break;
				case 'Worst to best':
					await storage.set('id-stopwatch', '2');
					await storage.set('button-name-stopwatch', 'Best to worst');
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
