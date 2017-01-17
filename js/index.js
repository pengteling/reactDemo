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
			sex: "男",
			checked : false
		}
		this.handleChangeUsername = this.handleChangeUsername.bind(this)
		this.handleChangeSex = this.handleChangeSex.bind(this)
		this.handleChangeAgree = this.handleChangeAgree.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChangeUsername(e){
		this.setState({
			username : e.target.value
		})
	}
	handleChangeSex(e){
		//console.log(e.target.value);
		this.setState({
			sex : e.target.value
		})
	}
	handleChangeAgree(e){
		this.setState({
			checked : e.target.checked
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
				<input type="text" placeholder="请输入姓名" name="username" id="username" onChange={this.handleChangeUsername} /><br/>
				<select name="sex" id="sex" onChange={this.handleChangeSex}>
					<option value="1">男</option>
					<option value="0">女</option>
				</select><br/>
				<label htmlFor="agree">同意</label><input type="checkbox" name="agree" id="agree" onChange={this.handleChangeAgree} /><br/>
				<input type="submit" value="提交" onClick ={this.handleSubmit}/>
			</div>
			)
	}

}

ReactDOM.render(
	<MyForm />,
    document.getElementById('app')
);
