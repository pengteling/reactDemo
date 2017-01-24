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
import update from 'react-addons-update'; // ES6 
import PureRenderMixin from 'react-addons-pure-render-mixin';
const __DEV__  = true ;

if(__DEV__){
    window.Perf = Perf 
}

class Sample extends React.PureComponent{
  
  constructor(props) {
    super(props);
    this.state = {
      name: 'Lucy',
      pet: Immutable.fromJS({
        type: 'cat',
        color: 'red',
      })
    };
  }
  
  componentDidUpdate() {
    console.log('did update');
  }
  
  change() {
    this.setState({
      name: this.refs.name.value,
      // pet: {
      //   color: this.refs.petColor.value,
      //   type: this.refs.petType.value
      // }
      pet: this.state.pet.set("color",this.refs.petColor.value)
            .set("type",this.refs.petType.value)
    });
    
  }
  
  render() {
    const name = this.state.name;
    const petC = this.state.pet.get("color");
    const petT = this.state.pet.get("type");
    return (
      <div>
        <strong></strong>
          <div>{name}'s pet is a {petC} {petT}.</div>
        <hr/>
        <p>
          name: 
          <input type="text" ref="name" defaultValue={name}/>
        </p>
        <p>
          pet color: 
          <input type="text" ref="petColor" defaultValue={petC}/>
        </p>
        <p>
          pet type: 
          <input type="text" ref="petType" defaultValue={petT}/>
        </p>
        <button onClick={() => this.change()}>Change</button>
      </div>
    );
  }
}

ReactDOM.render(
    <Sample />,
    document.getElementById('app')
);
