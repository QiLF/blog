<?php

//Called by changekey.html
/*
*
*	Data_name : res
*	Data_format : {"data":{"old_password":"","new_password":"","confirm_password":""}}
*		
*	error_type :	please sign in first		:no session
*					data_not_acquired			:data transmit error
*					connection_error			:SQL operation error
*					user_not_exist				:just in case
*					password_not_correct		:do not match the password in database
*					same_with_old				:new_password same with the old_password
*					different_passwords			:confirm_password different from new_password
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
	$old_password=$data["old_password"];
	$new_password=$data["new_password"];
	$confirm_password=$data["confirm_password"];

	$link=mysqli_connect("localhost","root","bulage*666");

	//ERROR_TYPE connection_error CHECK
	if(!$link){
		echo json_encode(array("success"=>"false", "error"=>"connection_error", "res"=>""));
		exit;
	}
	//Database Select
	mysqli_select_db($link,"class");
	
	$sql_select="SELECT username,password FROM users WHERE username ='$username'";
	$res_select=mysqli_query($link,$sql_select);
	$num=mysqli_num_rows($res_select);

	//ERROR_TYPE user_not_exist CHECK
	//just in case
	if($num){ 
		//user_not_exist FALSE
		$data=mysqli_fetch_array($res_select,MYSQLI_ASSOC);
		
		//ERROR_TYPE password_not_correct CHECK
		if($data["password"]==$old_password){
			//password_not_correct FALSE
			
			//ERROR_TYPE same_with_old CHECK
			if($new_password==$old_password){
				//same_with_old TRUE
				echo json_encode(array("success"=>"false", "error"=>"same_with_old", "res"=>""));
				mysqli_close($link);
				exit;
			}else{
				//same_with_old FALSE

				//ERROR_TYPE different_passwords CHECK
				if($new_password==$confirm_password){
					//different_passwords FALSE
					$sql_update="UPDATE users SET password='$new_password' WHERE username='$username'"; 
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
					//different_passwords TRUE
					echo json_encode(array("success"=>"false", "error"=>"different_passwords", "res"=>""));
					mysqli_close($link);
					exit;
				}
			}	
		}else{
			//password_not_correct TRUE
			echo json_encode(array("success"=>"false", "error"=>"password_not_correct", "res"=>""));
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
