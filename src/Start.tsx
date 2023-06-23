import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,TextInput} from 'react-native'
import { Styles } from './Main'
import LinearGradient from "react-native-linear-gradient";
import WebView from 'react-native-webview';
import Icons from "react-native-vector-icons/AntDesign"
interface IProps{
    start:()=>void,
    startStyle: boolean,
}
export class Start extends Component<IProps> {
    constructor(props:IProps) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    const {start,startStyle}=this.props
    return (
        <LinearGradient
        colors={['#84f5b1', '#00FFee', '#84f5b1', '#adf7eb', '#84f5b1', '#00FFCC',]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={Styles.linear}
    >  
        <View style={Styles.innerLinear}>
            <Text style={Styles.quizHeadding}>Quiz App</Text>
            <View style={Styles.insParent}>
                <View style={Styles.webview}>
                        <WebView source={{ uri: "https://embed.lottiefiles.com/animation/98991"}}/>
                </View>
            <View>
                <Text style={Styles.insInner}>This quiz contain data like 10 questions.</Text>
                <Text style={Styles.insInner}>Each question carry 10markes no negative marking</Text>
                <Text style={Styles.insInner}>You should answer the question with 20seconds..</Text>
                <Text style={Styles.insInner}>Previous questions can not be viewed</Text>
            </View>
                
            </View>
            <View style={{flexDirection:"row"}}>
              <TextInput
            placeholder='Enter Your Name..'
            style={{borderWidth:1,height:40,width:200,margin:5,backgroundColor:"#fff",borderRadius:10}}
            />
            <TouchableOpacity
                onPress={start}
                style={Styles.startParent}
            >
                <Icons name="arrowright"  size={40}/>
                {/* <Text style={!startStyle ? Styles.start : { color: "#fff" }}>Start Test</Text> */}
            </TouchableOpacity>  
            </View>
            
        </View>

    </LinearGradient>
    )
  }
}

export default Start
