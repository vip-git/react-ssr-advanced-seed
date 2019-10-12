/* eslint-disable */
// Library
import React from 'react';
import { Route, Switch } from 'react-router';

// Containers
import App from './App';

// Docs Generator
// import DocGen from './common/components/doc-gen';
// import { DocGenEngine } from '../../shared/common/utils/doc-gen.engine';
/* ignore coverage */
const routes = (
	<Switch>
		<Route exact path="/" component={App} />
		{/* <Route
        exact
        path={'/docs'}
        render={() => {
            const Models = {
                ...require('../../shared/common/model/root.model'),
                ...require('./containers/chat/chat.model'),
                ...require('./common/components/chat-box/chat-box.model'),
            };
            const docs = DocGenEngine.process({
                ...Models
            });
            return (
                <DocGen docs={docs} />
            )}
        }
     /> */}
	</Switch>
);

export default routes;
