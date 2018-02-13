//弹窗及确定被评价的子项序号

var evaluating_subtask_i=0;
$('#task_evalution_button').on('click', function(){
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
        content: 'task_evaluation_subframe.html'
      });
    }
    else
    {
        alert("请先选择团队再执行该操作！");
        return false;
    }

  })
  


  
  function set_evaluating_subtask_i(subtask_i)
  {
	  evaluating_subtask_i=subtask_i;
	  if(current_group_id!=null)
		{
		 layer.open({
			type: 2,
			title: '子项评价',
			maxmin: true,
			resize: false,
			shade: 0.6,
			shadeClose: true, //点击遮罩关闭层
			area : ['1000px' , '600px'],
			content: 'subtask_evaluation_subframe.html'
		  });
		}
		else
		{
			alert("请先选择团队再执行该操作！");
			return false;
		}
  }