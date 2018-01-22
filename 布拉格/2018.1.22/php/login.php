<?php 
session_start();
$_SESSION["name"]="temp";
?>


<?php  
    if(1)//isset($_POST["Submit"]) && $_POST["Submit"] == "login"
    {  
        $user = $_POST["userName"];  
        $psw = $_POST["first_pwd"];  
        if($user == "" || $psw == "")  
        {  
            echo "<script>alert('请输入用户名或密码！'); history.go(-1);</script>";  
        }  
        else  
        {  
            $con=mysqli_connect("localhost","root","myy130805010017");  
			if(!$con)
			{
				echo "<script>alert('连接失败！！！');history.go(-1);</script>"; 
			}
            mysqli_select_db($con,"class");  
            mysqli_query($con,"set names gbk");  
            $sql = "select username,password from test where username ='$user' and password='$psw'";  
            $result=mysqli_query($con,$sql);  
            $num=mysqli_num_rows($result);  
            if($num)  
            {  
				$data=mysqli_fetch_array($result);
				$_SESSION["name"]=$_POST["userName"];
				$_SESSION["age"]=$data["age"];
                echo "<script>alert('登录成功！！！');window.location.href='../personal_page.html';</script>";  
            }  
            else  
            {  
                echo "<script>alert('用户名或密码不正确！');history.go(-1);</script>";  
            }  
        }  
    }  
    else  
    {  
        echo "<script>alert('提交未成功！'); history.go(-1);</script>";  
    }  
  mysqli_close($con);
?>  
