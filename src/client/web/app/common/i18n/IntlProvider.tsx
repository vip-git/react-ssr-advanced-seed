import React from 'react';
import i18next from 'i18next';
import { withRouter } from 'react-router-dom';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import { getLocale } from '../../../../shared/state/containers/app/selectors';

// tslint:disable-next-line: no-var-requires
const deDE = require('./locales/de-DE.json');
// tslint:disable-next-line: no-var-requires
const enUS = require('./locales/en-US.json');

i18next
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		lng: 'en-US',
		fallbackLng: 'en-US',
		fallbackNS: ['translation'],
		resources: {
			'de-DE': deDE,
			'en-US': enUS
    },
    debug: false,
		parseMissingKeyHandler: (missing: any) => {
			if (process.env.NODE_ENV === 'development') {
				console.warn('MISSING TRANSLATION:', missing);
			}
			return missing;
		}
	});

type PropsT = {
	children: any;
	locale: 'en-US' | 'de-DE';
};

class I18N extends React.PureComponent<PropsT> {
  componentDidMount() {
    i18next.changeLanguage(this.props.locale);
  }

  componentDidUpdate(prevProps: { locale: any }) {
    const { locale: newLocale } = this.props;
    const { locale: oldLocale } = prevProps;

    if (oldLocale !== newLocale) {
      i18next.changeLanguage(newLocale);
    }
  }

  render() {
    return <I18nextProvider i18n={i18next}>{this.props.children}</I18nextProvider>;
  }
}

const mapStateToProps = (state: { app: any }) => ({
  locale: getLocale(state).locale,
});

export default connect(
    mapStateToProps,
    null,
    null,
    { pure: false },
  )(I18N);
