import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Header } from 'react-native-elements';

import IssuesList from '../shared/list';
import { SCREEN_WIDTH } from '../shared/variables';

class Issues extends Component {
  constructor(props) {
    super(props);

    this.issues = this.props.navigation.getParam('issues');

    this.renderIssueCard = this.renderIssueCard.bind(this);
    this.backPress = this.backPress.bind(this);
  };

  renderIssueCard(issue) {
    return (
      <Text
        key={issue.id}
      >
        {issue.fields.summary}
      </Text>
    );
  }

  backPress () {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{width: SCREEN_WIDTH, flex: 1}}>
        <Header
          leftComponent={{ icon: 'arrow-back', onPress: this.backPress }}
          centerComponent={{ text: 'ISSUES', style: { color: '#fff' } }}
        />
        <ScrollView>
          <IssuesList
            data={this.issues}
            renderListItem={this.renderIssueCard}
          />
        </ScrollView>
      </View>
    )
  }
};

export default Issues;
