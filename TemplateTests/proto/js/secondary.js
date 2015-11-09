var available = [];
var avail_frag = [];

image = '';

used_arr = [];

//House Keeping functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//drop down menu creation

$.getJSON('scent_list.json', function(data) {
    console.log(data);
    names = data;

    n = [names.woods_obj, names.oriental_obj, names.fresh_obj, names.floral_obj];
    for (i = 0; i < n.length; i++) {
        for (j = 0; j < n[i].length; j++) {
            available.push(n[i][j].name);
        }
    }
});

$(function() {
    $( "#tags" ).autocomplete({
        source: available
    });
});

getPhoto = function(k) {
    n = [names.woods_obj, names.oriental_obj, names.fresh_obj, names.floral_obj];
    for (i = 0; i < n.length; i++) {
        for (j = 0; j < n[i].length; j++) {
            if (n[i][j].name == k) {
                image = n[i][j].source_link;
            }
        }
    }
}

//Button functionality
$("li").click( function() {
    if ($(this).attr("class") === "active") {
        $(this).removeClass("active");
    } else {
        $("li").each(function() {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
    }
});

$(document).on("click", "#delete", function() {
    var rev = $(this).parent().attr("id");
    var st = String( "#" + rev );
    $(st).remove();
});

//page population
$(function() {
    var j = localStorage.getItem('this').split(",");

    for (k = 0; k < j.length / 2; k++) {

        memStr = j.toString();
        memObj = eval(memStr);
        current = 2 * k;

        var note_with_space = memObj[current];//to show note name with white space under the image

        if(memObj[current].indexOf(" ")>=0) {
            memObj[current] = memObj[current].replace(/\s/g, '');
        } //delete white space to make delete function work properly. For example, id = "white floral" will be recognized as two id names.

        $("#defaultNotes").append(
                '<div class="single_note_container" id="' + memObj[current] + 'rev" style="margin-top: 20px;">' +
                '<a href="#" id="' + memObj[current] +'" class="single_note_element portlet-header">' +
                '<img src=' + memObj[current + 1]  + ' alt="...">' +
                '<div class="caption">'+
                '<h4 style="margin-bottom: 0px;">'+ note_with_space +'</h4>' +
                '</div>' +
                '</a>' +
                '<a href="#" id="delete">' +
                "Remove" +
                '</a>' +
                '</div>'
        );

        used_arr.push( memObj[current] );
        used_arr.push( memObj[current].capitalizeFirstLetter() );
    }
});

$("#submit").click( function() {
    if($('#show_input_accord').children().length>0) {
        alert("make a decision for previous accord!");
        return;
    }
    var sub = document.getElementById("tags").value;

    if ((sub != "") && ( $.inArray(sub, available) != -1) && ( $.inArray(sub, avail_frag) == -1) &&( $.inArray(sub, used_arr) == -1 )) {

        getPhoto(sub);

        $("#show_input_accord").append(
                '<div class="single_note_container full_width" style="margin-top: 20px;">' +
                '<a href="#" class="single_note_element portlet-header">' +
                '<img src=' + image  + ' alt="...">' +
                '<div class="caption">'+
                '<h3>'+ sub +'</h3>' +
                '</div>' +
                '</a>' +
                '</div>'+
                '<div id="loha_button_wrapper">'+
                '<span class="love_button" id="call-to-action-button">'+
                '<a href="#">'+
                'love' +
                '</a>'+
                '</span>'+
                '<span class="hate_button" id="call-to-action-button">'+
                '<a href="#">'+
                'hate' +
                '</a>'+
                '</span>'+
                '</div>'+
                '<div style="clear:both;">'+
                '</div>'
        );

        //used_arr.push(sub);
    }
    $('.love_button').on("click",function(){
           $("#defaultNotes").prepend(
                '<div class="single_note_container" id="' + sub + 'rev" style="margin-top: 20px;">' +
                '<a href="#" id="' + sub +'" class="single_note_element portlet-header">' +
                '<img src=' + image  + ' alt="...">' +
                '<div class="caption">'+
                '<h4 style="margin-bottom: 0px;">'+ sub +'</h4>' +
                '</div>' +
                '</a>' +
                '<a href="#" id="delete">' +
                "Remove" +
                '</a>' +
                '</div>'
        );
        $("#show_input_accord").empty();
        $("#tags").val('');
          used_arr.push(sub);
    });
    $('.hate_button').on("click",function(){
           $("#hateNotes").prepend(
                '<div class="single_note_container" id="' + sub + 'rev" style="margin-top: 20px;">' +
                '<a href="#" id="' + sub +'" class="single_note_element portlet-header">' +
                '<img src=' + image  + ' alt="...">' +
                '<div class="caption">'+
                '<h4 style="margin-bottom: 0px;">'+ sub +'</h4>' +
                '</div>' +
                '</a>' +
                '<a href="#" id="delete">' +
                "Remove" +
                '</a>' +
                '</div>'
        );
        $("#show_input_accord").empty();
        $("#tags").val('');
          used_arr.push(sub);
    });

    if ((sub != "") && ( $.inArray(sub, used_arr) == -1 )) {
        $('#delete').on( "click", function() {
            var rev = $(this).parent().attr("id");
            var st = String( "#" + rev );
            $(st).remove();
            //need a function here to delete the deleted element in used_arr
        });
    };

});

//multiple search operations then click love/hate button can cause a bug


