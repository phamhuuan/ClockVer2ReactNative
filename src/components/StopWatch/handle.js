export function handleColor(index, total, opacity) {
	if (index === total && index === 1) {
		return `rgba(0,255,0,${opacity})`;
	} else {
		if (index <= total / 2) {
			return `rgba(${0 +
				Math.round((2 * 255 * (index - 1)) / total)},255,0,${opacity})`;
		} else if (index === (total + 1) / 2) {
			return `rgba(255,255,0,${opacity})`;
		} else {
			return `rgba(255,${0 +
				Math.round((2 * 255 * (total - index)) / total)},0,${opacity})`;
		}
	}
}

export function handleData(data, id) {
	let tmp = data.sort((a, b) => {
		if (a.time !== b.time) {
			return a.time > b.time;
		}
		return a.lap > b.lap;
	});
	let length = data.length;
	tmp = tmp.map(
		(a, i = 1) =>
			(a = {
				...a,
				color: handleColor(i, length),
				index: i++,
			}),
	);
	switch (id) {
		case 0:
			return (tmp = tmp.sort((a, b) => a.lap > b.lap));
		case 1:
			return (tmp = tmp.sort((a, b) => a.time > b.time));
		case 2:
			return (tmp = tmp.sort((a, b) => a.time < b.time));
	}
}

export function handleTime(time) {
	// let seconds = time % 60;
	let seconds = Math.round((time % 60) * 100) / 100;
	let minutes = Math.floor(time / 60) % 60;
	let hours = Math.floor(time / 3600);
	hours = hours < 10 ? '0' + `${hours}` : `${hours}`;
	minutes = minutes < 10 ? '0' + `${minutes}` : `${minutes}`;
	seconds = seconds < 10 ? '0' + `${seconds}` : `${seconds}`;
	seconds =
		seconds.length === 2
			? `${seconds}` + '.00'
			: seconds.length === 4
			? `${seconds}` + '0'
			: `${seconds}`;
	return hours + ':' + minutes + ':' + seconds;
}
