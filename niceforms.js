// nice labels
function nlabel() {
	var f = $(this);
	if(f.val().length > 0) {
		// show label
		if(f.prev('label').length == 0) {
			var l = $('<label/>')
						.text(f.attr('placeholder'))
						.addClass('label');
			f.before(l);
		}
	} else {
		// hide label
		f.prev('label').remove();
	}
}