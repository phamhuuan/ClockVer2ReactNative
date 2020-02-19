import storage from '../storage';

const stopWatchInitialState = {
	time: 0,
	isStart: false,
	reset: true,
	lap: [],
	startTime: null,
	totalTime: null,
};

const sortInitialState = {
	id: 0,
	buttonName: 'Best to worst',
};

export async function stopWatchReducer(state = stopWatchInitialState, action) {
	let now = new Date();
	switch (action.type) {
		case 'TIMING':
			if (state.startTime !== 0) {
				now = now.getTime();
				return {
					...state,
					time: Math.round((state.totalTime + now - state.startTime) / 10),
				};
			} else {
				return {...state, time: Math.round(state.totalTime / 10)};
			}
		case 'START':
			now = now.getTime();
			let tmpNow = now.toString();
			await storage.set('start-time-stopwatch', tmpNow);
			await storage.set('is-start-stopwatch', 'true');
			await storage.set('reset-stopwatch', 'false');
			return {...state, isStart: true, reset: false, startTime: now};
		case 'STOP':
			now = now.getTime();
			let tmp = now - state.startTime + state.totalTime;
			await storage.set('total-time-stopwatch', tmp.toString());
			await storage.set('is-start-stopwatch', 'false');
			return {
				...state,
				isStart: false,
				time: Math.round(tmp / 10),
				totalTime: tmp,
			};
		case 'RESET':
			await storage.set('start-time-stopwatch', '0');
			await storage.set('total-time-stopwatch', '0');
			await storage.set('is-start-stopwatch', 'false');
			await storage.set('reset-stopwatch', 'true');
			await storage.set('lap-stopwatch', JSON.stringify([]));
			return stopWatchInitialState;
		case '+LAP':
			now = now.getTime();
			tmpNow = tmpNow.toString();
			await storage.set('start-time-stopwatch', tmpNow);
			await storage.set('total-time-stopwatch', '0');
			await storage.set(
				'lap-stopwatch',
				JSON.stringify([
					...state.lap,
					{
						lap: state.lap.length + 1,
						time: state.time / 100,
						color: 'rgb(0,255,0)',
						index: 1,
					},
				]),
			);
			return {
				...state,
				lap: [
					...state.lap,
					{
						lap: state.lap.length + 1,
						time: state.time / 100,
						color: 'rgb(0,255,0)',
						index: 1,
					},
				],
				time: 0,
				startTime: now,
				totalTime: 0,
			};
		case 'GET_IS_START':
			let tmpIsStart = await storage.get('is-start-stopwatch');
			tmpIsStart =
				tmpIsStart === null || tmpIsStart === 'NaN'
					? false
					: tmpIsStart === 'true'
					? true
					: false;
			return {...state, isStart: tmpIsStart};
		case 'GET_RESET':
			let tmpReset = await storage.get('reset-stopwatch');
			tmpReset =
				tmpReset === null || tmpReset === 'NaN'
					? true
					: tmpReset === 'true'
					? true
					: false;
			return {...state, reset: tmpReset};
		case 'GET_LAP':
			let tmpLap = await storage.get('lap-stopwatch');
			tmpLap = tmpLap === null || tmpLap === 'NaN' ? [] : JSON.parse(tmpLap);
			return {...state, lap: tmpLap};
		case 'GET_START_TIME':
			if (state.startTime === null) {
				return {
					...state,
					startTime: parseInt(await storage.get('start-time-stopwatch'), 10),
				};
			}
			return state;
		case 'GET_TOTAL_TIME':
			if (state.totalTime === null) {
				return {
					...state,
					totalTime: parseInt(await storage.get('total-time-stopwatch'), 10),
				};
			}
			return state;
	}
	return state;
}

export async function sortReducer(state = sortInitialState, action) {
	switch (action.type) {
		case 'SORT_BY_LAP':
			await storage.set('id-stopwatch', '0');
			return {...state, id: 0};
		case 'SORT_BEST_TO_WORST':
			await storage.set('id-stopwatch', '1');
			await storage.set('button-name-stopwatch', 'Worst to best');
			return {...state, id: 1, buttonName: 'Worst to best'};
		case 'SORT_WORST_TO_BEST':
			await storage.set('id-stopwatch', '2');
			await storage.set('button-name-stopwatch', 'Best to worst');
			return {...state, id: 2, buttonName: 'Best to worst'};
		case 'GET_ID':
			let tmpId = await storage.get('id-stopwatch');
			tmpId = tmpId === null || tmpId === 'NaN' ? 0 : parseInt(tmpId, 10);
			return {...state, id: tmpId};
		case 'GET_BUTTON_NAME':
			let tmpButtonName = await storage.get('button-name-stopwatch');
			tmpButtonName =
				tmpButtonName === null || tmpButtonName === 'NaN'
					? 'Best to worst'
					: tmpButtonName;
			return {...state, buttonName: tmpButtonName};
	}
	return state;
}
