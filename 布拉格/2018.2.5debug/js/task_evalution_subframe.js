$('#evalution_button').on('click', function(){
    if(current_group_id!=null)
    {
     layer.open({
        type: 2,
        title: '任务评价',
        maxmin: true,
        resize: false,
        shade: 0.6,
        shadeClose: true, //点击遮罩关闭层
        area : ['1000px' , '600px'],
        content: 'task_evalution_subframe.html',
        end:function()
        {
          get_tasks(current_group_id);
        }
      });
    }
    else
    {
        alert("请先选择团队再执行该操作！");
        return false;
    }

  })