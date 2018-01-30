    function delete_team()
    {
        if(current_group_id==null)
        {
            alert("请先选择团队再执行该操作！");
            return false;
        }


        // data change into json
        var temp_data={"state":"delete_group","data":{"group_id":current_group_id}};
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
                alert('该团队已成功解散');
                current_group_id=null;
                team_init();
                //window.location.reload();
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
