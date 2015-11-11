<?php 
  session_start();
  if($_SERVER["REQUEST_METHOD"] == "POST") {
  	$username = mysql_real_escape_string($_POST['email_address']);
  	$password = mysql_real_escape_string($_POST['password']);
  	mysql_connect("localhost", "root","") or die(mysql_error());
    mysql_select_db("first_db") or die("Cannot connect to database");
    $query = mysql_query("SELECT * FROM users where username = '$username'");
    $num_of_rows = mysql_num_rows($query);
    if ($num_of_rows > 0) {
         $row = mysql_fetch_array($query);
         if($password == $row['password']) {
         	$_SESSION['user_id'] = $row['id'];//set session
         	header("location: dashboard.php");
         }
         else {
         	Print '<script>alert("wrong password");</script>';
         	Print '<script>window.location.assign("login.html");</script>';
         }
    }
    else {
    	Print '<script>alert("username does not exist");</script>';
    	Print '<script>window.location.assign("login.html");</script>';
    }
  }
  ?>