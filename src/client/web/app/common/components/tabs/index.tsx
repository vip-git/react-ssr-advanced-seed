/* eslint-disable react/jsx-props-no-spreading */
// Library
import React from 'react';

// Material UI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		maxWidth: 500,
		maxHeight: 380
	}
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
		<Typography
			component={() => <div />}
			role='tabpanel'
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
		>
			<Box key={`tab-content-box-${index}`}>{children}</Box>
		</Typography>
	);
}

function a11yProps(index: any) {
	return {
		'id': `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`
	};
}

export default function IconLabelTabs(props) {
	const { tabs } = props;
	const classes = useStyles({});
	const [value, setValue] = React.useState(0);

	function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
		setValue(newValue);
	}

	return (
		<Paper square className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				variant='fullWidth'
				indicatorColor='secondary'
				textColor='secondary'
				aria-label='icon label tabs example'
			>
				{tabs.map(tabVal => (
					<Tab
						icon={tabVal.icon}
						label={tabVal.tabName}
						key={`tab-bar-box-${tabVal.tabName}`}
						{...a11yProps(0)}
					/>
				))}
			</Tabs>
			{tabs.map((tabVal, tabIndex) => (
				<TabPanel
					value={value}
					index={tabIndex}
					key={`tab-panel-box-${tabVal.tabName}`}
				>
					{tabVal.tabContent()}
				</TabPanel>
			))}
		</Paper>
	);
}
