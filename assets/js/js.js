//////////////////////////////////////////////
//											//
// ABBLE PFP GENERATOR						//
//											//
//////////////////////////////////////////////

$(document).ready(function() {

	// GET VIEWPORT WIDTH
	var viewportWidth = $(window).width();

	// LOAD IMAGE GALLERY
	$('#gallery').load('image-gallery.php');

	// ROTATE + RESIZE + DRAG FUNCTIONS
	$(function() {
	// Prepare extra handles
		var nw = $("<div>", {
			class: "ui-rotatable-handle"
		});
		var ne = nw.clone();
		var se = nw.clone();
		// Assign Draggable
		if (viewportWidth < 900) {	
			$('.box-wrapper').draggable({
				cancel: ".ui-rotatable-handle",
				scroll: false,
				containment: "#imageContainer",
				start: function( event, ui ) { $('body').css('overflow','hidden');},
				stop: function( event, ui ) { $('body').css('overflow','auto');}
			});
		} else {
			$('.box-wrapper').draggable({
				cancel: ".ui-rotatable-handle",
				scroll: false,
				containment: "#imageContainer"
			});
		}
		// Assign Rotatable
		$('.box').resizable({aspectRatio: true,containment: "#imageContainer"});

		var rotationAngle = 0;

		$('.box').on('mousewheel DOMMouseScroll', function(e) {
		  if (e.originalEvent.deltaY !== 0) { // Only prevent scroll if deltaY is not 0
			e.preventDefault(); // Prevent default scroll behavior
		  }
		  var rotation = e.originalEvent.deltaY > 0 ? -1 : 1;
		  rotationAngle += rotation;
		  $('.box').css('transform', 'rotate(' + rotationAngle + 'deg)');
		});
		// Assign coordinate classes to handles
		$('.box div.ui-rotatable-handle').addClass("ui-rotatable-handle-sw");
		nw.addClass("ui-rotatable-handle-nw");
		ne.addClass("ui-rotatable-handle-ne");
		se.addClass("ui-rotatable-handle-se");
		// Assign handles to box
		$(".box").append(nw, ne, se);
		// Assigning bindings for rotation event
		$(".box div[class*='ui-rotatable-handle-']").bind("mousedown", function(e) {
			$('.box').rotatable("instance").startRotate(e);
		});
	});

	$(".box div[class*='ui-rotatable-handle-']").bind("mousedown", function(e) {
		$('.box').rotatable("instance").startRotate(e);
	  });

	// CHANGE GOGGLE TYPE
	$('.goggles').on('click',function() {
		$('.goggles').removeClass('active');
		var goggles = $(this).attr('src');
		$('.box').css('background-image', 'url(' + goggles + ')');
		$(this).addClass('active');
	});

	// UPLOAD IMAGE INTO CANVAS
	$('#uploadImage').change(function() {
		var file = URL.createObjectURL(this.files[0]);
		$('#imageContainer').css('background-image', 'url(' + file + ')');
	});
	
	// SAVE CANVAS AS IMAGE AND AUTO-DOWNLOAD
	$('#saveButton').click(function() {
		$('#loading').css('opacity','1');
		$('#saveButton').html('Generating...');
		$('.ui-rotatable-handle').hide();
		$('.ui-icon').hide();
		var element = $('#imageContainer')[0];
		html2canvas(element, {allowTaint: false, scale: 2, width: $(element).width(), height: $(element).height()}).then(function(canvas) {
			
			
			newWidth = canvas.width - 4;
			newHeight = canvas.height - 4;

			const newCanvas = document.createElement('canvas');
			newCanvas.width = newWidth;
			newCanvas.height = newHeight;

			newCanvas
			.getContext('2d')
			.drawImage(canvas, 0, 0, newWidth, newHeight, 0, 0, newWidth, newHeight);
			
			
			
			var imageData = newCanvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");

			var a = document.createElement('a');
			a.href = imageData;
			a.download = 'ABBLE-pfp.jpg';
			a.click();
			
		});
	});
	

	// LOG PAGE VIEW ON LOAD
	$.ajax({
		url: "log.php?function=page-view",
		type: "REQUEST",
		success: function() {}
	});	
	
	
	// LOG PAGE FUNCTIONS
	$(".log-function").on('click',(function(e) {
		// PREVENT DEFAULT EVENT
		// e.preventDefault();
		// GET FUNCTION VIA DATA ATTRIBUTE
		var logfunction = $(this).data('log-function');	
		// AJAX CALL OF MYSQL LOGGING SCRIPT
			$.ajax({
				url: "log.php?function="+logfunction,
				type: "REQUEST",
				success: function() {
					if  ( logfunction == "codes-userimport" ) { $('#downloadcodearray').submit(); }
					if  ( logfunction == "codes-testcodes" ) { $('#downloadcodearray').submit(); }
					if  ( logfunction == "template-export" ) { $('#export-form').submit(); }
					if  ( logfunction == "template-import" ) { $('#import-form').submit(); }
				}
			});
	}));
	

	// ROTATE + RESIZE + DRAG FUNCTIONS
$(function() {
	// Prepare extra handles
	var nw = $("<div>", {
	  class: "ui-rotatable-handle"
	});
	var ne = nw.clone();
	var se = nw.clone();
	// Assign Draggable
	if (viewportWidth < 900) {  
	  $('.box-wrapper').draggable({
		cancel: ".ui-rotatable-handle",
		scroll: false,
		containment: "#imageContainer",
		start: function( event, ui ) { $('body').css('overflow','hidden');},
		stop: function( event, ui ) { $('body').css('overflow','auto');}
	  });
	} else {
	  $('.box-wrapper').draggable({
		cancel: ".ui-rotatable-handle",
		scroll: false,
		containment: "#imageContainer"
	  });
	}
	// Assign Rotatable
	$('.box').resizable({aspectRatio: true,containment: "#imageContainer"}).rotatable();
	// Assign coordinate classes to handles
	$('.box div.ui-rotatable-handle').addClass("ui-rotatable-handle-sw");
	nw.addClass("ui-rotatable-handle-nw");
	ne.addClass("ui-rotatable-handle-ne");
	se.addClass("ui-rotatable-handle-se");
	// Assign handles to box
	$(".box").append(nw, ne, se);
	// Assigning bindings for rotation event
	$(".box div[class*='ui-rotatable-handle-']").bind("mousedown", function(e) {
	  $('.box').rotatable("instance").startRotate(e);
	});
	// Rotate with mouse wheel
	$('.box').on('mousewheel DOMMouseScroll', function(e) {
	  var rotation = e.originalEvent.deltaY > 0 ? -1 : 1;
	  var angle = parseInt($('.box').css('transform').split('(')[1].split('deg')[0], 10) || 0;
	  angle += rotation * 10;
	  $('.box').css('transform', 'rotate(' + angle + 'deg)');
	});
  });
});