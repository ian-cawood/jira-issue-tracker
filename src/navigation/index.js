import { createStackNavigator } from 'react-navigation';

import ProjectsScreen from '../projects';
import IssuesScreen from '../issues';


export default AppStack = createStackNavigator(
  {
    Projects: ProjectsScreen,
    Issues: IssuesScreen,
  },
  {
    initialRouteName: 'Projects',
    headerMode: 'none'
  }
);
