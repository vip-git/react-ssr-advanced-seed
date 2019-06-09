// AppModel
import { RootModel } from '../../../../../../shared/common/model/root.model';
const {
    uiFrameworkComponents: {
        withStyles,
        AppBar,
        Toolbar,
        Grid,
        Card,
        Typography,
        Drawer,
        List,
        ListItem,
        ListItemText,
        ListSubheader,
        Avatar,
        Divider,
        TextField,
        Hidden,
        Button,
        IconButton,
        MenuIcon,
        MoreVertIcon,
        SendIcon,
    }, 
    libraries: {
        React,
        Component,
        PropTypes,
        classNames,
        distanceInWordsToNow
    }
} = RootModel;
// Component
import Wrapper from '../wrapper';
import ChatStyles from './styles';

export const ChatBoxModel = ({
    libraries: {
        React,
        Component,
        PropTypes,
        classNames,
        distanceInWordsToNow
    },
    components: {
        Wrapper,
    },
    uiFrameworkComponents: {
        withStyles,
        AppBar,
        Toolbar,
        Grid,
        Card,
        Typography,
        Drawer,
        List,
        ListItem,
        ListItemText,
        ListSubheader,
        Avatar,
        Divider,
        TextField,
        Hidden,
        Button,
        IconButton,
        MenuIcon,
        MoreVertIcon,
        SendIcon,
    },
    styles: {
        ChatStyles
    }
});
