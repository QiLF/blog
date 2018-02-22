$('#keyset').on('click', function(){
    layer.open({
      type: 2,
      title: '安全管理',
      maxmin: false,
      shadeClose: true, //点击遮罩关闭层
      area : ['550px' , '520px'],
      content: 'changekey_subframe.html'
    });
  });
