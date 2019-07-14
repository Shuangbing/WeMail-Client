import React, { Component } from 'react';
import { TouchableHighlight, FlatList, RefreshControl, View, ScrollView } from 'react-native';
import { Container, Header, Content, ListItem, Text, Left, Right, Icon, Button } from 'native-base';
import http from '../http';
import GLOBAL from '../global';

export default class AddressTab extends Component {

  state = {
    address: [],
    isLoading: false
  }


  
  loadingAddress = async () => {
    this.setState({isLoading: true})
    const address = await http.get('/api/app/mail/address')
      .then(res => {
        this.setState({ address: res.data, isLoading: false })
      })
      .catch(err => {
        this.setState({ isLoading: false })
      })
      
  }

  componentDidMount() {
    this.loadingAddress()
  }

  onRefresh = () => {
    this.loadingAddress();
  }

  keyExtractor = (item, index) => index.toString()

  renderAddressRow = ({ item }) => (
    <ListItem button onPress={() => alert(item.aid)}>
      <Left>
        <Text>{item.address}</Text>
      </Left>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  )

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
          data={this.state.address}
          renderItem={this.renderAddressRow}>
        </FlatList>
      </ScrollView>
    );
  }
}