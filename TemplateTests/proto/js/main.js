var accords_obj = [];

var available = [];
var avail_frag = [];

var div_count = 0;
var div_count_before = 0;
var frag = [];

image = '';

used_arr = [];
used_frag_arr = [];


$.getJSON('accords.json', function(data) {
    accords_obj = data;
});

$.getJSON('lihan_json_test.json', function(data){
    data.forEach(function (d) {
        var tem_store_name = d.name.split("/")[1].split("-");

        tem_store_name.splice(tem_store_name.length-1,1);

        var x = tem_store_name[0];

        for(i = 1; i < tem_store_name.length; i++) {
            x = x + " " + tem_store_name[i];
        }

        avail_frag.push(x);

        var tem_store_accords = d.accords;

        var array_for_clean_accords = [];

        for(j=0;j<tem_store_accords.length;j++) {
            array_for_clean_accords.push(tem_store_accords[j].split(":")[0]); //for real page we only show 4 accords so change it later
        }

        var scent_brand = d.brand;
        var single_scent_information = {
            name: x,
            accords: array_for_clean_accords,
            brand: scent_brand
        };

        frag.push(single_scent_information);
    });
});

$(function() {
    for (i = 0; i < accords_obj.length; i++) {
        available.push(accords_obj[i].name);
    }
    for (k = 0; k < frag.length; k++) {
        // avail_frag.push(frag[k].name);
        available.push(frag[k].name);
    }
});

$(function() {
    $( "#tags" ).autocomplete({
        source: avail_frag
    });
});

getPhoto = function(n) {
    for(var i=0 ; i < accords_obj.length; i++) {
        if(accords_obj[i].name == n) {
            image = accords_obj[i].source_link;
        }
    }
}

getScents = function(n,a) {
    for (var i = 0; i < frag.length; i++) {

        if ( frag[i].name == n ) {

            var l = frag[i].accords;

            for (q = 0; q < l.length; q++) {

                var temp_name = l[q];

                getPhoto(temp_name);
                $("#scent_number_"+a+"").append(
                        '<div class="single_accord" id="' + temp_name + 'rev" style="margin-top: 20px;">' +
                        '<a href="#" id="' + temp_name +'">' +
                        '<img src=' + image  + ' alt="...">' +
                        '<h3 class="name_of_accord">'+ temp_name +'</h3>' +
                        '</div>'
                        );

                if(q==l.length-1||q==3) {
                    $("#scent_number_"+a+"").append(
                            '<div style="clear:both">'+'</div>'
                            );
                }

                used_arr.push(l[q], image);
                    if(q==3) {
                        break;
                    }
           }
            //break;
        }
    }
}

$("#submit").click( function() {

    var sub = document.getElementById("tags").value;
    $('#tags').val('');

    if ((sub != "") && ( $.inArray(sub, avail_frag) != -1) && ( $.inArray(sub, used_frag_arr) == -1 )) {
        if(div_count>0) {
            $("#single_scent_wrap_"+div_count_before+"").before(
                '<div class="single_scent_wrap" id="single_scent_wrap_'+div_count+'">' +
                '<h2>'+ sub + " has:" +'</h2>'+
                '<div class="four_accords_row" id="scent_number_'+div_count+'">' +
                '</div>'+
                '</div>'
                );
        }
        else {
        $("#defaultFrag").append(
                '<div class="single_scent_wrap" id="single_scent_wrap_'+div_count+'">' +
                '<h2>'+ sub + " has:" +'</h2>'+
                '<div class="four_accords_row" id="scent_number_'+div_count+'">' +
                '</div>'+
                '</div>'
                );
         };
        getScents(sub,div_count);

        div_count++;
        div_count_before = div_count -1;

        for(var b=0;b<used_arr.length;b=b+2){
            var tem_value = used_arr[b];
            for(var a =b+2 ;a<used_arr.length;a=a+2) {
                
                if(used_arr[a]==tem_value) {
                delete used_arr[a];
                delete used_arr[a+1];
            };
          };
      }
       var length_before_change = used_arr.length;
       for(var p=0;p<length_before_change;p++) {
         if(used_arr[p]!= undefined) {
            used_arr.push(used_arr[p]);
         }
       }
       used_arr.splice(0,length_before_change); //delete duplicates in used_arr ->show unique accord in step 3

       

        localStorage.setItem('this', JSON.stringify(used_arr));

        used_frag_arr.push(sub);

    }
});

