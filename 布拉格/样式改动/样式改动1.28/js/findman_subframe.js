//由ajax从后端获取该昵称用户是否存在，若不存在弹出一个提示框提示用户不存在。
//若存在则弹出一个父子框，显示个人资料（如果资料公开），或者仅仅显示昵称+该用户未公开资料。
//另加两个button：发出邀请和取消邀请。
$('#detail').on('click', function(){
    layer.open({
      type: 2,
      title: '个人资料',
      maxmin: true,
      shadeClose: true, //点击遮罩关闭层
      area : ['800px' , '520px'],
      content: 'findman_subframe.html'
    });
  });
