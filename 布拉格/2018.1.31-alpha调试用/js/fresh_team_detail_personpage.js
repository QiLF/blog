  var current_group_id=null;
  function fresh_team_info(value)
  {
	  current_group_id=value;
      get_personal_tasks(value);
      get_history_tasks(value);
  }
