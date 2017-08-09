import React from 'react';
import ReactDOM from 'react-dom';

var style = require("./../sass/main.scss");
console.log(style); //style.title
ReactDOM.render((
<h1 className={style.title}>
      Hello World
    </h1>
	),document.getElementById("app"))

