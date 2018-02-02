<?php

//Called by unknown
/*
*
*	Data_name : res
*	Data_format : {"state":"kind","data":"key_word"}
*		state can be set as following values:
*			"exact"	:	search by username, return only one record
*			"fuzzy"	:	search by username and nickname, return all records containing the key_word
*	
*	Return_format	:	
{
	"success":"false",
	"error":"not_found",
	"res":[
	"info":
	{
		"username":"",
		"nickname":"",
		"email":"",
		"provid":"",
		"cityid":"",
		"areaid":"",
		"phone":"",
		"qq":"",
		"birthdate":"",
		"grade":"",
		"college":"",
		"open":"",
		"sex":"",
		"intro":""
		},
	"fig":
	{
		"username":"",
		"avatarname":""
	}]
}
*
*	error_type :	please sign in first		:no session
*					data_not_acquired			:data transmit error
*					connection_error			:SQL operation error
*					bad_state					
*					not_found					:no this record
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

	//Data Decode
	$json=$_POST["res"];
	$res=json_decode($json,true);
	$state=$res["state"];
	$key=$res["data"];
	
	$link=mysqli_connect("localhost","root","bulage*666");

	//ERROR_TYPE connection_error CHECK
	if(!$link){
		echo json_encode(array("success"=>"false", "error"=>"connection_error", "res"=>""));
		exit;
	}
	//Database Select
	mysqli_select_db($link,"class");
	mysqli_query($con,"set names utf8");
	//CHOOSE STATE
	if($state=="exact"){

		//exact search mode
		$sql_eselect="SELECT * FROM userinfo WHERE username ='$key'";
		$sql="select * from avatar where username ='$key'";
		$res_eselect=mysqli_query($link,$sql_eselect);
		$fig_ename=mysqli_query($link,$sql);
		$num=mysqli_num_rows($res_eselect);
		$flag=mysqli_num_rows($fig_ename);
		if($num && $flag){
			$data["info"]=mysqli_fetch_all($res_eselect,MYSQLI_ASSOC);
			$data["fig"]=mysqli_fetch_all($fig_ename,MYSQLI_ASSOC);
			echo json_encode(array("success"=>"true", "error"=>"", "res"=>$data));
			mysqli_close($link);
			exit;
		}else{
			echo json_encode(array("success"=>"false", "error"=>"not_found", "res"=>""));
			mysqli_close($link);
			exit;
		}
	}else if($state=="fuzzy"){
		//fuzzy search mode
		$sql_fselect="SELECT * FROM userinfo WHERE username LIKE '%$key%' OR nickname LIKE '%$key%'";
		$sql="select * from avatar where username like '%$key%'";
		$res_fselect=mysqli_query($link,$sql_fselect);
		$fig_fname=mysqli_query($link,$sql);
		$flag=mysqli_num_rows($fig_fname);
		$num=mysqli_num_rows($res_fselect);
		if($num && $flag){
			$data["info"]=mysqli_fetch_all($res_fselect,MYSQLI_ASSOC);
			$data["fig"]=mysqli_fetch_all($fig_fname,MYSQLI_ASSOC);
			echo json_encode(array("success"=>"true", "error"=>"", "res"=>$data));
			mysqli_close($link);
			exit;
		}else{
			echo json_encode(array("success"=>"false", "error"=>"not_found", "res"=>""));
			mysqli_close($link);
			exit;
		}
	}else{
		//ERROR_TYPE bad_state CHECK
		echo json_encode(array("success"=>"false", "error"=>"bad_state", "res"=>""));
		mysqli_close($link);
		exit;
	}
?>
