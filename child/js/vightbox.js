$(document).ready(function(){
	
	$('.small-img').on("click",function(e){
		// $( '.vb-img-frame').slideUp( 300 ).delay( 800 ).fadeIn( 400 );
		$( '.vb-img-active').slideDown(500).delay(800);
		$('.blackout').toggleClass('blackout-active');
		$('.vb-img-frame').css('display','block');
		$('.vb-img-active').css({'background-img': $(e.target).css('background-image'),"width": '97%',"height": "80%","top": "2.5%","left": "1.5%"});
		$('.vb-img').css('cursor','default');
	});

	$('.blackout').on('click',function(e){
		closeBlackout();
	});

	$('.thumbnail-img').each(function(){
		$(this).mouseover(function(){
			$(this).css('box-shadow','0 0 15px white');
		});
		$(this).mouseleave(function(){
			$(this).css('box-shadow','none');
		});
	});

	$('.close-btn').mouseover(function(){
		$(this).attr('src','child/img/elements/closeBtn-hover.png');
	});
	$('.close-btn').mouseleave(function(){
		$(this).attr('src','child/img/elements/closeBtn.png');
	});

	$('.close-btn').on('click',function(){
		closeBlackout();
	});

	function closeBlackout(){
		$('.blackout').removeClass('blackout-active');
		$('.vb-img').removeClass('vb-img-active');
		$('.vb-img-frame').css('display','none');
	}

	
	$('.thumbnail-img').on("click",function(e){
		$('.vb-img-active').css({'background-img': $(e.target).css('background-image'),"width": '97%',"height": "80%","top": "2.5%","left": "1.5%"});
		$('.vb-img-active').attr("src",$(e.target).attr('src'));
		$(this).addClass('thumbnail-img-selected');
		$('.thumbnail-img').not($(this)).removeClass('thumbnail-img-selected');
		
	});

	
	// TIP
	function slideTipTo(x){
		$('.tip-left').css('transform','translateX('+ x +'px)');
	}

	$('.thumbnail-img').mouseover(function(){
		var currentLocation = $(this).attr("data-location");
		var textTip = $(this).parent().attr("title");
		
		$(this).after("<div class='tip-left'><p>" + textTip + " " + currentLocation + "</p></div>");

		switch (currentLocation){
			case '1': 
				slideTipTo(18);
				break;
			case '2': 
				slideTipTo(18+132);	
				break;
			case '3': 
				slideTipTo(18+132*2);	
				break;
			case '4': 
				slideTipTo(18+132*3);
				break;		
			case '5': 
				slideTipTo(18+132*4);
				break;
			case '6': 
				slideTipTo(18+132*5);
				break;
			case '7': 
				slideTipTo(18+132*6);
				
				break;
			case '8': 
				slideTipTo(18+132*7);
				break;			

		}
	});

	$('.thumbnail-img').mouseleave(function(){
		$('.tip-left').remove();
		if (currentLocation === 8){
			$('.thumbnail-wrapper').css("transform","translateX(89px)");
		}
	});	
//
var photoList = $('.thumbnail-img')
,   photoLength = photoList.length
,   thumbnailWrapper = $('.thumbnail-wrapper')

;

function slideTip(){
    percent = (currentLocation/photoLength)*100+'%';
    text.html(percent);
    imageContainer.css('transform','translateX(-'+percent+')');
    };


});