

//elem由字符串拼接而成，数据从后端反馈得到
//后端提供json格式的数据，数据转换为对象数组后的形式如下：
	function team_member_load(value)
	{
		if(value!=null)
		{
			var flag_j=0;
			var temp_elem="";
			var temp_name=null;
			current_members=[];//已对定义的全局变量数组current_members清空
			while(flag_j<value.res.length)
			{
			  temp_elem+='<tr><td>'+value.res[flag_j].username+"</td><td><a style='cursor:pointer' onclick=check_teammate_info('"+value.res[flag_j].username+"')>查看详细资料</a></td><td><a style="+'cursor:pointer'+" onclick=delete_member('"+value.res[flag_j].username+"')>踢出团队</a></td></tr>";
				current_members[flag_j]=value.res[flag_j].username;
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
