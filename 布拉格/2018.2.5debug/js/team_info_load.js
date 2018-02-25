
function team_info_load(value)
{
	if(value!=null)
	{
		document.getElementById("change_teamname").value=value.res[0].name;//加载团队信息修改界面的团队名
		document.getElementById("change_introduce").value=value.res[0].introduction;//加载团队信息修改界面的团队介绍

		document.getElementById('current_team_name_manageman').innerHTML=value.res[0].name;//加载成员管理处的当前团队名
		document.getElementById('current_team_name_navbar').innerHTML=value.res[0].name;//加载侧边栏处的当前团队名
	}
	else
	{
	  document.getElementById("change_teamname").value=null;
    document.getElementById("change_introduce").value=null;
		document.getElementById('current_team_name_manageman').innerHTML='未选择团队';
		document.getElementById('current_team_name_navbar').innerHTML='未选择团队';
	}
}
