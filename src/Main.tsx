import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons"

interface IProps { }
interface IState {
    data: {
        question: string,
        options: { value: string, checked: boolean }[],
        correct: number,

    }[],
    index: number,
    points: number,
    time: number,
    start: boolean,
    selected: number[]
}

let timerInterVal: number;
export class Main extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            data: [
                {
                    question: "What is extention for javascript files",
                    options: [{ value: '.ts', checked: false }, { value: '.js', checked: false }, { value: '.jas', checked: false }, { value: '.c', checked: false }],
                    correct: 1,
                },
                {
                    question: "What is the correct command to create a new React project",
                    options: [{ value: 'npm react-react-app', checked: false }, { value: 'npx create-react-app', checked: false }, { value: 'npx create-react-app app-name', checked: false }, { value: 'npm create-react-app app-name', checked: false }],
                    correct: 2,

                },
                {
                    question: "What is extention for typescript",
                    options: [{ value: '.ts', checked: false }, { value: '.js', checked: false }, { value: '.jas', checked: false }, { value: '.c', checked: false }],
                    correct: 0,

                },
                {
                    question: "React Native has a set components for:",
                    options: [{ value: 'IOS platform', checked: false }, { value: 'Android platform', checked: false }, { value: 'Both', checked: false }, { value: 'newither of the above', checked: false }],
                    correct: 2,

                },
                {
                    question: "What is props?",

                    options: [{
                        value: 'which used for rendering dynamic changes whithin component',
                        checked: false
                    },
                    { value: 'import component from one another component like react-native in app.js, custom component', checked: false },
                    { value: 'which stands for properties and is being used for passing data from one component to another', checked: false },
                    { value: 'neither of the above', checked: false }],
                    correct: 2,

                },
                {
                    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
                    options: [{ value: '<script src="">', checked: false },
                    { value: '<script name="">', checked: false },
                    { value: '<script path="">', checked: false },
                    { value: 'non of the above', checked: false }],
                    correct: 0,

                },
                {
                    question: "How do you write 'Hello World' in an alert box",
                    options: [{ value: 'message("Hello World")', checked: false },
                    { value: 'msg("Hello World")', checked: false },
                    { value: 'alert("Hello World")', checked: false },
                    { value: 'prompt("Hello World")', checked: false }],
                    correct: 2,

                },
                {
                    question: "How do you create a function in JavaScript",
                    options: [{ value: 'def fun()', checked: false },
                    { value: 'fun()', checked: false },
                    { value: 'function fun()', checked: false },
                    { value: 'fun fun()', checked: false }],
                    correct: 2,

                },
                {
                    question: "How do you call a function named 'myFunction'",
                    options: [{ value: 'call myFunction', checked: false },
                    { value: 'call myFunction()', checked: false },
                    { value: 'myFunction.call', checked: false },
                    { value: 'myFunction()', checked: false }],
                    correct: 3,

                },
                {
                    question: "What is the children prop",
                    options: [
                    { value: 'allow you to pass components as data to other components', checked: false },
                    { value: 'their is no such props', checked: false },
                    { value: 'Normally like other Props', checked: false },
                    { value: 'Non-of the above', checked: false }],
                    correct: 0,

                },
            ],
            selected: [],
            index: 0,
            points: 0,
            time: 20,
            start: true
        }
    }
    OnClick = (ind: number, correct: number) => {
        let { points, index, selected } = this.state;
        clearInterval(timerInterVal)
        selected[index] = ind;
        this.setState({ points: (ind == correct) ? points + 1 : points, index: index + 1, time: 20, selected: selected })
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        const { index, time, data,selected } = this.state;
        if (index < data.length) {
            clearInterval(timerInterVal);
            selected[index]=-1
            timerInterVal = setInterval(() => {
                if (time == 0) {
                    this.setState({ index: index + 1, time: 20,selected :selected})
                } else {
                    this.setState({ time: time - 1 })
                }
            }, 1000)
        }
    }
    render() {
        const { data, points, index, time, start ,selected} = this.state;
        let item = data[index]
        return (start ? (
            <LinearGradient
                colors={['#f0a', '#afa']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={Styles.linear}
            >
                {/* <View>
                    <Text style={[]}>Quiz App</Text>
                    <Text>
                        Wel Come to quiz application, it has 10 sections,you should attempt each question with in 20 seconds ..!,
                        each carryes 
                    </Text>
                </View> */}

                <TouchableOpacity
                    onPress={() => this.setState({ start: false })}
                    style={Styles.startParent}
                   >
                    <Text style={Styles.start}>Start Test</Text>
                </TouchableOpacity>
            </LinearGradient>
        ) : (index == data.length ? (
            <View style={Styles.optionParent}>
                <Text style={Styles.result}>Result</Text>
                <ScrollView style={Styles.scroll}
                showsHorizontalScrollIndicator={false}
                >
                    {data.map((item,index)=>{
                        return (<View key={index+""} style={Styles.ansDisplay}>
                            <Text style={[Styles.que,{color:selected[index]==-1?"#f2bf05":"#000"}]}>{index+1}.{item.question}</Text>
                            {<View>
                                {item.options.map((option,ind)=>{
                                    return <View style={selected[index]==ind&&selected[index]!=item.correct?Styles.inCorrect:((item.correct==ind)?(Styles.correct):(Styles.normal))}>
                                        <Text>{option.value}</Text>
                                    </View>
                                })}
                            </View>}
                        </View>)
                    })}
                </ScrollView>
                <Text
                    style={[Styles.points, points < 4 ? { color: "red" } : points < 7 ? { color: "#f2bf05" } : { color: "green" }]}>
                    {points * 10}/100</Text>
                <TouchableOpacity
                    onPress={() => this.setState({ start: true, points: 0, index: 0 ,selected:[]})}
                    style={Styles.goback}
                >
                    <Icon name="arrow-back" size={30} color={"#fff"}  />
                    <Text style={{color:"#fff",fontWeight:"700"}}> Back</Text>
                </TouchableOpacity>
            </View>) : (
            <View style={Styles.qA}>
                <View style={Styles.qaparent}>
                    <View style={Styles.parentTimer}>
                        <Text style={Styles.que}>{index + 1}.{item.question} ?</Text>
                        <Text style={[{ color: time < 6 ? "red" : (time < 10 ? "#f2bf05" : "green") }, Styles.timer]}>{time}</Text>
                    </View>

                    {item.options.map((option, ind) => {
                        return <TouchableOpacity
                            onPress={() => this.OnClick(ind, item.correct)}
                            style={Styles.option}
                            key={index + "s" + ind}
                            
                        >
                            <Text style={Styles.txt}>{option.value}</Text>
                        </TouchableOpacity>
                    })}
                </View>
            </View>))
        )
    }
}

