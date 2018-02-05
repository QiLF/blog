function team_person_page_user_info(){
  var username=getCookie('username');//得到cookie中的username
  if(username!=''&&username!=null)
  {
    //alert(username);
    var temp_data={"state":"exact","data":username};
    var resu=JSON.stringify(temp_data);
    //alert(resu);
    //ajax part
    $.ajax({
        type: "POST",
        dataType: "json",
        url:"php/searchperson.php",
        data: {res:resu},
        success: function (data) {
          //deal with data from back_end
          if(data.success=="false"){
            //alert the reason for false
            //alert(data.error);
          }
          else {
            //alert('信息加载成功');
            document.getElementById('user_nick_head').innerHTML='<img class="layui-nav-img" src="'+data.res["fig"][0].avatarname+'">'+data.res["info"][0].nickname+'</a>'
            document.getElementById('nick_declare').innerHTML='<a href="#">'+data.res["info"][0].nickname+'</a>';
            document.getElementById('big_headimg_show').innerHTML='<img src="'+data.res["fig"][0].avatarname+'">';
          }
        },
        error : function() {
          //alert("数据请求异常");
        }
      });
    return true;
  }
  else
  {
    alert("请先登录");
    return false;
  }

}


function personal_detail_info(){




}
