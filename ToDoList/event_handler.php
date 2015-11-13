<?php
	session_start();
	if($_SESSION['user_id']) {
	}
	else {
		header('location: index.html');
	}
  	if($_SERVER["REQUEST_METHOD"] == "POST") {
  		$user_input_event = $_POST['to_do_event'];
  		$user_id = $_SESSION['user_id'];
  		mysql_connect("localhost", "root","") or die(mysql_error());
   	 	mysql_select_db("first_db") or die("Cannot connect to database");
   	 	mysql_query("INSERT INTO list (user_id, user_event) VALUES ('$user_id', '$user_input_event')");
  		}
  	//first simple event handler with database operation on Nov 13
?>