// var React = require('react');
// console.log("t");
// import React from 'react';
// import Router from 'react-router';

//var React = require("react");
//var ReactDOM = require("react-dom");
import React from 'react';
import ReactDOM from 'react-dom';
var Hello = React.createClass({
	getInitialState() {
		console.log("getInitialState");
		return{
			tit:"getInitialState"
		}
	},
	getDefaultProps() {
		return{
			prop1:"123"
		}
	},
	componentWillUpdate(nextProps, nextState) {
		//this.state.tit="componentWillUpdate";
		console.log("componentWillUpdate" + nextProps + "," +nextState.tit);
	},
	componentWillMount() {
		//this.state.tit="componentWillMount";
		//this.refs.tips.innerHTML="test";
		console.log("componentWillMount");
	},
	componentDidMount() {		
		console.log("componentDidMount");		
	},
	componentDidUpdate(prevProps, prevState) {
		console.log("componentDidUpdate"+prevState.tit);
	},
	componentWillUnmount() {
		console.log("componentWillUnmount");
	},
	handleClick:function(){
		this.setState({tit:"handleClick"});
		console.log("handleClick");
	},
	render:function(){
		return (
			<div><h1 onClick={this.handleClick}>{this.props.title} - {this.state.tit}</h1><div ref="tips">test</div></div>
			)
	}
});
ReactDOM.render(
        <Hello title="ptl"/>,
        document.getElementById('app')
);
