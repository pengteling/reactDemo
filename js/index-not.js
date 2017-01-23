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

const __DEV__  = true ;

if(__DEV__){
    window.Perf = Perf 
}

class SurveyList extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state= {
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
    }
    handleChange(id){

        //let newitem = this.state.items;
        //console.log(id);
        let newitem = this.state.items.concat([]);
        newitem[id].checked = !newitem[id].checked;
        this.setState({
            items: newitem
        })
    }
    render(){
        let that = this;
        return(
            <div>
            {
                this.state.items.map(function(label,i){
                    //console.log(i)
                    return <Checkbox label={label} key={i} onChange={that.handleChange.bind(that,i)} />
                })
            }
            </div>
            )
    }
}

class Checkbox extends React.Component{
    constructor(props) {
        super(props); 
        this.handleChange = this.handleChange.bind(this);       
    }
    handleChange(){
        //this.props.onChange(this.props.label.id);
        this.props.onChange();
    }
    render(){
        return(
            <div>
            {this.props.label.text}
            <input type="checkbox" checked={this.props.label.checked} onChange={this.handleChange} />
            {this.props.label.checked? this.props.label.on : this.props.label.off}
            </div>
            )
    }

}


ReactDOM.render(
	<SurveyList />,
    document.getElementById('app')
);
