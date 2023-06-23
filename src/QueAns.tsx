import React, { Component } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native'
import { Styles } from './Main'

interface IProps{
index:number,
item:{
    question: string,
    options: { value: string, checked: boolean }[],
    correct: number,

},
time:number,
OnClick:(ind: number, correct: number)=>void
}
export class QueAns extends Component<IProps> {
    constructor(props:IProps) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    const {index,item,time,OnClick}=this.props;
    return (
        <View style={Styles.qA}>
        <View style={Styles.qaparent}>
            <View style={Styles.parentTimer}>
                <Text style={Styles.que}>{index + 1}.{item.question} ?</Text>
                <Text style={[{ color: time < 6 ? "red" : (time < 10 ? "#f2bf05" : "green") }, Styles.timer]}>{time}</Text>
            </View>
            {item.options.map((option, ind) => {
                return <TouchableOpacity
                    onPress={() => OnClick(ind, item.correct)}
                    style={Styles.option}
                    key={index + "s" + ind}
                >
                    <Text style={Styles.txt}>{option.value}</Text>
                </TouchableOpacity>
            })}
        </View>
    </View>
    )
  }
}

export default QueAns
