import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, Dimensions } from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import axios from 'axios';
import { JIRA_USERNAME, JIRA_PASSWORD, NONA_URL } from 'react-native-dotenv';

import ProjectsList from '../shared/list';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      projects: []
    };

    this.renderListItem = this.renderListItem.bind(this);
    this.getIssuesForProject = this.getIssuesForProject.bind(this);
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: `${NONA_URL}/project`,
      auth: {
        username: JIRA_USERNAME,
        password: JIRA_PASSWORD
      }
    }).then(result => this.setState({ projects: result.data, loading: false }));
  }

  getIssuesForProject(selectedProject) {
    console.log("function called");
    axios({
      method: 'get',
      url: `${NONA_URL}/search?jql=assignee=currentuser()+AND+project=${selectedProject.key}`,
      auth: {
        username: JIRA_USERNAME,
        password: JIRA_PASSWORD
      }
    }).then(result => console.log(result.data.issues.length)).catch(error => console.log(error));
  }

  renderListItem(project) {
    return (
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
        onPress={() => this.getIssuesForProject(project)}
      />
    );
  }

  render() {
    const { loading, projects } = this.state;

    return (
      <View style={{width: Dimensions.get('window').width, flex: 1}}>
        <Header
          centerComponent={{ text: 'PROJECTS', style: { color: '#fff' } }}
        />
        <ScrollView>
          {loading &&
            <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 20 }} />
          }
          {!loading &&
            <ProjectsList
              data={projects}
              renderListItem={this.renderListItem}
            />
          }
        </ScrollView>
      </View>
    )
  }
};

export default Projects;
