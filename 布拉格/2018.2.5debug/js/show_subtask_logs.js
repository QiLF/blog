//用于在团队界面的任务进度处查看成员们负责子项目的日志
//日志以弹窗的形式呈现
  function check_logs(value)
  {
    var subtask_id=value;//get the subtask_id
    var temp_data=
    {
      "state":"search_blog",
      "data":
      {
        "subtask_id":subtask_id,
        "order":"DESC",
        "order_by":"modify_date"
      }
    };
    var res=JSON.stringify(temp_data);
    //ajax part to get logs
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "php/blog_search.php" ,
        data: {res:res},
        success: function (data)
        {
          if(data.success=="false")
          {
            if(data.error=="start_index exceeds number of rows")
            {
              alert("这个成员很懒，啥都没写～");
            }
            else
            {
              alert(data.error);
            }
          }
          else
          {
            current_logs=data.res;//给全局变量赋值，以便弹窗引用
            //弹出查看子项日志的弹窗
            layer.open({
              type: 2,
              title: '日志查看',
        	    resize:false,
              maxmin:false,
              shadeClose: true, //点击遮罩关闭层
              area : ['800px' , '600px'],
              content: 'logs_show_subframe.html'
            });
          }
        },
        error : function()
        {
          alert('数据请求失败');
        }
    });



  }
