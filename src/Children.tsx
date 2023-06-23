import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {WebView} from "react-native-webview"
export class Children extends Component {
  render() {
    return (
      <View>
        <WebView
     
        source={{ uri: "https://embed.lottiefiles.com/animation/98991"}} style={{height:100,width:100}}/>

      </View>
    )
  }
}

export default Children
