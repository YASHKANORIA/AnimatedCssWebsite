$(document).ready(function(){
	  timeLine();
	  displayBottle();
});

jQuery(function( $ ){
	
	scrollMarginW = (0.05 * $(window).width());
	scrollMarginH = (0.05 * $(window).height());
	jQuery.easing.def = "linear";

	$().piroBox_ext({
		piro_speed: 700,
		bg_alpha: 0.75,
		piro_scroll: true
	});
	$.easing.elasout = function(x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	};
	$('.localScroll').click(function(){
		$.scrollTo( this.hash, 1500);
		$(this.hash).find('span.message').text( this.title );
		return false;
	});
	
});


var overMenu = false,
	scroll = false,
	maxTime = 10,
	scrollMarginH = 0,
	scrollMarginW = 0,
	scrollVelX = 0,
	scrollVelY = 0,
	maxVel = 25,
	prevX = 0,
	prevY = 0;
$(document).mousemove(function (a) {
	$this = $(window);
	scrollVelX = 0;
	scrollVelY = 0;
	if (a.clientX < scrollMarginW && !wheeling) {
		scrollVelX = -((scrollMarginW - a.clientX) > maxVel ? maxVel : (scrollMarginW - a.clientX));
		prevX = a.clientX;
		scroll = true
	}
	if (a.clientX > ($this.width() - scrollMarginW) && !wheeling) {
		scrollVelX = (a.clientX - ($this.width() - scrollMarginW)) > maxVel ? maxVel : (a.clientX - ($this.width() - scrollMarginW));
		prevX = a.clientX;
		scroll = true
	}
	if (a.clientY < scrollMarginH && !wheeling) {
		scrollVelY = -((scrollMarginH - a.clientY) > maxVel ? maxVel : (scrollMarginH - a.clientY));
		prevY = a.clientY;
		scroll = true
	}
	if (a.clientY > ($this.height() - scrollMarginH) && !wheeling) {
		scrollVelY = (a.clientY - ($this.height() - scrollMarginH)) > maxVel ? maxVel : (a.clientY - ($this.height() - scrollMarginH));
		prevY = a.clientY;
		scroll = true
	}
	if (a.clientX > scrollMarginW && a.clientX < ($this.width() - scrollMarginW) && a.clientY > scrollMarginH && a.clientY < ($this.height() - scrollMarginH)) {
		scroll = false;
		wheeling = false
	}
	gesturesY = parseInt(a.pageY, 10);
	gesturesX = parseInt(a.pageX, 10);
	if (isMouseDown) {
		scroll = false;
		window.scrollBy(startPositionX - gesturesX, startPositionY - gesturesY);
		return false
	}
});
var amt = 10;

function smoothScroll() {
	if (!overMenu && scroll && $(".piro_overlay").is(":hidden")) {
		if ($.browser.webkit) {
			var a = $("body")
		} else {
			var a = $("html")
		}
		window.scrollBy(scrollVelX, scrollVelY)
	}
	if (keys["38"]) {
		window.scrollBy(0, -amt)
	}
	if (keys["40"]) {
		window.scrollBy(0, amt)
	}
	if (keys["37"]) {
		window.scrollBy(-amt, 0)
	}
	if (keys["39"]) {
		window.scrollBy(amt, 0)
	}
	if (keys["38"] && keys["37"]) {
		window.scrollBy(-amt, -amt)
	}
	if (keys["38"] && keys["39"]) {
		window.scrollBy(amt, -amt)
	}
	if (keys["40"] && keys["37"]) {
		window.scrollBy(-amt, amt)
	}
	if (keys["40"] && keys["39"]) {
		window.scrollBy(amt, amt)
	}
}
var timer = window.setInterval(smoothScroll, 30);
$("#menu").hover(function () {
	overMenu = true
}, function () {
	overMenu = false
});
$(document).mouseout(function (a) {
	if (a.relatedTarget == null) {
		scroll = false;
		isMouseDown = false
	}
});
var gesturesY = 0;
var gesturesX = 0;
var startPositionY = 0;
var startPositionX = 0;
var isMouseDown = false;
$(document).mousedown(function (a) {
	if (checkZoom() && a.target.nodeName != "P" && a.target.nodeName != "SPAN" && a.target.nodeName != "IMG" && a.target.nodeName != "A") {
		startPositionY = gesturesY;
		startPositionX = gesturesX;
		isMouseDown = true;
		a.preventDefault()
	}
});
$(document).mouseup(function () {
	isMouseDown = false;
	return false
});
var wheeling = false;
$(document).mousewheel(function (a, b) {
	if (isHorizontal) {
		window.scrollBy(-b * 30, 0);
		a.preventDefault();
		a.stopImmediatePropagation();
		a.stopPropagation()
	} else {
		window.scrollBy(0, -b * 30)
	}
	wheeling = true
});
var zoomRatio = 0;

