import React, { Component } from 'react';
import { StyleSheet, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native';
import { Container, Content, Text, Button, View, Form, Item, Label, Input } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import http from '../http';
import AsyncStorage from '@react-native-community/async-storage';
import { RootContext } from './RootContext';
import Loader from './Loader';

export default class UserTab extends Component {

    state = {
        username: '',
        password: '',
        isLogin: false,
        isLoading: false,
    }

    Login = () => {
        this.setState({ isLoading: true });
        http.post('/api/auth/login', {
            username: this.state.username,
            password: this.state.password,
            isLogin: false
        })
            .then((res) => {
                this.setState({ isLoading: false });
                if (res.access_token) {
                    AsyncStorage.setItem('@access_token', res.access_token);
                    AsyncStorage.setItem('@username', this.state.username);
                    this.setState({ isLogin: true });
                } else {
                    this.setState({ isLoading: false })
                    setTimeout(() => {
                        Alert.alert('ログインできません', res.message);
                    }, 100);
                }
            })
            .catch((err) => {
                this.setState({ isLoading: false })
                setTimeout(() => {
                    Alert.alert('インターネット接続エラー', err);
                }, 100);
            })


    }


    Logout = async () => {
        this.setState({password: ''})
        try {
            await AsyncStorage.removeItem('@access_token');
            await AsyncStorage.removeItem('@username');
            this.setState({ isLogin: false })
        } catch (error) {
            alert(error)
        }
    }

    render() {
        if (!this.state.isLogin) {
            return (
                <ScrollView style={{ padding: 20 }}>
                    <Container style={styles.container}>
                        <Loader loading={this.state.isLoading} />
                        <Content>
                            <Form>
                                <Item floatingLabel>
                                    <Label>アカウント</Label>
                                    <Input autoCapitalize={false} onChangeText={value => this.setState({ username: value })} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>パスワード</Label>
                                    <Input onChangeText={value => this.setState({ password: value })} secureTextEntry={true} />
                                </Item>
                                <Button block info style={styles.buttonStyle} onPress={this.Login}>
                                    <Text>ログイン</Text>
                                </Button>
                                <Button block info style={styles.buttonStyle} onPress={this.Login}>
                                    <Text>新規登録</Text>
                                </Button>
                            </Form>
                        </Content>
                    </Container>
                </ScrollView>
            )
        } else {
            return (
                <ScrollView style={{ padding: 20 }}>
                    <Container style={styles.container}>
                        <Loader loading={this.state.isLoading} />
                        <Content>
                            <Form>
                                <Item>
                                    <Label>{this.state.username}</Label>
                                </Item>
                                <Button block info style={styles.buttonStyle} onPress={this.Logout}>
                                    <Text>ログアウト</Text>
                                </Button>
                            </Form>
                        </Content>
                    </Container>
                </ScrollView>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 100,
        marginTop: 25,
    },
    buttonStyle: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25
    }
});