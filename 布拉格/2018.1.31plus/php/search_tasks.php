<?php
    $max_num = 40;
    
    //session_save_path("/tmp");
    session_start();
    if(empty($_SESSION["name"])){
        echo json_encode(array("success"=>"false", "error"=>"please sign in first", "res"=>""));
        return;
    } 

    if(empty($_POST["res"])){
        echo json_encode(array("success"=>"false", "error"=>"no res", "res"=>""));
        return;
    }else{
        $data = json_decode($_POST["res"], true);
        $con = mysqli_connect("localhost","root","bulage*666");
        if(!$con)
		{
			echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>"")); 
            return;
		}
        mysqli_select_db($con,"class");  
        mysqli_query($con,"set names gbk"); 
        
        $state = $data["state"];
        $data = $data["data"];
        
        if(!$state){
            echo json_encode(array("success"=>"false", "error"=>"no state", "res"=>""));
            mysqli_close($con);
            return;
        }else if(!strcmp($state, "get_num") || !strcmp($state, "get_result")){
            $condition_num = 0;
            if(!empty($data["member"])){
                $condition[$condition_num++] = "(task_id IN (SELECT task_id FROM `class`.`task_user` WHERE username = '{$data["member"]}'))";
            }
            if(!empty($data["builder"])){
                $condition[$condition_num++] = "(builder = '{$data["builder"]}')";
            }
            if(!empty($data["state"])){
                $condition[$condition_num++] = "(state = '{$data["state"]}')";
            }
            if(!empty($data["keywords"])){
                $condition[$condition_num++] = "(name like '%{$data["keywords"]}%' or introduction like '{$data["keywords"]}' or task_id in (SELECT task_id FROM `class`.`task_subtask` WHERE subtask_id in (SELECT subtask_id FROM `class`.`subtasks` WHERE name like '%{$data["keywords"]}%')))";
            }
            if(!empty($data["group_id"])){
                $condition[$condition_num++] = "(task_id IN (SELECT task_id FROM `class`.`task_group` WHERE group_id = '{$data["group_id"]}'))";
            }
            $sql = "SELECT * FROM `class`.`tasks` ";
            if($condition_num > 0){
                $sql = $sql." WHERE ".$condition[0];
                for($i = 1; $i < $condition_num; $i++){
                    $sql = $sql." AND ".$condition[$i];
                }
            }
            if(!empty($data["order_by"])){
                $sql = $sql." ORDER BY ".$data["order_by"];
            }else{
                $sql = $sql." ORDER BY start_date";
            }
            if(!empty($data["order"])){
                $sql = $sql." ".$data["order"].";";
            }else{
                $sql = $sql." DESC;";
            }
            $result=mysqli_query($con,$sql);  
            if(!$result){
                echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                mysqli_close($con);
                return;
            }
            if(!strcmp($state, "get_num")){
                $num = mysqli_num_rows($result);
                echo json_encode(array("success"=>"true", "error"=>"", "res"=>array("num"=>$num)));
                mysqli_close($con);
                return;
            }else{
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
                while($row = mysqli_fetch_array($result)){
                    for($j = 0; $j < 10; $j++){
                        unset($row[$j]);
                    }
                    $task_id = $row["task_id"];
                    $sql = "SELECT group_id FROM `class`.`task_group` WHERE task_id = '{$task_id}';";
                    $group_id_result=mysqli_query($con,$sql);  
                    if(!$group_id_result){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                    $output = mysqli_fetch_array($group_id_result);
                    $row["group_id"] = $output["group_id"];
                    
                    $sql = "SELECT username FROM `class`.`task_user` WHERE task_id = '{$task_id}';";
                    $members_result=mysqli_query($con,$sql); 
                    if(!$members_result){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                    $j = 0;
                    while($output = mysqli_fetch_array($members_result)){
                        $row["members"][$j++] = $output["username"];
                    }
                    
                    $sql = "SELECT * FROM `class`.`subtasks` WHERE subtask_id in (SELECT subtask_id FROM `class`.`task_subtask` WHERE task_id = '{$task_id}')";
                    $subtasks_result=mysqli_query($con,$sql); 
                    if(!$subtasks_result){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                    $j = 0;
                    while($output = mysqli_fetch_array($subtasks_result)){
                        for($k = 0; $k < 8; $k++){
                            unset($output[$k]);
                        }
                        $sql = "SELECT username FROM `class`.`subtask_user` WHERE subtask_id = '{$output["subtask_id"]}';";
                        $members_result=mysqli_query($con,$sql); 
                        if(!$members_result){
                            echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                            mysqli_close($con);
                            return;
                        }
                        $k = 0;
                        while($member_row = mysqli_fetch_array($members_result)){
                            $output["members"][$k++] = $member_row["username"];
                        }
                        $row["subtasks"][$j++] = $output;
                    }
                    $res[$i++] = $row;
                    $num--;
                    if($num < 1)
                        break;
                }
                
                echo json_encode(array("success"=>"true", "error"=>"", "res"=>$res));
                mysqli_close($con);
                return;
            }
            
            
        }else{
            echo json_encode(array("success"=>"false", "error"=>"undefined state type", "res"=>""));
            mysqli_close($con);
            return;
        }
    }
    
?>  
