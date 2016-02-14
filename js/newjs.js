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

