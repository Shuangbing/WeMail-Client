import React, { Component } from 'react';
import { FlatList, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Icon, Button, Text, View } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import http from '../http';
import GLOBAL from '../global';
import MailView from './MailView';
import { RootContext } from './RootContext';


import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';


class TabView extends Component {
  state = {
    mail: [],
    spinner: false,
    isLoading: false
  }
  

  loadingMail = async () => {
    this.setState({isLoading: true})
    const mails = await http.get('/api/app/mail/recive')
      .then(res => {
        this.setState({isLoading: false})
        this.setState({ mail: res.data })
      })
      .catch(err => {
        this.setState({isLoading: false})
      })
  }



  componentDidMount() {
    this.loadingMail()
  }

  mailItemOnpress = () => {
    this.props.navigation.navigate('MailView',{
      html: 'html'
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderMailRow = ({ item }) => (
    <ListItem avatar style={{flex: 1}}
    onPress={() => {
      this.props.navigation.navigate('MailView', {
        html: item.html
      });}}>
      <Left>
        <UserAvatar size='50' style={{flex: 1}} name={item.from_address.toUpperCase()} color="#8DA1B9" />
      </Left>
      <Body>
        <Text>{item.subject.slice(0, 20)}</Text>
        <Text note style={{fontSize: 15}}>{item.text.replace(/\ +/g, "").replace(/[\r\n]/g, "").slice(0, 25)}</Text>
      </Body>
      <Right>
        <Text note>{item.to_address}</Text>
      </Right>
    </ListItem>
  )

  onRefresh = () => {
    global.variables = { http_loading: true }
    this.loadingMail();
  }


  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => this.onRefresh()}
          />
        }>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.mail}
          renderItem={this.renderMailRow}>
        </FlatList>
      </ScrollView>
    );
  }
}

const Stack = createStackNavigator({
  TabView: { screen: TabView, navigationOptions: { header: null, } },
  MailView: { screen: MailView, navigationOptions: { header: null, } },
}, {
    initialRouteName: 'TabView',
  }
)

export default createAppContainer(Stack)