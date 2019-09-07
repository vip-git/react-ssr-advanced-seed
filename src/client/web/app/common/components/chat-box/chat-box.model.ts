// Library
import React, { Component } from 'react';
import { reject, find } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import JWTDecode from 'jwt-decode';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

// Material UI
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
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';

// Component
import Wrapper from '@omega-web-components/wrapper';
import ChatStyles from './styles';

export const ChatBoxModel = {
  libraries: {
    React,
    Component,
    PropTypes,
    classNames,
    distanceInWordsToNow,
    JWTDecode,
    i18next,
    withTranslation,
    reject,
    find
  },
  i18nKeys: {
    'en-US': {
      'chatbox-previous-chat': 'All Users'
    },
    'de-DE': {
      'chatbox-previous-chat': 'Alle Nutzer'
    }
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
    ChatStyles,
  },
};
