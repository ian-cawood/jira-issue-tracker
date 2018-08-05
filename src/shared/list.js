import React from 'react';
import { Dimensions } from 'react-native';
import { List } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default ListOfItems = ({ data, renderListItem }) =>
  <List containerStyle={{ width: SCREEN_WIDTH * 0.9, alignSelf: 'center' }}>
    {data.map(project => renderListItem(project))}
  </List>
