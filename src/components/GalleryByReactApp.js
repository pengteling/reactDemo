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
		
		// if(this.props.centerindex == this.props.index){
		// 	if(this.state.classnamestr!="isback"){
		// 		this.setState({
		// 			classnamestr : "isback"
		// 		});				
		// 	}	
		// 	else{
		// 		this.setState({
		// 			classnamestr : ""
		// 		});
		// 	}
		// 	//this.props.dolayout(this.props.index); //父组件里面的事件
		// }
		// else{
		// 	//清除一下已经翻转的状态
		// 	$(this.refs.imgC).siblings().removeClass("isback"); //已经翻转的 要翻转回去
		// 	this.props.dolayout(this.props.index); //父组件里面的事件
		// } className={this.state.classnamestr}
		this.props.dolayout(this.props.index, !this.props.isback);
		//console.log("当前点击ID："+this.props.index);
	},

	render() {

		var classnamestr ="";
		if(this.props.index == this.props.centerindex ){
			classnamestr = this.props.isback ? 'isback' : '';
		}
			
		return (
			<figure className={classnamestr}  onClick={this.handleClick} ref="imgC">
				<img src={this.props.src} />
				<figcaption>
					<h2>{this.props.tit}</h2>
				</figcaption>
				<p className="desc">{this.props.desc}</p>
			</figure>
			)
	}
});

var GalleryByReactApp = React.createClass({
	getInitialState() {
		return{
			img_center_index: Math.floor(Math.random()*16), //居中图片Index 0~15
			isback: false //正面还是背面？
		}
	},	
	reLayoutImage: function(centerindex ,isback){
		if(this.state.img_center_index != centerindex){
			this.setState({
				img_center_index: centerindex,
				isback:false
			});
			console.log("点击居中ID："+ centerindex);
			//this.layoutImage();

		}
		else{
			this.setState({
				isback : !this.state.isback
			});
		}
		
	},
	layoutImage:function(){		
		
		var stageDOM = this.refs.stage;
		var stageW = $(stageDOM).width();
		var stageH = $(stageDOM).height();
		var halfStageW = Math.ceil(stageW/2);
		var halfStageH = Math.ceil(stageH/2);

		//console.log(halfStageH);
		//console.log(halfStageW);
		console.log("当前居中ID："+this.state.img_center_index); //当前居中ID

		var centerimg =ReactDOM.findDOMNode(this.refs['img'+this.state.img_center_index]);
			//console.log(centerimg);
		$(centerimg).css("left",(halfStageW - 120)+'px').css("top", halfStageH - 135 +'px').css("z-index",3).css("rotate","0deg").siblings().css("z-index",1);

		var centernav =ReactDOM.findDOMNode(this.refs['nav'+this.state.img_center_index]);
		$(centernav).addClass("active").siblings().removeClass("active");

			var rndx =0,rndy=0,rndrotate=0;
			imageDatas.map(function(val,key){
				//console.log(this.state.img_center_index);
				if (key!= this.state.img_center_index){
					//rndx = Math.random() * stageW;
					rndx = (Math.random() -0.5>0) ? (Math.random()*halfStageW  - 360) : (Math.random()*halfStageW  + halfStageW + 360);
					rndy =Math.random()* stageH;
					rndrotate = (0.5 - Math.random())* 60;
					$(ReactDOM.findDOMNode(this.refs['img'+key])).css("left",rndx+"px").css("top",rndy+"px").css("rotate",rndrotate+"deg");
				}
			}.bind(this));

	},
	//组件加载以后 为每张图片计算位置范围
	componentDidMount() {
		this.layoutImage();
	},	
	componentDidUpdate(prevProps, prevState) {
		this.layoutImage();
	},
	render() {
		var controllerUnits =[];
		var ImgFigures = [];
		//console.log(imageDatas);
		imageDatas.map(function(val,key){
			//console.log(key);
			ImgFigures.push(<ImgFigure key={key} index={key} centerindex={this.state.img_center_index} src={val.filename} ref={'img'+key} tit={val.title} desc={val.desc} isback={this.state.isback} dolayout={this.reLayoutImage} />);
		
			controllerUnits.push(<ControllerUnits key={key} index={key} ref={'nav'+key}  centerindex={this.state.img_center_index} dolayout={this.layoutImage}  />);
		}.bind(this));
		return(
			<section className="stage" ref="stage">
				<section className="img-sec">
					{ImgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>				
			</section>

			)
	}
});

var ControllerUnits = React.createClass({
	handleClick: function(e){
		
	},
	render(){
		return(			
				<span onClick={this.handleClick} ref="navC"></span>			
			);
	}

});
ReactDOM.render(
	<GalleryByReactApp/>
	,$("#app")[0]
	)
