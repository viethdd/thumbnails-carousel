$(document).ready(function(){ 
//carousel variables
var photoList       = $('.big-img')
,   imgWidth        = photoList.width()
,   photoLength     = photoList.length
,   photoWrapper    = $('.big-img-wrapper')
,   currentLocation = 1
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




// $('.text').html(currentLocation);

function highlightThumbnail(currentLocation){
  $('.thumbnail:nth-child('+(currentLocation)+')').addClass('thumbnail-active');
  $('.thumbnail:not(:nth-child('+(currentLocation)+'))').removeClass('thumbnail-active');
}

// function thnailBorderMove(currentLocation){
//   tnDistance = currentLocation * 110;
//   // text.html("distance: " + (tnDistance));
//   $('.thumbnail-border-fx').css('transform','translateX('+tnDistance+'px)');
// }

//prev click event
$('#prev').on("click",function(){
    currentLocation--;
    if (currentLocation > 1 && currentLocation < photoLength) {      
      slideShow(currentLocation-1);
      highlightThumbnail(currentLocation);      
      $('.text').html(currentLocation); 
    }
    else if (currentLocation = 1){
      slideShow(currentLocation-1);
      highlightThumbnail(currentLocation);
      $('.text').html(currentLocation);
    }

    else if (currentLocation = photoLength-1){
     currentLocation = photoLength+1;
     $('.text').html(currentLocation);
    }
});

//next click event
$('#next').on("click",function(){
    currentLocation++; 
    $('.thumbnail').not($('#t-n['+(currentLocation)+']')).removeClass('thumbnail-active');
    $('.text').html(currentLocation);
    if (currentLocation > 1 && currentLocation <= photoLength) {
      slideShow(currentLocation-1);
      highlightThumbnail(currentLocation);
      $('.text').html(currentLocation);  
    }
});

//thumbnail CLICK event
$('.thumbnail').each(function(currentLocation){

  $(this).on("mouseenter",function(){
       $(this).addClass('thumbnail-active');
  });

  $(this).on("mouseleave",function(){
    $(this).removeClass('thumbnail-active');
  });

  $(this).on("click",function(currentLocation){
    currentLocation = parseInt($(this).attr('id').replace("t-n[","").replace(']',''));
    $('.text').html(currentLocation);

    $('#prev').on("click",function(){
      currentLocation--;
      if (currentLocation >= 1 && currentLocation < photoLength) {
        slideShow(currentLocation);
        highlightThumbnail(currentLocation+1);
        $()
        $('.text').html(currentLocation); 
      }
      else if (currentLocation = 1){
        slideShow(currentLocation);
        highlightThumbnail(currentLocation);
        $('.text').html(currentLocation);
      }

    });

//next click event
    $('#next').on("click",function(){
      currentLocation++; 
      $('.thumbnail').not($(this)).removeClass('thumbnail-acti
      if (currentLocation >= 0 && currentLocation < photoLength) {
        slideShow(currentLocation-1);
        highlightThumbnail(currentLocation);    
      }
      else if (currentLocation = photoLength-1){
        slideShow(currentLocation);
        highlightThumbnail(currentLocation+1);
      }
    }); 

    $('.thumbnail').not($(this)).removeClass('thumbnail-active');
    
    slideShow(currentLocation-1);
    highlightThumbnail(currentLocation);  
    $(this).on("mouseout",function(currentLocation){
      $(this).trigger("mouseenter");
    });


  

});

});


//thumbnail maker
});





