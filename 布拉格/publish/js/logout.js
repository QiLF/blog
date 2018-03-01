    function logout(){
      layer.confirm("您确定要退出吗?", {
          btn: ['确定','取消'], //按钮
          shade: false //不显示遮罩
      }, function(){
          top.location = "index.html";
        },function(){
          //do nothing
          layer.close();
        }
      );
    }
    //退出还涉及到sesssion的清除以及页面重定向问题。
