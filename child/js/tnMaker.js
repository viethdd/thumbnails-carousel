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
for (i=1; i<=photoLength; i++){
    $('.thumbnail-wrapper').append("<img class='thumbnail'>");
}
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

//CREATE: thumbnail maker
//GET src from .big-img and save to array 
var myArray=[];
$("[id^=t-n]").each(function(){
  myArray.push(this);   
});
//GET img src
var imgArray = [];
$('.big-img').each(function(i){
  imgArray.push($(this).attr('src'));
});
//SET
$('.thumbnail').each(function(i){
  $(this).attr('src',imgArray[i]);
});
//END thumbnail maker

//create slideShow function
function slideShow(currentLocation){
  distance = Math.round(parseInt(currentLocation * (sWidth/photoLength)))-2*currentLocation;
  photoWrapper.css('transform','translateX(-'+ (distance) +'px)');
};

//create highlight Thumbnail function
function highlightThumbnail(currentLocation){
  $('.thumbnail:eq('+(currentLocation-1)+')').addClass('thumbnail-active');
  $('.thumbnail:not(:eq('+(currentLocation-1)+'))').removeClass('thumbnail-active');
}

if (currentLocation == 1) {
  $('#prev').css('opacity','0');
}
if (currentLocation > 1) {
  $('#prev').css('opacity','1'); 
}
// currentLocation = 1;
// prev click event
$('#prev').on("click",function(){
  currentLocation--;
  if (currentLocation <= 1) {
    $('#prev').css('opacity','0');
  }
  if (currentLocation >= photoLength) {
    $('#next').css('opacity','0');
  }
  else if (currentLocation < photoLength) {
    $('#next').css('opacity','1');
  }

  if (currentLocation >= 1 && currentLocation <= photoLength) {      
    slideShow(currentLocation-1);
    highlightThumbnail(currentLocation);      
    $('.text').html(currentLocation); 
    if (currentLocation <= 8){
      $('.thumbnail-wrapper').css("left","0");
      $('#prev').css('opacity','1');
    } 
  }
  else if (currentLocation < 0){
    slideShow(0);
    highlightThumbnail(1);
    currentLocation = 2;
  }
});

//next click event
$('#next').on("click",function(){
  
  currentLocation++;   
  if (currentLocation == 1) {
    $('#prev').css('opacity','0');
  }
  else if (currentLocation < photoLength){
  $('#prev').css('opacity','1');
  }

  if (currentLocation >= photoLength) {
    $('#next').css('opacity','0');
  }
  else if (currentLocation < photoLength) {
    $('#next').css('opacity','1');
  }

  $('.thumbnail').not($('#t-n['+(currentLocation)+']'))
                 .removeClass('thumbnail-active');
  $('.text').html(currentLocation);
  if (currentLocation > 8){
      $('.thumbnail-wrapper').css('left','-850px');
  }
    
  if (currentLocation >= 1 && currentLocation <= photoLength){
    slideShow(currentLocation-1);
    highlightThumbnail(currentLocation); 
    // $('.text').html(currentLocation);  
  }
  else if (currentLocation >= photoLength){
    slideShow(photoLength-1);
    highlightThumbnail(photoLength);
    currentLocation = photoLength;
  }

});

//thumbnail CLICK event
$('.thumbnail').each(function(currentLocation){
  
  $(this).on("mouseover",function(){
    $(this).addClass('thumbnail-active');
    $(this).on("mouseout",function(){
      $(this).removeClass('thumbnail-active');
    });
  });

// click Function
  $(this).on("click",function(currentLocation){ 
    
    if ($('.thumbnail:eq(9)').hasClass('thumbnail-active')){
      $('.thumbnail-wrapper').css('left','-850px');      
    }

    currentLocation = $(this).attr('id').replace("t-n[","").replace(']','');
    $('.text').html(currentLocation);
    if (currentLocation == 8){
      $('.thumbnail-wrapper').css('left','0');
    }
    
    //prev click event
    $('#prev').on("click",function(){

      $('.thumbnail').on("mouseover",function(){
        $(this).removeClass('thumbnail-active');
      });

      currentLocation--;
      $('.thumbnail').not($(this))
                     .removeClass('thumbnail-active');
      $('.text').html(currentLocation); 
      if (currentLocation >= 1 && currentLocation <= photoLength) {
        slideShow(currentLocation-1);
        highlightThumbnail(currentLocation);    
      }
      else if (currentLocation == 0){
        slideShow(0);
        highlightThumbnail(1);
        currentLocation = 1;
      }
    });

    //next click event
    $('#next').on("click",function(){
      currentLocation++; 
      $('.thumbnail').not($(this))
                     .removeClass('thumbnail-active');
      $('.thumbnail').on("mouseover",function(){
        $(this).removeClass('thumbnail-active');
      });  
      if (currentLocation > 8){
        $('.thumbnail-wrapper').css('left','-850px');
      }
      if (currentLocation >= 1 && currentLocation <= photoLength) {        
        slideShow(currentLocation-1);
        highlightThumbnail(currentLocation);    
      }
      else if (currentLocation > photoLength){
        slideShow(photoLength-1);
        highlightThumbnail(photoLength);
        currentLocation = photoLength-1;
      }
      else if (currentLocation == photoLength){
        slideShow(photoLength);
        highlightThumbnail(photoLength-1);
        currentLocation = photoLength-1;
      }
    }); 

    // execute the functions and disable thumbnail-active class
    $('.thumbnail').not($(this)).removeClass('thumbnail-active');
    slideShow(currentLocation-1);
    highlightThumbnail(currentLocation);  
    $(this).on("mouseleave",function(currentLocation){
      $(this).trigger("mouseenter");
    });

  }); // end click Function

});


//thumbnail maker
});





