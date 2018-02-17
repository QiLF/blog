    function logout(){
        if (confirm("您确定要退出吗"))
            top.location = "index.html";
    }
    //退出还涉及到sesssion的清除以及页面重定向问题。
