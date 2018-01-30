
$('#create_task_button').on('click', function(){
   layer.open({
      type: 2,
      title: '新建任务',
      maxmin: true,
      resize: false,
      shade: 0.6,
      shadeClose: true, //点击遮罩关闭层
      area : ['600px' , '520px'],
      content: 'task_create_subframe.html',
      end: function(){
      }
    });
  })
