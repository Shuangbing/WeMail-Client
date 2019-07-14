import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';

class Loader extends Component {
  
    render(){
        return(
            <Modal transparent={true}
            visible={this.props.loading}
            onRequestClose={this.closeModal}>
                {
                    console.log(this.props.loading)
                }
            <View style={{
                backgroundColor: 'rgba(52, 52, 52, 0.2)',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    backgroundColor: '#f6f6f6',
                    width: 100,
                    height: 100,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderRadius: 15,
                }}><ActivityIndicator size="large" color="#222" /></View>

            </View>
        </Modal>
        );
    }
}

export default Loader;