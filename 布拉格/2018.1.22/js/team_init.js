
//从后端得到数据,分别拼接处理后存储在own-item 和 join-item里.
function team_init()
{
var own_team_1='布拉格',own_team_2='中科大',own_team_3='膜蛤';
var inside_team_1='布拉格',inside_team_2='布拉格',inside_team_3='布拉格';

var own_item=  '<dd><a href="javascript:fresh_team_info('+own_team_1+');">'+own_team_1+'</a></dd>\
		<dd><a href="javascript:fresh_team_info('+own_team_2+');">'+own_team_2+'</a></dd>\
		<dd><a href="javascript:fresh_team_info('+own_team_3+');">'+own_team_3+'</a></dd>';
var fellow_item='<dd><a href="javascript:fresh_team_info('+own_team_1+');">'+inside_team_1+'</a></dd>\
                 <dd><a href="javascript:fresh_team_info('+own_team_1+');">'+inside_team_2+'</a></dd>\
                 <dd><a href="javascript:fresh_team_info('+own_team_1+');">'+inside_team_3+'</a></dd>';
document.getElementById("team_own").innerHTML=own_item;
document.getElementById("team_in").innerHTML=fellow_item;
}
