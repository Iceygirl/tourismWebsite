/* js document */

window.onload = function (){
	mx.app.showMap();
}

var mx = {};
mx.app ={};

/* connection.html js */
mx.app.showMap = function (){
		
		var nav = null;   
		
		requestPosition();
		
		function requestPosition() {  
		  if (nav == null) {  
			  nav = window.navigator;  
		  }  
		  if (nav != null) {  
			  var geoloc = nav.geolocation;  
			  if (geoloc != null) {  
				  geoloc.getCurrentPosition(successCallback);  
			  }  
			  else {  
				  alert("geolocation not supported");  
			  }  
		  }  
		  else {  
			  alert("Navigator not found");  
		  }  
		}  
		
		function successCallback(position)  { 
			
			var y = position.coords.longitude;
			var x = position.coords.latitude;
			
			var map = new BMap.Map("map");    // 创建Map实例
			var pt = new BMap.Point(y, x);
			map.centerAndZoom(pt, 11);
			
			map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
			map.setCurrentCity("汕头");          // 设置地图显示的城市 此项是必须设置的
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

		}
}

/* end of connection.html js */