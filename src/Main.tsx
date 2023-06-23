import React, { Component } from 'react'

import { StyleSheet } from 'react-native'
import Start from './Start';
import Result from './Result';
import QueAns from './QueAns';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    selected: number[],
    startStyle: boolean,
    series: number[];
    sliceColor: string[];
    right:number,
    wrong:number,
    skip:number
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
            start: true,
            startStyle: false,
            series: [],
            sliceColor: [],
            right:0,
            wrong:0,
            skip:0,
        }
    }
    OnClick = (ind: number, correct: number) => {
        let { points, index, selected ,series,sliceColor,right,wrong,skip} = this.state;
        clearInterval(timerInterVal)
        selected[index] = ind;       
        if(selected[index]==correct){
            right++;
        }else{
            wrong++;
        }
        if(index==9){
            let i=0;
                while(i<right){
                    sliceColor.push("green")
                    series.push(123);
                    i++;
                }
                 while(i<(right+skip)){
                    sliceColor.push("#f2bf05");
                    series.push(123);
                    i++;
                }
                while(i<10){
                    sliceColor.push("red")
                    series.push(123);
                    i++;
                }
         
        }
            this.setState({ points: (ind == correct) ? points + 1 : points,
                 index: index + 1,
                  time: 20, selected: selected,
                  series:series,sliceColor:sliceColor,
                 right:right,
                 wrong:wrong,
                        
                }) 
    }
    start=() => this.setState({ start: false })
    result=() => this.setState({ start: true, points: 0, index: 0, selected: [] })
    componentDidUpdate() {
        const { index, time, data, selected,skip } = this.state;
        if (index < data.length) {
            clearInterval(timerInterVal);
            selected[index] = -1
            
            timerInterVal = setInterval(() => {
                if (time == 0) {
                    this.setState({ index: index + 1, time: 20, selected: selected,skip:skip+1 })
                } else {      
                    this.setState({ time: time - 1 })
                }
            }, 1000)
        }
    }
    render() {
        const { data, points, index, time, start, selected, startStyle,series,sliceColor } = this.state;
        let item = data[index]
        return (start ? (
            <Start
            start={this.start}
            startStyle={startStyle}
            />
        ) : (index == data.length ? (
            <Result
            result={this.result}
            data={data}
            points={points}
            selected={selected}
            sliceColor={sliceColor}
            series={series}
            />
            ) : (
                <QueAns
                item={item}
                OnClick={this.OnClick}
                index={index}
                time={time}
                />
            ))
        )
    }
}

export default Main

export const Styles = StyleSheet.create({
    option: {
        margin: 10,
        backgroundColor: "#bee4fa",
        padding: 5,
        borderRadius: 5
    },
    insInner: {
        color: "#fff",
        fontSize: 17
    },
    webview:{height:200,
        width:300,
        borderRadius:50,
        overflow:"hidden"},
    insParent:{
        marginVertical:10,
        justifyContent:"center",
        alignItems:"center"
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
    quizHeadding:{ fontWeight: "bold", fontSize: 23 ,borderBottomWidth:1,borderBottomColor:"#84f5b1"},

    correct: {
        margin: 10,
        backgroundColor: "#84f5b1",
        padding: 5,
        borderRadius: 5
    },
    normal: {
        margin: 10,
        backgroundColor: "#bee4fa",
        padding: 5,
        borderRadius: 5
    },
    inCorrect: {
        margin: 10,
        backgroundColor: "#f5857f",
        padding: 5,
        borderRadius: 5
    },
    innerLinear: {
        backgroundColor: "#58a9f5",
        padding: 10,
        borderRadius: 10,
        margin: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    gobackinner:{ 
        color: "#fff",
         fontWeight: "700"
         },
    ansDisplay: {
        margin: 5,
        backgroundColor: ""
    },
    scroll: {
        backgroundColor: "#f7fcff",
    },
    result: {
        fontSize: 30,
        color: "#000",
        fontFamily: "Georgia"
    },


    start: {
        color: "#000",
        fontSize: 18,

    },
    startParent: {

       
     height:40,
        borderRadius: 5,
        marginTop:5,
        backgroundColor: "#83f7e4",
        

    },
    parentTimer: {
        flexDirection: "column-reverse",
        justifyContent: "space-around",
        alignItems: "center",
    },
    linear: { 
        width: "100%",
         height: "100%", 
         justifyContent: "center",
          alignItems: "center" 
        },
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
        flexDirection: "row",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 2,
        paddingVertical: 3,

    }
})