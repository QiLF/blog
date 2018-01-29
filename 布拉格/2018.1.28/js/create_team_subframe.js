$('#create_team').on('click', function(){
    layer.open({
      type: 2,
      title: '创建团队',
      maxmin: true,
      shadeClose: true, //点击遮罩关闭层
      area : ['800px' , '520px'],
      content: 'createteam_subframe.html',
      end: function(){
        team_init();
	    //location.reload();//在创建团队完毕后回到页面时刷新页面以能显示最新创建的团队。
      }
    });
  });
