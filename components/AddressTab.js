import React, { Component } from 'react';
import { TouchableHighlight, FlatList, RefreshControl, View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, ListItem, Text, Left, Right, Icon, Button } from 'native-base';
import http from '../http';
import Loader from './Loader';
import AddeessCreate from './AddeessCreate';

import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

class AddressTab extends Component {

  state = {
    address: [],
    isLoading: false,
    isCreating: false
  }

  CreateAddress = () => {
    this.setState({ isCreating: true });
    http.post('/api/app/mail/address', {
    })
        .then((res) => {
            this.setState({ isCreating: false });
            if (res.data) {
                this.setState({ isCreating: false });
                this.loadingAddress()
                setTimeout(() => {
                  Alert.alert('完成', res.data.address+'\n'+res.message);
                }, 100);
            } else {
                this.setState({ isCreating: false })
                setTimeout(() => {
                    Alert.alert('エラー', res.message);
                }, 100);
            }
        })
        .catch((err) => {
            this.setState({ isCreating: false })
            setTimeout(() => {
                Alert.alert('Internet Error', err);
            }, 100);
        })


}

  loadingAddress = async () => {
    this.setState({ isLoading: true })
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

  openCreteAddress() {
    this.props.navigation.navigate('AddressCreate');
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
      <View style={{flex: 1}}>
        <Loader loading={this.state.isCreating} />
        <View style={styles.container}>
          <Button light style={styles.buttonStyle} onPress={this.CreateAddress}>
            <Text>自動作成</Text>
          </Button>
          <Button light style={styles.buttonStyle} onPress={this.openCreteAddress}>
            <Text>指定作成</Text>
          </Button>
          <Button info style={styles.buttonStyle}>
            <Text>バックアップ</Text>
          </Button>
        </View>
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
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  buttonStyle: {
  }
});

const Stack = createStackNavigator({
  AddressTab: { screen: AddressTab, navigationOptions: { header: null, } },
  AddressCreate: { screen: AddeessCreate, navigationOptions: { header: null, } },
}, {
    initialRouteName: 'AddressTab',
  }
)

export default createAppContainer(Stack)