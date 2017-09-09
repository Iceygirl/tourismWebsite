/* js document */

window.onload = function (){
	mx.app.banner();
	mx.app.toRun();
	mx.app.showMap();
}

/* index.html js */
var mx = {};

mx.tools ={};
mx.tools.getStyle = function (obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] :getComputedStyle(obj,false)[attr];
}

mx.tools.getByClass = function (oParent,sClass){
	var arr = [];
	var aEle = oParent.getElementsByTagName('*');
	var re = new RegExp('\\b'+sClass+'\\b');  
	
	for(var i=0;i<aEle.length;i++){
		if( aEle[i].className.search(re) != -1){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
}

mx.ui ={};

mx.ui.fadeIn = function (obj){
	
	var cur = mx.tools.getStyle(obj,'opacity');
	if(cur == 100){
		return false;
	}
	
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function (){
		var speed = 5;
		if(value == 100){
			clearInterval(obj.timer);
		}else{
			value+=speed;
			obj.style.opacity = value/100;
		}
	},50);
}

mx.ui.fadeOut = function (obj){
	var cur = mx.tools.getStyle(obj,'opacity');
	if(cur == 0){
		return false;
	}
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function (){
		var speed = -5;
		if(value == 0){
			clearInterval(obj.timer);
		}else{
			value+=speed;
			obj.style.opacity = value/100;
		}
	},50);
}


mx.ui.move = function (obj,old,now){
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function (){
		var iSpeed = (now-old)/8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed): Math.floor(iSpeed);
		if(old == now){
			clearInterval(obj.timer);
		} else {
			old += iSpeed;
			obj.style.left = old + 'px';
		}
	},30);
	
	
};

mx.app ={};
mx.app.banner = function (){
	var oDiv = document.getElementById('banner');
	var aUl = oDiv.getElementsByTagName('ul');
	var banner_list = aUl[0];
	var tip_list = aUl[1];
	var str = '';
	
	var b_aLi = banner_list.getElementsByTagName('li');
	var t_aLi = tip_list.getElementsByTagName('li');
	
	var timer = null;
	var iNow = 0;
	
	for(var i=0;i<b_aLi.length;i++){
		str += '<li></li>';
	}
	tip_list.innerHTML = str;
	t_aLi[0].className = 'active';
	b_aLi[0].style.opacity = '1';
	
	for(var i=0;i<t_aLi.length;i++){
		t_aLi[i].index = i;
		
		t_aLi[i].onclick = function (){
			tab(this.index);
		}
	}
	
	timer = setInterval(auto,2000);
	
	function auto(){
		iNow++;
		if(iNow >= t_aLi.length){
			iNow = 0;
		}
		tab(iNow);
	}
	
	function tab(num){
		
		for(var i=0;i<t_aLi.length;i++){
			t_aLi[i].className = '';
		}
		t_aLi[num].className = 'active';
		
		for(var i=0;i<b_aLi.length;i++){
			mx.ui.fadeOut(b_aLi[i]);
		}
		mx.ui.fadeIn(b_aLi[num]);
	}
	
	oDiv.onmouseover = function (){
		clearInterval(timer);
	}
	
	oDiv.onmouseout = function (){
		timer = setInterval(auto,1500);
	}
}


mx.app.toRun = function (){
	var oUl = document.getElementById('carousel');
	var aLi = oUl.getElementsByTagName('li');
	
	var oDiv = document.getElementById('wrap');
	var oPrev = mx.tools.getByClass(oDiv,'prev')[0];
	var oNext = mx.tools.getByClass(oDiv,'next')[0];
	
	oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = aLi[0].offsetWidth*aLi.length + 'px';
	var iNow = 0;
	
	var timer = setInterval(auto,1300);
	
	function auto(){
		if( iNow == aLi.length/2){
			iNow = 0;
			oUl.style.left = 0;
		}
		mx.ui.move(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
		iNow++;
	}
	
	function autoPrev(){
		if( iNow == 0){
			iNow = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2+'px';
		}
		mx.ui.move(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
		iNow--;
	}
	
	oPrev.onclick = function (){
		autoPrev();
		//alert('a');
	}
	
	oNext.onclick = function (){
		auto();
	}
	
	oDiv.onmouseover = function (){
		clearInterval(timer);
	}
	
	oDiv.onmouseout = function (){
		timer = setInterval(auto,1200);
	}
}
/* end of index.html js */

/* connection.html js */

mx.app.showMap = function (){
		navigator.geolocation.getCurrentPosition(function (position){
			var y = position.coords.longitude;
			var x = position.coords.latitude;
			
			
			var map = new BMap.Map("map");    // 创建Map实例
			var pt = new BMap.Point(y, x);
			map.centerAndZoom(pt, 11);  // 初始化地图,设置中心点坐标和地图级别
			map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
			map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
			
			
			var myIcon = new BMap.Icon("../imgs/girl.png", new BMap.Size(300,157));
			var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
			map.addOverlay(marker2);              // 将标注添加到地图中			
			
		
			var opts = {
				  width : 200,     // 信息窗口宽度
				  height: 100,     // 信息窗口高度
				  title : "我的地址" // 信息窗口标题
			}
			var infoWindow = new BMap.InfoWindow("地址:广东汕头", opts);  // 创建信息窗口对象 
			marker2.addEventListener("click", function(){          
				map.openInfoWindow(infoWindow,pt); //开启信息窗口
			});


		});
	}

/* end of index.html js */