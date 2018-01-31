<?php
    session_save_path("/tmp");
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
        $con = mysqli_connect("localhost","root","myy130805010017");
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
        }else if(!$data){
            echo json_encode(array("success"=>"false", "error"=>"no data", "res"=>""));
            mysqli_close($con);
            return;
        }else if(!strcmp($state, "insert_task")){
            $task_id = "task".date("Ymdhisa").rand();
            $sql = "INSERT INTO `class`.`tasks` (`task_id`, `name`, `introduction`, `start_date`, `end_date`, `priority`, `evaluation`, `builder`) VALUES ('$task_id', '{$data["name"]}', '{$data["introduction"]}', '{$data["start_date"]}', '{$data["end_date"]}', '{$data["priority"]}', '0', '{$data["builder"]}');";
            if(!mysqli_query($con, $sql)){
                echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
            }else{
                if(empty($data["group_id"])){
                    echo json_encode(array("success"=>"false", "error"=>"no group_id", "res"=>""));
                    mysqli_close($con);
                    return;
                };
                $group_id = $data["group_id"];
                $sql = "INSERT INTO `class`.`task_group` (`task_id`, `group_id`) VALUES ('$task_id', '$group_id');";
                if(!mysqli_query($con, $sql)){
                    echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                    mysqli_close($con);
                    return;
                }
                foreach($data["members"] as $member){
                    $sql = "INSERT INTO `class`.`task_user` (`task_id`, `username`) VALUES ('$task_id', '$member');";
                    if(!mysqli_query($con, $sql)){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                }
                $i = 0;
                foreach($data["subtasks"] as $subtask){
                    $subtask_id = "subtask".date("Ymdhisa").rand();
                    $subtask_ids[$i++] = $subtask_id;
                    $sql = "INSERT INTO `class`.`task_subtask` (`task_id`, `subtask_id`) VALUES ('$task_id', '$subtask_id');";
                    if(!mysqli_query($con, $sql)){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                    $sql = "INSERT INTO `class`.`subtasks` (`subtask_id`, `name`, `start_date`, `end_date`, `progress`, `evaluation`) VALUES ('$subtask_id', '{$subtask["name"]}', '{$subtask["start_date"]}', '{$subtask["end_date"]}', '0', '0');";
                    if(!mysqli_query($con, $sql)){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                    foreach($subtask["members"] as $member){
                        $sql = "INSERT INTO `class`.`subtask_user` (`subtask_id`, `username`) VALUES ('$subtask_id', '$member');";
                        if(!mysqli_query($con, $sql)){
                            echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                            mysqli_close($con);
                            return;
                        }
                    }
                }
            }
            echo json_encode(array("success"=>"true", "error"=>"", "res"=>json_encode(array("task_id"=>$task_id, "subtask_ids"=>$subtask_ids))));
            mysqli_close($con);
            return;
        }else if(!strcmp($state, "insert_subtask")){
            $subtask_id = "subtask".date("Ymdhisa").rand();
            $task_id = $data["task_id"];
            if(!$task_id){
                echo json_encode(array("success"=>"false", "error"=>"no task_id", "res"=>""));
                mysqli_close($con);
                return;
            }
            $subtask = $data;
            $sql = "INSERT INTO `class`.`task_subtask` (`task_id`, `subtask_id`) VALUES ('$task_id', '$subtask_id');";
            if(!mysqli_query($con, $sql)){
                echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
            }else{
                $sql = "INSERT INTO `class`.`subtasks` (`subtask_id`, `name`, `start_date`, `end_date`, `progress`, `evaluation`) VALUES ('$subtask_id', '{$subtask["name"]}', '{$subtask["start_date"]}', '{$subtask["end_date"]}', '0', '0');";
                if(!mysqli_query($con, $sql)){
                    echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                    mysqli_close($con);
                    return;
                }
                foreach($subtask["members"] as $member){
                    $sql = "INSERT INTO `class`.`subtask_user` (`subtask_id`, `username`) VALUES ('$subtask_id', '$member');";
                    if(!mysqli_query($con, $sql)){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                }

            }
            echo json_encode(array("success"=>"true", "error"=>"", "res"=>json_encode(array("subtask_id"=>$subtask_id))));
            mysqli_close($con);
            return;
        }else if(!strcmp($state, "update_task")){
            if(1){
                $task_id = $data["task_id"];
                
                if(!$task_id){
                    echo json_encode(array("success"=>"false", "error"=>"no task_id", "res"=>""));
                    mysqli_close($con);
                    return;
                }
                unset($data["task_id"]);
                $members = $data["members"];
                if($members){
                    unset($data["members"]);
                    $sql = "DELETE FROM `class`.`task_user` WHERE `task_id`='$task_id'";
                    if(!mysqli_query($con, $sql)){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                    foreach($members as $member){
                        $sql = "INSERT INTO `class`.`task_user` (`task_id`, `username`) VALUES ('$task_id', '$member');";
                        if(!mysqli_query($con, $sql)){
                            echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                            mysqli_close($con);
                            return;
                        }
                    }
                }
                $keys = array_keys($data);
                for($i = 0; $i < count($keys); $i++){
                    $sql = "UPDATE `class`.`tasks` SET `{$keys[$i]}`='{$data[$keys[$i]]}' WHERE `task_id`='$task_id';";
                    if(!mysqli_query($con, $sql)){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                }
            }
            echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
            mysqli_close($con);
            return;
        }else if(!strcmp($state, "update_subtask")){
            if(1){
                $subtask_id = $data["subtask_id"];
                if(!$subtask_id){
                    echo json_encode(array("success"=>"false", "error"=>"no task_id", "res"=>""));
                    mysqli_close($con);
                    return;
                }
                unset($data["subtask_id"]);
                $members = $data["members"];
                if($members){
                    unset($data["members"]);
                    $sql = "DELETE FROM `class`.`subtask_user` WHERE `subtask_id`='$subtask_id'";
                    if(!mysqli_query($con, $sql)){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                    foreach($members as $member){
                        $sql = "INSERT INTO `class`.`subtask_user` (`subtask_id`, `username`) VALUES ('$subtask_id', '$member');";
                        if(!mysqli_query($con, $sql)){
                            echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                            mysqli_close($con);
                            return;
                        }
                    }
                }
                $keys = array_keys($data);
                for($i = 0; $i < count($keys); $i++){
                    $sql = "UPDATE `class`.`subtasks` SET `{$keys[$i]}`='{$data[$keys[$i]]}' WHERE `subtask_id`='$subtask_id';";
                    if(!mysqli_query($con, $sql)){
                        echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                        mysqli_close($con);
                        return;
                    }
                }
            }
            echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
            mysqli_close($con);
            return;
        }else if(!strcmp($state, "delete_task")){
            if(1){
                $task_id = $data["task_id"];
                if(!$task_id){
                    echo json_encode(array("success"=>"false", "error"=>"no task_id", "res"=>""));
                    mysqli_close($con);
                    return;
                }
                $sql = "DELETE FROM `class`.`tasks` WHERE `task_id`='$task_id';";
                if(!mysqli_query($con, $sql)){
                    echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                    mysqli_close($con);
                    return;
                }
            }
            echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
            mysqli_close($con);
            return;
        }else if(!strcmp($state, "delete_subtask")){
            if(1){
                $subtask_id = $data["subtask_id"];
                if(!$subtask_id){
                    echo json_encode(array("success"=>"false", "error"=>"no subtask_id", "res"=>""));
                    mysqli_close($con);
                    return;
                }
                $sql = "DELETE FROM `class`.`task_subtask` WHERE `subtask_id`='$subtask_id';";
                if(!mysqli_query($con, $sql)){
                    echo json_encode(array("success"=>"false", "error"=>mysqli_error($con), "res"=>""));
                    mysqli_close($con);
                    return;
                }
            }
            echo json_encode(array("success"=>"true", "error"=>"", "res"=>""));
            mysqli_close($con);
            return;
        }else{
            echo json_encode(array("success"=>"false", "error"=>"undefined state type", "res"=>""));
            mysqli_close($con);
            return;
        }
    }
    
?>  
