function captureDesktopForRecord() {
    console.log(11);
    if (isRecordingVOD) {
console.log(12);
        stopVODRecording();
        return;
    }

    if (recorder && recorder.streams) {
        console.log(13);
        recorder.streams.forEach(function(stream, idx) {
            stream.getTracks().forEach(function(track) {
                track.stop();
            });

            if (idx == 0 && typeof stream.onendedForRecord === 'function') {
                stream.onendedForRecord();
            }
        });
        recorder.streams = null;
        return;
    }
console.log(14);
    /*
    browser.browserAction.setIcon({
        path: 'screen-recording/images/main-icon.png'
    });
    */
/*
    if (enableTabCaptureAPI) {
        captureTabUsingTabCaptureForRecord();
        return;
    }
*/
    var screenSources = ['screen', 'window', 'audio'];

    if (enableSpeakers === false) {
        screenSources = ['screen', 'window'];
    }   

    //browser.desktopCapture.chooseDesktopMedia(screenSources, onAccessApprovedForRecord);
    /*
    navigator.mediaDevices.getUserMedia({
        video: {
        mediaSource: 'screen'
        }
    })
      // permission granted:
        .then(function(stream) {
            console.log(15);
            initVideoPlayerForRecord(stream);
            gotStreamForRecord(stream);
        })
        // permission denied:
        .catch(function(error) {
          var e = 'Could not access the camera. Error: ' + error.name;
          console.log(e);
        });
    */

    var constraints = {
    video: {
            mediaSource: "window", // window, screen
            mozMediaSource: "window",
            width : {min: 640, max: 960},
            height : {min: 480, max: 720},
            frameRate : {min: 15, max: 30}
        }, 
        audio: false
    };
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia(constraints, function(stream) {
        initVideoPlayerForRecord(stream);
        gotStreamForRecord(stream);
    }, function() {});


    //navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia;
    //navigator.getUserMedia(constraints, userScreenSuccess, userMediaError);
}

function userScreenSuccess(){
    
}

function onAccessApprovedForRecord(browserMediaSourceId, opts) {    
    if (!browserMediaSourceId || !browserMediaSourceId.toString().length) {
        setDefaultsForRecord();
        browser.runtime.reload();
        return;
    }

    var constraints = {
        audio: false,
        video: {
            mandatory: {
                browserMediaSource: 'desktop',
                browserMediaSourceId: browserMediaSourceId
            },
            optional: []
        }
    };

    if (videoMaxFrameRates && videoMaxFrameRates.toString().length) {
        videoMaxFrameRates = parseInt(videoMaxFrameRates);

        // 30 fps seems max-limit in browser?
        if (videoMaxFrameRates /* && videoMaxFrameRates <= 30 */ ) {
            constraints.video.maxFrameRate = videoMaxFrameRates;
        }
    }

    constraints.video.mandatory.maxWidth = 3840;
    constraints.video.mandatory.maxHeight = 2160;

    constraints.video.mandatory.minWidth = 3840;
    constraints.video.mandatory.minHeight = 2160;

    if (opts.canRequestAudioTrack === true) {
        constraints.audio = {
            mandatory: {
                browserMediaSource: 'desktop',
                browserMediaSourceId: browserMediaSourceId,
                echoCancellation: true
            },
            optional: []
        };
    }
    
    navigator.webkitGetUserMedia(constraints, function(stream) {
        initVideoPlayerForRecord(stream);
        gotStreamForRecord(stream);
    }, function() {});
}
