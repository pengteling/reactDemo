import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import $ from 'jquery';

require("./../styles/main.scss");
var imageDatas_all = require("./../data/imageData.json");

/* 图片地址数组 */
var imageDatas = imageDatas_all.map(function(val){ 
	//console.log('./../images/' + val.filename);
	var imgUrl = require('../images/' + val.filename);
	//console.log("imgUrl");
	return imgUrl;
});
var ImgFigure = React.createClass({
	render() {
		return (
			<figure>
				<img src={this.props.data} />
								<figcaption>
					<h2></h2>
				</figcaption>
			</figure>
			)
	}
});

var GalleryByReactApp = React.createClass({
	CONSTANT:{
		centerPos:{
			left:0,
			right:0
		},
		hPosRange:{ //水平方向
			leftSecX:[0,0],
			rightSecX:[0,0],
			y:[0,0]
		},
		vPosRange:{ //垂直方向
			x:[0,0],
			topY:[0,0]
		}
	}

	,
	//组件加载以后 为每张图片计算位置范围
	componentDidMount() {
			var stageDOM = this.refs.stage;
			var stageW = stageDOM.scrollWidth;
			var stageH = stageDOM.scrollHeight;
			var halfStageW = Math.ceil(stageW/2);
			var halfStageH = Math.ceil(stageH/2);


	},
	render() {
		var controllerUnits =[];
		var ImgFigures = [];
		//console.log(imageDatas);
		imageDatas.map(function(val,key){
			console.log(key);
			ImgFigures.push(<ImgFigure key={key} data={val} ref={'img'+key} />);
		});
		return(
			<section className="stage" ref="stage">
				<section className="img-sec">
					{ImgFigures}
				</section>
				<nav className="controller-nav">
				</nav>
			</section>

			)
	}
});

ReactDOM.render(
	<GalleryByReactApp/>
	,$("#app")[0]
	)
