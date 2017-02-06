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
//import update from 'react-addons-update'; // ES6 
import update from 'immutability-helper';
//import PureRenderMixin from 'react-addons-pure-render-mixin';
const __DEV__  = true ;

if(__DEV__){
    window.Perf = Perf 
}

class SurveyList extends React.PureComponent{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state= {
            items:Immutable.fromJS([
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
            ])
        }
    }
    handleChange(labelId){
        
        let newitem = this.state.items;

        let newitem2 = newitem.setIn([labelId,"checked"],!newitem.getIn([labelId,"checked"]));
        this.setState({
            items: newitem2
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

class Checkbox extends React.PureComponent{
    constructor(props) {
        super(props); 
        this.handleChange = this.handleChange.bind(this);       
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);  //PureRenderMixin

    }
    handleChange(){
        //this.props.onChange(this.props.label.id);
        this.props.onChange();
    }
    
    render(){
        console.log(this.props.label.get("id"))
        return(
            <div>
            {this.props.label.get("text")}
            <input type="checkbox" checked={this.props.label.get("checked")} onChange={this.handleChange} />
            {this.props.label.get("checked")? this.props.label.get("on") : this.props.label.get("off")}
            </div>
            )
    }

}


ReactDOM.render(
    <SurveyList />,
    document.getElementById('app')
);
