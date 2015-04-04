/*
* Plugin name: Redsand Jquery Rating Plugin
* Author: phannhuthan
* Uri: http://redsand.vn
* Version: 1.8
* Modify date: 24/6/2013
*/

/* param
	options = {
        cssClass: '',
		length: 5, 
		step: 1,
		height: 16,
		width: 80,
		maxRates: 1,
		style: 1, // 1 or 2
		change: function(value, rater, star, slide){
			...
		}
	}
*/

(function($){
	$.fn.rsRating = function(value, options){
		
	    if (isNaN(value)) {
	        if (options == undefined) {
	            options = value;
	        }
	    }
	    else {
	        this.val(value);
	        if (options == undefined) {
	            options = this.data('rsRating');
	        }
	    }       

	    options = $.extend({
	        cssClass: '',
			length: 5,
			step: 1,
			height: 16,
			width: 80,
			maxRates: 1,
			change: false,
			style: 1			
		}, options);
		
		this.data('rsRating', options);

		var starw = options.width / options.length;
		var stepw = starw * options.step;
		
		this.each(function(){
		
		    var rater, star, slide, val = $(this).val();

		    if ($(this).is('.rs-rater-hidden')) {
		        rater = $(this).prev();
		        star = rater.find('.rs-rater-star');
		        slide = rater.find('.rs-rater-slide');
		    }
		    else {
		        rater = $('<span class="rs-rater"></span>');

		        star = $('<span class="rs-rater-star"></span>');

		        slide = $('<span class="rs-rater-slide"></span>');

		        rater.append(star).append(slide);
		        $(this).before(rater).hide().addClass('rs-rater-hidden');
		    }

		    rater.addClass(options.cssClass);

			var maxRates = options.maxRates;
			
			rater.height(options.height).width(options.width).css({ display: 'inline-block', position: 'relative'});			
			star.height(options.height).width(starw * val).css({ position: 'absolute'});
			slide.height(options.height).css({ position: 'absolute'});
			
			//star.append(slide);
			
			var left = rater.offset().left;
			
			rater.unbind('mousemove.rs-rater').bind('mousemove.rs-rater', function(event){
				if(maxRates > 0){
					var x = event.pageX - left;
					if(x > 0 ) x = x + stepw - x % stepw;				
					if(x > options.width) x = options.width;
					slide.width(x);
					if(options.style==2) star.hide();
				}
			});
			
			rater.unbind('mouseover.rs-rater').bind('mouseover.rs-rater', function(event){
				if(maxRates > 0){
					var x = event.pageX - left;
					if(x > 0 ) x = x + stepw - x % stepw;				
					if(x > options.width) x = options.width;
					slide.width(x);
					if(options.style==2) star.hide();
				}
			});
			
			rater.unbind('mouseout.rs-rater').bind('mouseout.rs-rater', function (event) {
				if(maxRates == options.maxRates){
					slide.width(0);
				}
				else{
					slide.width(starw * val);
				}
				if(options.style==2) star.show();
			});
			
			rater.unbind('click.rs-rater').bind('click.rs-rater', function(){
				if(maxRates >0){
					val = slide.width() / starw;
					$(this).next().val(val);	
					if(options.style==2) star.width(slide.width());				
					if(options.change) options.change(val, rater, star, slide);
					maxRates--;
				}
			});
		});
		
		return this;
	}
})(jQuery);