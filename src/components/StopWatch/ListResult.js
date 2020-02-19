/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import {handleColor, handleTime} from './handle';

export default function ListResult(props) {
	const {data} = props;
	return (
		<View style={styles.result}>
			<FlatList
				data={data}
				keyExtractor={item => item.lap.toString()}
				renderItem={({item}) => (
					<View
						style={[
							styles.listResult,
							{
								backgroundColor: handleColor(item.index + 1, data.length, 0.5),
							},
						]}>
						<View style={{flex: 0.8, alignItems: 'center'}}>
							<Text style={{color: '#000'}}>Lap {item.lap}</Text>
						</View>
						<View style={{flex: 1.2}} />
						<View style={{flex: 1}}>
							<Text style={{color: '#000'}}>{handleTime(item.time)}</Text>
						</View>
					</View>
				)}
			/>
		</View>
	);
}
