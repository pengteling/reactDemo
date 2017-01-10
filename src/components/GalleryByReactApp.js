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
	return { 
		filename: imgUrl,
		title: val.title,
		desc: val.desc
	};
});
var ImgFigure = React.createClass({

	handleClick:function(){
		console.log("test");
	},
	render() {
		return (
			<figure onClick={this.handleClick}>
				<img src={this.props.src} />
								<figcaption>
					<h2>{this.props.tit}</h2>
				</figcaption>
			</figure>
			)
	}
});

var GalleryByReactApp = React.createClass({
	getInitialState() {
		return{
			img_center_index: Math.floor(Math.random()*16), //居中图片Index 0~15
			isback:0 //正面还是背面？

		}
	}

	,
	//组件加载以后 为每张图片计算位置范围
	componentDidMount() {
			var stageDOM = this.refs.stage;
			var stageW = $(stageDOM).width();
			var stageH = $(stageDOM).height();
			var halfStageW = Math.ceil(stageW/2);
			var halfStageH = Math.ceil(stageH/2);

			console.log(halfStageH);
			console.log(halfStageW);
			console.log(this.state.img_center_index); //当前居中ID

			var centerimg =ReactDOM.findDOMNode(this.refs['img'+this.state.img_center_index]);
			//console.log(centerimg);
			$(centerimg).css("left",(halfStageW - 120)+'px').css("top", halfStageH - 135 +'px').css("z-index",3);
			var rndx =0,rndy=0;
			imageDatas.map(function(val,key){
				console.log(this.state.img_center_index);
				if (key!= this.state.img_center_index){
					rndx = Math.random() * stageW;
					rndy =Math.random()* stageH;
					$(ReactDOM.findDOMNode(this.refs['img'+key])).css("left",rndx+"px").css("top",rndy+"px");
				}
			}.bind(this));

	},
	render() {
		var controllerUnits =[];
		var ImgFigures = [];
		//console.log(imageDatas);
		imageDatas.map(function(val,key){
			console.log(key);
			ImgFigures.push(<ImgFigure key={key} src={val.filename} ref={'img'+key} tit={val.title} desc={val.desc}  />);
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
