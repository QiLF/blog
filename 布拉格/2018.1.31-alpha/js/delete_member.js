
    function delete_member(member_name)//在动态加载出的团队成员js拼接代码中得加上这个函数。
    {
        if(current_group_id==null)
        {
            alert("请先选择团队再执行该操作！");
            return false;
        }
        var current_user=getCookie('username');
        if(member_name==current_user )
        {
            alert("别想不开删自己啊！");
            return false;
        }
        //alert(member_name);
        // data change into json
        var temp_data={"state":"del_member","data":{"group_id":current_group_id,"username":member_name}};
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
                alert('已成功删除成员:'+member_name);
                fresh_team_info(current_group_id);
            }
            else {
                alert(data.error);
            }
            },
            error : function() {
            alert("数据请求异常");
            }
        });
    }
