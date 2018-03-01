
    function add_member()
    {
        if(current_group_id==null)
        {
            layer.msg("请先选择团队再执行该操作！");
            return false;
        }


        var username=document.forms["add_member_form"]["username"].value;

        //confirm name data;
        if(username.length<8||username.length>20)
        {
            layer.msg("用户名需为8至20个字符！");
            return false;
        }
        if(!isNaN(username))
        {
            layer.msg("用户名不得为纯数字！");
            return false;
        }
        if( filterSqlStr(username))
        {
            layer.msg("用户名中包含了敏感字符"+sql_str()+",请重新输入！");
            return false;
        }


        layer.confirm("确定添加用户"+username+"吗？", {
            btn: ['确定','取消'], //按钮
            shade: false //不显示遮罩
        }, function(){
            // data change into json
            var temp_data={"state":"add_member","data":{"group_id":current_group_id,"username":username}};
            var res=JSON.stringify(temp_data);

            //for debug,output the json object
            //alert(res);

            //ajax connect part
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "php/group.php" ,
                data: {res:res},
                success: function (data) {
                //deal with data from back_end
                if(data.success == "true"){
                    layer.msg('已成功添加成员:'+username);
                    fresh_team_info(current_group_id);//成功添加成员后刷新当前团队的信息
                }
                else {
                   // alert(data.error);
                   if(data.error=="member already exist")
                   {
                     layer.msg("该用户已是团队成员！");
                   }
                   if(data.error=="user not exist")
                   {
                     layer.msg("该用户名不存在！");
                   }
                }
                },
                error : function() {
                layer.msg("数据请求异常");
                }
            });
            //AJAX END
          }, function(){
            layer.msg('已取消邀请！');
          });
    }






    //防sql注入模块
//////////////////////////////////////////////////////////////////////////////////////////
        function filterSqlStr(value)
        {
            var sqlStr=sql_str().split(',');
            var flag=false;
            for(var i=0;i<sqlStr.length;i++)
            {
                if(value.toLowerCase().indexOf(sqlStr[i])!=-1)
                {
                    flag=true;
                    break;
                }
            }
            return flag;
        }


        function sql_str(){
            var str="and,delete,or,exec,insert,select,union,update,count,*,',join";  //因为富文本编辑器需要，删去了<和>。
            return str;
        }
///////////////////////////////////////////////////////////////////////////////////////////
