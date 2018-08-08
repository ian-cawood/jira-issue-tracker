import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import axios from 'axios';
import { JIRA_USERNAME, JIRA_PASSWORD, NONA_URL } from 'react-native-dotenv';
import SvgUri from 'react-native-svg-uri';

import StoryList from '../shared/list';
import { SCREEN_WIDTH } from '../shared/variables';

class Stories extends Component {
  constructor(props) {
    super(props);

    this.project = this.props.navigation.getParam('project');

    this.state = {
      loading: true,
      stories: []
    };

    this.renderStoryCard = this.renderStoryCard.bind(this);
    this.backPress = this.backPress.bind(this);
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: `${NONA_URL}/search?jql=assignee=currentuser()+AND+project=${this.project.key}+AND+type=Story`,
      auth: {
        username: JIRA_USERNAME,
        password: JIRA_PASSWORD
      }
    }).then(result => this.setState({ stories: result.data.issues, loading: false }));
  }

  selectStory(story) {
    this.props.navigation.navigate('Issues',{
      issues: story.fields.subtasks
    });
  }

  renderStoryCard(story) {
    console.log(story);
    return (
      <ListItem
        roundAvatar
        avatar={
          <SvgUri
            width="30"
            height="30"
            source={{uri: this.project.avatarUrls['32x32']}}
          />
        }
        key={story.id}
        title={story.fields.summary}
        subtitle={story.fields.status.name}
        onPress={() => this.selectStory(story)}
      />
    );
  }

  backPress () {
    this.props.navigation.goBack();
  };

  render() {
    const { loading, stories } = this.state;

    return (
      <View style={{width: SCREEN_WIDTH, flex: 1}}>
        <Header
          leftComponent={{ icon: 'arrow-back', onPress: this.backPress }}
          centerComponent={{ text: 'STORIES', style: { color: '#fff' } }}
        />
        <ScrollView>
          {loading &&
            <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 20 }} />
          }
          {!loading &&
            <StoryList
              data={stories}
              renderListItem={this.renderStoryCard}
            />
          }
        </ScrollView>
      </View>
    )
  }
};

export default Stories;
