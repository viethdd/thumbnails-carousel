$(document).ready(function(){
  
//carousel controller
var photoList       = $('.big-img')
,   imgWidth        = photoList.width()
,   photoLength     = photoList.length
,   photoWrapper    = $('.big-img-wrapper')
,   currentLocation = 0
,   mouseThumbnailSelection = currentLocation 
,   next            = $('#next')
,   prev            = $('#prev')
,   text            = $('.text')
,   mr              = parseInt($('.big-img').css('margin-right').replace("px",''))
,   ml              = parseInt($('.big-img').css('margin-left').replace("px",''))
,   sWidth          =(imgWidth+mr+ml)*photoLength + (6.25*photoLength)
,   slideshowWidth  = $('.big-img-wrapper').css('width', sWidth)
,   thumbnailBorder = $('.thumbnail-border-fx')
,   close           = $('.close')
;

//add: thumbnail area and its elements
$('.big-box').append("<div class='thumbnail-wrapper'></div>");
for (i=1; i<=photoLength;i++){
    $('.thumbnail-wrapper').append("<img class='thumbnail'>");
}
$('.thumbnail-wrapper').append("<div class='thumbnail-border-fx'></div>");
$('.thumbnail').each(function(i){
  $(this).attr('id','t-n['+ (i+1) +']');
});

$('.text').html(mouseThumbnailSelection);

//add: keyboard pressing down event
$('body').keydown(function(e) {
      if (e.which == 37) { // left     
          $("#prev").trigger("click");
      }
      else if (e.which == 39) { // right     
          $("#next").trigger("click");
      }
      else if (e.which == 27){
        close.trigger('click');
      }
}); //end: keyboard pressing down event  

// CLICK close
close.on("click",function(){  
  alert('sup');
}); 

//create: thumbnail maker
//GET src from .big-img
//and save to array 
var myArray=[];
$("[id^=t-n]").each(function(){
  myArray.push(this);   
});

// for (i = 0; i < myArray.length; i++) {
// $('.text').append("<p>"+myArray[i].id+"</p>");
// }

//GET img src
var imgArray = [];
$('.big-img').each(function(i){
  imgArray.push($(this).attr('src'));
});
//SET
$('.thumbnail').each(function(i){
  $(this).attr('src',imgArray[i]);
});

//create slideShow function
function slideShow(currentLocation){
  distance = Math.round(parseInt(currentLocation * (sWidth/photoLength)))-2*currentLocation;
    // text.html("distance: " + (distance)+ ",Location:  " + currentLocation);
    photoWrapper.css('transform','translateX(-'+ (distance) +'px)');
};

$('.thumbnail:nth-child(1)').addClass('thumbnail-active');
//prev click event


function highlightThumbnail(currentLocation){
  $('.thumbnail:nth-child('+(currentLocation+1)+')').css({'opacity':'1','-webkit-transform':'scale(1.1)'});
  $('.thumbnail:not(:nth-child('+(currentLocation+1)+'))').css({'opacity':'.5','-webkit-transform':'scale(1)'});
}

// function thnailBorderMove(currentLocation){
//   tnDistance = currentLocation * 110;
//   // text.html("distance: " + (tnDistance));
//   $('.thumbnail-border-fx').css('transform','translateX('+tnDistance+'px)');
// }

//thumbnail hover effect . change opacity

// function abc(){
  
//   $('.thumbnail').each(function(){
//     $(this).on("mouseover",function(){
//       // mouseThumbnailSelection = parseInt($(this).attr('id').replace("t-n[","").replace(']',''));
//       $(this).addClass('thumbnail-active');
//       $('.thumbnail').not($(this)).data('clicked',false); 
//     });

//     $(this).on("mouseleave",function(){
//       // mouseThumbnailSelection = parseInt($(this).attr('id').replace("t-n[","").replace(']',''));
//       $(this).removeClass('thumbnail-active');
//       // $('.thumbnail').not($(this)).data('clicked',false); 
//     });
      
//   });  
// }


$('#prev').on("click",function(){
    currentLocation--;    
    if (currentLocation >= 0 && currentLocation < photoLength) {
        slideShow(currentLocation);  
        highlightThumbnail(currentLocation);
        // $('.text').html(currentLocation);
        thnailBorderMove(currentLocation);   
    }
    else if (currentLocation = 0){
      slideShow(currentLocation);
    }
});

//next click event
  $('#next').on("click",function(){
    currentLocation++; 
    $('.text').html("m-tn-sl-next: "+ currentLocation);
    // highlightThumbnail(currentLocation);
    if (currentLocation >= 0 && currentLocation < photoLength) {
        slideShow(currentLocation);
        highlightThumbnail(currentLocation);
        // thnailBorderMove(currentLocation);
    }
    else if (currentLocation = photoLength-1){
      slideShow(currentLocation);
      highlightThumbnail(currentLocation);
    }
  });
//thumbnail clicking event
$('.thumbnail').each(function(){
  $(this).on("click",function(){
    $(this).css('opacity','1');
    $('.thumbnail').not($(this)).css('opacity','.5');
    mouseThumbnailSelection = parseInt($(this).attr('id').replace("t-n[","").replace(']',''));
    slideShow(mouseThumbnailSelection-1);
    // thnailBorderMove(mouseThumbnailSelection-1);
    highlightThumbnail(mouseThumbnailSelection-1);
    // $('.text').html($("#t-n["+mouseThumbnailSelection+"]"));
    $('.text').html("m-sl-click: "+mouseThumbnailSelection);
  });

  
}); // END click thumbnail


//thumbnail maker
});





