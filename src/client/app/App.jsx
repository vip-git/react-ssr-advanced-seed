// @flow
// Library
import * as React from 'react';
import FadeIn from 'react-fade-in';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { setLocale } from './common/redux/app/actions';

import css from './App.scss';

// containers
import Chat from './containers/chat';

// import { DocGenEngine } from './common/utils/doc-gen.engine';

type PropsT = {
    setLocale: (string) => {},
    t: (string) => string,
};

class App extends React.PureComponent<PropsT> {
    setLanguage = (e) => {
      this.props.setLocale(e.target.value);
    };

    componentDidMount() {
      // const Models = {
      //   ...require('./common/model/root.model'),
      //   ...require('./containers/chat/chat.model'),
      //   ...require('./containers/chat/components/chat-box/chat-box.model')
      // };
      // DocGenEngine.process({
      //   ...Models
      // });
    }

    render() {
      const { t } = this.props;
      return (
            <FadeIn>
                <Helmet defaultTitle="React Redux SSR Advanced Seed" titleTemplate="%s – React Redux SSR Advanced Seed" />
                {/* Should be part of header componet (yet to be created) */}
                <div style={{
                  position: 'absolute',
                  zIndex: 1,
                  right: '14%',
                  top: 26,
                }}>
                  <button value="de-DE" onClick={this.setLanguage}>
                      Deutsch
                  </button>
                  <button value="en-US" onClick={this.setLanguage}>
                      English
                  </button>
                </div>
                <Chat title={ t('i18n-example') } />
            </FadeIn>
      );
    }
}

const mapDispatchToProps = {
  setLocale,
};

export default connect(null, mapDispatchToProps)(translate()(App));
