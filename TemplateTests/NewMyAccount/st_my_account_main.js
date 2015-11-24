var available_notes = [],
    notes_names = undefined,
    image_url = '',
    input_note_name = '',
    used_notes_array = [];

jQuery.getJSON( 'https://scenttrunk.com/wp-content/plugins/scenttrunk_inventory/scripts/scent_list.json', function( data ) {
  notes_names = data;

  var n = [ notes_names.woods_obj, notes_names.oriental_obj, notes_names.fresh_obj, notes_names.floral_obj ];
  for ( var i = 0; i < n.length; i += 1 ) {
    for ( var j = 0; j < n[i].length; j += 1 ) {
      available_notes.push( n[i][j].name );
    }
  }
});

jQuery(function() {
  jQuery( '#ma_dialog_tags' ).autocomplete({
    source: available_notes
  });
});

var getPhotoUrl = function( k ) {
  var n = [ notes_names.woods_obj, notes_names.oriental_obj, notes_names.fresh_obj, notes_names.floral_obj ];
  for ( var i = 0; i < n.length; i += 1 ) {
    for ( var j = 0; j < n[i].length; j += 1 ) {
      if ( n[i][j].name == k ) {
        image_url = n[i][j].source_link;
      }
    }
  }
};

jQuery( '#ma_search_submit' ).click( function(){
      input_note_name = document.getElementById( 'ma_dialog_tags' ).value;
      if ( ( input_note_name != '' ) &&
      ( jQuery.inArray( input_note_name, available_notes ) != -1 ) &&
      ( jQuery.inArray( input_note_name, used_notes_array ) == -1 ) ) {

        getPhotoUrl( input_note_name );
        jQuery( '.ma_show_input_note' ).append(
          '<div class="ma_search_result">' +
          '<img src="'+image_url+'">' +
          '</div>'
          );
      }
});

function addNotes() {
      jQuery( this ).dialog( "close" );
};
var dialog_window = jQuery( "#dialog-confirm" ).dialog({
      draggable: false,
      resizable: false,
      minHeight: 140,
      modal: true,
      close: function (event, ui) {
            jQuery( this ).find('input').val('');
            jQuery( this ).find('.ma_search_result').remove();
        },
      buttons: {
        "Add": addNotes,
        Cancel: function() {
          jQuery( this ).dialog( "close" );
        }
      }
    });
jQuery(document).on('click', '.ma_add_notes_button', function(){
    dialog_window.dialog("open");
})