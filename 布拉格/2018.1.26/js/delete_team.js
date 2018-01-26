    current_group_id=null;//current_group_id在选择侧边栏团队时由全局变量记下。
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
        alert(res);
        
        
        //ajax connect part
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "php/group.php" ,
            data: {res:res},
            success: function (data) {
            //deal with data from back_end
            if(data.success == "true"){
                alert('团队已成功解散');
                window.reload();
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
