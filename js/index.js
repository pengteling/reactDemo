// var React = require('react');
// console.log("t");
// import React from 'react';
// import Router from 'react-router';

//var React = require("react");
//var ReactDOM = require("react-dom");
import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
//import $ from 'jquery';
//require("./../sass/main.scss");
import Css from "./../sass/main.scss";

class MyForm  extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			username : "",
			sex: "1",
			checked : false
		}
		
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(e){ //合并到一个handler
		this.setState({
			[e.target.name] : e.target.name == "checked" ? e.target.checked : e.target.value
		})
	}
	
	handleSubmit(e){
		e.preventDefault();
		e.stopPropagation();
		console.log(this.state);
	}
	render(){
		return(
			<div>
				<input type="text" placeholder="请输入姓名" name="username" id="username" onChange={this.handleChange} /><br/>
				<select name="sex" id="sex" onChange={this.handleChange} value={this.state.sex}>
					<option value="1">男</option>
					<option value="0">女</option>
				</select><br/>
				<label htmlFor="agree">同意</label><input type="checkbox" name="checked" id="checked" onChange={this.handleChange} /><br/>
				<input type="submit" value="提交" onClick ={this.handleSubmit}/>
			</div>
			)
	}

}

ReactDOM.render(
	<MyForm />,
    document.getElementById('app')
);
