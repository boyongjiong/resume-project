# This is my resume project

I enjoy it, hope you have the same feeling.

## normalize.css 
normalize.css是一个可以定制的CSS文件，它让不同的浏览器在渲染网页元素的时候形式更统一。

> normaolize.css能干什么？ 

> * 保留有用的默认值，不同于许多CSS的重置
> * 标准化的样式，使用范围广的元素
> * 纠正错误和常见的浏览器的不一致性
> * 一些细微的改进，提高了易用性
> * 使用详细的注释来解释代码

> 支持的浏览器

> * Google Chrome(latest)
> * Mozilla Firfox(latest)
> * Mozilla Firfox ESR
> * Opera(latest)
> * Apple Asfari 6+
> * Internet Explorer 8+

## Font Awesome
the official webpage 
[Font Awesome](https://fortawesome.github.io/Font-Awesome/examples/)

### Get Started
Easy ways to get font awesome 4.5.0 onto your website

Setting up Font Awesome can be as simple as adding two lines of code to your website,or you can be a pro and customize the LESS yourself!Font Awesome even plays with Bootstrap 3!

**1**. Paste the following code into the <head> section of your site's HTML.
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
```
> immediately after release, it takes a bit of time for BootstrapCDN to catch up and get the newest version live on their CDN.
**2**. Pat yourself on the back for your scalable-vector-icons-on-the-website judo solution in a single line of code.
**3**. Check  out the examples to start using Font Awesome!

## @import

@import是css [@规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule),用于加载外部层叠样式表。@import规则必须放在除了@charset规则以外的css规则的前面；@import规则不可以嵌套于条件规则组中。
@import可以在URI后面附带媒体查询，每条媒体查询间用逗号分隔。若没有媒体查询，则该导入时无条件的，相当于指定媒体为all。

### 语法
```
@import url;
@import url list-of-media-queries;
```

其中：
 - url
 		Is a <string> or a <uri> representing the location of the resource to import. The URL may be absolute or relative. Note that the URL need not actually specify a file; it can just specify the package name and part, and the appropriate file is chosen automatically.

### 正规语法
```
@import [ <string> | <url> ] [<media-query-list>]?;
```

### 示例
```
@import url("fineprint.css") print;
@import url("bluish.css") projection, tv;
@import "custom.css";
@import url("chrome://communicator/skin/");
@import "common.css" screen,projection;
@import url("landscape.css") screen and (orientation:landscape);
```

## @font-face
@font-face是css3中的一个模块，它主要是把自己定义的web字体嵌入到网页中，随着@font-face模块的出现，我们在web的开发中使用字体不怕只能使用Web安全字体了，而且@font-face 功能早在IE4就支持了。
[XIANGXIJIESHI](http://www.w3cplus.com/content/css3-font-face)
[Google Fonts](https://www.google.com/fonts/)

## modernizr.custom.js
[Respond to your user's browser features.](https://modernizr.com/)

### What's Modernizr?
it's a collection of superfast tests - or "detects" as we like to cal them - which run as your web page loads, then you can use the results to tailor the wxperence to the user.

### Why we need it?
All web developers come up against differences between browsers and devices. That's largely due to different feature sets: the latest versions of the popular browsers can do some awesome things which olfer browsers can't - but we still have to support the older ones.

Modernizr makes it easy to deliver tiered experiences: make yse of the latest and greatest features in browsers which support tem,without leaving less fortunate users high and dry.

### Using Modernizr with Javascript
the Modernizr object
Modernizr keeps track of the results of all of it's feature detections via the Modernizr object.That means that for each test, a corresponding property will be added. You just have to test for truthiness in your code to figure out what you want to do
```
if(Modernizr.awesomeNewFeature){
	showOffAwesomeNewFeature();
}
else{
	getThe OldLameExperience();
}
```

### Modernizr._domPrefixs
Modernizr._domPrefixes is exactly the same as _prefixes, but rather than kebab-case properties, all properties are their Capitalized variant
```
Modernizr._domPrefixes === ["Moz","O","ms","Webkit"];
```

## CSS 中的em
 使用em值设定字体大小。em值得大小是动态的。当定义font-size属性时，1em等于元素的父元素的字体大小。如果你在网页中任何地方都没有设置文字大小的话，那它将等于浏览器默认文字大小，通常是16px。所以通常1em = 16px，2em = 32px.如果你设置了body元素的字体大小为20px，那么1em = 20px， 2em = 40px。

[css 中的 em](http://www.w3cplus.com/css/px-to-em)

## interact.js