function checkZoom() {
	zoomRatio = ($(window).width() / $("body").width()).toFixed(3);
	var a = parseInt($("html").css("zoom")).toFixed(3);
	if (a > zoomRatio) {
		return true
	} else {
		return false
	}
}
$(window).keypress(function (a) {
	if ($.browser.webkit && a.which == 122) {
		zoomOut()
	}
});
var isHorizontal = false;
var keys = {};
$(document.documentElement).keydown(function (a) {
	var b = a.which || a.keyCode;
	if (b == 16) {
		isHorizontal = true
	}
	keys[b] = true
});
$(document.documentElement).keyup(function (a) {
	var b = a.which || a.keyCode;
	delete keys[b];
	isHorizontal = false
});

function zoomOut() {
	zoomRatio = ($(window).width() / $("body").width()).toFixed(3);
	var a = parseInt($("html").css("zoom")).toFixed(3);
	if (a > zoomRatio) {
		closeMenu(true, function () {
			$("p").fadeOut(500);
			$("a[class*=mini]").css("cursor", "default");
			$("div.whale").css({
				top: "3135px",
				height: "185px"
			});
			$("a.board,div[class*=round],a.soon-promo,a[class*=sponsor],a.link").hide();
			$("#menu").css({
				zoom: (1 / zoomRatio)
			});
			$("html").animate({
				zoom: zoomRatio
			}, 500, function () {
				$("#menu").animate({
					left: 0
				}, 800, "easeOutBounce")
			})
		})
	} else {
		zoomIn(0, 0)
	}
}
$(document.documentElement).click(function (b) {
	if (b.target.parentElement.id != "menu") {
		if (!checkZoom()) {
			var a = parseInt((b.pageX / zoomRatio) - ($(window).width() / 2));
			var c = parseInt((b.pageY / zoomRatio) - ($(window).height() / 2));
			zoomIn(a, c)
		} else {
			if ($("#menu").width() > 71) {
				closeMenu()
			}
		}
	}
});

function timeLine(){
	$("button:nth-of-type(1)").click(function () {
			$("#logo").css("background-image","url('img/module/logo/coca1.png')").fadeIn("slow");
			$("nav div:nth-of-type(2)").css("margin-left","13px");
	});
	$("button:nth-of-type(1)").hover(function () {
			$("nav div:nth-of-type(1)").css("margin-left","13px");
	});
	
	$("button:nth-of-type(2)").click(function () {
			$("#logo").css("background-image","url('img/module/logo/coca2.png')").fadeIn("slow");
			$("nav div:nth-of-type(2)").css("margin-left","112px");
	});
	$("button:nth-of-type(2)").hover(function () {
			$("nav div:nth-of-type(1)").css("margin-left","112px");
	});
	
	$("button:nth-of-type(3)").click(function () {
			$("#logo").css("background-image","url('img/module/logo/coca3.png')").fadeIn("slow");
			$("nav div:nth-of-type(2)").css("margin-left","210px");
	});
	$("button:nth-of-type(3)").hover(function () {
			$("nav div:nth-of-type(1)").css("margin-left","210px");
	});
	
	$("button:nth-of-type(4)").click(function () {
			$("#logo").css("background-image","url('img/module/logo/coca4.png')").fadeIn("slow");
			$("nav div:nth-of-type(2)").css("margin-left","309px");
	});
	$("button:nth-of-type(4)").hover(function () {
			$("nav div:nth-of-type(1)").css("margin-left","309px");
	});
	$("button:nth-of-type(5)").click(function () {
			$("#logo").css("background-image","url('img/module/logo/coca5.png')").fadeIn("slow");
			$("nav div:nth-of-type(2)").css("margin-left","408px");
	});
	$("button:nth-of-type(5)").hover(function () {
			$("nav div:nth-of-type(1)").css("margin-left","408px");
	});
	
	$("button:nth-of-type(6)").click(function () {
			$("#logo").css("background-image","url('img/module/logo/coca6.png')").fadeIn("slow");
			$("nav div:nth-of-type(2)").css("margin-left","507px");
	});
	$("button:nth-of-type(6)").hover(function () {
			$("nav div:nth-of-type(1)").css("margin-left","507px");
	});
	
	$("button:nth-of-type(7)").click(function () {
			$("#logo").css("background-image","url('img/module/logo/coca7.png')").fadeIn("slow");
			$("nav div:nth-of-type(2)").css("margin-left","605px");
	});
	$("button:nth-of-type(7)").hover(function () {
			$("nav div:nth-of-type(1)").css("margin-left","605px");
	});
	
	$("button:nth-of-type(8)").click(function () {
			$("#logo").css("background-image","url('img/module/logo/coca8.png')").fadeIn("slow");
			$("nav div:nth-of-type(2)").css("margin-left","704px");
	});
	$("button:nth-of-type(8)").hover(function () {
			$("nav div:nth-of-type(1)").css("margin-left","704px");
	});
}




