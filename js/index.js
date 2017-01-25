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

    	var newState = this.state.items.setIn([labelId,"checked"],!this.state.items.getIn([labelId,"checked"]));
    	
    	this.setState({
    		items: newState
    	});

 // this.setState(function() { 
 // 	items: update(this.state.items, {0: { text : {$set :"123"}}}) 
 // });

//  this.setState((prevState, props) => {
//   return {
//   	items: update(prevState.items, {0: { text : {$set :"123"}}}) 
//   };
// })
//this.setState( state => update( state,{ items: { 0 : { text : {$set : 123} }} }) )
    	//console.log(newState)
        //console.log(labelId);
        

        // //console.log(newData);
        // this.setState(newData);

        /*可以更改  但render了三次 */
        //this.setState( state => update( state,{ items: { 0 : { text : {$set : 123} }} }) )

        // this.setState(state => {
        //      let itemsArr = state.items;
        //      console.log(itemsArr);
        //      itemsArr[0].text = "this is changed";
        //      return {items : itemsArr}
        // })


        /*这种不会重新render*/
        /*let newitem = this.state.items;
        newitem[labelId].checked = !newitem[labelId].checked;
        this.setState({
            items: newitem
        })*/
        
    }
    render(){
        let that = this;
        //console.log(this.state)
        return(
            <div>
            {
                this.state.items.map(function(label,i){
                    //console.log(i)
                    return <Checkbox label={label} key={i} onChange={that.handleChange.bind(that)} />
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
        this.props.onChange(this.props.label.get("id"));
    }
    
    render(){
        console.log(this.props.label.get("id"))
        return(
            <div>
            {this.props.label.get("text")}
            <input type="checkbox" checked={this.props.label.get("hecked")} onChange={this.handleChange} />
            {this.props.label.get("checked")? this.props.label.get("on") : this.props.label.get("off")}
            </div>
            )
    }

}


ReactDOM.render(
    <SurveyList />,
    document.getElementById('app')
);
