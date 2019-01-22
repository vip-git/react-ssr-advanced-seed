// @flow
// Library
import * as React from 'react';
import FadeIn from 'react-fade-in';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Redux
import { setLocale } from './common/redux/app/actions'; 

// Doc Generator
import { DocGen } from './common/components/doc-gen';
import { DocGenEngine } from './common/utils/doc-gen.engine';

import css from './App.scss';

// containers
import Chat from './containers/chat';

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
      return (this.props.tReady) ? (
            <FadeIn>
                <Helmet defaultTitle="React Redux SSR Advanced Seed" titleTemplate="%s – React Redux SSR Advanced Seed" />
                <Route exact path="/" render={() => {
                  {/* Should be part of header componet (yet to be created) */}
                  return (
                    <React.Fragment>
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
                    </React.Fragment>
                  );
                }} />
                <Route
                  exact
                  path={'/docs'}
                  render={() => {
                    const Models = {
                      ...require('./common/model/root.model'),
                      ...require('./containers/chat/chat.model'),
                      ...require('./containers/chat/components/chat-box/chat-box.model')
                    };
                    const docs = DocGenEngine.process({
                      ...Models
                    });
                    return (
                      <DocGen docs={docs} />
                    )}
                  }
                />
            </FadeIn>
      ) : [];
    }
}

const mapDispatchToProps = {
  setLocale,
};

export default connect(null, mapDispatchToProps)(translate()(App));
