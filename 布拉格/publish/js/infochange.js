    //这里的script是用在任务发布的form上的
    layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
    ,layer = layui.layer
    ,layedit = layui.layedit
    ,laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#birthdate'
    });
    });




    //function for transform from form to json object.
    $.fn.serializeObject = function()
    {
       var object = {};
       var temp = this.serializeArray();
       $.each(temp, function() {
           if (object[this.name]) {
               if (!object[this.name].push) {
                   object[this.name] = [object[this.name]];
               }
               object[this.name].push(this.value || '');
           } else {
               object[this.name] = this.value || '';
           }
       });
       return object;
    };




    function personinfo_change()
    {
        //form data change into json
        var temp_data=$('#personinfo_form').serializeObject();
        var final_object={"data":temp_data};
        var res=JSON.stringify(final_object);

        //form data confirm part
        //check nickname,必填项
    		if(!final_object.data.nickname)
        {
          layer.msg("必填项昵称不得为空！");
          return false;
        }
        if(final_object.data.nickname.length<3||final_object.data.nickname.length>15)
        {
          layer.msg("昵称需为3-15个字符！");
          return false;
        }
        if(!isNaN(final_object.data.nickname))
        {
          layer.msg("昵称不得为纯数字！");
          return false;
        }
        if( filterSqlStr(final_object.data.nickname))
        {
          layer.msg("昵称中包含了敏感字符"+sql_str()+",请重新输入！");
          return false;
        }
        //check email,必填项
    		if(!final_object.data.email)
    		{
    			layer.msg("必填项邮箱不得为空！");
    			return false;
    		}
    		if(final_object.data.email.length>45)
    		{
    			layer.msg("电子邮箱长度应在45以内！");
    			return false;
    		}
    		if(!checkemail(final_object.data.email))
    		{
    			layer.msg("电子邮箱格式不正确！");
    			return false;
    		}
        //check phone,必填项
    		if(!final_object.data.phone)
    		{
    			layer.msg("必填项手机号码不得为空！");
    			return false;
    		}
    		if(isNaN(final_object.data.phone)||final_object.data.phone.length!=11)
    		{
    			layer.msg("手机号码必须为11位数字！");
    			return false;
    		}
        //check QQ,非必填项
    		if(final_object.data.QQ)
    		{
    			if(isNaN(final_object.data.QQ)||final_object.data.QQ.length>10||final_object.data.QQ.length<5)
    			{
    				layer.msg("QQ号码必须为5-10位的数字！");
    				return false;
    			}
    		}
        //check intro,非必填项
    		if(final_object.data.intro)
    		{
    			if(final_object.data.intro.length>45)
    			{
    				layer.msg("简介中长度不得超过45个字符！");
    				return false;
    			}
    			if( filterSqlStr(final_object.data.intro))
    			{
    				layer.msg("简介中包含了敏感字符"+sql_str()+",请重新输入！");
    				return false;
    			}
    		}
        //form data confirm end



        //layer.msg(JSON.stringify(final_object));
        //show the json form data.debug only

        //ajax connect part
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "php/infochange.php" ,
            data: {res:res},
            success: function (data) {
              //deal with data from back_end
              if(data.success=="false"){
                  //layer.msg the reason for false
                  //layer.msg(data.error);
  				        if(data.error=="please sign in first")
  				        {
  					        layer.msg("请先登录！");
  				        }
              }
              else {
                  layer.msg('信息修改成功,正在跳转至个人中心！');
				  setTimeout("window.location.href='personal_page.html';", 1000); 
              }
            },
            error : function() {
              layer.msg("数据请求异常");
            }
        });
    }








        //判断用户输入的电子邮箱格式是否正确的函数
        function checkemail(value){
            var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

            if(myReg.test(value))
            {
                return true;
            }
            else
            {
                return false;
            }
        }



            //防sql注入模块
//////////////////////////////////////////////////////////////////////////////////////////
            <!-- 过滤一些敏感字符函数 -->
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
