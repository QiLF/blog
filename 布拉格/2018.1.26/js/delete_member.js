    current_group_id=null;//current_group_id在选择侧边栏团队时由全局变量记下。
    function delete_member(member_name)//在动态加载出的团队成员js拼接代码中得加上这个函数。
    {        
        if(current_group_id==null)
        {
            alert("请先选择团队再执行该操作！");
            return false;
        }
        
        
        // data change into json 
        var temp_data={"state":"del_member","data":{"group_id":current_group_id,"username":member_name}};
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
                alert('已成功删除成员:'+member_name);
                //window.reload();
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

    
