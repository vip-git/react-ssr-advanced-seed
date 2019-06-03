/* eslint-disable */
// Library
import React from 'react';
import { Route, Switch } from 'react-router';

// Containers
import App from './App';

// Doc Generator
import DocGen from './common/components/doc-gen';
import { DocGenEngine } from '../../shared/common/utils/doc-gen.engine';

const routes = (
  <Switch>
      <Route exact path="/" component={App} />
      {/* <Route component={App} /> */}
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
  </Switch>
);

export default routes;