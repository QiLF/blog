<?php
/*
//日志关键词检索
//注意修改数据库的用户名和密码
//从前端传入的json格式
{
    state:"search_blog",	//检索日志
    data:{              	//检索关键字，默认四个关键词逻辑关系为且 AND
        name:,         		//日志名字
		content:,  			//日志内容
        writer:,       		//日志作者
        subtask_id:    		//对应的子任务id
		order:   			//选择升序或降序 DESC 倒序排列 | ASC 正序排列
		order_by:			//按某项排序 
		segment:{
			start_index:,
            num:
		}
    }

//从后端返还的json格式
{
	"success":"true",
	"error":"",
	"res":[{
		"content":"",
		"name":"",
		"writer":"",
		"start_date":"",
		"modify_date":,
		"subtask_id":""
		},
}*/
//session_save_path("/tmp");
$max_num = 40;
session_start();
if(empty($_SESSION["name"])){
    echo json_encode(array("success"=>"false", "error"=>"please sign in first", "res"=>""));
    return;
} 
if(empty($_POST["res"])){
	echo json_encode(array("success"=>"false", "error"=>"lack_res", "res"=>""));
	return;
}

$json = $_POST["res"];
$blog = json_decode($json,true);
$opt = $blog["state"];
$data = $blog["data"];
$seg = $data["segment"];
if($opt != "search_blog"){
	echo json_encode(array("success"=>"false", "error"=>"Invalid_Operation", "res"=>""));
	return;
}
else{
	$con = mysqli_connect("localhost","root","Mysql_qlf13073");
	if (!$con)
	{
		echo json_encode(array("success"=>"false", "error"=>mysql_error(), "res"=>""));
		return;
	}
	mysqli_select_db($con,"class");
	$count=0;		//	条件计数
	$sql="";
	if($data["content"] != ""){
		$count = $count + 1;
		$sql = $sql."select * from blogs where content like '%{$data["content"]}%' ";
	}
	if($data["name"] != ""){
		$count = $count + 1;
		if($count == 1){
			$sql = $sql."select * from blogs where name like '%{$data["name"]}%' ";
		}else{
			$sql = $sql."and name like '%{$data["name"]}%' ";
		}
	}
	if($data["writer"] != ""){
		$count = $count + 1;
		if($count == 1){
			$sql = $sql."select * from blogs where writer like '%{$data["writer"]}%' ";
		}else{
			$sql = $sql."and writer like '%{$data["writer"]}%' ";
		}
	}
	if($data["subtask_id"] != ""){
		$count = $count + 1;
		if($count == 1){
			$sql = $sql."select * from blogs where subtask_id like '%{$data["subtask_id"]}%' ";
		}else{
			$sql = $sql."and subtask_id like '%{$data["subtask_id"]}%' ";
		}
	}
	if($sql == ""){
		echo json_encode(array("success"=>"false", "error"=>"lack keywords", "res"=>""));
		return;
	}else{
		if(!empty($data["order_by"])){
                $sql = $sql."ORDER BY ".$data["order_by"];
            }else{
                $sql = $sql."ORDER BY start_date";
            }
        if(!empty($data["order"])){
            $sql = $sql." ".$data["order"].";";
        }else{
            $sql = $sql." DESC;";
        }
		//$sql = $sql."order by {$data["order_by"]} {$data["order"]}";
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
	$i=0;
	while(($row = mysqli_fetch_array($result)) && $num>=1){
		$redata["content"] = $row["content"];
		$redata["name"] = $row["name"];
		$redata["writer"] = $row["writer"];
		$redata["start_date"] = $row["start_date"];
		$redata["modify_date"] = $row["modify_date"];
		$redata["subtask_id"] = $row["subtask_id"];
		$res[$i]=$redata;
		$i=$i+1;
		$num = $num - 1;
	}
	echo json_encode(array("success"=>"true", "error"=>"", "res"=>$res));
	mysqli_close($con);
	return;
}
?>