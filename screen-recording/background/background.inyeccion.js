chrome.storage.local.get('id_Ext', function (result) {
	
	var idExt = "";
		
    idExt = result.id_Ext;  
    console.log("idExt: "+idExt);
    
    $( document ).ready(function() {

    	if ($('#ext_ID').length==0){

		    var div = '<div id="ext_ID" style="visibility: hidden;"></div>';
			$("body").append(div); 
			$("#ext_ID").html(idExt);

			
			var src = "chrome-extension://";
			src += idExt;
			
			var div = '<script type="text/javascript" src="'+src+'/bootstrap/jquery.min.js"></script>';
			div += '<link id="mainCss" rel="stylesheet" href="'+src+'/bootstrap/main.btn.share-record-screen.css">';
			
			$("body").append(div);

		}

		(function move() {				
		console.log("hola estoy entrando");	
			if ($('.share-items').length==0){			    
				//console.log("aun no ha cargado el div #rocket-chat");
			    setTimeout(move, 1500);
			}else{				
				//console.log("listo #rocket-chat");

				$("#modal-launcher").remove();
				$(".share-items").append('<div class="message-buttons btnBunkerScreen" onclick="launchModal()" id="modal-launcher" style="visibility: none;"><i class="icon-export"></i></div>');					
				
				setTimeout(setScripts, 1000);													

				$("#modal-background").remove();
				$("#modal-content").remove();

				var wraper = '<div class="dropdown"><button onclick="myFunction(1)" class="dropbtn" style="width: 245px;">Screen Record</button> <div id="myDropdown" class="dropdown-content" style="width: 245px;"> <a class="mya" id="full-screen" onclick="sendMsj(\'full-screen\')" title="Full Screen"> <img class="my_img" src="chrome-extension://'+idExt+'/screen-recording/images/main-icon.png"> Full Screen</a> <a class="mya" id="take-picture" onclick="sendMsj(\'take-picture\')" title="Take a Picture"><img class="my_img" src="chrome-extension://'+idExt+'/screen-recording/images/main-icon.png"> Take a Picture</a> <a class="mya" id="microphone-screen" onclick="sendMsj(\'microphone-screen\')" title="Full Screen + Microphone"><img class="my_img" src="chrome-extension://'+idExt+'/screen-recording/images/main-icon.png"> Full Screen + Microphone</a> <a class="mya" id="full-screen-audio" onclick="sendMsj(\'full-screen-audio\')" title="Full Screen + Speakers"><img class="my_img" src="chrome-extension://'+idExt+'/screen-recording/images/main-icon.png"> Full Screen + Speakers</a> <a class="mya" id="selected-tab" onclick="sendMsj(\'selected-tab\')" title="Chrome Tab"><img class="my_img" src="chrome-extension://'+idExt+'/screen-recording/images/main-icon.png"> Chrome Tab</a> <a class="mya" id="microphone-screen-camera" onclick="sendMsj(\'microphone-screen-camera\')" title="Full Screen + Camera"><img class="my_img" src="chrome-extension://'+idExt+'/screen-recording/images/main-icon.png"> Full Screen + Camera</a> <a class="mya" id="microphone-webcam" onclick="sendMsj(\'microphone-webcam\')" title="Camera Only"><img class="my_img" src="chrome-extension://'+idExt+'/screen-recording/images/main-icon.png"> Camera Only</a> <a class="mya" id="see_all_recordings" onclick="sendMsj(\'see_all_recordings\')" title="See All Recordings"><img class="my_img" src="chrome-extension://'+idExt+'/screen-recording/images/main-icon.png"> See All Recordings</a> <a class="mya" id="btn-options" onclick="sendMsj(\'btn-options\')" title="Options">Options</a> </div><br><button onclick="myFunction(2)" class="dropbtn" style="margin-top:5px;width: 243px;">Screen Sharing</button> <div id="myDropdown2" class="dropdown-content" style="width: 245px;"> <a class="mya" id="full-screen-p" onclick="sendMsj(\'full-screen-p\')" title="Screen Without Audio"><img class="my_img" src="chrome-extension://'+idExt+'/desktopCapture-p2p/images/desktopCapture22.png"> Screen Without Audio </a> <a class="mya" id="microphone-screen-p" onclick="sendMsj(\'microphone-screen-p\')" title="Screen + Microphone"><img class="my_img" src="chrome-extension://'+idExt+'/desktopCapture-p2p/images/desktopCapture22.png"> Screen + Microphone</a> <a class="mya" id="full-screen-audio-p" onclick="sendMsj(\'full-screen-audio-p\')" title="Screen + Speakers"><img class="my_img" src="chrome-extension://'+idExt+'/desktopCapture-p2p/images/desktopCapture22.png"> Screen + Speakers</a> <a class="mya" id="full-screen-audio-microphone-p" onclick="sendMsj(\'full-screen-audio-microphone-p\')" title="Screen + Microphone + Speakers"><img class="my_img" src="chrome-extension://'+idExt+'/desktopCapture-p2p/images/desktopCapture22.png"> Screen + Microphone + Speakers</a> <a class="mya" id="full-screen-audio-microphone-camera-p" onclick="sendMsj(\'full-screen-audio-microphone-camera-p\')" title="Screen + Microphone + Speakers + Camera"><img class="my_img" src="chrome-extension://'+idExt+'/desktopCapture-p2p/images/desktopCapture22.png"> Screen + Microphone + Speakers + Camera</a> <a class="mya" id="selected-tab-p" onclick="sendMsj(\'selected-tab-p\')" title="Chrome Tab + Speakers"><img class="my_img" src="chrome-extension://'+idExt+'/desktopCapture-p2p/images/desktopCapture22.png"> Chrome Tab + Speakers</a> <a class="mya" id="microphone-screen-camera-p" onclick="sendMsj(\'microphone-screen-camera-p\')" title="Screen + Camera"><img class="my_img" src="chrome-extension://'+idExt+'/desktopCapture-p2p/images/desktopCapture22.png"> Screen + Camera</a> <a class="mya" id="microphone-webcam-p" onclick="sendMsj(\'microphone-webcam-p\')" title="Camera Only"><img class="my_img" src="chrome-extension://'+idExt+'/desktopCapture-p2p/images/desktopCapture22.png"> Camera Only</a> <a class="mya" id="btn-options-p" href="#" onclick="sendMsj(\'btn-options-p\')">Options</a> </div></div>';	
				div = '<div id="modal-background" onclick="closeModal()"></div><div id="modal-content"> <span class="close" id="modal-close" onclick="closeModal()">&times;</span> <br><div id="text">'+wraper+'</div></div>';
				$("body").append(div); 	
			}
		})();

    });   

    function setScripts(){    	    	
    	$("#mainShareJS").remove();

    	var src = "chrome-extension://";
		src += idExt;
    	
		var div = '<script id="mainShareJS" type="text/javascript" src="'+src+'/bootstrap/main.btn.share-record-screen.js"></script>';
		$("body").append(div);

		$("#modal-launcher").css("visibility", "visible");  
    }
    
});