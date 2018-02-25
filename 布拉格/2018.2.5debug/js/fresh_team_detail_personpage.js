  var current_group_id=null;
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
              //layer.msg the reason for false
              layer.msg(data.error);
            }
            else {
			        fresh_current_group_name(data);
            }
          },
          error : function() {
            layer.msg("数据请求异常");
          }
      });
      get_personal_tasks(value);
      get_history_tasks(value);
  }

  function fresh_current_group_name(value)
  {
	  document.getElementById('current_team_name_navbar').innerHTML=value.res[0].name;
  }
