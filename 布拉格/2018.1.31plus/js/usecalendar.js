$('#calendar').on('click', function(){
    layer.open({
      type: 2,
      title: '日历',
      maxmin: false,
      title:false,
      //title: false,


      shade: 0.6,
      skin: '',
      shadeClose: true, //点击遮罩关闭层
      area : ['500px' , '520px'],
      content: 'checkcalendar_subframe.html'
    });
  });
