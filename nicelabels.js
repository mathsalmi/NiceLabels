(function($) {

	/**
	 * Nicelabels jQuery plugin.
	 * @param  {object} options object of action functions (hide and show).
	 * @return jQuery         jQuery elements (chaining)
	 */
	$.fn.nicelabels = function(options) {

		/**
		 * Default actions mapping
		 * @type {object}
		 */
		var defaultOptions = {
			hide: function($label) { $label.addClass('hide') },
			show: function($label) { $label.removeClass('hide') }
		};

		/**
		 * Mapping actions.
		 * It merges user mapping with default mapping.
		 * @type {object}
		 */
		var Actions = $.extend(defaultOptions, options);
		

		/**
		 * Creates a label element
		 * @param  {string} text label's text
		 * @return {jQuery}      the label
		 */
		function createLabel(text) {
			var $label = $('<label />');
				$label.text(text);

			return $label;
		}

		/**
		 * Given a field return its label
		 * @param  {jQuery} $field the field
		 * @return {jQuery}        the label
		 * @return {NULL}        if no jQuery label was found
		 */
		function getLabel($field) {
			var $label = $field.data('label');
			if($label instanceof jQuery) {
				return $label;
			}
			return null;
		}

		/**
		 * Hide or shows the label
		 * @param  {jQuery} $field the field
		 */
		function toggleLabel($field) {
			$label = getLabel($field);
			if($field.val().length > 0) {
				Actions.show($label);
			} else {
				Actions.hide($label);
			}
		}

		// executes of all elements found in this selector
		return this.each(function() {
			var $field = $(this);
			var $label = getLabel($field);

			// creates the label
			if($label == null) {
				$label = createLabel($field.attr('placeholder'));
				$field.data('label', $label)
					.before($label);

				Actions.hide($label);
			}

			function fireEvent() {
				toggleLabel($field);
			}

			// set the behavior to some events
			$field.focus(fireEvent).blur(fireEvent).keyup(fireEvent);
		});
	}
}(jQuery));