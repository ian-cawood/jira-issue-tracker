import React from 'react';
import { List } from 'react-native-elements';
import { SCREEN_WIDTH } from './variables';

export default ListOfItems = ({ data, renderListItem }) =>
  <List containerStyle={{ width: SCREEN_WIDTH * 0.9, alignSelf: 'center' }}>
    {data.map(project => renderListItem(project))}
  </List>
