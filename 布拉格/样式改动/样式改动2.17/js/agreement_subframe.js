$('#show_agreement').on('click', function(){
    layer.open({
      type: 2,
      title: '用户注册协议',
	  resize:false,
      maxmin: true,
      shadeClose: true, //点击遮罩关闭层
      area : ['800px' , '600px'],
      content: 'agreement_subframe.html'
    });
  });
