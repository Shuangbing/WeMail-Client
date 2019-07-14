/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';


export default class MailView extends Component {

    
    
    render() {
        const INJECTED_JAVASCRIPT = `(function() {
            var meta = document.createElement("meta");
            meta.name="viewport";
            meta.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0");
            document.getElementsByTagName("head")[0].appendChild(meta);
        })();`;
    
        const { navigation } = this.props;
        const html = navigation.getParam('html','null');
        console.log(html)
        return (
            <View style={{flex:1}}>
                <WebView
                    useWebKit={true}
                    originWhitelist={['*']}
                    source={{html: html}}
                    injectedJavaScript={INJECTED_JAVASCRIPT}
                >
                </WebView>
            </View>
        );
    }
}

