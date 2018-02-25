function changekey_check()
	{
	  var old_password=document.forms["changekey-form"]["oldpsw"].value;
	  var new_password=document.forms["changekey-form"]["newpsw"].value;
	  var confirm_password=document.forms["changekey-form"]["confpsw"].value;
	  if (old_password==null || old_password==""){
		layer.msg("请填写原密码");
		return false;
		}
	  if (new_password==null || new_password==""){
		layer.msg("请填写新密码");
		return false;
		}
	  if (confirm_password==null || confirm_password==""){
		layer.msg("请再次确认新密码");
		return false;
		}
	  if(check_password(new_password)==false){
		  layer.msg("请检查新密码格式是否正确");
		  }
	  if(new_password!=confirm_password)
		{
		  layer.msg("两次密码输入不一致");
		  return false;
		}
		var temp={"data":{"old_password":old_password,"new_password":new_password,"confirm_password":confirm_password}};
		var str = JSON.stringify(temp);
		//layer.msg(str);
		$(function(){
        $.ajax({
             url: "php/changekey.php",
             type: "POST",
             data:{res:str},
             dataType: "json",
             error: function(){
                 //layer.msg('Error loading XML document');
             },
             success: function(data){
							 if(data.success=="true"){
								 layer.msg("修改密码成功！");
								 var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
								 parent.layer.close(index);
							 }else{
								 //layer.msg(data.error);
								 if(data.error=="same_with_old"){
									 layer.msg("新旧密码相同！");
								 }
								 if(data.error=="please sign in first"){
									 layer.msg("请先登陆！");
								 }
								 if(data.error=="password_not_correct"){
									 layer.msg("密码不正确！");
								 }
							 }
						 }
				});
	});
	  return true;
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
		  return true;
		  }
		  else{
		  return false;
		  }
	  }
  /*
  函数说明:新密码框失去焦点后验证密码
  参数：
  返回：
  备注：密码格式为6~16个英文字符及数字、下划线
  */
	  function oBlur_check_oldpsw()
	  {
		 var old_password=document.forms["changekey-form"]["oldpsw"].value;
		 if (old_password==null || old_password==""){
			 document.getElementById("reminder_oldpsw").innerHTML = "请输入原密码！";
		 }else{
			 document.getElementById("reminder_oldpsw").innerHTML = "";
		 }
	  }
   /*
  函数说明:新密码框失去焦点后验证密码
  参数：
  返回：
  备注：密码格式为6~16个英文字符及数字、下划线
  */
	  function oBlur_check_newpsw()
	  {
		 var new_password=document.forms["changekey-form"]["newpsw"].value;
		 if (new_password==null || new_password==""){
			 document.getElementById("reminder_newpsw").innerHTML = "请输入密码！";
		 }
		 else if(check_password(new_password)==false){
			 document.getElementById("reminder_newpsw").innerHTML = "密码格式不正确";
				  }
		 else{
			 document.getElementById("reminder_newpsw").innerHTML = "";
		 }
	  }
 /*
 函数说明:再次确认密码框失去焦点后验证确认密码
 参数：
 返回：
 备注：再次确认密码必须与输入的密码一致
 */
	  function oBlur_check_confpsw()
	  {
		 var confirm_password=document.forms["changekey-form"]["confpsw"].value;
		 var new_password=document.forms["changekey-form"]["newpsw"].value;
		if (confirm_password==null || confirm_password=="")
		  {
				document.getElementById("reminder_confpsw").innerHTML = "请再次确认密码！";
		  }
		 else{
			  if(confirm_password!=new_password){
				  document.getElementById("reminder_confpsw").innerHTML = "两次密码输入不一致";
					 }
			  else{
					document.getElementById("reminder_confpsw").innerHTML = "";
				   }
			 }
	  }
/*
函数说明：原密码框获得焦点的隐藏提醒
参数：
返回：
*/
	function oFocus_oldpsw() {
		document.getElementById("reminder_oldpsw").innerHTML = "";
	}

/*
函数说明：新密码框获得焦点的隐藏提醒
参数：
返回：
*/
	function oFocus_newpsw() {
		document.getElementById("reminder_newpsw").innerHTML = "";
	}
/*
函数说明:再次确认密码框获得焦点的隐藏提醒
参数：
返回：
*/
	function oFocus_confpsw() {
		document.getElementById("reminder_confpsw").innerHTML = "";
	}
