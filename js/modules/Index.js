import React,{Component} from "react"
import { Router, Route, Link,hashHistory } from 'react-router'
export default class Index extends Component{
	render(){
		return (
			 <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
          <li><Link to="/repos" activeStyle={{ color: 'red' }}>Repos</Link></li>
        </ul>
         {this.props.children}
      </div>

			)
	}
}