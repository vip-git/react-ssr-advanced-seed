// @flow
import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { setLocale } from './store/app/actions';

import css from './App.css';

type PropsT = {
    setLocale: (string) => {},
    t: (string) => string,
};

class App extends React.PureComponent<PropsT> {
    setLanguage = (e) => {
        this.props.setLocale(e.target.value);
    };

    render() {
        const { t } = this.props;

        return (
            <div className={css.wrapper}>
                <Helmet defaultTitle="React SSR Starter" titleTemplate="%s – React SSR Starter" />
                <h1>
                    <img src={require('./assets/react.svg')} className={css.reactLogo} /> React SSR Setup
                </h1>
                <h2>{t('features')}</h2>
                <ul>
                    <li className={css.hot}>Test it works again</li>
                </ul>

                <h2>{t('i18n-example')}</h2>
                <p>
                    <button value="de-DE" onClick={this.setLanguage}>
                        Deutsch
                    </button>
                    <button value="en-US" onClick={this.setLanguage}>
                        English
                    </button>
                </p>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setLocale,
};

export default connect(null, mapDispatchToProps)(translate()(App));
