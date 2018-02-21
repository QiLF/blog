  /*
  函数说明:验证必要信息是否填写，格式是否正确，若都填写则提交表单
  参数：无
  返回：true/false
  */
  function validateForm()
{
  var userName=document.forms["register-form"]["userName"].value;
  var first_pwd=document.forms["register-form"]["first_pwd"].value;
  var second_pwd=document.forms["register-form"]["second_pwd"].value;
  var check_agree=document.forms["register-form"]["agree"].value;
  var checked=document.forms["register-form"]["agree"].checked;
  if (userName==null || userName==""){
	layer.msg("用户名必须填写");
	return false;
	}
  if (first_pwd==null || first_pwd==""){
	layer.msg("密码必须填写");
	return false;
	}
  if (second_pwd==null || second_pwd==""){
	layer.msg("请再次确认密码");
	return false;
	}
  if(check_password(first_pwd)==false){
	  layer.msg("请检查密码格式是否正确");
	  }
  if(first_pwd!=second_pwd)
	{
	  layer.msg("两次密码输入不一致");
	  return false;
	}
  if(check_userName(userName)==false){
	  layer.msg("请检查用户名格式是否正确");
	  return false;
	}
  if(checked==false){
	  layer.msg("请确认用户协议");
	  return false;
	}
	var temp={"data":{"username":userName,"first_password":first_pwd,"second_password":second_pwd,"check_agree":check_agree}};
	var str = JSON.stringify(temp);
	//alert(str);
	$(function(){
        $.ajax({ 
             url: "php/register.php",  
             type: "POST", 
             data:{res:str}, 
             dataType: "json", 
             error: function(){   
                 //alert('Error loading XML document');   
             },   
             success: function(data){
				if(data.success=="true"){
					layer.msg("注册成功,快去登陆吧！");
					window.location.href="index.html";
				}else{
					if(data.error=="user_is_exist"){
						layer.msg("该用户名已被注册！");
					}
				}
             } });
	}); 
  return true;
  }
  /*
  函数说明:验证用户名有效格式
  参数：用户名
  返回：true/false
  备注：用户名格式为8~20个英文字符及数字、下划线
  */
  function check_userName(userName)
  {
	  var parten=/^([A-Z a-z 0-9 _ ]{8,20})$/;
	  if(parten.test(userName)){
		 if(userName.indexOf(" ") == -1) {  
			return true; 
		}
	  return false;
	  }else{
			return false; 
	  }
  }
  /*
  函数说明:验证密码有效格式
  参数：密码
  返回：true/false
  备注：密码格式为6~16个英文字符及数字、下划线
  */
  function check_password(password)
  {
	  var parten=/^([A-Z a-z 0-9 _ ]{6,16})$/;
	  if(parten.test(password)){
		if(password.indexOf(" ") == -1) {  
		   return true; 
		}
		return false;
	  }
	  else{
	  return false; 
	  }
  }
  /*
  函数说明：用户框失去焦点后验证用户名
  参数：
  返回：
  备注：用户名格式为8~20个英文字符及数字、下划线
  */
  function oBlur_check_userName()
  {
	 var userName=document.forms["register-form"]["userName"].value;
	if (userName==null || userName==""){
	  document.getElementById("reminder_userName").innerHTML = "请输入用户名！";
	}else if(check_userName(userName)==false){
	  document.getElementById("reminder_userName").innerHTML = "用户名格式不正确";  
	}else{
	  document.getElementById("reminder_userName").innerHTML = "";
	 }
  }
  /*
  函数说明:用户框失去焦点后验证密码
  参数：
  返回：
  备注：密码格式为6~16个英文字符及数字、下划线
  */
  function oBlur_check_first_pwd()
  {
	 var first_pwd=document.forms["register-form"]["first_pwd"].value;
	 if (first_pwd==null || first_pwd==""){
		 document.getElementById("reminder_first_pwd").innerHTML = "请输入密码！";
	 }
	 else if(check_password(first_pwd)==false){
		 document.getElementById("reminder_first_pwd").innerHTML = "密码格式不正确";
			  }	
	 else{
		 document.getElementById("reminder_first_pwd").innerHTML = "";
	 }
  }
  /*
  函数说明:用户框失去焦点后验证再次输入的密码
  参数：
  返回：
  备注：再次确认密码必须与输入的密码一致
  */
  function oBlur_check_second_pwd()
  {
	 var second_pwd=document.forms["register-form"]["second_pwd"].value;
	 var first_pwd=document.forms["register-form"]["first_pwd"].value;
	if (second_pwd==null || second_pwd=="")
	  {
			document.getElementById("reminder_second_pwd").innerHTML = "请再次确认密码！";
	  }
	 else{
		  if(second_pwd!=first_pwd){
			  document.getElementById("reminder_second_pwd").innerHTML = "两次密码输入不一致";
				 }   
		  else{
				document.getElementById("reminder_second_pwd").innerHTML = "";
			   }
		 }
  }
	/*
	函数说明：用户名框获得焦点的隐藏提醒
	参数：
	返回：
	*/
	function oFocus_userName() {
		document.getElementById("reminder_userName").innerHTML = "";
	}
	
	/*
	函数说明：密码框获得焦点的隐藏提醒
	参数：
	返回：
	*/
	function oFocus_first_pwd() {
		document.getElementById("reminder_first_pwd").innerHTML = "";
	}
	/*
	函数说明:再次确认密码框获得焦点的隐藏提醒
	参数：
	返回：
	*/
	function oFocus_second_pwd() {
		document.getElementById("reminder_second_pwd").innerHTML = "";
	}
	