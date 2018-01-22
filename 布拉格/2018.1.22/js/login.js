  /*
  标题:验证必要信息是否填写，格式是否正确，若都填写则提交表单
  参数：无
  返回：true/false
  */
	function validateForm()
	{
	var userName=document.forms["login-form"]["userName"].value;
	var password=document.forms["login-form"]["first_pwd"].value;
	if (userName==null || userName==""){
	  alert("用户名必须填写");
	  return false;
	  }
	if(check_userName(userName)==false){
		alert("请检查用户名格式是否正确");
		return false;
		}
	if (password==null || password==""){
	  alert("密码必须填写");
	  return false;
	  }
	document.getElementById("login-form").submit();
	return true;
	}
  /*
  标题:验证用户名有效格式
  参数：用户名
  返回：true/false
  备注：用户名格式为8~20个英文字符及数字、下划线
  */
  function check_userName(userName)
  {
	  var parten=/^([A-Z a-z 0-9 _ ]{8,20})$/;
	  if(parten.test(userName)){
	  return true; 
	  }else{
	  return false; 
	  }
  }
  /*
  标题:验证密码有效格式
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
  标题：用户框失去焦点后验证用户名
  参数：
  返回：true/false
  备注：用户名格式为20个英文字符及数字、下划线
  */
  function oBlur_check_user()
  {
	  var userName=document.forms["login-form"]["userName"].value;
	  if (userName==null || userName==""){
		  document.getElementById("reminder_userName").innerHTML = "请输入用户名！";
	  }
	  else if(check_userName(userName)==false){
		  document.getElementById("reminder_userName").innerHTML = "用户名格式错误！";
	  }
	  else{
	  document.getElementById("reminder_userName").innerHTML = "";
	 }
  }
  /*
  标题用户框失去焦点后验证密码
  参数：
  返回：true/false
  备注：用户名格式为20个英文字符及数字、下划线
  */
  function oBlur_check_password()
  {
	  
	  var password=document.forms["login-form"]["first_pwd"].value;
	  if (password==null || password==""){
	  document.getElementById("reminder_password").innerHTML = "请输入密码！";
	 }
	  else{
	  document.getElementById("reminder_password").innerHTML = "";
	 }
  }
  /*
  标题：用户框获得焦点的隐藏提醒
  参数：
  返回：
  */
  function oFocus_userName() {
	  document.getElementById("reminder_userName").innerHTML = "";
  }
  
  /*
  标题：用户框获得焦点的隐藏提醒
  参数：
  返回：
  */
  function oFocus_password() {
	  document.getElementById("reminder_password").innerHTML = "";
  }
  
