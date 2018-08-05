import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, Dimensions } from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import axios from 'axios';
import { JIRA_USERNAME, JIRA_PASSWORD, NONA_URL } from 'react-native-dotenv';

import IssuesList from '../shared/list';
import { SCREEN_WIDTH } from '../shared/variables';

class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      issues: []
    };

    this.renderIssueCard = this.renderIssueCard.bind(this);
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: `${NONA_URL}/search?jql=assignee=currentuser()+AND+project=${this.props.project.key}`,
      auth: {
        username: JIRA_USERNAME,
        password: JIRA_PASSWORD
      }
    }).then(result => this.setState({ issues: result.data.issues, loading: false }));
  }

  renderIssueCard(issue) {
    return (
      <Text>{issue.name}</Text>
    );
  }

  render() {
    const { loading, issues } = this.state;

    return (
      <View style={{width: SCREEN_WIDTH, flex: 1}}>
        <Header
          centerComponent={{ text: 'ISSUES', style: { color: '#fff' } }}
        />
        <ScrollView>
          {loading &&
            <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 20 }} />
          }
          {!loading &&
            <IssuesList
              data={issues}
              renderListItem={this.renderIssueCard}
            />
          }
        </ScrollView>
      </View>
    )
  }
};

export default Issues;
