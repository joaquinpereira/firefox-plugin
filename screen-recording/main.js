function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}

var videosContainer = document.getElementById('videos-container');

var mRecordRTC = new MRecordRTC();
mRecordRTC.mediaType = {
    audio: true, // or StereoAudioRecorder or MediaStreamRecorder
    video: true            
};

var myStream;

if (DetectRTC.browser.name === 'Edge') {
    // Microsoft Edge currently supports only audio and gif recording
    mRecordRTC.mediaType = {
        audio: StereoAudioRecorder
    };
}
// mRecordRTC.bufferSize = 16384;

document.getElementById('full-screen').onclick = function() {
    startRecord("screen",false);   
};

document.getElementById('screenAndMic').onclick = function() {
    startRecord("screenAndMic",false); 
}

document.getElementById('window').onclick = function() {
    startRecord("window",false); 
}

document.getElementById('windowAndMic').onclick = function() {
    startRecord("windowAndMic",false); 
}

document.getElementById('camera').onclick = function() {
    startRecord("camera",false); 
}

document.getElementById('cameraAndMic').onclick = function() {
    startRecord("cameraAndMic",false); 
}

document.getElementById('stop-recording').onclick = function() {  
    stopRecord();
};

document.getElementById('take-picture').onclick = function() {
    startRecord("window",true);
}

function getPhoto(){
    console.log("getPhoto");
    mRecordRTC.stopRecording(function(url, type) {
        document.querySelector(type).src = url;
        //document.querySelector(type).play();

        // fixing firefox playback issue
        if (!!navigator.mozGetUserMedia) {
            document.querySelector(type).onended = function() {
                document.querySelector(type).src = URL.createObjectURL(mRecordRTC.getBlob()[type]);
                //document.querySelector(type).play();
            };
        }

        mRecordRTC.writeToDisk(); 
        //mRecordRTC.save();    
        $("#wrapper").show();
        $("#stop-section").hide();   
        myStream.getTracks().forEach(function(track) { track.stop(); })

        //captureImage();
        setTimeout(captureImage, 2000);
    });
}



function startRecord(opc,isTakePicture){

    $("#videos-container").attr("style","display:none");
    console.log(getMediaConstraints(opc));
    
	captureUserMedia(getMediaConstraints(opc), 
        function(stream) {
    	var video = document.createElement('video');

        setSrcObject(stream, video);

        video.play();
        var mediaElement = getMediaElement(video, {
            buttons: [],
            showOnMouseEnter: false,
            enableTooltip: false,
            onMuted: function() {
                document.querySelector('#audio').muted = true;
            },
            onUnMuted: function() {
                document.querySelector('#audio').muted = false;
                document.querySelector('#audio').play();
            }
        });
        videosContainer.appendChild(mediaElement);

        mRecordRTC.addStream(stream);
        mRecordRTC.startRecording();

        myStream = stream;
        $("#wrapper").hide();
    	$("#stop-section").show();
        if (isTakePicture) {
            console.log("is take-picture");
            setTimeout(getPhoto, 1000);
        }else{
            console.log("not is take-picture: "+opc);
        }
    }, function(error) {
        alert(JSON.stringify(error));
    });
}

function stopRecord(){
	mRecordRTC.stopRecording(function(url, type) {
        document.querySelector(type).src = url;
        //document.querySelector(type).play();

        // fixing firefox playback issue
        if (!!navigator.mozGetUserMedia) {
            document.querySelector(type).onended = function() {
                document.querySelector(type).src = URL.createObjectURL(mRecordRTC.getBlob()[type]);
                //document.querySelector(type).play();
            };
        }

        mRecordRTC.writeToDisk(); 
        mRecordRTC.save();    
        $("#wrapper").show();
        $("#stop-section").hide();   
        myStream.getTracks().forEach(function(track) { track.stop(); })
    });
    
}

function captureImage() {   
    var audio = new Audio('screenshot/camara.mp3');
    audio.play(); 
    var video2 = document.querySelector('video');
    var canvas = window.canvas = document.querySelector('#myImage');
    canvas.width = video2.videoWidth;
    canvas.height = video2.videoHeight;
    canvas.getContext('2d').drawImage(video2, 0, 0, canvas.width, canvas.height);

    const image = new Image()
    image.src = canvas.toDataURL();

    var link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'Download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 

    //document.getElementById('imgGet').appendChild(image);
    /*
    Painterro({
          colorScheme: {
            main: '#e7e7e7', 
            control: '#d5d5d5' 
          },
          hiddenTools: ['resize','open', 'close'],
          activeColor: '#7f8040',
          activeColorAlpha: 0.7,
          saveHandler: function (image, done) {
            base_image = new Image();
            base_image.src = image.asDataURL();
            base_image.onload = function(){
              canvas.getContext('2d').drawImage(base_image, 0, 0, canvas.width, canvas.height);
              $("#myImage").show();
            }                        
            done(true)
          }
        }
    ).show(canvas.toDataURL());
    */
}


function getMediaConstraints(opc){
    var mediaConstraints = "";
    if(opc == "screen"){
        mediaConstraints = {
            audio: false,
            video: {
                mediaSource: "screen", 
                mozMediaSource: "screen",                    
            }
        }
    }else if (opc == "screenAndMic") {
        mediaConstraints = {
            audio: true,
            video: {
                mediaSource: "screen", 
                mozMediaSource: "screen",                    
            }
        }
    }else if (opc == "window") {
        mediaConstraints = {
            audio: false,
            video: {
                mediaSource: "window", 
                mozMediaSource: "window",                    
            }
        }
    }else if (opc == "windowAndMic") {
        mediaConstraints = {
            audio: true,
            video: {
                mediaSource: "window", 
                mozMediaSource: "window",                    
            }
        }
    }else if (opc == "camera") {
        mediaConstraints = {
            audio: false,
            video: true
        }
    }else if (opc == "cameraAndMic") {
        mediaConstraints = {
            audio: true,
            video: true
        }
    }else if (opc == "take-picture") {
        mediaConstraints = {
            audio: false,
            video: {
                mediaSource: "screen", 
                mozMediaSource: "screen",                    
            }
        }
    }
    return mediaConstraints;
}