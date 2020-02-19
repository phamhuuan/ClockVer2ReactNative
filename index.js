/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {store} from './src/reducers';
import {Provider} from 'react-redux';
function MyApp() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

AppRegistry.registerComponent(appName, () => MyApp);
