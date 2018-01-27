<?php
//建立username和头像对应表 每一个username对应相应的图片名字
//需在服务器根目录下建立名为“img”的文件夹
//注意更改数据库连接的用户名密码
//传入文件
//返还json格式
/*
{
	"success":"true",
	"error":"",
	"res":"..\/img\/hihefei233.jpeg"  //此处为头像图片名
}
*/
session_save_path("/tmp");

session_start();

if(empty($_SESSION["name"])){
	echo json_encode(array("success"=>"false", "error"=>"unsigned", "res"=>""));//success:执行成功与否 error:执行不成功的原因 res:额外返回值(待定)
	return;
};

$username=$_SESSION["name"];

$con=mysqli_connect("localhost","root","myy130805010017");
if (!$con)
{
	echo json_encode(array("success"=>"false", "error"=>mysql_error(), "res"=>""));//success:执行成功与否 error:执行不成功的原因 res:额外返回值(待定)
	return;
	//die('Could not connect: ' . mysql_error());
}
mysqli_select_db($con,"class");
$sql="select username from avatar where username='$username'";
$result=mysqli_query($con,$sql);//执行sql语句
if($_FILES["file"]["error"])
{
	echo json_encode(array("success"=>"false", "error"=>"file_error", "res"=>""));//success:执行成功与否 error:执行不成功的原因 res:额外返回值(待定)
	mysqli_close($con);
	return;
    //echo $_FILES["file"]["error"]; 	
}
else
{
    //没有出错
    //加限制条件
    //判断上传文件类型为png或jpg且大小不超过1024000B
    if(($_FILES["file"]["type"]=="image/png"||$_FILES["file"]["type"]=="image/jpeg")&&$_FILES["file"]["size"]<1024000)
    {
        //防止文件名重复
        $filename ="../img/".$username.".".substr($_FILES["file"]["type"],6);
        //转码，把utf-8转成gb2312,返回转换后的字符串， 或者在失败时返回 FALSE。
        $filename =iconv("UTF-8","gb2312",$filename);
		//delete file of the same name
		@unlink($filename);
		//检查文件或目录是否存在
        if(file_exists($filename))
        {
			echo json_encode(array("success"=>"false", "error"=>"filename_existed", "res"=>""));//success:执行成功与否 error:执行不成功的原因 res:额外返回值(待定)
			mysqli_close($con);
			return;
        }
        else
        {  
           //保存文件,   move_uploaded_file 将上传的文件移动到新位置  
           if(!move_uploaded_file($_FILES["file"]["tmp_name"],$filename))
           {
           echo json_encode(array("success"=>"false", "error"=>"file_move_failed", "res"=>""));
           mysqli_close($con);
			return;
           }//将临时地址移动到指定地址
            //2018.1.24 此处貌似出问题了，在接口测试时，显示提交成功且存下了url但是没有文件。
            //2018.1.25问题解决，img文件夹读写权限问题。
        }
	    $num=mysqli_num_rows($result);
        if($num)
	    {
		    mysqli_query($con,"UPDATE avatar SET avatarname = '$filename' WHERE username = '$username'");  
	    }
	    else
	    {
            mysqli_query($con,"INSERT INTO avatar (username, avatarname) VALUES ('$username','$filename')");
        }   
		echo json_encode(array("success"=>"true", "error"=>"", "res"=>$filename));//success:执行成功与否 error:执行不成功的原因 res:额外返回值(待定)
		mysqli_close($con);
		return; 
    }
    else
    {
		echo json_encode(array("success"=>"false", "error"=>"format_error", "res"=>""));//success:执行成功与否 error:执行不成功的原因 res:额外返回值(待定)
		mysqli_close($con);
		return;
        //echo"文件类型不对";
    }
}
mysqli_close($con);
?>  

