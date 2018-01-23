<?php  
   // if(isset($_POST["Submit"])&& $_POST["Submit"] == "reg")  
    if(1)  
    {  
        $user = $_POST["userName"];  
        $psw = $_POST["first_pwd"];  
        $psw_confirm = $_POST["second_pwd"];  
		$check_agree=$_POST["agree"];
        if($user == "" || $psw == "" || $psw_confirm == "")  
        {  
            echo "<script>alert('请确认信息完整性！'); history.go(-1);</script>";  
        }  
		else if($check_agree!="agree")
		{
            echo "<script>alert('若要注册请同意用户协议！'); history.go(-1);</script>"; 
		}
        else  
        {  
            if($psw == $psw_confirm)  
            {  
                $con=mysqli_connect("localhost","root","myy130805010017");   //连接数据库  
                mysqli_select_db($con,"class");  //选择数据库  
                mysqli_query($con,"set names gbk");//定字符集  
                $sql = "select username from test where username ='$user'"; //SQL语句  
                $result=mysqli_query($con,$sql);    //执行SQL语句  
                $num=mysqli_num_rows($result); //统计执行结果影响的行数  
                if($num)    //如果已经存在该用户  
                {  
                    echo "<script>alert('用户名已存在'); history.go(-1);</script>";  
                }  
                else    //不存在当前注册用户名称  
                {  
                    $sql_insert="insert into test(username,password) values ('$user','$psw')"; 
                    $res_insert=mysqli_query($con,$sql_insert);  
                    if($res_insert)  
                    {  
                        echo "<script>alert('注册成功，快去登录吧！');window.location.href='../index.html';</script>";  
                    }  
                    else  
                    {  
                        echo "<script>alert('系统繁忙，请稍候！'); history.go(-1);</script>";  
                    }  
                }  
            }  
            else  
            {  
                echo "<script>alert('密码不一致！'); history.go(-1);</script>";  
            }  
        }  
    }  
    else  
    {  
        echo "<script>alert('提交未成功！'); history.go(-1);</script>";  
    }  
    mysqli_close($con);
?>  
