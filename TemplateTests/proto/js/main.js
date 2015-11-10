var accords_obj = [];

var available = [];
var avail_frag = [];

var div_count = 0;
var div_count_before = 0;
var frag = [];

image = '';

used_arr = [];
used_frag_arr = [];

jQuery.getJSON('https://scenttrunk.com/wp-content/plugins/scenttrunk_inventory/scripts/scent_accords.json', function(data) {
    accords_obj = data;
});

jQuery.getJSON('https://scenttrunk.com/wp-content/plugins/scenttrunk_inventory/scripts/fragrances.json', function(data){
    data.forEach(function (d) {
        var tem_store_name = d.name.split("-")[1];
        tem_store_name = tem_store_name.slice(1,tem_store_name.length);//delete first char which is white space
        
        var x = tem_store_name;

        var scent_brand = d.name.split("-")[0];
        scent_brand = scent_brand.slice(0,scent_brand.length - 1);//delete last char which is white space
        var name_with_brand = x + " by " + scent_brand;
        avail_frag.push(name_with_brand);

        var tem_store_accords = d.accords;

        var array_for_clean_accords = [];

        for(j=0;j<tem_store_accords.length;j++) {
            array_for_clean_accords.push(tem_store_accords[j]); //for real page we only show 4 accords so change it later
        }

        var single_scent_information = {
            name: x,
            accords: array_for_clean_accords,
            brand: scent_brand
        };
        frag.push(single_scent_information);
    });
});

jQuery(function() {
    for (i = 0; i < accords_obj.length; i++) {
        available.push(accords_obj[i].name);
    }
    for (k = 0; k < frag.length; k++) {
        // avail_frag.push(frag[k].name);
        available.push(frag[k].name);
    }
});

jQuery(function() {
    jQuery("#tags").autocomplete({
         minLength: 3
    });
    jQuery( "#tags" ).autocomplete({
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

getScents = function(n,b,a) {
    for (var i = 0; i < frag.length; i++) {

        if ( frag[i].name == n && frag[i].brand == b) {

            var l = frag[i].accords;

            for (q = 0; q < l.length; q++) {

                var temp_name = l[q];

                getPhoto(temp_name);
                jQuery("#scent_number_"+a+"").append(
                        '<div class="single_accord" id="' + temp_name + 'rev" style="margin-top: 20px;">' +
                        '<a href="#" id="' + temp_name +'">' +
                        '<img src=' + image  + ' alt="...">' +
                        '<h3 class="name_of_accord">'+ temp_name +'</h3>' +
                        '</div>'
                        );

                if(q==l.length-1||q==3) {
                    jQuery("#scent_number_"+a+"").append(
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

jQuery("#submit").click( function() {

    var sub = document.getElementById("tags").value;
    jQuery('#tags').val('');
    var input_scent_name = sub.split("by")[0];
    input_scent_name = input_scent_name.slice(0, input_scent_name.length - 1);//delete last char which is white spice
    var input_scent_brand = sub.split("by")[1];
    input_scent_brand = input_scent_brand.slice(1, input_scent_brand.length);//delete first char which is white spice

    if ((sub != "") && ( jQuery.inArray(sub, avail_frag) != -1) && ( jQuery.inArray(sub, used_frag_arr) == -1 )) {
        if(div_count>0) {
            jQuery("#single_scent_wrap_"+div_count_before+"").before(
                '<div class="single_scent_wrap" id="single_scent_wrap_'+div_count+'">' +
                '<h2>'+ sub + " has:" +'</h2>'+
                '<div class="four_accords_row" id="scent_number_'+div_count+'">' +
                '</div>'+
                '</div>'
                );
        }
        else {
        jQuery("#defaultFrag").append(
                '<div class="single_scent_wrap" id="single_scent_wrap_'+div_count+'">' +
                '<h2>'+ sub + " has:" +'</h2>'+
                '<div class="four_accords_row" id="scent_number_'+div_count+'">' +
                '</div>'+
                '</div>'
                );
         };
        getScents(input_scent_name,input_scent_brand,div_count);

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

