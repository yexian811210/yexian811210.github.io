<?php
   if($_SERVER["REQUEST_METHOD"] == "POST") {
   	$username = mysql_real_escape_string($_POST['email_address']);
   	$password = mysql_real_escape_string($_POST['password']);
    mysql_connect("localhost", "root","") or die(mysql_error());
    mysql_select_db("first_db") or die("Cannot connect to database");
    $query = mysql_query("SELECT * FROM users");
    $check = true;
    while($user_information = mysql_fetch_array($query)) {
    	$username_from_table = $user_information['username'];
    	if($username == $username_from_table) {
    		Print '<script>alert("email address is taken!")</script>';
        $check = false;
    	}
     }
     if($check == true) {
     mysql_query("INSERT INTO users (username, password) VALUES ('$username', '$password')");
     Print '<script>alert("Successfully registered!")</script>';
     header("location: dashboard.php");
   }
 }
   else {
   	header("location: index.html");
   }
?>