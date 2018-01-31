  function fresh_team_info(value)
  {
    if(value!=null)
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
              //alert(data.error);
            }
            else {
              //alert('特定团队信息加载成功');
              document.getElementById("change_teamname").value=data.res[0].name;
              document.getElementById("change_introduce").value=data.res[0].introduction;
              team_member_load(data);//加载团队成员以便显示和管理.
              get_tasks(value);
            }
          },
          error : function() {
            //alert("数据请求异常");
          }
        });
        //选择团队后调用检索任务的函数，以当前团队的id为关键
      }
      //用以删除团队后拿null来刷新团队信息内容
      else
      {
        document.getElementById("change_teamname").value=null;
        document.getElementById("change_introduce").value=null;
      }
  }
