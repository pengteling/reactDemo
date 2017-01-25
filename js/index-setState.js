// var React = require('react');
// console.log("t");
// import React from 'react';
// import Router from 'react-router';

//var React = require("react");
//var ReactDOM = require("react-dom");
import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
//import $ from 'jquery';
require("./../sass/main.scss");

import Perf from 'react-addons-perf';
import Immutable from 'immutable';
import update from 'react-addons-update'; // ES6 
//import PureRenderMixin from 'react-addons-pure-render-mixin';
const __DEV__  = true ;

if(__DEV__){
    window.Perf = Perf 
}

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            items:[
            {
                id :0,
                text:"你喜欢吃萝卜吗",
                on:"喜欢",
                off:"不喜欢",
                checked:false
            },
            {
                id :1,
                text:"你喜欢吃西瓜吗",
                on:"喜欢",
                off:"不喜欢",
                checked:false
            },
            {
                id :2,
                text:"你喜欢吃香蕉吗",
                on:"喜欢",
                off:"不喜欢",
                checked:false
            }
            ]
        }
        this.handleClick= this.handleClick.bind(this);
    }

    handleClick(){
         this.setState(state => {
             let itemsArr = state.items;
             console.log(itemsArr);
             itemsArr[0].text = "this is changed";
             return {items : itemsArr}
        }
        )
    }
    render(){
        //let items = this.state.get("items");
        //this.state.get("items").set()
       
        return(
            <div onClick={this.handleClick}>
                {
                    this.state.items.map(function(v,i){
                        return <div key={i}>{v.text}</div>
                    })
                }
            </div>
                
            )
    }
}

ReactDOM.render(
	<App />,
    document.getElementById('app')
);
