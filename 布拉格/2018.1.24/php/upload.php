<?php
//����username��ͷ���Ӧ�� ÿһ��username��Ӧ��Ӧ��ͼƬ����
//���ڷ�������Ŀ¼�½�����Ϊ��img�����ļ���
//ע��������ݿ����ӵ��û�������
//�����ļ�
//����json��ʽ
/*
{
	"success":"true",
	"error":"",
	"res":"..\/img\/hihefei233.jpeg"  //�˴�Ϊͷ��ͼƬ��
}
*/

session_start();
if(empty($_SESSION["name"])){
	echo json_encode(array("success"=>"false", "error"=>"unsigned", "res"=>""));//success:ִ�гɹ���� error:ִ�в��ɹ���ԭ�� res:���ⷵ��ֵ(����)
	return;
};

$username=$_SESSION["name"];

$con=mysqli_connect("localhost","root","Mysql_qlf13073");
if (!$con)
{
	echo json_encode(array("success"=>"false", "error"=>mysql_error(), "res"=>""));//success:ִ�гɹ���� error:ִ�в��ɹ���ԭ�� res:���ⷵ��ֵ(����)
	return;
	//die('Could not connect: ' . mysql_error());
}
mysqli_select_db($con,"class");
$sql="select username from avatar where username='$username'";
$result=mysqli_query($con,$sql);//ִ��sql���
if($_FILES["file"]["error"])
{
	echo json_encode(array("success"=>"false", "error"=>"file_error", "res"=>""));//success:ִ�гɹ���� error:ִ�в��ɹ���ԭ�� res:���ⷵ��ֵ(����)
	mysqli_close($con);
	return;
    //echo $_FILES["file"]["error"]; 	
}
else
{
    //û�г���
    //����������
    //�ж��ϴ��ļ�����Ϊpng��jpg�Ҵ�С������1024000B
    if(($_FILES["file"]["type"]=="image/png"||$_FILES["file"]["type"]=="image/jpeg")&&$_FILES["file"]["size"]<1024000)
    {
        //��ֹ�ļ����ظ�
        $filename ="../img/".$username.".".substr($_FILES["file"]["type"],6);
        //ת�룬��utf-8ת��gb2312,����ת������ַ����� ������ʧ��ʱ���� FALSE��
        $filename =iconv("UTF-8","gb2312",$filename);
		//delete file of the same name
		@unlink($filename);
		//����ļ���Ŀ¼�Ƿ����
        if(file_exists($filename))
        {
			echo json_encode(array("success"=>"false", "error"=>"filename_existed", "res"=>""));//success:ִ�гɹ���� error:ִ�в��ɹ���ԭ�� res:���ⷵ��ֵ(����)
			mysqli_close($con);
			return;
        }
        else
        {  
            //�����ļ�,   move_uploaded_file ���ϴ����ļ��ƶ�����λ��  
            move_uploaded_file($_FILES["file"]["tmp_name"],$filename);//����ʱ��ַ�ƶ���ָ����ַ    
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
		echo json_encode(array("success"=>"true", "error"=>"", "res"=>$filename));//success:ִ�гɹ���� error:ִ�в��ɹ���ԭ�� res:���ⷵ��ֵ(����)
		mysqli_close($con);
		return; 
    }
    else
    {
		echo json_encode(array("success"=>"false", "error"=>"format_error", "res"=>""));//success:ִ�гɹ���� error:ִ�в��ɹ���ԭ�� res:���ⷵ��ֵ(����)
		mysqli_close($con);
		return;
        //echo"�ļ����Ͳ���";
    }
}
mysqli_close($con);
?>  

