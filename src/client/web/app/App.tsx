/* eslint-env browser */
// Library
import React from 'react';
import FadeIn from 'react-fade-in';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import queryString from 'query-string';

// Containers & component
import Chat from '@omega-web-containers/chat';
import LangButtons from '@omega-web-components/lang-buttons';
import LoginDialog from '@omega-web-components/login';

// Redux
import { config } from '@omega-core/config';
import { getLocale } from '../../shared/state/containers/app/selectors';
import { setLocale, setToken } from '../../shared/state/containers/app/actions';

// Config

// import './App.scss';

// Internal Components

// containers
export interface PropsT {
	setLocale: (string) => {};
	t: (string) => string;
}

type  supportedLangs = 'fr-FR' | 'de-DE' | 'en-US';

class App extends React.PureComponent<any, any> {
	componentDidMount() {
		const { location } = this.props;
		if (location) {
			const idTokenObj = queryString.parse(location.search);
			if (typeof window !== 'undefined' && idTokenObj && idTokenObj.idToken) {
				const { dispatchSetToken } = this.props;
				window.sessionStorage.setItem('token', JSON.stringify(idTokenObj));
				// HttpService.setCookie('accessToken', idTokenObj.accessToken, {
				// 	// 'Secure': true,
				// 	// 'HttpOnly': true,
				// 	'max-age': 3600
				// });
				dispatchSetToken(idTokenObj.idToken);
				window.location.search = '';
			}
			else {
				try {
					const { dispatchSetToken } = this.props;
					const idTokenStorage =
						window.sessionStorage.getItem('token') &&
						JSON.parse(window.sessionStorage.getItem('token'));
					if (idTokenStorage && idTokenStorage.idToken) {
						dispatchSetToken(idTokenStorage.idToken);
					}
				}
 				catch (error) {
					console.log('error', error);
				}
			}

			/* Only register a service worker if it's supported */
			if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
				navigator.serviceWorker.register('/service-worker.js');
			}
		}
	}

	setLanguage = (langName: supportedLangs, callback: () => void) => {
		const { dispatchSetLocale } = this.props;
		dispatchSetLocale(langName);
		if (callback && typeof callback === 'function') {
			callback();
		}
	};

	handleLoginClick = () => {
		if (typeof window !== 'undefined') {
			window.location.href = config.API_URL + config.LOGIN_URL;
		}
	};

	renderChat = () => {
		const { t, app } = this.props;
		const { idToken, locale } = app;
		const { languages } = config;
		return idToken === '' ? (
			<LoginDialog
				show={idToken === ''}
				handleLoginClick={this.handleLoginClick}
			/>
		) : (
			<div
				style={{
					filter: idToken === '' ? 'blur(10px)' : 'none'
				}}
			>
				<div
					style={{
						position: 'absolute',
						zIndex: 1,
						right: '14%',
						top: 13
					}}
				>
					<LangButtons
						languages={languages}
						defaultLanguage={locale}
						onSetLang={(langName: supportedLangs, callback: () => void) =>
							this.setLanguage(langName, callback)}
					/>
				</div>
				<Chat title={t('i18n-example')} idToken={idToken} />
				<div
					id={'footer'}
					style={{
						textAlign: 'center',
						fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
						marginTop: 15
					}}
				>
					{`Version - ${process.env.APP_VERSION || '0.0.1'}`}
				</div>
			</div>
		);
	};

	renderAppScreen = () => {
		const { t } = this.props;
		const TypedHelmet: any = Helmet;
		return (
			<FadeIn>
				<TypedHelmet
					defaultTitle={t('i18n-example')}
					titleTemplate={`%s – ${t('i18n-example')}`}
				/>
				{this.renderChat()}
			</FadeIn>
		);
	};

	render() {
		const { tReady } = this.props;
		return tReady ? this.renderAppScreen() : [];
	}
}

const mapDispatchToProps = {
	dispatchSetLocale: (locale: any) => setLocale(locale),
	dispatchSetToken: (token: any) => setToken(token)
};

const mapStateToProps = (state: { app: any }) => ({
	app: getLocale(state)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTranslation()(App));
