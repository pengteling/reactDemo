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
	}

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
					iscenter: false
				}*/
			]

		}
	}
	render(){		
		console.log("render 父组件");
		var controllerUnits =[];
		var ImgFigures = [];
		//console.log(imageDatas);
		imageDatas.map(function(val,key){			
			ImgFigures.push(<ImgFigure key={key} index={key} centerindex={this.state.img_center_index} src={val.filename} ref={'img'+key} tit={val.title} desc={val.desc} dolayout={this.reLayoutImage} isback={this.state.isback} doback={this.goback}/>);
		
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
