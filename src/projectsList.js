import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import axios from 'axios';
import { JIRA_USERNAME, JIRA_PASSWORD, NONA_URL } from 'react-native-dotenv';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: `${NONA_URL}/project`,
      auth: {
        username: JIRA_USERNAME,
        password: JIRA_PASSWORD
      }
    }).then(result => this.setState({ projects: result.data }));
  }

  render() {
    console.log(this.state.projects);
    console.log(this.state.projects.length > 0 && this.state.projects[0].projectCategory.name)
    return (
      <ScrollView>
        <List containerStyle={{ width: SCREEN_WIDTH * 0.9 }}>
          {this.state.projects.map(project =>
            <ListItem
              roundAvatar
              avatar={
                <SvgUri
                  width="30"
                  height="30"
                  source={{uri: project.avatarUrls['32x32']}}
                />
              }
              key={project.id}
              title={project.name}
              subtitle={project.projectCategory ? project.projectCategory.name : project.key}
            />
          )}
        </List>
      </ScrollView>
    )
  }
};

export default ProjectsList;
