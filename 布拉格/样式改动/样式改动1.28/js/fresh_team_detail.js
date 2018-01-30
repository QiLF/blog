  function fresh_team_info(value)
  {
    current_group_id=value;
    var temp_data={"state":"esearch_group","data":{"group_id":value}};
    var res=JSON.stringify(temp_data);
    //ajax part
    $.ajax({
        type: "POST",
        dataType: "json",
        url:"php/group_search.php",
        data: {res:res},
        success: function (data) {
          //deal with data from back_end
          if(data.success == "false"){
            //alert the reason for false
            alert(data.error);
          }
          else {
            //alert('特定团队信息加载成功');
            document.getElementById("change_teamname").value=data.res[0].name;
            document.getElementById("change_introduce").value=data.res[0].introduction;
            team_member_load(data);//加载团队成员以便显示和管理.
          }
        },
        error : function() {
          alert("数据请求异常");
        }
      });
  }
