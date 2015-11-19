<?php
	session_start();
	if($_SESSION['user_id']) {
	}
	else {
		header('location: index.html');
	}
  	if($_SERVER["REQUEST_METHOD"] == "POST") {
  		$user_input_event = $_POST['event_name'];
  		$user_id = $_SESSION['user_id'];
  		mysql_connect("localhost", "root","") or die(mysql_error());
   	 	mysql_select_db("first_db") or die("Cannot connect to database");
   	 	mysql_query("UPDATE list SET completed = '1' where user_id = '$user_id' AND user_event = '$user_input_event' ");
  		}
  	//first simple event handler with database operation on Nov 13
?>