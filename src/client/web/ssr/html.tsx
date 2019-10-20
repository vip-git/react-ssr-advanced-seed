/* eslint-disable lines-between-class-members */
/* eslint-disable jsx-a11y/lang */
/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-danger */
import React from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

type PropsT = {
	children: any;
	css: string[];
	scripts: string[];
	state: string;
};

export default class HTML extends React.Component<PropsT> {
	static defaultProps = {
		css: [],
		scripts: [],
		state: '{}'
	};
	/* ignore coverage */
	render() {
		const head = Helmet.renderStatic();
		const { children, scripts, css, state } = this.props;
		return (
			<html lang=''>
				<head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					{head.base.toComponent()}
					{head.title.toComponent()}
					{head.meta.toComponent()}
					{head.link.toComponent()}
					{head.script.toComponent()}
					{css.map(href => (
						<link key={href} rel='stylesheet' href={href} />
					))}
					<link rel='manifest' href='/manifest.json' />
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/icon?family=Material+Icons'
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `window.__PRELOADED_STATE__ = ${JSON.parse(
								serialize(state)
							)}`
						}}
					/>
				</head>
				<body>
					<div id='app' dangerouslySetInnerHTML={{ __html: children }} />
					{scripts.map(src => (
						<script key={src} src={src} />
					))}
				</body>
			</html>
		);
	}
}
