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

	getInitialState() {
		return{
			classnamestr:''
		}
	},
	
	handleClick:function(){
		//console.log("test");
		// if(this.props.centerindex == this.props.index){
		// 	console.log(this.refs.imgC);
		// 	console.log(this.state.isback);
		// 	if(this.state.isback==false){ //翻转
		// 		$(this.refs.imgC).addClass("isback");
		// 		this.setState({
		// 			isback : true
		// 		});
		// 		console.log(this.state.isback);
		// 	}
		// 	else{
		// 		$(this.refs.imgC).removeClass("isback");
		// 		this.setState({
		// 			isback: false
		// 		});
		// 		console.log(this.state.isback);
		// 	}
		// }else{

		// 	$(this.refs.imgC).siblings().removeClass("isback"); //已经翻转的 要翻转回去
		// 		this.setState({
		// 			isback: false
		// 		});			

		// 	//要重新排布  layoutImage(centerindex)

		// 	this.props.dolayout(this.props.index); //父组件里面的事件

		// }
		if(this.props.centerindex == this.props.index){
			if(this.state.classnamestr!="isback"){
				this.setState({
					classnamestr : "isback"
				});				
			}	
			else{
				this.setState({
					classnamestr : ""
				});
			}
			//this.props.dolayout(this.props.index); //父组件里面的事件
		}
		else{
			//清除一下已经翻转的状态
			$(this.refs.imgC).siblings().removeClass("isback"); //已经翻转的 要翻转回去
			this.props.dolayout(this.props.index); //父组件里面的事件
		}
	},
	render() {
		return (
			<figure className={this.state.classnamestr} onClick={this.handleClick} ref="imgC">
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
	}
	,
	dolayout:function(index){
		this.setState({
			img_center_index : index
		});
		console.log(index);
		console.log(this.state.img_center_index);

		if(index==this.state.img_center_index){
			this.setState({
				isback: !this.state.isback				
			})
		}else{
			this.setState({
				isback: false
			})
		};
		
	},
	componentDidUpdate(prevProps, prevState) {
		this.layoutImage(this.state.img_center_index);	
	},
	layoutImage:function(){				
		
		var stageDOM = this.refs.stage;
		var stageW = $(stageDOM).width();
		var stageH = $(stageDOM).height();
		var halfStageW = Math.ceil(stageW/2);
		var halfStageH = Math.ceil(stageH/2);

		//console.log(halfStageH);
		//console.log(halfStageW);
		console.log(this.state.img_center_index); //当前居中ID

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
			// var stageDOM = this.refs.stage;
			// var stageW = $(stageDOM).width();
			// var stageH = $(stageDOM).height();
			// var halfStageW = Math.ceil(stageW/2);
			// var halfStageH = Math.ceil(stageH/2);

			// console.log(halfStageH);
			// console.log(halfStageW);
			// console.log(this.state.img_center_index); //当前居中ID

			// var centerimg =ReactDOM.findDOMNode(this.refs['img'+this.state.img_center_index]);
			// //console.log(centerimg);
			// $(centerimg).css("left",(halfStageW - 120)+'px').css("top", halfStageH - 135 +'px').css("z-index",3);
			// var rndx =0,rndy=0;
			// imageDatas.map(function(val,key){
			// 	console.log(this.state.img_center_index);
			// 	if (key!= this.state.img_center_index){
			// 		rndx = Math.random() * stageW;
			// 		rndy =Math.random()* stageH;
			// 		$(ReactDOM.findDOMNode(this.refs['img'+key])).css("left",rndx+"px").css("top",rndy+"px");
			// 	}
			// }.bind(this));

	},
	// inverse:function(index){
	// 	var new_isback = this.state.isback == true? false : true ;
	// 	this.setState({
	// 		isback: new_isback
	// 	})
	// },
	render() {
		var controllerUnits =[];
		var ImgFigures = [];
		//console.log(imageDatas);
		imageDatas.map(function(val,key){
			//console.log(key);
			ImgFigures.push(<ImgFigure key={key} index={key} src={val.filename} ref={'img'+key} tit={val.title} desc={val.desc} centerindex={this.state.img_center_index} dolayout={this.dolayout} isback={this.state.isback}/>);
		
			controllerUnits.push(<ControllerUnits key={key} index={key} ref={'nav'+key}  centerindex={this.state.img_center_index} dolayout={this.dolayout}  isback={this.state.isback} />);
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
