//日志预览 相关js函数
//功能：实现显示用户的blog及查看blog内容;对个人页面的日志模块元素的显示和隐藏
	var log_show_index;
	var blog_content=new Array();//为保险起见只把名字及内容拎出来作全局变量
	var blog_name=new Array();
	var blog_id=new Array();//把blog_id也拎出来
	layui.use('layedit', function(){
	  var layedit = layui.layedit;
	  log_show_index=layedit.build('log_edit_content'); //建立编辑器
	});
	
  //进入个人页面加载博客链接
  $(document).ready(function(){
	/***********************************日志信息的获取部分******************************************/   
	  get_blogs();	
	//  alert("查询后的长度"+blogs.length);
  });
  
  
  
  
  //展示blog链接   !注意这里 i 是从0开始的   这里layui.use放在函数里面是为了使分页功能加载前blog_links内容就已经确定
  //否则会出现只有点击页码按钮后链接内容才显示的问题
  //分页数等于count/limit
  function show_blog_link(blogs,blog_links)
  {
	  for(var i=0;i<blogs.length;i++)
	  {
		  //$("#links_block").append(
				blog_links.push(
								  "<div>"
								 +		"<a class='layui-text' onclick='blog_view("+i+")'>"
								 +			"<i class='layui-icon' style='font-size: 18px; color: #1E9FFF;'>&#xe64c;</i>"
								 +      		blogs[i].name
								 +			"<span style='float:right'>编辑日期:"+blogs[i].modify_date+"</span>"
								 +		"</a>"
								 +"</div>"

								  );
	  }
	  	/**************************************layui分页部分**********************************************/	 
		layui.use(['laypage', 'layer'], function(){
		  var laypage = layui.laypage
		  ,layer = layui.layer;
		  
		  //自定义分页样式
		  laypage.render
		({
			elem: 'change_page'
			,count: blog_links.length
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
			,count:blog_links.length
			,jump: function(obj){
			  //模拟渲染
			  document.getElementById('links_block').innerHTML = function(){
				var arr = []
				,thisData = blog_links.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
				layui.each(thisData, function(index, item){
				  arr.push('<li>'+ item +'</li>');
				});
				return arr.join('');
			  }();
			}
		  });
		});
  }
  
  //获取个人博客信息
  function get_blogs()
  {
	  var blogs=new Array();
	  var blog_links=new Array();
	  //异步刷新,清空全局数组
	  blog_content.splice(0,blog_content.length);
	  blog_name.splice(0,blog_name.length);
	  blog_id.splice(0,blog_id.length);
	  var res={
				"state":"search_blog",
				 "data":{
						  "writer":getCookie("username"),
						  "order":"DESC",
						  "order_by":"modify_date"
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
						blog_id.push(blogs[i].blog_id);
					}
/**********************************导入blog链接************************************************/
					show_blog_link(blogs,blog_links);
				}else{
					alert(data.error);
				}
			} 
		});
  }
  
  //一篇blog的预览
  function blog_view(blog_i)
  {
	edit_blog_i=blog_i;//改变全局变量（用于确定删除的博客）
	alert("edit_blog_i="+edit_blog_i);
	change_display("links_block");
	change_display("blog_show");
	change_display("change_page");
	one_button_change("form_edit");
	one_button_change("return");
	document.getElementById("log_show_title").innerHTML=blog_name[blog_i];
	document.getElementById("log_show_content").innerHTML=blog_content[blog_i];
	//编辑相关，初始化编辑部分的博客内容
	$("#log_edit_title").val(blog_name[blog_i]);
	layui.layedit.setContent(log_show_index,blog_content[blog_i]);			//!!!这里有一个问题，但不影响功能，此语句能正常执行但其后的语句无法执行，显示错误在layedit.js里
	//document.getElementById('log_edit_title').value=blog_name[blog_i];
	//alert(blog_name[blog_i]);

  }
  
  //改变一个按钮的隐藏和显示
  function one_button_change(id)
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
	  one_button_change("form_edit");
	  one_button_change("form_undo");
	  one_button_change("form_sumit");
	  one_button_change("form_delete");
  }  
  
  //返回按钮被点击，展示链接块，隐藏编辑块    (删除按钮也用了此函数)
  function edit_form_return()
  {
	  change_display('change_page');
	  change_display('blog_show');
	  change_display('links_block');
	  one_button_change("form_edit");
	  one_button_change("return");
  }
  