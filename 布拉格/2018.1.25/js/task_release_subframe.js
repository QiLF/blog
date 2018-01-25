
$('#calendar').on('click', function(){
    layer.open({
      type: 2,
      title: '新建任务',
      maxmin: true,
      title:true,

      shade: 0.6,
      skin: '',
      shadeClose: true, //点击遮罩关闭层
      area : ['600px' , '500px'],
      content: 'create_task.html'
      end: function(){
	    location.reload();//在创建团队完毕后回到页面时刷新页面以能显示最新创建的团队。
      }
    });
  })