export default Main

const Styles = StyleSheet.create({
    option: {
        margin: 10,
        backgroundColor: "#bee4fa",
        padding: 5,
        borderRadius: 5
    },
    txt: {
        fontWeight: "bold",
        color: "#000"
    },
    que: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        margin: 5,
    },
    points: {
        fontSize: 30,
        fontWeight: "bold"
    },
    optionParent: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    timer: {
        fontSize: 22,
        fontWeight: "bold",
        fontStyle: "italic",
        textAlign: "center",
        margin: 2,
        borderWidth: 1,
        borderRadius: 50,
        height: 30,
        width: 30
    },


    correct:{
        margin: 10,
        backgroundColor: "#84f5b1",
        padding: 5,
        borderRadius: 5
    },
    normal:{
        margin: 10,
        backgroundColor: "#bee4fa",
        padding: 5,
        borderRadius: 5
    },
    inCorrect:{
        margin: 10,
        backgroundColor: "#f5857f",
        padding: 5,
        borderRadius: 5
    },
    ansDisplay:{
        margin:5,
        backgroundColor:""
    },
    scroll:{
        backgroundColor:"#f7fcff",
    },
    result:{
        fontSize:30,
        color:"#000",
        fontFamily:"Georgia"
    },


    start: { 
        color: "#000"
     },
    startParent: {
        borderWidth: 1,
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: "#fff"
    },
    parentTimer: {
        flexDirection: "column-reverse",
        justifyContent: "space-around",
        alignItems: "center",
    },
    linear: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
    qaparent: {
        backgroundColor: "#d4eefc",
        borderRadius: 10
    },
    qA: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "#f7fcff",
    },
    goback: {
        backgroundColor: "#000",
        flexDirection:"row",
        borderRadius:40,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:5,
        marginBottom:2,
        paddingVertical:3
    }
})