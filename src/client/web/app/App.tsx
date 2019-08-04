// Library
import React from 'react';
import FadeIn from 'react-fade-in';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

// Redux
import Chat from '@omega-web-containers/chat';
import { getLocale } from '../../shared/state/containers/app/selectors';
import { setLocale } from '../../shared/state/containers/app/actions';

// import './App.scss';

// containers

export interface PropsT {
	setLocale: (string) => {};
	t: (string) => string;
}

class App extends React.PureComponent<any, any> {
	setLanguage = (e: any) => {
		const { dispatchSetLocale } = this.props;
		dispatchSetLocale(e.target.value);
	};

	render() {
		const { t, tReady, app } = this.props;
		const { accessToken } = app;
		return tReady ? (
			<FadeIn>
				<Helmet
					defaultTitle='React Redux SSR Advanced Seed'
					titleTemplate='%s – React Redux SSR Advanced Seed'
				/>
				<div
					style={{
						filter: accessToken === '' ? 'blur(10px)' : 'none'
					}}
				>
					<div
						style={{
							position: 'absolute',
							zIndex: 1,
							right: '14%',
							top: 26
						}}
					>
						<button value='de-DE' onClick={this.setLanguage}>
							Deutsch
						</button>
						<button value='en-US' onClick={this.setLanguage}>
							English
						</button>
					</div>
					<Chat title={t('i18n-example')} accessToken={accessToken} />
				</div>
			</FadeIn>
		) : (
			[]
		);
	}
}

const mapDispatchToProps = {
	dispatchSetLocale: (locale: any) => setLocale(locale)
};

const mapStateToProps = (state: { app: any }) => ({
	app: getLocale(state)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTranslation()(App));
