	function get_old_info()
	{
		var username=getCookie('username');
		var temp_data={"state":"exact","data":username};
		var res=JSON.stringify(temp_data);
		//ajax part
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "php/searchperson.php" ,
			data: {res:res},
			success: function (data) {
			  //deal with data from back_end
			  if(data.success=="false"){
				alert(data.error);
			  }
			  else {
				load_old_info(data);
			  }
			},
			error : function() {
				alert("数据请求异常");
			}
		  });
	}
	
	function load_old_info(value)
	{
		var nickname=value.res['info'][0].nickname;
		var email=value.res['info'][0].email;
		
		//var provid=value.res['info'][0].provid;
		//var cityid=value.res['info'][0].cityid;
		//var areaid=value.res['info'][0].areaid;
		
		var phone=value.res['info'][0].phone;
		var qq=value.res['info'][0].qq;
		var birthdate=value.res['info'][0].birthdate;
		var grade=value.res['info'][0].grade;
		var college=value.res['info'][0].college;
		var open_val=value.res['info'][0].open;
		var sex=value.res['info'][0].sex;
		var intro=value.res['info'][0].intro;
		var avatarname=value.res['fig'][0].avatarname;
		
		document.getElementById('demo1').src=avatarname;
		document.getElementById('nickname').value=nickname;
		document.getElementById('email').value=email;
		document.getElementById('phone').value=phone;
		document.getElementById('QQ').value=qq;
		document.getElementById('birthdate').value=birthdate;
		document.getElementById('college').value=college;
		document.getElementById('grade').value=grade;
		document.getElementById('intro').value=intro;
		
		if(open!='on')
		{
			$('#open').attr("checked",false);
		}
		if(sex=='女')
		{
			$('#sex1').attr("checked",false);
			$('#sex2').attr("checked",true);
		}
	}