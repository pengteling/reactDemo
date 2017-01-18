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
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group' // ES6
import Css from "./../sass/main.scss";

// 导入通过 NPM 安装的 GSAP 
import TweenMax from 'gsap';


class Box extends React.Component {
	constructor(props) {
		super(props);		
	}
	componentWillApear(callback){
		const el = ReactDOM.findDOMNode(this);
		console.log("componentWillApear");  //? why not work
		callback();
		//const el = ReactDOM.findDOMNode(this);
		//TweenMax.fromTo(el, 0.3, {x:300 ,y: 0, opacity: 0}, {x:0,y: 0, opacity: 1, onComplete: callback});
		//callback();
		
	}
	componentDidAppear(){
		console.log("componentDidAppear");
		const el = ReactDOM.findDOMNode(this);
		TweenMax.fromTo(el, 0.3, {x:300 ,y: 0, opacity: 0}, {x:0,y: 0, opacity: 1, onComplete: function(){}});
	}
    componentWillEnter (callback) {
    	console.log("componentWillEnter");
        const el = ReactDOM.findDOMNode(this);
        //callback();
        TweenMax.fromTo(el, 0.3, {x:0 ,y: 100, opacity: 0}, {x:300,y: 0, opacity: 1, onComplete: callback});
        //var that=this;
       // setTimeout(that.callback,3000);
    }
    componentDidEnter() {
    	console.log("componentDidEnter")    	
    }

    componentWillLeave (callback) {
    	console.log("componentWillLeave");
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.3, {x:300 , y: 0, opacity: 1}, {x:0 ,y: -100, opacity: 0, onComplete: callback});
    }
    componentDidLeave() {
	    console.log('componentDidLeave');
	}
	// componentDidMount() {
	// 	console.log("componentDidMount")
	// }

    render () {
        return (
            <div
                style={{
                    width: '100px',
                    height: '100px',
                    margin: '100px',
                    borderRadius: '50%',
                    backgroundColor: 'red'
                }}>
            </div>
        );
    }
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			show :true
		}
		this.handleToggle = this.handleToggle.bind(this)
	}
    

    handleToggle() {
        this.setState({
            show: !this.state.show
        });
    }

    render () {
        return (
            <div className="wrapper">
                <button onClick={this.handleToggle}>Toggle</button>
                <ReactTransitionGroup>
                    { this.state.show && <Box key="a"></Box> }                   
                </ReactTransitionGroup>
            </div>
        )
    }
}


ReactDOM.render(
	<App />,
    document.getElementById('app')
);
