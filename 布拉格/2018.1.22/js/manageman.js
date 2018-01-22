

//elem由字符串拼接而成，数据从后端反馈得到
//后端提供json格式的数据，数据转换为对象数组后的形式如下：




var member=[
		{"teamname":"布拉格","nickname":"贤心1","joindate":"2018.1.20","saying":"人生就像是1场修行","jobs":"后端"},
		{"teamname":"布拉格","nickname":"贤心2","joindate":"2018.1.21","saying":"人生就像是2场修行","jobs":"前端"},
		{"teamname":"布拉格","nickname":"贤心3","joindate":"2018.1.22","saying":"人生就像是3场修行","jobs":"交互"},
		{"teamname":"布拉格","nickname":"贤心4","joindate":"2018.1.23","saying":"人生就像是4场修行","jobs":"美工"}
	  ];
	 	
var i=0;	
var elem="";
while(i<member.length)
{
	elem+='<tr><td>'+member[i].nickname+'</td><td>'+member[i].joindate+'</td><td>'+member[i].saying+'</td><td>'+member[i].jobs+'</td><td><a href="javascript:getout('+member[i].nickname+','+member[i].teamname+');">踢出团队</a></td></tr>';
        i++;
}
//其中的getout函数用于剔除团队操作，所带参数为成员昵称和团队名。
document.getElementById("manageman").innerHTML=elem;
