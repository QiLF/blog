    function create_team()
    {

        //form data confirm part
        var name=document.forms["team_init_form"]["teamname"].value;
        var introduction=document.forms["team_init_form"]["introduce"].value;

        //name data confirm
		    if(name==""||name==null)
        {
            layer.msg("团队名称不得为空！");
            return false;
        }
        if(name.length<3||name.length>15)
        {
            layer.msg("团队名称需为3-15个字符！");
            return false;
        }
        if(!isNaN(name))
        {
            layer.msg("团队名称不得为纯数字！");
            return false;
        }
        if( filterSqlStr(name))
        {
            layer.msg("团队名中包含了敏感字符"+sql_str()+",请重新输入！");
            return false;
        }

        //introduction data confirm
		    if(introduction==""||introduction==null)
        {
            layer.msg("团队介绍不得为空！");
            return false;
        }
        if(!isNaN(introduction))
        {
            layer.msg("团队介绍不得为纯数字！");
            return false;
        }
		    if(introduction.length>512)
        {
            layer.msg("团队介绍至多为512个字符！");
            return false;
        }
        if( filterSqlStr(introduction))
        {
            layer.msg("团队介绍中包含了敏感字符"+sql_str()+",请重新输入！");
            return false;
        }
        //confirm part end

        //form data change into json
        var temp_data={"state":"create_group","data":{"name":name,"introduction":introduction}};
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
                  layer.msg('团队创建成功');
  				        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
  				        parent.layer.close(index);
              }
              else {
                  //layer.msg(data.error);
  				        if(data.error=="please sign in first")
  				        {
  					        layer.msg("请先登陆！");
  				        }
              }
            },
            error : function() {
              layer.msg("数据请求异常");
            }
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