function displayBottle(){
	$(".displayBottle a").click(function(){
		var id=$(this).attr('class');
		var screenContainer=document.getElementById('screen');
		var text=document.getElementsByClassName('description');
		
		var bgArray = new Array();
		
				bgArray = ['img/module/collector-editions/maxi/img1.png', 'img/module/collector-editions/maxi/img2.png', 'img/module/collector-editions/maxi/img3.png', 'img/module/collector-editions/maxi/img4.png', 'img/module/collector-editions/maxi/img5.png', 'img/module/collector-editions/maxi/img6.png', 'img/module/collector-editions/maxi/img7.png', 'img/module/collector-editions/maxi/img8.png', 'img/module/collector-editions/maxi/img9.png', 'img/module/collector-editions/maxi/img10.png'];


			for (var i = 0; i <= 10; i++) {

				text[i].style.display="none";

				if (i==id){
					text[i].style.display='block'
					screenContainer.className='i';
					screenContainer.style.backgroundImage='url('+bgArray[i-1]+')';
				}
			};
			return false;

	});
}			

var correctBottles = 0;
$( init );

function init() {

  // On cache le message de réussite

  $('#successMessage').hide();


  // Reset

  correctBottles = 0;
  $('#bottleChoices').html( '' );
  $('#bottlePlacess').html( '' );

  // Créer la liste de bouteilles mélangées

  var numbers = [ 1, 2, 3, 4, 5, 6];
  numbers.sort( function() { return Math.random() - .5 } );

  for ( var i=0; i<6; i++ ) {

      $('').appendTo( '#bottleChoices' );   

    $('<div><img src="img/module/bottle/img' + numbers[i] + '.png"/></div>').data( 'number', numbers[i] ).appendTo( '	#bottleChoices' ).draggable( {
      containment: '#content',
      stack: '#bottleChoices div',
      cursor: 'move',
      revert: true
    } );
  }

  // Créer les emplacements

  var words = [  '1899','1900', '1916','1915' , '1957', '1961', '1991', '1994'];
  for ( var i=1; i<=6; i++ ) {
       
      $('').appendTo( '#bottlePlaces' );   


    $('<div> ' +' </div>').data( 'number', i ).appendTo( '#bottlePlaces' ).droppable( {
      accept: '#bottleChoices div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var bottleNumber = ui.draggable.data( 'number' );

  // Si la bouteille est au bon endroit, on la fixe à l'endroit

  if ( slotNumber == bottleNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'center', at: 'center' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctBottles++;
  } 
  
  // Si toutes les bouteilles ont bien été placées, on affiche le messgae de réussite
  // et on reset le jeu

  if ( correctBottles == 6 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      opacity: 1
    } );
  }

}



