import React from 'react'
import ReactDOM,{findDOMNode} from 'react-dom'
//import $ from 'jquery';
class Content extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			iptContent:""
		}
		this.handleBlur = this.handleBlur.bind(this)  //绑定this
		this.handleClick = this.handleClick.bind(this)
	}
	handleBlur(e){
		this.setState({
			iptContent :e.target.value
		})
	}
	handleClick(){
		//this.setState({
			//提交评论
			//iptContent: this.

		//})
		//console.log(this.props)
		console.log("评论："+this.props.replyto)
		console.log("内容："+this.state.iptContent)
	}
	handleTest(){ //箭头函数 每次render的时候
		console.log(this)
	}
	
	render(){
		return (
			<div>
			<textarea name="content" id="content" cols="30" rows="10" onBlur={this.handleBlur} onChange={()=>this.handleTest()}>{this.state.iptContent}</textarea>
			<input type="button" value ="评论" onClick={this.handleClick}/>
			</div>
			)
	}
}
class Comment extends React.Component{
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
		this.state={
			names:["Tom", "Jim" ,"Kate"],
			selectName:""
		}
	}
	handleChange(e){
		this.setState({selectName: e.target.value })
	}
	render(){
		let namelist =[]
		this.state.names.map(
			(val) => {
			namelist.push(<option value={val}>{val}</option>)
			}

			//function(val){}
		)
		return (
			<div>
			<select name="selectname" id="selectname" onChange={this.handleChange}>
			<option value="">请选择要回复的对象</option>{namelist}</select>
			<Content replyto={this.state.selectName} />
			</div>
			)
	}
}

ReactDOM.render(
	<Comment />,
	document.getElementById("app")
	)


//父组件  学校 内部 state 班主任   -》 props  班主任   班级 接收props 班主任  state:   班长  今天多少人交作业 打扫卫生 state