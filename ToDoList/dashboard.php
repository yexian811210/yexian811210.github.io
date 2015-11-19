<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Dashboard</title>

        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/smoothness/jquery-ui.css">
        <link h
        <style type="text/css">
        </style>
    </head>
    <?php 
      session_start();
      if($_SESSION['user_id']) {
      }
      else {
        header("location: index.html");
      }
    ?>
    <body>
                  <nav class="navbar navbar-default navbar-fixed-top">
              <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="#">UW</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav navbar-right">
                    <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Logout</a></li>
                  </ul>
                  <form class="navbar-form navbar-right" role="search">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                  </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
              </nav>


              <div class="container-fluid" style="padding-top: 80px;">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li><a href="#">To Do List</a></li>
            <li><a href="#">Done</a></li>
          </ul>
        </div>
        <div class="col-sm-9 col-md-10 main">
          <h1 class="page-header" style="margin-top: 0px;">Dashboard</h1>
          <h2 class="sub-header">Section title</h2>
          <div class="show_to_do_list">
            <?php
                mysql_connect("localhost", "root","") or die(mysql_error());
                mysql_select_db("first_db") or die("Cannot connect to database");
                $user_id = $_SESSION['user_id'];
                $query = mysql_query("SELECT * FROM list WHERE user_id = '$user_id'");
                $num_of_rows = mysql_num_rows($query);
                $count = 0;
                while($row = mysql_fetch_array($query)) {
                  Print '<div class="event_list_from_db event_list_'. $count .'" id = "item_'. $count .'">';
                  Print '<p class="event_num_'. $count .'" style="width: 50%; float: left;">' . $row['user_event'] . '</p>';
                  Print '<button type="button" class="btn btn-info done_button">' . "Done" . '</button>';
                  Print '</div>';
                  $count = $count + 1;
                }

            ?>
          </div>

          <form>
            <div class="to_do_area">
             <button type="button" class="btn btn-info" id="to_do_button">+</button>
             <input type="text" class="form-control" id="event_info" style="float:left;width:70%;" name="to_do_event" placeholder="need to do" aria-describedby="sizing-addon1">
            </div>
          </form>

        </div>
      </div>
    </div>
       

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>

        <script tyoe="text/javascript">
        jQuery('#to_do_button').click(function(){
            var event_information = jQuery('#event_info').serialize();
            var event_information_str = jQuery('#event_info').val();
            var item_class = jQuery( '.event_list_from_db' ).last().attr('class');
            var class_number;
            if(item_class == undefined) {
                class_number = 0;
            }
            else {
            class_number = item_class.slice(-1);//only read one digit, need to be fixed
            class_number = parseInt(class_number);
            class_number = class_number + 1;
            }
            if( event_information_str == '' ) {
            }
            else {
            jQuery.ajax({  
            type:'POST',      
            url:'event_handler.php',  
            data:event_information,
            success:function(data){  
39         } 
         });
            jQuery('#event_info').val('');
            jQuery('.show_to_do_list').append(
                '<div class="event_list_from_db event_list_'+ class_number +'" id = "item_'+ class_number +'">' +
                '<p class="event_num_'+ class_number +'" style="width: 50%; float: left;">' + event_information_str + '</p>' +
                '<button type ="button" class="btn btn-info done_button">' + 
                'Done' +
                '</button>' +
                '</div>'
              );
                }
        });

        jQuery('.done_button').click(function(){
            var done_class_id = jQuery( this ).parent().attr( 'id' );
            var done_event_information = jQuery('#'+done_class_id+' p').text();
            console.log(done_event_information);
            jQuery.ajax({
              type: 'POST',
              url: 'done_event_handler.php',
              data: {event_name: done_event_information}
            });
            jQuery('#'+done_class_id+'').remove();
        });
        </script>

        <script src="js/bootstrap.js"></script>
        <script src="js/bootstrap.min.js"></script>
    	</body>
</html>