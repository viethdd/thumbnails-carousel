$(document).ready(function(){
  
//carousel controller
var photoList       = $('.big-img')
,   imgWidth        = photoList.width()
,   photoLength     = photoList.length
,   photoWrapper    = $('.big-img-wrapper')
,   currentLocation = 0
,   text            = $('.text')
,   mr              = parseInt($('.big-img').css('margin-right').replace("px",''))
,   ml              = parseInt($('.big-img').css('margin-left').replace("px",''))
,   sWidth          =(imgWidth+mr+ml)*photoLength + (6.25*photoLength)
,   slideshowWidth  = $('.big-img-wrapper').css('width', sWidth)
,   thumbnailBorder = $('.thumbnail-border-fx')
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
$('.thumbnail:nth-child(1)').addClass('thumbnail-active');

//add: keyboard pressing down event
$('body').keydown(function(e) {
      if(e.which == 37) { // left     
          $("#prev").trigger("click");
      }
      else if(e.which == 39) { // right     
          $("#next").trigger("click");
      }
}); //end: keyboard pressing down event  

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


//prev click event

// $('.text').html(currentLocation);

function highlightThumbnail(currentLocation){
  $('.thumbnail:nth-child('+(currentLocation-1)+')').addClass('thumbnail-active');
  $('.thumbnail:not(:nth-child('+(currentLocation-1)+'))').removeClass('thumbnail-active');
}

// function thnailBorderMove(currentLocation){
//   tnDistance = currentLocation * 110;
//   // text.html("distance: " + (tnDistance));
//   $('.thumbnail-border-fx').css('transform','translateX('+tnDistance+'px)');
// }

//thumbnail hover effect . change opacity

function abc(){
  
$('.thumbnail').each(function(){
  
  $(this).on("mouseenter",function(){
    // mouseThumbnailSelection = parseInt($(this).attr('id').replace("t-n[","").replace(']',''));
       $(this).css({'opacity':'1', 'transform':'scale(1.1)','box-shadow':'0 0 4px 1px gray'}); 
      // alert(mouseThumbnailSelection);
  });

  // $(this).on("mouseout",function(){
    // mouseThumbnailSelection = parseInt($(this).attr('id').replace("t-n[","").replace(']',''));
    // if(mouseThumbnailSelection == (currentLocation+1)){
      // $(this).addClass('thumbnail-active');
      // $('.text').html(mouseThumbnailSelection);
    // }
    // else{
      // $.not($(this)).removeClass('thumbnail-active');
      // $.not($(this)).css('opacity','.5');
       // $(this).css({'opacity':'.5', 'transform':'scale(1)'}); 
    // }
  // });
});  
}
// $('.thumbnail').each(function(){
//   $(this).on("mouseover",function(){
//       $(this).css('opacity','1');
//   });
//   $(this).on("mouseleave",function(){
//     $(this).css('opacity','.5');
//   });
// });

$('#prev').on("click",function(){
    currentLocation--;
    
    if (currentLocation >= 0 && currentLocation < photoLength) {
        // slideShow(currentLocation);
        slideShow(currentLocation);
        highlightThumbnail(currentLocation+1);
        // $('.text').html(currentLocation);
        // thnailBorderMove(currentLocation);  
        $('.text').html(currentLocation); 
    }
    else if (currentLocation = 0){
      slideShow(currentLocation);
      highlightThumbnail(currentLocation-1);
      $('.text').html(currentLocation);
    }
});

//next click event
$('#next').on("click",function(){
    currentLocation++; 
    // $('#t-n['+(currentLocation+1)+']').addClass('thumbnail-active');
    $('.thumbnail').not($('#t-n['+(currentLocation-1)+']')).removeClass('thumbnail-active');
    $('.text').html(currentLocation);
    if (currentLocation >= 0 && currentLocation < photoLength) {
        // $('.thumbnail').trigger('click');
        slideShow(currentLocation);
        highlightThumbnail(currentLocation);
        // thnailBorderMove(currentLocation);  
    }
    else if (currentLocation = photoLength-1){
      slideShow(currentLocation);
      highlightThumbnail(currentLocation+1);
    }
});

//thumbnail clicking event
$('.thumbnail').each(function(currentLocation){

  $(this).on("mouseenter",function(){
       $(this).css({'opacity':'1', 'transform':'scale(1.1)','box-shadow':'0 0 4px 1px gray'}); 
  });

  $(this).on("mouseleave",function(){
    $(this).css({'opacity':'.5','transform':'scale(1)','-webkit-shadow':'0'});
  });

  $(this).on("click",function(currentLocation){
  currentLocation = parseInt($(this).attr('id').replace("t-n[","").replace(']',''));
  

  $(this).css('opacity','1');
  $('.thumbnail').not($(this)).css({'opacity':'.5','transform':'scale(1)','-webkit-shadow':'0'});
    
  slideShow(currentLocation-1);
  highlightThumbnail(currentLocation-1);
  // thnailBorderMove(mouseThumbnailSelection-1);
  // currentLocation = mouseThumbnailSelection;
  $('.text').html(currentLocation-1);  
  $(this).on("mouseout",function(currentLocation){
    $(this).trigger("mouseenter");
  });


  $('#prev').on("click",function(){
    currentLocation--;
    
    if (currentLocation >= 0 && currentLocation < photoLength) {
        slideShow(currentLocation);
        highlightThumbnail(currentLocation+1);
        $('.text').html(currentLocation); 
    }
    else if (currentLocation = 0){
      slideShow(currentLocation);
      highlightThumbnail(currentLocation-1);
      $('.text').html(currentLocation);
    }
});

//next click event
$('#next').on("click",function(){
    currentLocation++; 
    
    $('.text').html(currentLocation);
    if (currentLocation >= 0 && currentLocation < photoLength) {
        slideShow(currentLocation-1);
        highlightThumbnail(currentLocation+1);    
    }
    else if (currentLocation = photoLength-1){
      slideShow(currentLocation);
      highlightThumbnail(currentLocation+1);
    }
});

});

});


//thumbnail maker
});





