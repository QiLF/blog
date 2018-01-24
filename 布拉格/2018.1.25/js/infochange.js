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

        //form data confirm part
            
            

        //form data change into json 
        var temp_data=$('#personinfo_form').serializeObject();
        var final_object={"data":temp_data};
        alert(JSON.stringify(final_object));//show the json form data.debug only
        var res=JSON.stringify(final_object);
        
        
        
            
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
