

//elem由字符串拼接而成，数据从后端反馈得到
//后端提供json格式的数据，数据转换为对象数组后的形式如下：
	function team_member_load(value)
	{
		if(value!=null)
		{
			var flag_j=0;
			var temp_elem="";
			while(flag_j<value.res.length)
			{
			  temp_elem+='<tr><td>'+value.res[flag_j].username+"</td><td>2018.1.1</td><td>座右铭。。。。。</td><td>负责的任务</td><td><a onclick=delete_member('"+value.res[flag_j].username+"')>踢出团队</a></td></tr>";
				flag_j++;
			}
			document.getElementById("manageman").innerHTML=temp_elem;
		}
		//删除团队后，处于未选择团队状态，用null来刷新成员管理内容
		else
		{
			document.getElementById("manageman").innerHTML=null;
		}
	}
