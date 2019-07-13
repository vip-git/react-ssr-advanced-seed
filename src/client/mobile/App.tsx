// Library
import React, { Fragment } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar
} from 'react-native';

// Shared Components
import SharedComponent from '@omega-shared-components/content';

import { Header, Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter
	},
	engine: {
		position: 'absolute',
		right: 0
	},
	body: {
		backgroundColor: Colors.white,
		height: '100%'
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark
	},
	highlight: {
		fontWeight: '700'
	},
	footer: {
		color: Colors.dark,
		fontSize: 12,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'right'
	},
	sharedComponent: {
		flex: 1,
		padding: 20,
		marginBottom: 50
	}
});

const App = () => {
	return (
		<Fragment>
			<StatusBar barStyle='dark-content' />
			<SafeAreaView>
				<ScrollView
					contentInsetAdjustmentBehavior='automatic'
					style={styles.scrollView}
				>
					<Header />
					{(global as any).HermesInternal == null ? null : (
						<View style={styles.engine}>
							<Text style={styles.footer}>Engine: Hermes</Text>
						</View>
					)}
					<View style={styles.body}>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>Shared Component</Text>
							<Text style={styles.sectionDescription}>
								Below is a example component shared between web and mobile.
							</Text>
						</View>
						<View style={styles.sectionContainer}>
							<SharedComponent style={styles.sharedComponent} />
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Fragment>
	);
};

export default App;
