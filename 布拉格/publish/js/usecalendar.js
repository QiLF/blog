$('#calendar').on('click', function(){
    layer.open({
      type: 2,
      title: '日历',
      maxmin: false,
      shade: 0.6,
      shadeClose: true, //点击遮罩关闭层
      area : ['503px' , '565px'],
      content: 'checkcalendar_subframe.html'
    });
  });
