import React, { Component } from 'react'
import { Text, View ,ScrollView,TouchableOpacity} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import PieChart from "react-native-pie-chart"

import {Styles} from "./Main"


interface IProps{
    data: {
        question: string,
        options: { value: string, checked: boolean }[],
        correct: number,
        

    }[],
    selected: number[],
    points: number,    
    series: number[];
    sliceColor: string[];
    result:()=>void
    
}
interface IState{

}
export class Result extends Component<IProps,IState> {
    constructor(props:IProps) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    let {data,selected,series,sliceColor,points,result}=this.props;
    return (
      <View style={Styles.optionParent}>
                <Text style={Styles.result}>Result</Text>
              
                <ScrollView style={Styles.scroll}>
                    {data.map((item, index) => {
                        return (<View key={index + ""} style={Styles.ansDisplay}>
                            <Text style={[Styles.que, { color: selected[index] == -1 ? "#f2bf05" : "#000" }]}>
                                {index + 1}.{item.question}
                            </Text>
                            {<View>
                                {item.options.map((option, ind) => {
                                    return <View style={selected[index] == ind && selected[index] != item.correct ? Styles.inCorrect : ((item.correct == ind) ? (Styles.correct) : (Styles.normal))}>
                                        <Text>{option.value}</Text>
                                    </View>
                                })}
                            </View>}
                        </View>)
                    })}
                </ScrollView>

                <View style={{width:"100%",flexDirection:"row",justifyContent:"space-around",shadowColor:"#000",shadowOpacity:1,borderTopWidth:1,paddingTop:2}}>
                <PieChart
                widthAndHeight={40}
                series={series}
                coverRadius={0.45}
                coverFill={"doughnut"}
                sliceColor={sliceColor}
                />
                
                <Text
                    style={[Styles.points, points < 4 ? { color: "red" } : points < 7 ? { color: "#f2bf05" } : { color: "green" }]}>
                    {points * 10}/100</Text>

                </View>
                
                <TouchableOpacity
                    onPress={result}
                    style={Styles.goback}
                >
                    <Icon name="arrow-back" size={25} color={"#fff"} />
                    <Text style={Styles.gobackinner}> Back</Text>
                </TouchableOpacity>
            </View>
    )
  }
}

export default Result
