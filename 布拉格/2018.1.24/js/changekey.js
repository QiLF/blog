$('#keyset').on('click', function(){
    layer.open({
      type: 2,
      title: '安全管理',
      maxmin: true,
      shadeClose: true, //点击遮罩关闭层
      area : ['800px' , '520px'],
      content: 'changekey.html'
    });
  });
