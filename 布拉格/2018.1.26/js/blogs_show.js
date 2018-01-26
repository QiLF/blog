//日志预览
	var log_show_index;
	var blog_content=new Array();//为保险起见只把名字及内容拎出来作全局变量
	var blog_name=new Array();
	layui.use('layedit', function(){
	  var layedit = layui.layedit;
	  log_show_index=layedit.build('log_edit_content'); //建立编辑器
	});

  //通过用户名检索blog,将用户的blogs返回参数
  function get_blogs(blogs)
  {
	  
  }

  
  $(document).ready(function(){
	/***********************************日志信息的获取部分******************************************/  
	  var blogs=new Array();
	  var res={
				"state":"search_blog",
				 "data":{
						  "writer":getCookie("username")
						}
			  };
	  str=JSON.stringify(res);
	  alert("向后端传入的json数据为"+str);
	  $.ajax({ 
             url: "php/blog_search.php",  
             type: "POST", 
             data:{res:str}, 
             dataType: "json", 
             error: function(){   
                 alert('Error loading XML document');   
             },   
             success: function(data){
				if(data.success=="true"){
					alert("查询blogs成功！");
					
					for(var i=0;i<data.res.length;i++){
						blogs.push(data.res[i]);
						blog_content.push(blogs[i].content);
						blog_name.push(blogs[i].name);
					}
				//	alert("res的长度"+data.res.length);
				//	alert("ajax的success中把res复制给blogs后blogs的长度"+blogs.length);
					/**********************************导入blog链接************************************************/
					show_blog_link(blogs);
				}else{
					alert(data.error);
				}
			} 
		});
	  //get_blogs(blogs);	
	//  alert("查询后的长度"+blogs.length);
	/**************************************layui分页部分**********************************************/	 
		layui.use(['laypage', 'layer'], function(){
		  var laypage = layui.laypage
		  ,layer = layui.layer;
		  
		  //自定义分页样式
		  laypage.render
		({
			elem: 'change_page'
			,count: 100
			,limit: 10
			,first: '首页'
			,last: '尾页'
			,prev: '<em>←</em>'
			,next: '<em>→</em>'
			,theme: '#1E9FFF'
		  });
	  
		  //调用分页
		  laypage.render({
			elem: 'change_page'
			,count:100//blogs.length
			,jump: function(obj){
			  //模拟渲染
			  document.getElementById('links_block').innerHTML = function(){
				var arr = []
				,thisData = blogs.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
				layui.each(thisData, function(index, item){
				  arr.push('<li>'+ item +'</li>');
				});
				return arr.join('');
			  }();
			}
		  });
		});

  });
  
  //展示blog链接   !注意这里 i 是从0开始的
  function show_blog_link(blogs)
  {
	  for(var i=0;i<blogs.length;i++)
	  {
		  $("#links_block").append("<div>"
								 +		"<a class='layui-text' onclick='blog_view("+i+")'>"
								 +			"<i class='layui-icon' style='font-size: 18px; color: #1E9FFF;'>&#xe64c;</i>"
								 +      		blogs[i].name
								 +			"<span style='float:right'>编辑日期:"+blogs[i].modify_date+"</span>"
								 +		"</a>"
								 +"</div>"

								  );
	  }
  }
  //一篇blog的预览
  function blog_view(blog_i)
  {
	//change_display("return");
	change_display("links_block");
	change_display("blog_show");
	//one_button_chage("return");
	//change_display("log_edit_form");
	document.getElementById("log_edit_title").value=blog_name[blog_i];
	layui.layedit.setContent(log_show_index,blog_content[blog_i]);
  }
  //改变一个按钮的隐藏和显示
  function one_button_chage(id)
{
     var target=document.getElementById(id);
      if(target.style.display=="none"){
                target.style.display="";
      }else{
                target.style.display="none";
    }
}
  //按钮被点击改变按钮：触发点击编辑按钮事件，隐藏编辑，显示取消和提交;触发点击取消按钮事件，隐藏取消和提交，显示编辑
  function button_change()
  {
	  one_button_chage("form_edit");
	  one_button_chage("form_undo");
	  one_button_chage("form_sumit");
  }  

  