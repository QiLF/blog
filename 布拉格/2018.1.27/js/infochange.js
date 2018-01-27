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
        //check nickname
        if(final_object.data.nickname.length<3)
        {
            alert("昵称至少为三个字符！");
            return false;
        }
        if(!isNaN(final_object.data.nickname))
        {
            alert("昵称不得为纯数字！");
            return false;
        }
        if( filterSqlStr(final_object.data.nickname))
        {  
            alert("昵称中包含了敏感字符"+sql_str()+",请重新输入！");  
            return ;  
        } 
        //check email
        if(!checkemail(final_object.data.email))
        {
            alert("电子邮箱格式不正确！");
            return false;
        } 
        //check phone
        if(isNaN(final_object.data.phone)||final_object.data.phone.length!=11)
        {
            alert("手机号码必须为11位数字！");
            return false;
        }
        //check QQ
        if(isNaN(final_object.data.QQ)||final_object.data.QQ.length>10||final_object.data.QQ.length<5)
        {
            alert("QQ号码必须为5-10位的数字！");
            return false;
        }
        //check intro
        if( filterSqlStr(final_object.data.intro))
        {  
            alert("简介中包含了敏感字符"+sql_str()+",请重新输入！");  
            return ;  
        } 
        //form data confirm end
        
        
        
        alert(JSON.stringify(final_object));
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
                //alert the reason for false
                alert(data.error);
            }
            else {
                alert('信息修改成功！')
                window.reload();
            }
            },
            error : function() {
            alert("数据请求异常");
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
