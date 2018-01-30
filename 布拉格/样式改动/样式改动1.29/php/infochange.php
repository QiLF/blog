<?php

//Called by infochange.html
/*
*
*	Data_name : res
*	Data_format : {"data":{"nickname":"","email":"","provid":"","cityid":"","areaid":"","phone":"","qq":"","birthdate":"","grade":"","college":"","open":"","sex":"","intro":""}}
*	Session_state: use state $_SESSION["name"]
*	error_type :	please sign in first		:no session
*					data_not_acquired			:data transmit error
*					connection_error			:SQL operation error
*					user_not_exist				:just in case
*					update_fail					:SQL operation error
*
*
*
*author:A
*version:1.0.0
*/


	
	//session_save_path("/tmp");
	
	session_start();

	if(empty($_SESSION["name"])){
		echo json_encode(array("success"=>"false", "error"=>"please sign in first", "res"=>""));
		exit;
	}
	
	//ERROR_TYPE data_not_acquired CHECK
	if(empty($_POST["res"])){
		echo json_encode(array("success"=>"false", "error"=>"data_not_acquired", "res"=>""));
		exit;
	}

	$username = $_SESSION["name"];

	//Data Decode
	$json=$_POST["res"];
	$res=json_decode($json,true);
	$data=$res["data"];
	$nickname=$data["nickname"];
	$email=$data["email"];
	$provid=$data["provid"];
	$cityid=$data["cityid"];
	$areaid=$data["areaid"];
	$phone=$data["phone"];
	$qq=$data["QQ"];
	$birthdate=$data["birthdate"];
	$grade=$data["grade"];
	$college=$data["college"];
	$open=$data["open"];
	$sex=$data["sex"];
	$intro=$data["intro"];

	//echo $nickname;// I do not know this code mean,so ... 

	$link=mysqli_connect("localhost","root","myy130805010017");

	//ERROR_TYPE connection_error CHECK
	if(!$link){
		echo json_encode(array("success"=>"false", "error"=>"connection_error", "res"=>""));
		exit;
	}
	//Database Select
	mysqli_select_db($link,"class");
	
	$sql_select="SELECT username FROM users WHERE username ='$username'";
	$res_select=mysqli_query($link,$sql_select);
	$num=mysqli_num_rows($res_select);
	//ERROR_TYPE user_not_exist CHECK
	//just in case
	if($num){ 
		//user_not_exist FALSE
        $sql_update="UPDATE userinfo SET nickname='$nickname',email='$email',provid='$provid',cityid='$cityid',areaid='$areaid',phone='$phone',qq='$qq',birthdate='$birthdate',grade='$grade',college='$college',open='$open',sex='$sex',intro='$intro' WHERE username='$username'"; 
		$res_update=mysqli_query($link,$sql_update);  
		if($res_update){
			echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
			mysqli_close($link);
			exit;
		}else{
			echo json_encode(array("success"=>"false", "error"=>"update_fail", "res"=>""));
			mysqli_close($link);
			exit;
		}
    }else{
		//user_not_exist TRUE
		echo json_encode(array("success"=>"false", "error"=>"user_not_exist", "res"=>""));
		mysqli_close($link);
		exit;
	}
?>
