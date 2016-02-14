/**
 myscript.js
**/ 
(function(){
	var docElem = window.document.documentElement,
		//transition end event name
		transEndEventNames = {"WebkitTransition": "webkitTransitionEnd", "MozTransition": "transitionend", "OTransition": "oTransitionEnd", "msTransition": "msTransitionEnd", "transition": "transitionend" },
		transEndEventName = transEndEventNames[ Modernizr.prefixed("transition") ];
	function scrollX(){ return window.pageXOffset || docElem.scrollLeft; }
	//element.scrollTop属性可以设置或获取一个元素距离它顶部的像素距离（可见高度）
	function scrollY(){ return window.pageYOffset || docElem.scrollTop; }
	function getOffset(el){
		//getBoundingClientRect方法返回元素的大小及其相对视窗的位置
		var offset = el.getBoundingClientRect();
		return{top: offset.top + scrollY(), left: offset.left + scrollX() };
	}

	function dragMoveListener(event){
		var target = event.target,
			//keep the dragged position in the data-x/data-y attributes
			x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
			y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

		//translate the element
		target.style.transform = target.style.webkitTransform = 'translate("+ x +"px, "+ y +"px)';
		target.style.zIndex = 10000;

		//update the position attributes
		target.setAttribute("data-x", x);
		target.setAttribute("data-y", y);
	}

	function revertDraggable(el){
		el.style.transform = el.style.webkitTransform = "none";
		el.style.zIndex = 1;
		el.setAttribute("data-x", 0);
		el.setAttribute("data-y", 0);
	}

	function init(){

		//target elements with the "drag-element" class
		interact(".drag-element").draggable({
			//enable inertial throwing
			inertia: true,
			//call this function on every dragmove event
			onmove: dragMoveListener,
			//call this function on wvwey dragend event
			onend: function(event){
				//当指定的元素没有“drag-element--droped”和“drag-element--dropped-text”元素，就不做任何事
				if(!classie.has(event.target, "drag-element--dropped") && !classie.has(event.target, "drag-element--dropped-text")){
					revertDraggable(event.target);
				}
			}
		});

		//enable draggables to be dropped into this
		interact(".paint-area").dropzone({
			//only accept elements matching this CSSselector
			accept: ".drag-element",
			//Require a 75%element overlap for a drop to be possible
			overlap: 0.75,
			ondragenter: function(event){
				classie.add(event.target, "paint-area--highlight");
			},
			ondrop: function(event){
				var type = "area";
				if(classie.has(event.target, "paint-area--text")){
					type = "text";
				}

				var draggableElement = event.relatedTarget;

				classie.add(draggableElement, type === "text" ? "drag-element--dropped-text" : "drag-element--dropped");
				//calculate distance to the base
				console.log(event.target)
				console.log(event.dragEvent.clientY);
				console.log(getOffset(event.target).top);
				console.log("translate3d(0," + Number(getOffset(event.target).top - event.dragEvent.clientY - 20) + "px,0)");
				// draggableElement.style.transform = "translate3d(0," + Number(getOffset(event.target).top) - event.dragEvent.clientY) + "px,0)";

				var onEndTransCallbackFn = function(ev){
					this.removeEventListener(transEndEventName, onEndTransCallbackFn);
					if(this.type === "area"){
						paintArea(event.dragEvent, event.target, draggableElement.getAttribute("data-color"));
					}
					setTimeout(function(){
						revertDraggable(draggableElement);
						classie.remove(draggableELement, type === "text" ? "drag-element--dropped-text" : "drag-element--dropped");
					},type === "text" ? 0 : 250);
				};
				if(type === "text"){
					paintArea(event.dragEvent, event.target, draggableElement.getAttribute("data-color"));
				}
				draggableElement.querySelector(".drop").addEventListener(transEndEventName, onEndTransCallbackFn);
			},
			ondropdeactivate: function(event){
				//remove active dropzone feedback
				classie.remove(event.target, "paint-area--highlight");
			}
		});

		//reset colors
		document.querySelector("button.reset-button").addEventListener("click", resetColors);
	}

	function paintArea(ev, el, color){
		var type = "area";
		if(classie.has(el,"paint-area--text")){
			type = "text";
		}

		if(type === "area"){
			//create SVG element
			var dummy = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			dummy.setAttributeNS(null,"version","1.1");
			dummy.setAttributeNS(null,"width","100%");
			dummy.setAttributeNS(null,"height","100%");
			dummy.setAttributeNS(null,"class","paint");

			var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
			g.setAttributeNS(null, "transform", "translate(" + Number(ev.pageX -getOffset(el).left) + "," + Number(ev.pageY - pageOffset(el).top) + ")");

			var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			circle.setAttributeNS(null, "cx", 0);
			circle.setAttributeNS(null, "cy", 0);
			circle.setAttributeNS(null, "r", Math.sqrt(Math.pow(el.offseWidth,2) + Math.pow(el.offsetWidth,2) + Math.pow(el.offsetHeight,2)));
			circle.setAttributeNS(null, "fill", color);

			dummy.appendChild(g);
			g.appendChild(circle);
			el.appendChild(dummy);
		}

		setTimeout(function(){
			classie.add(el, "paint--active");

			if(type === "text"){
				el.style.color = color;
				var onEndTransCallbackFn = function(ev){
					if(ev.target != this) return;
					this.removeEventListener(transEndEventName, onEndTransCallbackFn);
					classie.remove(el, "paint--active");
				};

				el.addEventListener(transEndEventName, onEndTransCallbackFn);
			}
			else{
				var onEndTransCallbackFn = function(ev){
					if(ev.target != this || ev.propertyName === "fill-opacity") return;
					this.removeEventListener(transEndEventName, onEndTransCallbackFn);
					//set the color
					el.style.backfroundColor = color;
					//remove SVG element
					el.removeChild(dummy);

					setTimeout(function(){classie.remove(el, "paint--active");},25);
				};
				circle.addEventListener(transEndEventName, onEndTransCallbackFn);
			}
		},25);
	}

	function resetColors(){
		[].slice.call(document.querySelectorAll(".paint-area")).forEach(function(el){
			el.style[classie.has(el, "paint-area--text") ? "color" : "background-color"] = "";
		});
	}
	/* 实现两张展示图片的轮流展示 */ 
	function showPic(thisPic){
		/* 验证placeHolder是否存在 */
		if(!document.getElementById("place-holder")) return false;
		/* 动态的修改图片的显示 */
		var source = thisPic.getAttribute("href");
		var placeHolder = document.getElementById("place-holder");
		/* 定义变量text用来保存placeHolder中图片的路径 */
		var text = placeHolder.getAttribute("src");
		/* 在改变完place-holder的src属性后，将text赋给按钮中a标签，实现两张图片轮转 */
		placeHolder.setAttribute("src",source);
		thisPic.setAttribute("href",text);
	}

	function changePic(){
		/* 为了实现平稳退化，在禁用javascript后程序依然可以执行 */ 
		if(!document.getElementById) return false;
		var mockBtn = document.getElementById("mock-btn");
		mockBtn.onclick = function(){
			showPic(this);
			return false;
		}
	}

	/*********************************
		window.onload 需要写成 
		window.onload = function(){
		firstFunction();
		secondFunction();
		}
		的形式才能完成执行两个函数操作
	*********************************/
	// window.onload = prepareGallery;

	/* 弹性最佳方案：addLoadEvent函数 唯一的参数是打算在页面加载完毕执行函数的名字*/
	function addLoadEvent(func){
		var oldonload = window.onload;
		if(typeof window.onload != "function"){
			window.onload = func;
		}
		else{
			window.onload = function(){
				oldonload();
				func();
			}
		}
	}

	addLoadEvent(changePic);
	addLoadEvent(init);

})();