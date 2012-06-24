/*
 * 	 imProgressBar 
 * 	 @author Les Green
 * 	 Copyright (C) 2010 Intriguing Minds, Inc.
 *   Version 0.5
 * 
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.

 *   Demo and Documentation can be found at:   
 *   http://www.grasshopperpebbles.com
 *   
 */

;(function($) {
	$.fn.extend({
        imProgressBar: function(options) { 
        	opts = $.extend({}, $.imProgBar.defaults, options);
			return this.each(function() {
				new $.imProgBar(this, opts);
			});
        }
    });	

$.imProgBar = function(obj, opts) {
	var $this = $(obj);
	var increment_amt = 0;
	var imProgbrdrWidth = 0;
	var prog_bar_width = 0;
	var reSizeOrigW = 0;
	var reSizeOrigH = 0;
	
	$(window).bind('startProgress', function(e, total_count) { 
		startProgressBar(total_count);
	});
	$(window).bind('updateProgress', function(e) { 
		updateProgressBar();
	}); 
	createProgressBar();
	
	function createProgressBar() {
		
		/*$this.prepend(
			$('<div></div>').attr('id', opts.progress_bar.container).css('display', 'none').append(
				$('<div></div>').attr('class', opts.progress_bar.bar_back_class).append(
					$('<div></div>').attr('class', opts.progress_bar.bar_class).css('width', '0px'))));*/
		var pBar = $('<div></div>').attr('id', opts.progress_bar.container).css('display', 'none').append(
				$('<div></div>').attr('class', opts.progress_bar.bar_back_class).append(
						$('<div></div>').attr('class', opts.progress_bar.bar_class).css('width', '0px')));
		if (opts.display.type == 'inline') {
			if (opts.display.insert_type == 'prepend') {
				$this.prepend($(pBar));
			} else if (opts.display.insert_type == 'append') {
				$this.append($(pBar));
			} else if (opts.display.insert_type == 'before') {
				$(pBar).insertBefore($(opts.display.element));
			} else if (opts.display.insert_type == 'after') {
				$(pBar).insertAfter($(opts.display.element));
			}	
		} else if (opts.display.type == 'popup') {
			$(document.body).append($(pBar));
			var pW = parseInt($('#'+opts.progress_bar.container).css('width'));
			var mL = (-pW/2)+'px';
			var pT = (opts.display.top) ? parseInt(opts.display.top) : '20';
			$('#'+opts.progress_bar.container).css({position: 'absolute', left: '50%', marginLeft: mL, top: pT+'px', zIndex: 99});
		}	
	};
	
	function startProgressBar(total_count) {
		if (opts.re_size) {
			var pW = $('#'+opts.progress_bar.container).css('width');
			var pH = $('#'+opts.progress_bar.container).css('height');
			$('#'+opts.progress_bar.container).css({width: '0px', height: '0px'});
			$('#'+opts.progress_bar.container).animate({
				width: pW,
				height: pH
			}, 1500, 'linear');
			//$(opts.re_size.id).css('overflow', 'auto');
			if (opts.re_size.type == 'width') {
				reSizeOrigH = $(opts.re_size.id).css('height');
				$(opts.re_size.id).animate({
					height: opts.re_size.value
				}, 1500, 'linear');
			} else {
				reSizeOrigW = $(opts.re_size.id).css('width');
				$(opts.re_size.id).animate({
					width: opts.re_size.value
				}, 1500, 'linear');
			}	
		} else {
			/*$('#'+opts.progress_bar.container).animate({
				width: pW,
				height: pH
			}, 1000, 'linear');*/
			$('#'+opts.progress_bar.container).css('display', 'block');
		}	
		//$(opts.progress_bar.container).css('display', 'block');
		imProgbrdrWidth = parseInt($('.'+opts.progress_bar.bar_back_class).css('width'));
		increment_amt = imProgbrdrWidth/total_count;
	};	
	
	function updateProgressBar() {
		prog_bar_width = prog_bar_width + increment_amt;
		$('.'+opts.progress_bar.bar_class, '#'+opts.progress_bar.container).animate({
			width: prog_bar_width+ 'px'
		}, opts.animate_duration, opts.animate_easing, function() {
			if (prog_bar_width >= imProgbrdrWidth) {
				increment_amt = 0;
				prog_bar_width = 0;
				$('.'+opts.progress_bar.bar_class).css('width', increment_amt+ 'px');
				$('#'+opts.progress_bar.container).css('display', 'none');
				if (opts.re_size) {
					if (opts.re_size.type == 'width') {
						$(opts.re_size.id).css('height', reSizeOrigH);
					} else {
						$(opts.re_size.id).css('width', reSizeOrigW);
					}
				}
			}	
		});
		//$('.'+opts.progress_bar.bar_class).css('width', prog_bar_width+ 'px');
	};	
		
};

$.imProgBar.defaults = {
	progress_bar: '', //{'container': '', 'bar_back_class' : '', 'bar_class': ''}
	display: {'type': 'inline', 'insert_type': 'prepend'},//append
	//display: {'type': 'inline', 'insert_type': 'after', 'element': '.whatever'}, //before
	//display: {'type': 'popup', 'top': '20px'},
	re_size: '',//{'id': '#googeMaps', 'type': 'height', 'value' : ''}//autoscroll when container changes size
	animate_duration: '100',
	animate_easing: 'linear' //swing
};

})(jQuery);		   