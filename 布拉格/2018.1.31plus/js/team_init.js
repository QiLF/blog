
		//从后端得到数据,分别拼接处理后存储在own-item 和 join-item里.
		function team_init()
		{
			var username=getCookie('username');//得到cookie中的username
			var temp_data={"state":"esearch_user","data":{"username":username}};
			var resu=JSON.stringify(temp_data);
			//ajax part
	    $.ajax({
	        type: "POST",
	        dataType: "json",
	        url:"php/group_search.php",
	        data: {res:resu},
	        success: function (data) {
	          //deal with data from back_end
	          if(data.success == "false"){
	            //alert the reason for false
							if(data.error=="start_index exceeds number of rows")
							{
								document.getElementById("team_own").innerHTML=null;
								alert('亲爱的用户，你还没有加入任何团队，试试去创建属于自己的团队吧！');
							}
							else
							{
								//alert(data.error);
							}
	          }
	          else {
	            //alert('所属团队信息加载成功');
							//链接测试成功，接下来就是用返回的数据去填充侧边栏了，23333，先去开车了。。2018.1.27 18:55
							var flag_i=0;
							var temp_html="";
							//加载侧边栏我拥有的团队
							while(flag_i<data.res.length)
							{
								temp_html+='<dd><a onclick="fresh_team_info('+data.res[flag_i].group_id+')">'+data.res[flag_i].name+'</a></dd>'
								flag_i++;
							}
							document.getElementById("team_own").innerHTML=temp_html;
						}
	        },
	        error : function() {
	          //alert("数据请求异常");
	        }
	      });
		}
