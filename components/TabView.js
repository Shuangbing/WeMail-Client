import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, Body, Title } from 'native-base';
import AddressTab from './AddressTab';
import MailTab from './MailTab';
import UserTab from './UserTab';
import http from '../http';
import { YellowBox, ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GLOBAL from '../global';
import { RootContext } from './RootContext';

export default class TabView extends Component {

    state = { isLoading: true, isLogin: false, access_token: null, username: null };

    componentDidMount() {
        AsyncStorage.getItem('@access_token', (err, item) =>  this.setState({access_token: item}));
        AsyncStorage.getItem('@username', (err, item) => this.setState({username: item}));
    }

    loadSpinner() {
        <RootContext.Consumer>
            {context => {
                if (context.isLoading) {
                    return <ActivityIndicator size="small" color="#8fa1b7" />
                }
            }
            }
        </RootContext.Consumer>

    }

    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
        ]);
        return (
            <RootContext.Provider value={this.state}>
                <Container>
                    <Header hasTabs iosBarStyle='dark-content'>
                        <Body style={{ justifyContent: 'center', flexDirection: 'row' }}>
                            {this.loadSpinner()}
                            <Title>WeMail</Title>
                        </Body>
                    </Header>
                    <Tabs>
                        <Tab heading="受信トレイ">
                            <MailTab />
                        </Tab>
                        <Tab heading="アドレス">
                            <AddressTab />
                        </Tab>
                        <Tab heading="アカウント">
                            <UserTab />
                        </Tab>
                    </Tabs>
                </Container>
            </RootContext.Provider>
        );
    }
}
