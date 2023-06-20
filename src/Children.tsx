import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {WebView} from "react-native-webview"
export class Children extends Component {
  render() {
    return (
        <WebView source={{ uri: 'https://embed.lottiefiles.com/animation/133700' }} style={{ flex: 1 }} />
    )
  }
}

export default Children
