<?php

//Called by index.html
/*
*
*	Data_name : res
*	Data_format : {"data":{"username":"this_is_username","password":"this_is_password"}}
*	Session_state : $_SESSION["name"]="username"
*		
*	error_type :	data_not_acquired		:data transmit error
*					username_is_empty		
*					password_is_empty
*					connection_error		:SQL operation error
*					password_not_correct
*					user_not_exist
*
*
*author:A
*version:1.0.0
*/



	session_save_path("/tmp");
	session_start();

	//ERROR_TYPE data_not_acquired CHECK
	if(empty($_POST["res"])){
		echo json_encode(array("success"=>"false", "error"=>"data_not_acquired", "res"=>""));
		exit;
	}

	//Data Decode
	$json=$_POST["res"];
	$res=json_decode($json,true);
	$data=$res["data"];
	$username=$data["username"];  
    $password=$data["password"];

    if($username==""){
		//ERROR_TYPE username_is_empty CHECK
		echo json_encode(array("success"=>"false", "error"=>"username_is_empty", "res"=>""));
		exit;  
    }else if($password==""){
		//ERROR_TYPE password_is_empty CHECK
	    echo json_encode(array("success"=>"false", "error"=>"password_is_empty", "res"=>""));
		exit;
	}else{
		//Server Link
	    $link=mysqli_connect("localhost","root","myy130805010017");
		if(!$link){
			//ERROR_TYPE connection_error CHECK
			echo json_encode(array("success"=>"false", "error"=>"connection_error", "res"=>""));
			exit;
		}
		//Database Select
		mysqli_select_db($link,"class");

        $sql_select="SELECT username,password FROM users WHERE username ='$username'";
        $res_select=mysqli_query($link,$sql_select);
        $num=mysqli_num_rows($res_select);

		//ERROR_TYPE user_not_exist CHECK
        if($num)  
        {
			//user_not_exist FALSE
			$data=mysqli_fetch_array($res_select,MYSQLI_ASSOC);
			//ERROR_TYPE password_not_correct CHECK
			if($data["password"]==$password){
				//password_not_correct FALSE
				$_SESSION["name"]=$username;
				echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
				mysqli_free_result($res_select);
				mysqli_close($link);
			}else{
				//password_not_correct TRUE
				echo json_encode(array("success"=>"false", "error"=>"password_not_correct", "res"=>""));
				mysqli_free_result($res_select);
				mysqli_close($link);
				exit;
			}			
        }else{ 
			//user_not_exist TRUE
            echo json_encode(array("success"=>"false", "error"=>"user_not_exist", "res"=>""));
			mysqli_free_result($res_select);
			mysqli_close($link);
			exit;
        }  
    }
?>  
