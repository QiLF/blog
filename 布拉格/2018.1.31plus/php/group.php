<?php
/*
处理团队的创建 信息更新 删除 成员操作
{
    state:"create_group",
    data:{
        name:,
        introduction:,
    }
}

{
    state:"update_group",
    data:{
		group_id:,
        name:,
        introduction:,
    }
}

{
    state:"delete_group",
    data:{
        group_id:
    }
}

{
	state:"add_member",
	data:{
		group_id:,
		username:
	}
}

{

	state:"del_member",
	data:{
		group_id:,
		username:
	}
}
*/
	//session_save_path("/tmp");
	session_start();
	if(empty($_SESSION["name"])){
        echo json_encode(array("success"=>"false", "error"=>"please sign in first", "res"=>""));
        return;
    } 
	$username = $_SESSION["name"];
	
	if(empty($_POST["res"])){
		echo json_encode(array("success"=>"false", "error"=>"no res", "res"=>""));
        return;
	}else{
		$json = json_decode($_POST["res"],true);
		$opt = $json["state"];
		$data = $json["data"];
		if($opt != "del_member" && $opt != "add_member" && $opt != "delete_group" && $opt != "update_group" && $opt != "create_group"){
			echo json_encode(array("success"=>"false", "error"=>"Invalid_Operation", "res"=>""));
			return;
		}else{
			$con = mysqli_connect("localhost","root","bulage*666");
			if(!$con){
				echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>"")); 
				return;
			}
			mysqli_select_db($con,"class");
			//创建队伍
			if($opt == "create_group"){
				$group_id = time().rand(0,1000);
				$sql="INSERT INTO groups (group_id, name,introduction,start_time) VALUES ('$group_id','{$data["name"]}','{$data["introduction"]}',NOW())";
				mysqli_query($con,$sql);
				mysqli_query($con,"insert into group_user (group_id,username) values ('$group_id','$username')");
				$result["group_id"] = $group_id;
				$result["start_time"]=date("Y/m/d");
				echo json_encode(array("success"=>"true", "error"=>"", "res"=>$result));
				mysqli_close($con);
				return;
			}
			//更新队伍信息
			else if($opt == "update_group"){
				$sql = "UPDATE groups SET name = '{$data["name"]}', introduction = '{$data["introduction"]}' WHERE group_id = '{$data["group_id"]}'";
				mysqli_query($con,$sql);
				echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
				mysqli_close($con);
				return;
			}
			//删除队伍
			else if($opt == "delete_group"){
				mysqli_query($con,"DELETE FROM groups WHERE group_id = '{$data["group_id"]}'");
				echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
				mysqli_close($con);
				return;
			}
			//增加成员
			else if($opt == "add_member"){
				$sql = "select * from group_user where group_id = '{$data["group_id"]}' and username= '{$data["username"]}'";
				$num = mysqli_query($con,$sql);
				if(!$num){
					echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
					mysqli_close($con);
					return;
				}
				//echo mysqli_num_rows($num);
				if(mysqli_num_rows($num)){
					echo json_encode(array("success"=>"false", "error"=>"member already exist", "res"=>""));
					mysqli_close($con);
					return;
				}else{
					mysqli_query($con,"insert into group_user (group_id,username) values ('{$data["group_id"]}','{$data["username"]}')");
					echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
					mysqli_close($con);
					return;
				}
			}
			//删除成员
			else if($opt == "del_member"){
				$sql = "select * from group_user where group_id = '{$data["group_id"]}' and username = '{$data["username"]}'";
				$num = mysqli_query($con,$sql);
				if(!$num){
					echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
					mysqli_close($con);
					return;
				}
				if(!mysqli_num_rows($num)){
					echo json_encode(array("success"=>"false", "error"=>"member doer not exist", "res"=>""));
					mysqli_close($con);
					return;
				}else{
					mysqli_query($con,"delete from group_user where group_id = '{$data["group_id"]}' and username = '{$data["username"]}'");
					echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
					mysqli_close($con);
					return;
				}
			}
		}
	}

?>
