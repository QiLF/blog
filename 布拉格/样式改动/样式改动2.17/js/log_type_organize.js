
layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;

  //监听日志类型的单选框，执行动作
  form.on('radio(choose_type)', function(data){
    layer.msg(data.value); //被点击的radio的value值
    if(data.value=="子项日志")
    {
      //显示子项目选择联动框
      $('#submission_choose').css('display','block');
      //用当前团队id动态加载联动选择框的内容
      log_load_task();
    }
    if(data.value=="个人日志")
    {
      //隐藏子项目选择联动框
      $('#submission_choose').css('display','none');
    }
  });

  //监听任务选择框，根据值动态加载子项目选择框
  form.on('select(choose_task)', function(data){
    layer.msg(data.value); //得到被选中的任务值
    log_load_subtask(data.value);
  });
  form.on('select(choose_subtask)', function(data){
    layer.msg(data.value); //得到被选中的子项目值
  });
});



//加载任务选择框的函数，调用全局变量current_group_id
function log_load_task()
{
  var temp_data=
  {
    "state":"get_result",
    "data":
    {
      "group_id":current_group_id,
      "state":"2",//仅可对尚未完成的任务进行子项日志的添加
      "order":"DESC",
    }
  }
  var res=JSON.stringify(temp_data);
  //ajax part
  $.ajax({
           async: false,
           url: "php/search_tasks.php",
           type: "POST",
           data:{res:res},
           dataType: "json",
           error: function()
           {
             alert('数据请求失败');
           },
           success: function(data)
           {
             if(data.success=="true")
             {
               //加载任务select的option内容
               load_options_for_task(data.res);
               group_tasks=data.res;
             }
             else
             {
               alert(data.error);
             }
           }
  });

}

//加载选择框内子项目的函数，以任务id为参数
function log_load_subtask(task_name)
{
  //在group_tasks中寻找任务id为参数值的任务，用其子项目来加载选择框
  var choosed_task=null;
  for(var i=0;i<group_tasks.length;i++)
  {
    if(group_tasks[i].name==task_name)
    {
      choosed_task=group_tasks[i];
    }
  }
  load_options_for_subtask(choosed_task);
}


function load_options_for_task(value)
{
  var temp_html='<option value=""></option>';
  for(var i=0;i<value.length;i++)
  {
    temp_html+='<option value="'+value[i].name+'">'+value[i].name+'</option>'
  }
  document.getElementById('log_mission').innerHTML=temp_html;

  layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
    ,layer = layui.layer
    ,layedit = layui.layedit
    ,laydate = layui.laydate;
    form.render();
  });
}


function load_options_for_subtask(value)
{
  var temp_html='<option value=""></option>';
  for(var i=0;i<value.subtasks.length;i++)
  {
    if(value.subtasks[i].members==getCookie('username'))
    {
      temp_html+='<option value="'+value.subtasks[i].subtask_id+'">'+value.subtasks[i].name+'</option>'
    }
  }
  document.getElementById('log_submission').innerHTML=temp_html;
  layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
    ,layer = layui.layer
    ,layedit = layui.layedit
    ,laydate = layui.laydate;
    form.render();
  });
}
