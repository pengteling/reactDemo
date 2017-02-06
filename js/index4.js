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
    handleChange(labelId){

        /*console.log(labelId);
        const newData = update(this.state, { 
            items: {
                        $apply: function(x){ 
                            x[labelId].checked = !x[labelId].checked;
                            return x  }
                } 
                
            
        }         
        );
        //console.log(newData);
        this.setState(newData);*/

        /*可以更改  但render了三次 */
        // this.setState( state => update( state,{ items: { 0 : { text : {$set : 123} }} }) )

        this.setState(
            state => update(state, {
                items : {
                    $apply : function(x){
                        console.log(x[labelId].checked);
                        x[labelId].checked = !x[labelId].checked;
                        console.log(x[labelId].checked);
                       // console.log(x)
                        return x;
                    }
                }
            })
            ,function(){
                console.log(this.state);
            })

        


        /*这种不会重新render*/
        // let newitem = this.state.items;
        // newitem[labelId].checked = !newitem[labelId].checked;
        // this.setState({
        //     items: newitem
        // })
        
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
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);  //PureRenderMixin

    }
    handleChange(){
        //this.props.onChange(this.props.label.id);
        this.props.onChange();
    }
    
    render(){
        console.log(this.props.label.id)
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
