
//从后端得到数据,分别拼接处理后存储在own-item 和 join-item里.
function team_init()
{
var own_team= ["布拉格","中科大","膜蛤","香港记者","emmm"]//后端获取的是如实例所示的数组
var inside_team= ["布拉格","中科大","膜蛤","香港记者","emmm"]

var i=0;
var own_item='';
var fellow_item='';
while(i<own_team.length)
{
	 own_item+='<dd><a href="javascript:fresh_team_info('+own_team[i]+');">'+own_team[i]+'</a></dd>'
	i++;
}
i=0;
while(i<inside_team.length)
{
	 fellow_item+='<dd><a href="javascript:fresh_team_info('+inside_team[i]+');">'+inside_team[i]+'</a></dd>'
	i++;
}
document.getElementById("team_own").innerHTML=own_item;
document.getElementById("team_in").innerHTML=fellow_item;
}
