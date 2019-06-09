
// Library
import * as React from 'react';
import FadeIn from 'react-fade-in';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Redux
import { setLocale } from '../../shared/common/redux/app/actions';

import css from './App.scss';

// containers
import Chat from './containers/chat';

interface PropsT {
    setLocale: (string) => {};
    t: (string) => string;
}

class App extends React.PureComponent<PropsT> {
    setLanguage = (e) => {
      this.props.setLocale(e.target.value);
    }

    render() {
      const { t } = this.props;
      return (this.props.tReady) ? (
            <FadeIn>
                <Helmet defaultTitle='React Redux SSR Advanced Seed' titleTemplate='%s – React Redux SSR Advanced Seed' />
                <React.Fragment>
                    <div style={{
                      position: 'absolute',
                      zIndex: 1,
                      right: '14%',
                      top: 26,
                    }}>
                      <button value='de-DE' onClick={this.setLanguage}>
                          Deutsch
                      </button>
                      <button value='en-US' onClick={this.setLanguage}>
                          English
                      </button>
                    </div>
                    <Chat title={ t('i18n-example') } />
                </React.Fragment>
            </FadeIn>
      ) : [];
    }
}

const mapDispatchToProps = {
  setLocale,
};

export default connect(null, mapDispatchToProps)(translate()(App));
