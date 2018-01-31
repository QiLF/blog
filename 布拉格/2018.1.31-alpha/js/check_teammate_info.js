  function check_teammate_info(value)
  {
    var temp_data={"state":"exact","data":value};
    var res=JSON.stringify(temp_data);

    //ajax connect part
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "php/searchperson.php" ,
        data: {res:res},
        success: function (data) {
        //deal with data from back_end
        if(data.success=="false"){
            //alert the reason for false
            //alert(data.error);
        }
        else {
            //alert('信息获取成功！')
            show_mate_info_iframe(data);
        }
        },
        error : function() {
        //alert("数据请求异常");
        }
    });
  }
  function show_mate_info_iframe(value)
  {
    var place_in=get_place_in(value.res['info'][0].cityid);
    var show_info='昵称：'+value.res['info'][0].nickname+'<br/>'
                 +'性别：'+value.res['info'][0].sex+'<br/>'
                 +'地址：'+place_in+'<br/>'
                 +'邮箱：'+value.res['info'][0].email+'<br/>'
                 +'电话：'+value.res['info'][0].phone+'<br/>'
                 +'QQ：'+value.res['info'][0].qq+'<br/>'
                 +'生日：'+value.res['info'][0].birthdate+'<br/>'
                 +'年级：'+value.res['info'][0].grade+'<br/>'
                 +'学院：'+value.res['info'][0].college+'<br/>'
                 +'个人介绍：'+value.res['info'][0].intro+'<br/>'
    layer.msg(show_info,
    {
    time: 20000, //20s后自动关闭
    btn: ['朕知道了']
    });
  }



  function get_place_in(value)
  {



    return '合肥';//暂时没做id转地名的函数，就合肥了
  }
