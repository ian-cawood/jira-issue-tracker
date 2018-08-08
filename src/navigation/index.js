import { createStackNavigator } from 'react-navigation';

import ProjectsScreen from '../projects';
import IssuesScreen from '../issues';
import StoriesScreen from '../stories';


export default AppStack = createStackNavigator(
  {
    Projects: ProjectsScreen,
    Stories: StoriesScreen,
    Issues: IssuesScreen
  },
  {
    initialRouteName: 'Projects',
    headerMode: 'none'
  }
);
