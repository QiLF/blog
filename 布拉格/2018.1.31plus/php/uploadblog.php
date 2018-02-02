<?php
//处理日志的更新 新增与删除
//注意更改数据库连接的用户名密码
//传入json格式
/*{
    state:"insert_blog",
    data:{
        name:,
        content:,
        writer:,
        subtask_id:
    }
}
{
    state:"update_blog",
    data:{
        blog_id:,
        name:,
        content:,
    }
}
{
    state:"delete_blog",
    data:{
        blog_id:
    }
}*/
//session_save_path("/tmp");
session_start();
if(empty($_SESSION["name"])){
	echo json_encode(array("success"=>"false", "error"=>"unsigned", "res"=>""));
	return;
};
$username = $_SESSION["name"];

//$result["blog_id"];
if(empty($_POST["res"])){
	
	echo json_encode(array("success"=>"false", "error"=>"lack_res", "res"=>""));
	return;
}
//前端传至后端的json数据
$json = $_POST["res"];
//json转化为PHP变量
$blog = json_decode($json, true);
$opt = $blog["state"];
$data = $blog["data"];
//判断操作有效性
if($opt != "insert_blog" && $opt != "update_blog" && $opt != "delete_blog")
{
	echo json_encode(array("success"=>"false", "error"=>"Invalid_Operation", "res"=>""));
	return;
}
//连接数据库
$con=mysqli_connect("localhost","root","bulage*666");
if (!$con)
{
	echo json_encode(array("success"=>"false", "error"=>mysql_error(), "res"=>""));
	return;
}

mysqli_select_db($con,"class");
mysqli_query($con,"set names utf8");
//插入博客,即新建,生成一个blog_id,初步考虑为username+time+rand()
if($opt == "insert_blog"){
	$id = $username .time().rand(0,100);
	mysqli_query($con,"INSERT INTO blogs (blog_id, content,name,writer,start_date,subtask_id,modify_date) VALUES ('$id','{$data["content"]}','{$data["name"]}','{$data["writer"]}',NOW(),'{$data["subtask_id"]}', NOW())");
	$result["blog_id"]=$id;
	$result["start_date"]=date("Y/m/d");
	echo json_encode(array("success"=>"true", "error"=>"", "res"=>$result));
	mysqli_close($con);
	return;
}
//更新博客
else if($opt == "update_blog"){
	mysqli_query($con,"UPDATE blogs SET name = '{$data["name"]}', content = '{$data["content"]}', modify_date = NOW() WHERE blog_id = '{$data["blog_id"]}'");
	$result["modify_date"] = date("Y/m/d");
	echo json_encode(array("success"=>"true", "error"=>"", "res"=>$result));
	mysqli_close($con);
	return;
}
else{
	mysqli_query($con,"DELETE FROM blogs WHERE blog_id = '{$data["blog_id"]}'");
	echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
	mysqli_close($con);
	return;
}
?>
