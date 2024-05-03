// StatusBarComponent.js

import React from 'react';
import {StatusBar as RNStatusBar} from 'react-native';
import {COLORS} from '../constants';

const StatusBarComponent = ({backgroundColor}) => (
  <RNStatusBar
    barStyle="light-content"
    backgroundColor={backgroundColor || COLORS.secondary} // Use provided color or default to secondary color
  />
);

export default StatusBarComponent;
