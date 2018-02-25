
    function delete_member(member_name)//在动态加载出的团队成员js拼接代码中得加上这个函数。
    {
        if(current_group_id==null)
        {
            layer.msg("请先选择团队再执行该操作！");
            return false;
        }
        var current_user=getCookie('username');
        if(member_name==current_user )
        {
            layer.msg("别想不开删自己啊！");
            return false;
        }

        layer.confirm("确定删除用户"+member_name+"吗？", {
            btn: ['确定','取消'], //按钮
            shade: false //不显示遮罩
        }, function(){

          //layer.msg(member_name);
          // data change into json
          var temp_data={"state":"del_member","data":{"group_id":current_group_id,"username":member_name}};
          var res=JSON.stringify(temp_data);


          //for debug,output the json object
          //layer.msg(res);


          //ajax connect part
          $.ajax({
              type: "POST",
              dataType: "json",
              url: "php/group.php" ,
              data: {res:res},
              success: function (data) {
              //deal with data from back_end
              if(data.success == "true"){
                layer.msg('已成功删除成员:'+member_name);
                fresh_team_info(current_group_id);
              }
              else {
                layer.msg(data.error);
              }
              },
              error : function() {
                layer.msg("数据请求异常");
              }
          });
        }, function(){
          layer.msg('删除操作已取消！');
        });
    }
