  /*
  标题:验证必要信息是否填写，格式是否正确，若都填写则提交表单
  参数：无
  返回：true/false
  */

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






	function validateForm()
	{
	var username=document.forms["login-form"]["username"].value;
	var password=document.forms["login-form"]["password"].value;
	if (username==null || username==""){
	  layer.msg("用户名必须填写");
	  return false;
	  }
	if(check_userName(username)==false){
		layer.msg("请检查用户名格式是否正确");
		return false;
		}
	if (password==null || password==""){
	  layer.msg("密码必须填写");
	  return false;
	  }




    var temp_data=$('#login-form').serializeObject();
    var final_object={"data":temp_data};
    //layer.msg(JSON.stringify(final_object));
    var res=JSON.stringify(final_object);

    //ajax part
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "php/login.php" ,
        data: {res:res},
        success: function (data) {
          //deal with data from back_end
          if(data.success=="false"){
            //layer.msg the reason for false
            layer.msg(data.error);
			      if(data.error=="user_not_exist"){
				      layer.msg("用户名不存在！");
			      }
			      if(data.error=="password_not_correct"){
				      layer.msg("密码错误！");
			      }
          }
          else {
            //login successfully and go to personal page
            window.location.href="personal_page.html";
            // store cookie for username
            setCookie('username',username,1);
          }
        },
        error : function() {
          layer.msg("数据请求异常");
        }
      });
      return true;
    }
  /*
  标题:验证用户名有效格式
  参数：用户名
  返回：true/false
  备注：用户名格式为8~20个英文字符及数字、下划线
  */
  function check_userName(username)
  {
	  var parten=/^([A-Z a-z 0-9 _ ]{8,20})$/;
	  if(parten.test(username)){
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
	  var userName=document.forms["login-form"]["username"].value;
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

	  var password=document.forms["login-form"]["password"].value;
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
