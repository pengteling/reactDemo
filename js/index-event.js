// var React = require('react');
// console.log("t");
// import React from 'react';
// import Router from 'react-router';

//var React = require("react");
//var ReactDOM = require("react-dom");
import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import $ from 'jquery';

var TestClickComponent = React.createClass({
	handleClick:function(){
		if(this.refs.tip.style.display!='none'){
			this.refs.tip.style.display='none';
		}
		else{
			this.refs.tip.style.display='';
		}
	},
	render:function(){
		return (
			<div>
				<button onClick={this.handleClick}>显示|隐藏</button><span ref="tip">测试点击</span>
			</div>
			);
	}
});
var TestInputComponent = React.createClass({
	getInitialState() {
		return{
			inputContent:''
		}
	},
	handleChange(event){
		event.preventDefault(); //阻止 默认事件
		event.stopPropagation(); //阻止冒泡
		console.log(findDOMNode(this));
		console.log(this.props.children);
		this.setState({
			//inputContent : event.target.value
			inputContent: $(event.target).val()
		})
		
	},
	render: function(){
		return(
			<div>
				<input type="text" onChange={this.handleChange} /><span>{this.state.inputContent}</span>
			</div>
			);
	}
});
ReactDOM.render(
	<div>
        <TestClickComponent />
        <br/><br/>
        <TestInputComponent />
    </div>,
    document.getElementById('app')
);
