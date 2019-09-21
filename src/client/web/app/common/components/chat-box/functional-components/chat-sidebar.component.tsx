
// Model
import { ChatBoxModel } from '../chat-box.model';

const {
	Drawer,
	Hidden
} = ChatBoxModel.uiFrameworkComponents;

const {
	React,
} = ChatBoxModel.libraries;

// Types
interface ChatSideBarProps {
	classes: any;
    t?: any;
    handleDrawerToggle: () => void;
    SharedComponent: React.ElementType<any>;
    menu: any;
    opened: boolean;
}

export const ChatSideBarComponent: React.FunctionComponent<ChatSideBarProps> = ({
					classes,
					handleDrawerToggle,
					SharedComponent,
					menu,
					opened
				}) => (
					<div
						style={{
							height: '100%'
						}}
					>
						<Hidden smDown>
							<Drawer
								variant='permanent'
								ModalProps={{
									keepMounted: false,
									className: classes.modal,
									BackdropProps: {
										className: classes.backdrop
									},
									onBackdropClick: handleDrawerToggle
								}}
								classes={{
									paper: classes.drawerPaper
								}}
								style={{
									height: '100%'
								}}
							>
								{menu}
								<SharedComponent />
							</Drawer>
						</Hidden>
						<Hidden mdUp>
							<Drawer
								variant='temporary'
								open={opened}
								ModalProps={{
									keepMounted: false,
									className: classes.modal,
									BackdropProps: {
										className: classes.backdrop
									},
									onBackdropClick: handleDrawerToggle
								}}
								classes={{
									paper: classes.drawerPaper
								}}
								style={{
									height: '100%'
								}}
							>
								{menu}
							</Drawer>
						</Hidden>
					</div>
				);
