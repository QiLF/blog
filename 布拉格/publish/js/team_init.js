
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
	            //layer.msg the reason for false
							if(data.error=="start_index exceeds number of rows")
							{
								document.getElementById("team_own").innerHTML="";
								layer.msg('亲爱的用户，你还没有加入任何团队，试试去创建属于自己的团队吧！');
							}
							else
							{
								layer.msg(data.error);
							}
	          }
	          else {
							var flag_i=0;
							var temp_html="";
							//加载侧边栏我拥有的团队
							while(flag_i<data.res.length)
							{
								temp_html+='<dd><a style="cursor:pointer" onclick="fresh_team_info('+data.res[flag_i].group_id+')">'+data.res[flag_i].name+'</a></dd>'
								flag_i++;
							}
							document.getElementById("team_own").innerHTML=temp_html;

							layui.use('element', function(){
															var $ = layui.jquery
															,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
														     element.render('group_nav');
															//监听导航点击
															element.on("nav(group_nav)", function(elem){
															//console.log(elem)
															//layer.msg(elem.text());
														  });
										});
						}
	        },
	        error : function() {
	          layer.msg("数据请求异常");
	        }
	      });
		}
