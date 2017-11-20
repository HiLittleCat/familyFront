import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './js/store/index';
import AppWithNavigationState from './js/navigators/AppNavigator';

let store = configureStore();

export default class App extends Component {
		constructor() {
				super();
				this.state = {
						isLoading: true,
						store: configureStore(() => {
								this.setState({isLoading: false})
						})
				}
		}
		render() {
				if (this.state.isLoading) {
						console.log('loading app');
						return null;
				}
				return (
						<Provider store={this.state.store}>
								<AppWithNavigationState/>
						</Provider>
				)
		}
}
