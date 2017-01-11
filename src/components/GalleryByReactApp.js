import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import $ from 'jquery';

require("./../styles/main.scss");

let imageDatas_all = require("./../data/imageData.json");

/* 图片地址数组 */
let imageDatas = imageDatas_all.map(function(val){ 
	//console.log('./../images/' + val.filename);
	let imgUrl = require('../images/' + val.filename);
	//console.log("imgUrl");
	return { 
		filename: imgUrl,
		title: val.title,
		desc: val.desc
	};
});

class ImgFigure extends React.Component{
	constructor(props) {
		super(props);	
		this.handleClick = this.handleClick.bind(this); //绑定this	
	}	
	handleClick(ev){
		ev.stopPropagation();
		ev.preventDefault();
		if(this.props.data.iscenter){
			this.props.doinverse();

		}else{
			//console.log(this.props);
			this.props.docenter();
		}
	}
	render() {
		//console.log("render 子组件");

		let styleObj = {};
		styleObj = this.props.data.pos;		
		let classnamestr = this.props.data.isinverse? "isback":""	
		return (
			<figure className={classnamestr}  style={styleObj} onClick={this.handleClick} ref="imgC">
				<img src={this.props.data.filename} />
				<figcaption>
					<h2>{this.props.data.title}</h2>
				</figcaption>
				<p  onClick={this.handleClick} className="desc">{this.props.data.desc}</p>
			</figure>
			)
	}
}

class GalleryByReactApp extends React.Component{
	constructor(props) {
		super(props);		
		this.state={

			/* 状态 定义每个图片的状态信息 位置 旋转 是否翻转 是否居中 */
			imgdataArr:[

				/*{
					pos:{
						left:0,
						top:0,
						transform: rotate(0deg)
					},
					isinverse: false,
					iscenter: false,
					filename:"",
					title:"",
					desc:""
				}*/
			]

		}
	}
	getImgPos(iscenter){ //获取单个图片pos 随机和中心图片
		var stageW = $(window).width();
		var stageH = $(window).height();
		var halfStageW = Math.ceil(stageW/2);
		var halfStageH = Math.ceil(stageH/2);
		var rndx =0,rndy=0,rndrotate=0,zIndex=1;		
			
		if(iscenter){ 
			//如果中心图片
			//全部为0
			//console.log("当前中心图片id"+this.props.index);
			rndx = halfStageW -120;
			rndy = halfStageH -120;
			rndrotate = 0;
			zIndex=3;
		}
		else{
				//rndx = Math.random() * stageW;
			rndx = (Math.random() -0.5>0) ? (Math.random()*(halfStageW  - 360)-20) : (-Math.random()*(halfStageW-360)  +stageW -120);
			rndy =Math.random()* stageH;
			rndrotate = (0.5 - Math.random())* 60;			
		}

		return {			
				left: rndx +"px",
				top: rndy +"px",
				zIndex:zIndex,
				//rotate : rndrotate +"deg"			
				//transform: "rotate("+rndrotate +"deg)"
		}
	}
	layoutImage(centerindex){
		let imgdataArr =this.state.imgdataArr;
		imageDatas.map(function(val,key){
			imgdataArr[key]={
				pos : this.getImgPos(key == centerindex),
				filename :val.filename,
				desc : val.desc,
				title : val.title,
				isinverse: false,
				iscenter: key == centerindex
			};	
			
		}.bind(this));
		this.setState({
			imgdataArr: imgdataArr
		})
	}
	componentWillMount() {	
		this.layoutImage(0)
	}
	tocenter(index){
		return function(){
			//console.log(index);
			this.layoutImage(index);
		}.bind(this);
	}
	toinverse(index){
		return function(){
			let imgdataArr =this.state.imgdataArr;
			imgdataArr[index].isinverse = !imgdataArr[index].isinverse;
			this.setState({
				imgdataArr:imgdataArr
			})
		}.bind(this)
	}
	render(){		
		console.log("render 父组件");
		var controllerUnits =[];
		var ImgFigures = [];
		//console.log(imageDatas);
		imageDatas.map(function(val,key){			
			ImgFigures.push(<ImgFigure key={key} ref={'img'+key} docenter={this.tocenter(key)} doinverse={this.toinverse(key)} data={this.state.imgdataArr[key]} />);
		
			//controllerUnits.push(<ControllerUnits key={key} index={key} ref={'nav'+key}  centerindex={this.state.img_center_index} dolayout={this.layoutImage}  />);

		}.bind(this));
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
}
	


/*class ControllerUnits extends React.Component{
}*/

ReactDOM.render(
	<GalleryByReactApp/>
	,$("#app")[0]
	);
