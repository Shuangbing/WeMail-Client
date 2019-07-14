import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

const Loader = props => {
  const {
    loading,
  } = props;

  return (
    <ActivityIndicator size="small" color="#8fa1b7" visible={loading}/>
  )
}

export default Loader;