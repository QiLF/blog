//日志发布
	var log_index;
	
	layui.use('layedit', function(){
	  var layedit = layui.layedit;
	  log_index=layedit.build('log_content'); //建立编辑器
	});

     //用于获取富文本编辑器的内容，添加到表单的json数据中，提交 
    function onclick_sumit()
    {  
        
//表单验证部分
/////////////////////////////////////////////////////////////////////////////////        
            var form_theme=document.forms["log_release_form"]["log_title"].value;
            if(form_theme.length<5)
            {
                alert("日志主题至少需含5个字符");
                return false; 
            }
            if(form_theme.length>32)
            {
                alert("日志主题至多可含32个字符");
                return false; 
            }
            if(!isNaN(form_theme))
            {
                alert("日志主题不能为纯数字");
                return false; 
            }        
            if( filterSqlStr(form_theme))
            {  
                alert("日志主题中包含了敏感字符"+sql_str()+",请重新输入！");  
                return false;  
            } 
            
            
            
            var form_content=layui.layedit.getContent(log_index);
            if(form_content.length>4096)
            {
                alert("日志内容至多可含4096个字符");
                return false; 
            }       
            if( filterSqlStr(form_content))
            {  
                alert("日志内容中包含了敏感字符"+sql_str()+",请重新输入！");  
                return false;  
            }      
/////////////////////////////////////////////////////////////////////////////////        
//表单验证部分结束        
			var userName=getCookie("username");
        
			var temp={"state":"insert_blog","data":{"writer":userName,"subtask_id":"subtask20180131033146pm2109538484","name":form_theme,"content":form_content}};
			//var temp={"data":{"username":userName,"first_password":first_pwd,"second_password":second_pwd,"check_agree":check_agree}};
			var str=JSON.stringify(temp);
			alert(str);
			$(function(){
				$.ajax({ 
						url: "php/uploadblog.php",  
						type: "POST", 
						data:{res:str}, 
						dataType: "json", 
						error: function(){   
											alert('Error loading XML document');   
										 },   
						success: function(data){
										if(data.success=="true"){
																alert("日志发布成功！");
																get_blogs();//刷新博客预览展示部分
																layui.element.tabChange('blog_tabs','blog_tabitem1');//跳转到博客预览
																document.getElementById('log_title').value="";//清空发布模块的博客标题
																layui.layedit.setContent(log_index,"");//清空发布模块的博客内容
															}else{
																	alert(data.error);
																 }
												} });
						}); 
    }  
	
	
	
	//用于重置富文本编辑器的内容
	function onclick_reset()
    {  
            layui.layedit.setContent(log_index,"");
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
                var str="and,delete,or,exec,insert,select,union,update,count,*,',join";  //去掉了<和>因为富文本编辑器。
                return str;  
            }  
///////////////////////////////////////////////////////////////////////////////////////////    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
