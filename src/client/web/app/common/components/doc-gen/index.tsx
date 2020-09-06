// /* tslint:disable */
// // Library
// import React from 'react';
// import PropTypes from 'prop-types';

// // Material UI
// import { withStyles } from '@material-ui/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

// // Internal Components
// import { UmlDocGen } from './umldoc';
// import { StateMachineDoc } from './statemachinedoc';
// /* ignore coverage */
// function TabContainer(props) {
//   return (
// 		<Typography component='div' style={{ backgroundColor: '#dae4e4', border: '1px solid #b9b9b9;', padding: 8 * 3 }}>
// 			{props.children}
// 		</Typography>
//   );
// }
// /* ignore coverage */
// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };
// /* ignore coverage */
// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     width: '100%',
//     backgroundColor: theme.palette.background.paper,
//   },
//   text: {
//     fontSize: '2em',
//     paddingTop: theme.spacing(2) * 2,
//     paddingLeft: theme.spacing(2) * 2,
//     paddingRight: theme.spacing(2) * 2,
//   },
// });
// /* ignore coverage */
// class DocGen extends React.Component<any, any> {
// 	state = {
// 	  value: 0,
// 	};

// 	handleChange = (event, value) => {
// 	  this.setState({ value });
// 	};

// 	render() {
// 	  const { classes, docs } = this.props;
// 	  const { value } = this.state;

// 	  return (
// 			<div className={classes.root}>
// 				<AppBar position='static' color='default' style={{ border: '1px solid #b9b9b9', background: '#d1dada' }}>
// 					<Typography className={classes.text} variant='h2' gutterBottom>
// 						React: Auto-generated docs
// 					</Typography>
// 					<hr style={{ width: '100%' }} />
// 					<Tabs
// 						value={value}
// 						onChange={this.handleChange}
// 						variant='fullWidth'
// 						scrollButtons='on'
// 						indicatorColor='primary'
// 						textColor='primary'
// 						centered
// 					>
// 						<Tab label='UML Diagram' />
// 						<Tab label='Redux Interaction' />
// 						<Tab label='Readme' />
// 					</Tabs>
// 				</AppBar>
// 				{value === 0 && (
// 					<TabContainer>
// 						{' '}
// 						<UmlDocGen docs={docs} />
// {' '}
// 					</TabContainer>
// 				)}
// 				{value === 1 && (
// 					<TabContainer>
// 						{' '}
// 						<StateMachineDoc docs={docs} />
// {' '}
// 					</TabContainer>
// 				)}
// 				{value === 2 && (
// 					<TabContainer>
// 						<iframe
// 							src={require('../../../../../../../Readme.md').toString()}
// 							style={{
// 								width: '100%',
// 								height: window.innerHeight,
// 								border: 'none',
// 								background: 'white',
// 							}}
// 						/>
// 					</TabContainer>
// 				)}
// 			</div>
// 	  );
// 	}
// }

// export default withStyles(styles)(DocGen);
