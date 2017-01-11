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
	layoutImage:function(){		
		var stageW = $(window).width();
		var stageH = $(window).height();
		var halfStageW = Math.ceil(stageW/2);
		var halfStageH = Math.ceil(stageH/2);
		var rndx =0,rndy=0,rndrotate=0;		
			
		if(this.props.index==this.props.centerindex){ 
			//如果中心图片
			//全部为0
			//console.log("当前中心图片id"+this.props.index);
			rndx = halfStageW -120;
			rndy = halfStageH -120;
			rndrotate = 0;
		}
		else{
				//rndx = Math.random() * stageW;
			rndx = (Math.random() -0.5>0) ? (Math.random()*halfStageW  - 360) : (Math.random()*halfStageW  + halfStageW + 360);
			rndy =Math.random()* stageH;
			rndrotate = (0.5 - Math.random())* 60;			
		}

		return {			
				left: rndx +"px",
				top: rndy +"px",
				rotate : rndrotate +"deg"			
		};
	},
	componentWillMount() {
		//this.layoutImage();
		//console.log("子组件的 componentWillMount")
		
	},	
	componentWillUpdate(nextProps, nextState) {  //state未更新前。。。。
		// if(nextState == this.state  ){ //子组件的state 未发生变化 即只是父组件传过来的参数变化 centerindex 
		// 	//this.layoutImage();
		// 	//console.log(nextProps);
		// 	//if(this.props.index==1)
		// 	//console.log("当前中心图片id" + this.props.centerindex + "当前图片id" + this.props.index);
		// 	// if(this.props.index==this.props.centerindex){ 
		// 	// 	console.log("当前中心图片id" + this.props.centerindex +"当前图片id" + this.props.index);
		// 	// 	console.log("当前图片位置：" + this.state.pos.left);
		// 	// }
		// 	 if(this.props.index==this.props.centerindex){ 
		// 	console.log("当前中心图片id" + this.props.centerindex +"当前图片id" + this.props.index+"当前图片位置：" + this.state.pos.left);
				
		// 	 }
		// }
	},
	componentDidUpdate(prevProps, prevState) {
		/*如果引起变化 是props引起 而不起state引起的 */
		if(prevState == this.state  ){
				var imageDom = this.refs.imgC;
				$(imageDom).css(this.layoutImage()); //重新排位			
		}
		//var imageDom = this.refs.imgC;
		//$(imageDom).css(this.state.pos);
		if(this.props.index==this.props.centerindex){ 
				console.log("当前中心图片id" + this.props.centerindex +"当前图片id" + this.props.index);

		}else{

		}


	},
	componentDidMount() {
		var imageDom = this.refs.imgC;
		$(imageDom).css(this.layoutImage());
		//console.log(this.layoutImage());
	},
	handleClick:function(e){
		if(this.props.index==this.props.centerindex){
			this.props.doback();
		 }
		else{
			//this.layoutImage();
			//调用父组件
			//this.props.doback();
			this.props.dolayout(this.props.index);

			//this.layoutImage();
		}	
	},

	render() {
		//console.log("render 子组件");
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
	reLayoutImage: function(centerindex ){		
			this.setState({
				img_center_index: centerindex
			});					
	},	
	goback: function(){
		this.setState({
			isback : !this.state.isback
		})
	},
	//组件加载以后 为每张图片计算位置范围
	componentDidMount() {
		//this.layoutImage();
		//console.log("重新加载")
	},	
	componentDidUpdate(prevProps, prevState) {
		//this.layoutImage();
	},
	render() {
		console.log("render 父组件");

		var controllerUnits =[];
		var ImgFigures = [];
		//console.log(imageDatas);
		imageDatas.map(function(val,key){
			//console.log(key);
			ImgFigures.push(<ImgFigure key={key} index={key} centerindex={this.state.img_center_index} src={val.filename} ref={'img'+key} tit={val.title} desc={val.desc} dolayout={this.reLayoutImage} isback={this.state.isback} doback={this.goback}/>);
		
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
