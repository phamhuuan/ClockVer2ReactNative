const styles = {
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
	body: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	controlView: {
		flex: 2,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonView: {
		height: 50,
		width: 100,
		borderRadius: 20,
	},
	result: {
		height: 250,
		width: 250,
		alignSelf: 'center',
	},
	startButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
	},
	resetButton: {
		flex: 1,
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
	},
	listResult: {
		height: 50,
		width: 250,
		marginVertical: 4,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
};

export default styles;
