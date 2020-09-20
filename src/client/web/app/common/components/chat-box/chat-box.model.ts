// Library
import React, { Component } from 'react';
import { reject, find } from 'lodash';
import SplitPane from 'react-split-pane';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import JWTDecode from 'jwt-decode';
import { useTranslation } from 'react-i18next';

// Material UI
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// Icons
import { 
  AccountCircle as AccountCircleIcon, 
  GroupWork as GroupWorkIcon, 
  Menu as MenuIcon, 
  Send as SendIcon 
} from '@material-ui/icons';

// Component
import Wrapper from '@omega-web-components/wrapper';
import OptionsBar from '@omega-web-components/options-bar'; 
import ModalForm from '@omega-web-components/modal-form'; 
import Tabs from '@omega-web-components/tabs'; 
import SettingsForm from '@omega-web-components/settings';
import CreateGroupForm from '@omega-web-components/create-group';
import useChatStyles from './styles';

export const ChatBoxModel: any = {
  libraries: {
    React,
    Component,
    PropTypes,
    classNames,
    distanceInWordsToNow,
    JWTDecode,
    SplitPane,
    useTranslation,
    reject,
    find
  },
  i18nKeys: {
    'en-US': {
      'chatbox-all-users': 'All Users',
      'chatbox-all-groups': 'All Groups',
      'create-group-title': 'Create Group',
      'create-group-description': 'Create a group so you can add your friends for a quick chat.',
      'settings-title': 'Settings',
      'settings-description': 'Manage your settings',
    },
    'de-DE': {
      'chatbox-all-users': 'Alle Nutzer',
      'chatbox-all-groups': 'Alle Gruppen',
      'create-group': 'Gruppe Erstellen',
      'create-group-title': 'Create Group',
      'create-group-description': 'Create a group so you can add your friends for a quick chat.',
    },
    'fr-FR': {
      'chatbox-all-users': 'Tous les utilisateurs',
      'chatbox-all-groups': 'Tous les groupes',
      'create-group': 'Créer un Groupe',
      'create-group-title': 'Create Group',
      'create-group-description': 'Create a group so you can add your friends for a quick chat.',
    }
  },
  components: {
    Wrapper,
    OptionsBar,
    ModalForm,
    Tabs,
    SettingsForm,
    CreateGroupForm
  },
  uiFrameworkComponents: {
    withWidth,
    isWidthUp,
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
    SendIcon,
    AccountCircleIcon,
    GroupWorkIcon,
  },
  styles: {
    useChatStyles,
  },
};
