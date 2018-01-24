(function(){
var oDiv=document.getElementById("float");
var H=0,iE6;
var Y=oDiv;
while(Y){H+=Y.offsetTop;Y=Y.offsetParent};
iE6=window.ActiveXObject&&!window.xmlHttPRequest;
if(!iE6){
//滚动的时候出发此函数修改class
window.onscroll=function()
{
var s=document.body.scrollTop||document.documentElement.scrollTop;
if(s>H){oDiv.className="div1 div2";if(iE6){oDiv.style.top=(s-H)+"px";}}
else{oDiv.className="div1";}
};
}
})();