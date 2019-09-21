/* eslint-disable no-undef */
// Model
import { ChatBoxModel } from '../chat-box.model';

const { AppBar, Toolbar, Typography } = ChatBoxModel.uiFrameworkComponents;

const { React } = ChatBoxModel.libraries;

// Types
interface AppHeaderProps {
	classes?: any;
	t?: any;
	title: string;
}

export const AppHeaderComponent: React.FunctionComponent<AppHeaderProps> = ({
					title
				}) => (
					<AppBar position='static'>
						<Toolbar>
							<Typography
								variant='h6'
								color='inherit'
								style={{ margin: '0 auto' }}
							>
								{title}
							</Typography>
						</Toolbar>
						<Toolbar />
					</AppBar>
				);
