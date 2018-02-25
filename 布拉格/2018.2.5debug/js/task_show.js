//任务预览 相关js函数
//功能：实现显示团队的task及查看task内容;对团队页面的任务模块元素的显示和隐藏
	var task_show_index;
	//var tasks=new Array();转至全局变量管理中心

	var display_flag=true;//判断是否要在调用task_view()时进行对任务预览，任务链接的display属性进行改变,true:需要，false:不需要
	var fresh_flag=false;//判断是否需要在get_tasks()函数中重新载入任务预览，false不需要，true需要

	//var task_introduction=new Array();//为保险起见只把名字及内容拎出来作全局变量
	//var task_name=new Array();
	//var task_id=new Array();//把task_id也拎出来
	layui.use('layedit', function(){
	  var layedit = layui.layedit;
	  task_show_index=layedit.build('task_edit_content'); //建立编辑器
	});

  /****进入个人页面加载任务链接****/
  //$(document).ready(function(){
	/***********************************任务信息的获取部分******************************************/
	//  get_tasks();
	// alert("查询后的长度"+tasks.length);
  //});




  //展示task链接   !注意这里 i 是从0开始的   这里layui.use放在函数里面是为了使分页功能加载前task_links内容就已经确定
  //否则会出现只有点击页码按钮后链接内容才显示的问题
  //分页数等于count/limit
  function show_task_link(tasks,task_links)
  {
	  for(var i=0;i<tasks.length;i++)
	  {
		  if(tasks[i].state=="1"){
				task_links.push(
								  "<div>"
								 +		"<a style='cursor:pointer' class='layui-text' onclick='task_view("+i+")'>"
								 +			"<i class='layui-icon' style='font-size: 18px; color: #FF5722;'>&#xe64c;</i>"
								 +      		tasks[i].name
								 +			"<span style='margin-right:10px;float:right'>开始日期:"+tasks[i].start_date+"</span>"
								 +		"</a>"
								 +"</div>"
								  );
		  }else{
				task_links.push(
								  "<div>"
								 +		"<a style='cursor:pointer' class='layui-text' onclick='task_view("+i+")'>"
								 +			"<i class='layui-icon' style='font-size: 18px; color: #1E9FFF;'>&#xe64c;</i>"
								 +      		tasks[i].name
								 +			"<span style='margin-right:10px;float:right'>开始日期:"+tasks[i].start_date+"</span>"
								 +		"</a>"
								 +"</div>"
								  );
		  }
	  }
	  	/**************************************layui分页部分**********************************************/
	layui.use(['laypage', 'layer'], function(){
		  var laypage = layui.laypage
		  ,layer = layui.layer;

		  //自定义分页样式
		  laypage.render
		({
			elem: 'change_page'
			,count: task_links.length
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
			,count:task_links.length
			,jump: function(obj){
			  //模拟渲染
			  document.getElementById('links').innerHTML = function(){
				var arr = []
				,thisData = task_links.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
				layui.each(thisData, function(index, item){
				  arr.push('<li>'+ item +'</li>');
				});
				return arr.join('');
			  }();
			}
		  });
		});
  }

  //获取个人任务信息
  function get_tasks(value)
  {
	  var task_links=new Array();
	  tasks.splice(0,tasks.length);
	  //task_introduction.splice(0,task_introduction.length);
	  //task_name.splice(0,task_name.length);
	  //task_id.splice(0,task_id.length);
	  var res={
				"state":"get_result",
				 "data":{
						  "group_id":value,
						  "order":"DESC",
						  "order_by":"start_date"
						}
			  };
	  var str=JSON.stringify(res);
	 // alert("向后端传入的json数据为"+str);
	  $.ajax({
             url: "php/search_tasks.php",
             type: "POST",
             data:{res:str},
			 dataType: "json",
             error: function(){
                 //alert('Error loading XML document');
             },
             success: function(data){
				if(data.success=="true"){
					//alert("查询任务成功！");

					for(var i=0;i<data.res.length;i++){
						tasks.push(data.res[i]);
					}
/**********************************导入task链接************************************************/
					show_task_link(tasks,task_links);
/***************************更新任务进度************************************/
					task_progress();
/********************************处理刷新问题******************************************/
					if(fresh_flag==true){
						task_view(edit_task_i);
						fresh_flag=false;
					}
					subtasks_part_init();//重新加载子任务部分
					renew_subtasks();
				}else{
					//如果查询任务记录为空
					if(data.error=="start_index exceeds number of rows")
					{
						document.getElementById('links').innerHTML="<div class='layui-text'>还没有任务呢,快去发布吧！</div>";
						task_progress();
					}
					//alert(data.error);
				}
			}
		});
  }

 //一项任务的预览
  function task_view(task_i)
  {
	//更新修改任务指示变量的值
	task_edit_state=true;
	edit_task_i=task_i;
	if(display_flag==true){
		taskview_change_display();
	}else{
		display_flag=true;
	}
	//任务信息
	document.getElementById("task_show_title").innerHTML=tasks[task_i].name;
	document.getElementById("task_show_content").innerHTML=tasks[task_i].introduction;
	document.getElementById("task_show_start_date").innerHTML=tasks[task_i].start_date;
	document.getElementById("task_show_end_date").innerHTML=tasks[task_i].end_date;
	priority_show(task_i);
	var task_evaluation;
	if(tasks[task_i].evaluation=="-1"){
		task_evaluation="待评价";
	}else{
		task_evaluation=tasks[task_i].evaluation;
	}
	document.getElementById("task_show_evaluation").innerHTML=task_evaluation;



	var subtasks_num=tasks[task_i].subtasks.length;
	//预先清空subtask显示容器内容，防止多次点击进入查看任务时出现子项目重复多次显示问题
	document.getElementById("task_show_subtasks").innerHTML="";
	//循环向subtask容器内加入子项目
	for(var i=0;i<subtasks_num;i++)
	{
		var subtask_state;
		var subtask_evaluation;
		if(tasks[task_i].subtasks[i].evaluation=="-1"){
			subtask_evaluation="待评价";
		}else{
			subtask_evaluation=tasks[task_i].subtasks[i].evaluation;
		}


		if(tasks[task_i].subtasks[i].state!='2'){
			subtask_state="已完成";
		}else{
			subtask_state="未完成";
		}
		var temp='<div class="layui-row" style="padding:20px">\
					<div class="layui-col-sm3">\
						<span>子项名称:</span>\
						<span class="layui-text">'+tasks[task_i].subtasks[i].name+'</span>\
					</div>\
					<div class="layui-col-sm3">\
						<span>负责人:</span>\
						<span class="layui-text">'+tasks[task_i].subtasks[i].members+'</span>\
					</div>\
					<div class="layui-col-sm3">\
						<span>完成情况:</span>\
						<span class="layui-text">'+subtask_state+'</span>\
						<span style="margin-left:15px">评分:</span>\
						<span class="layui-text" style="font-size:20px;color:#FFB800">'+subtask_evaluation+'</span>\
						<span class="layui-text">分</span>\
					</div>\
					<div class="layui-col-sm3">\
						<a style="cursor:pointer" onclick='+'set_evaluating_subtask_i('+i+')'+' name="subtask_evaluation_button" class="layui-text" style="margin-left:30px">\
							<i class="layui-icon" style="font-size: 30px; color: #FFB800;">&#xe600;</i>评价\
						</a>\
					</div>\
				</div>';
		$('#task_show_subtasks').append(temp);
	}
	var task_state;
	if(tasks[task_i].state!='2'){
		task_state="已完成";
		//$("task_complete_button").css("background-color","yellow");   jQuery设置css不管用
		document.getElementById("task_complete_button").innerHTML="设为未完成";
	}else{
		task_state="未完成";
		//$("task_complete_button").removeClass("layui-btn-primary");   jquery添加和删除类也不管用
		document.getElementById("task_complete_button").innerHTML="完成任务";
	}
	document.getElementById("task_show_state").innerHTML=task_state;
	//编辑相关，初始化编辑部分的任务内容
	$("#task_edit_title").val(tasks[task_i].name);
	edit_form_init();
	layui.layedit.setContent(task_show_index,tasks[task_i].introduction);			//!!!这里有一个问题，但不影响功能，此语句能正常执行但其后的语句无法执行，显示错误在layedit.js里
	//document.getElementById('task_edit_title').value=task_name[task_i];
	//alert(task_name[task_i]);

  }

  //显示优先级
  function priority_show(task_i)
  {
	 var priority=new Array("极高","高","中","低","极低");
	 var temp=tasks[task_i].priority;
	 document.getElementById("task_show_priority").innerHTML=priority[temp-1];
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
	  //one_button_change("task_complete_button");
	  one_button_change("form_sumit");
	  one_button_change("form_delete");
  }

  //返回按钮被点击，展示链接块，隐藏编辑块    (删除按钮也用了此函数)
  function edit_form_return()
  {
	  //更新修改任务指示变量的值
	  task_edit_state=false;

	  change_display('change_page');
	  change_display('task_show');
	  change_display('links_block');
	  one_button_change("create_task_button");
	  one_button_change("form_edit");
	  one_button_change("return");
	  one_button_change("task_complete_button");
  }


	  //编辑按钮被点击，触发编辑事件
	function edit_form_edit(task_i)
	{
		one_button_change("form_edit");
		one_button_change("return");
		one_button_change("task_complete_button");
		one_button_change("form_undo");
		one_button_change("form_delete");
		change_display('task_show');
		change_display('task_edit');
	}
	//取消按钮被点击，返回预览
	function edit_form_undo()
	{
		one_button_change("form_undo");
		one_button_change("form_delete");
		one_button_change("form_edit");
		one_button_change("return");
		one_button_change("task_complete_button");
		change_display('task_show');
		change_display('task_edit');
	}

	//任务链接被点击时，改变任务链接、任务预览的dispaly
	function taskview_change_display()
	{
		change_display("links_block");
		change_display("task_show");
		change_display("change_page");
		one_button_change("form_edit");
		one_button_change("return");
		one_button_change("task_complete_button");
		one_button_change("create_task_button");
	}
