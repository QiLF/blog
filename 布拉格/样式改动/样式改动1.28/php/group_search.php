<?php
/*
//团队关键词检索
//前端传入json格式
{
	state:fsearch_group				//"fsearch_group":按条件模糊查找团队，返回符合条件的团队及其对应的信息
	data:{
		name:,
		introduction:,
		order:,
		order_by:,
		segment:{
			start_index:,
			num:
		}
	}
}

{
	state:esearch_user				//"esearch_user":按用户搜索团队，返回用户对应的团队及其对应信息
	data:{
		username:,
		segment:{
			start_index:,			
			num:
		}
	}
}

{
	state:esearch_group				//"esearch_user":按团队编号精确搜索团队，返回团队信息及团队成员 对成员进行分段
	data:{
		group_id:,
		segment:{
			start_index:,			//
			num:
		}
	}
}
*/
	$max_num = 40;
	session_start();
	if(empty($_SESSION["name"])){
		echo json_encode(array("success"=>"false", "error"=>"please sign in first", "res"=>""));
		return;
	} 
	if(empty($_POST["res"])){
		echo json_encode(array("success"=>"false", "error"=>"lack_res", "res"=>""));
		return;
	}else{
		$json = json_decode($_POST["res"],true);
		$opt = $json["state"];
		$data = $json["data"];
		$seg = $data["segment"];
		if($opt != "fsearch_group" && $opt != "esearch_user" && $opt != "esearch_group"){
			echo json_encode(array("success"=>"false", "error"=>"Invalid_Operation", "res"=>""));
			return;
		}else{
			$con = mysqli_connect("localhost","root","hefei");
			if(!$con){
				echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>"")); 
				return;
			}
			mysqli_select_db($con,"class");
			//按条件模糊查找团队，返回符合条件的团队及其对应的信息
			if($opt == "fsearch_group"){
				$count = 0;
				$sql = "";
				if($data["name"] != ""){
					$count = $count + 1;
					$sql = $sql."select * from groups where name like '%{$data["name"]}%' ";
				}
				if($data["introduction"] != ""){
					$count = $count + 1;
					if($count == 1){
						$sql = $sql."select * from groups where introduction like '%{$data["introduction"]}%' ";
					}else{
						$sql = $sql."and introduction like '%{$data["introduction"]}%' ";
					}
				}
				if($sql == ""){
					echo json_encode(array("success"=>"false", "error"=>"lack keywords", "res"=>""));
					mysqli_close($con);
					return;
				}else{
					if(!empty($data["order_by"])){
						$sql = $sql."ORDER BY ".$data["order_by"];
					}else{
						$sql = $sql."ORDER BY start_time";
					}
					if(!empty($data["order"])){
						$sql = $sql." ".$data["order"].";";
					}else{
						$sql = $sql." DESC;";
					}
				}
				$result = mysqli_query($con,$sql);
				if(!$result){
					echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
					mysqli_close($con);
					return;
				}
				$start_index = 0;
				$num = $max_num;
				if(!empty($data["segment"])){
					$start_index = $data["segment"]["start_index"];
					$num = $data["segment"]["num"];
				}
				if($start_index > mysqli_num_rows($result) - 1){
					echo json_encode(array("success"=>"false", "error"=>"start_index exceeds number of rows", "res"=>""));
					mysqli_close($con);
					return;
				}else{
					mysqli_data_seek($result, $start_index);
				}
				$i = 0;
				while(($row = mysqli_fetch_array($result)) && $num>=1){
					$redata["group_id"] = $row["group_id"];
					$redata["name"] = $row["name"];
					$redata["introduction"] = $row["introduction"];
					$redata["start_time"] = $row["start_time"];
					$res[$i] = $redata;
					$i = $i + 1;
					$num = $num - 1;
					
				}
				echo json_encode(array("success"=>"true", "error"=>"", "res"=>$res));
				mysqli_close($con);
				return;
			}
			//按用户搜索团队，返回用户对应的团队及其对应信息
			else if($opt == "esearch_user"){
				if(empty($data["username"])){
					echo json_encode(array("success"=>"false", "error"=>"lack username", "res"=>""));
					mysqli_close($con);
					return;
				}else{
					$sql = "select * from group_user where username = '{$data["username"]}'";
					$result = mysqli_query($con,$sql);
					if(!$result){
						echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
						mysqli_close($con);
						return;
					}
					$start_index = 0;
					$num = $max_num;
					if(!empty($data["segment"])){
						$start_index = $data["segment"]["start_index"];
						$num = $data["segment"]["num"];
					}
					if($start_index > mysqli_num_rows($result) - 1){
						echo json_encode(array("success"=>"false", "error"=>"start_index exceeds number of rows", "res"=>""));
						mysqli_close($con);
						return;
					}else{
						mysqli_data_seek($result, $start_index);
					}
					$flag=0;
					while(($row = mysqli_fetch_array($result)) && $num>=1){
						$sql_byid = "select * from groups where group_id = '{$row["group_id"]}'";
						$re = mysqli_query($con,$sql_byid);
						if(!$re){
							echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
							mysqli_close($con);
							return;
						}
						if(mysqli_num_rows($re)==0||mysqli_num_rows($re)>1){
							echo json_encode(array("success"=>"false", "error"=>"group save error", "res"=>""));
							mysqli_close($con);
							return;
						}
						$inf = mysqli_fetch_array($re);
						$redata["group_id"] = $inf["group_id"];
						$redata["name"] = $inf["name"];
						$redata["introduction"] = $inf["introduction"];
						$redata["start_time"] = $inf["start_time"];
						$res[$flag] = $redata;
						$flag = $flag + 1;
						$num = $num - 1;
						
					}
					echo json_encode(array("success"=>"true", "error"=>"", "res"=>$res));
					mysqli_close($con);
					return;
				}
			}
			//按团队编号精确搜索团队，返回团队信息及团队成员
			else{
				$sql1 = "select * from groups where group_id = '{$data["group_id"]}'";
				$sql2 = "select * from group_user where group_id = '{$data["group_id"]}'";
				$result1 = mysqli_query($con,$sql1);
				if(!$result1){
					echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
					mysqli_close($con);
					return;
				}
				if(mysqli_num_rows($result1)==0||mysqli_num_rows($result1)>1){
					echo json_encode(array("success"=>"false", "error"=>"group save error", "res"=>""));
					mysqli_close($con);
					return;
				}
				$inf = mysqli_fetch_array($result1);
				$result2 = mysqli_query($con,$sql2);
				if(!$result2){
					echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
					mysqli_close($con);
					return;
				}
				$start_index = 0;
				$num = $max_num;
				if(!empty($data["segment"])){
					$start_index = $data["segment"]["start_index"];
					$num = $data["segment"]["num"];
				}
				if($start_index > mysqli_num_rows($result2) - 1){
					echo json_encode(array("success"=>"false", "error"=>"start_index exceeds number of rows", "res"=>""));
					mysqli_close($con);
					return;
				}else{
					mysqli_data_seek($result2, $start_index);
				}
				$flag=0;
				while(($row = mysqli_fetch_array($result2)) && $num>=1){
					$redata["group_id"] = $inf["group_id"];
					$redata["name"] = $inf["name"];
					$redata["introduction"] = $inf["introduction"];
					$redata["start_time"] = $inf["start_time"];
					$redata["username"] = $row["username"];
					$res[$flag] = $redata;
					$flag = $flag + 1;
					$num = $num - 1;
						
				}
				echo json_encode(array("success"=>"true", "error"=>"", "res"=>$res));
				mysqli_close($con);
				return;
			}
		}
		
	}






?>