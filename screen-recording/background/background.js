/*
browser.storage.sync.set({
    isRecording: 'false' // FALSE
});

browser.browserAction.setIcon({
    path: 'images/main-icon.png'
});
*/

function gotStreamForRecord(stream) {
    var options = {
        type: 'video',
        disableLogs: false,
        recorderType: MediaStreamRecorder, // StereoAudioRecorder
        // timeSlice: 1000
    };

    if (!videoCodec) {
        videoCodec = 'Default'; // prefer VP9 by default
    }

    if (videoCodec) {
        if (videoCodec === 'Default') {
            options.mimeType = 'video/webm\;codecs=vp9';
        }

        if (videoCodec === 'VP8') {
            options.mimeType = 'video/webm\;codecs=vp8';
        }

        if (videoCodec === 'VP9') {
            options.mimeType = 'video/webm\;codecs=vp9';
        }

        if (videoCodec === 'H264') {
            if (isMimeTypeSupported('video/webm\;codecs=h264')) {
                options.mimeType = 'video/webm\;codecs=h264';
            }
        }

        if (videoCodec === 'MKV') {
            if (isMimeTypeSupported('video/x-matroska;codecs=avc1')) {
                options.mimeType = 'video/x-matroska;codecs=avc1';
            }
        }
    }

    if (bitsPerSecond) {
        bitsPerSecond = parseInt(bitsPerSecond);
        if (!bitsPerSecond || bitsPerSecond < 100) {
            bitsPerSecond = 8000000000; // 1 GB /second
        }
    }

    if (bitsPerSecond) {
        options.bitsPerSecond = bitsPerSecond;
    }

    if (cameraStream && cameraStream.getAudioTracks().length) {
        cameraStream.getAudioTracks().forEach(function(track) {
            stream.addTrack(track);
            cameraStream.removeTrack(track);
        });
    }

    // fix https://github.com/muaz-khan/RecordRTC/issues/281
    options.ignoreMutedMedia = false;

    if (cameraStream && cameraStream.getVideoTracks().length) {
        // adjust video on top over screen

        // on faster systems (i.e. 4MB or higher RAM):
        // screen: 3840x2160 
        // camera: 1280x720
        stream.width = screen.width;
        stream.height = screen.height;
        stream.fullcanvas = true; // screen should be full-width (wider/full-screen)

        // camera positioning + width/height
        cameraStream.width = parseInt((20 / 100) * stream.width);
        cameraStream.height = parseInt((20 / 100) * stream.height);
        cameraStream.top = stream.height - cameraStream.height;
        cameraStream.left = stream.width - cameraStream.width;

        // frame-rates
        options.frameInterval = 1;

        recorder = new MultiStreamRecorder([cameraStream, stream], options);
        recorder.streams = [stream, cameraStream];
    } else {
        recorder = new MediaStreamRecorder(stream, options);
        recorder.streams = [stream];
    }

    recorder.record();

    isRecording = true;
    onRecording();

    recorder.streams[0].onendedForRecord = function() {
        if (recorder && recorder.streams.length) {
            recorder.streams[0].onended = null;
        }

        stopScreenRecording();
    };

    if (recorder.streams[0].getVideoTracks().length) {
        recorder.streams[0].getVideoTracks().forEach(function(track) {
            track.onendedForRecord = function() {
                if (!recorder) return;
                var stream = recorder.streams[0];
                if (!stream || typeof stream.onendedForRecord !== 'function') return;

                stream.onendedForRecord();
            };
        });
    }

    initialTime = Date.now()
    timer = setInterval(checkTime, 100);

    isTakePicture();
}

function isTakePicture(){
    browser.storage.sync.get("isTakePicture", function(r){       
        if(r.isTakePicture){
            window.setTimeout(stopScreenRecordingFromTakePicture, 2000);
        }  
    });      
}

var isPicture = false;
function stopScreenRecordingFromTakePicture(){
    isPicture = true;
    stopScreenRecording();
}

function stopScreenRecording() {
    isRecording = false;
    browser.storage.sync.set({"isTakePicture": false});
    recorder.stop(function() {
        var mimeType = 'video/webm';
        var fileExtension = 'webm';

        if (videoCodec === 'H264') {
            if (isMimeTypeSupported('video/webm\;codecs=h264')) {
                mimeType = 'video/mp4';
                fileExtension = 'mp4';
            }
        }

        if (videoCodec === 'MKV') {
            if (isMimeTypeSupported('video/x-matroska;codecs=avc1')) {
                mimeType = 'video/mkv';
                fileExtension = 'mkv';
            }
        }

        var file = new File([recorder ? recorder.blob : ''], getFileName(fileExtension), {
            type: mimeType
        });

        localStorage.setItem('selected-file', file.name);

        // initialTime = initialTime || Date.now();
        // var timeDifference = Date.now() - initialTime;
        // var formatted = convertTime(timeDifference);
        // file.duration = formatted;

        DiskStorage.StoreFile(file, function() {
            browser.tabs.query({}, function(tabs) {
                var found = false;
                var page = "preview.html"
                if(isPicture){
                    page = "screenshot.html"  
                    isPicture = false;                                     
                }
                    
                var url = 'moz-extension://' + browser.runtime.id + '/screen-recording/'+page;
                for (var i = tabs.length - 1; i >= 0; i--) {
                    if (tabs[i].url === url) {
                        found = true;
                        browser.tabs.update(tabs[i].id, {
                            active: true,
                            url: url
                        });
                        break;
                    }
                }
                if (!found) {
                    browser.tabs.create({
                        url: 'screen-recording/'+page
                    });                      
                }
            });
        });

        // invokeSaveAsDialog(file, file.name);

        setTimeout(function() {
            setDefaultsForRecord();
            // browser.runtime.reload();            
        }, 1000);

        try {
            videoPlayers.forEach(function(player) {
                player.src = null;
            });
            videoPlayers = [];
        } catch (e) {}

        // for dropdown.js
        browser.storage.sync.set({
            isRecording: 'false' // FALSE
        });
    });

    if (timer) {
        clearTimeout(timer);
    }
    setBadgeText('');

    browser.browserAction.setTitle({
        title: 'Record Your Screen, Tab or Camera'
    });
}

function setDefaultsForRecord() {
    browser.browserAction.setIcon({
        path: 'images/main-icon.png'
    });

    if (recorder && recorder.streams) {
        recorder.streams.forEach(function(stream, idx) {
            stream.getTracks().forEach(function(track) {
                track.stop();
            });

            if (idx == 0 && typeof stream.onendedForRecord === 'function') {
                stream.onendedForRecord();
            }
        });

        recorder.streams = null;
    }

    recorder = null;
    isRecording = false;
    imgIndex = 0;

    bitsPerSecond = 0;
    enableTabCaptureAPI = false;
    enableScreen = true;
    enableMicrophone = false;
    enableCamera = false;
    cameraStream = false;
    enableSpeakers = true;
    videoCodec = 'Default';
    videoMaxFrameRates = '';
    videoResolutions = '1920x1080';
    isRecordingVOD = false;
    startedVODRecordedAt = (new Date).getTime();

    // for dropdown.js
    browser.storage.sync.set({
        isRecording: 'false' // FALSE
    });
}

function getUserConfigs() {  
    console.log(3);     
    if (enableMicrophone || enableCamera) {
        console.log(4);
        if (!enableScreen) {
            console.log(5);
            captureCamera(function(stream) {
                gotStream(stream);
            });
            return;
        }

        captureCamera(function(stream) {  
        console.log(6);              
            cameraStream = stream;
            captureDesktopForRecord();
        });
        return;
    } 
    console.log(7);       
    captureDesktopForRecord();
}

function stopVODRecording() {
    isRecordingVOD = false;
}
/*
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete'){
        var urlTab = tab.url;
        var urlBunker = "https://bunker.globalipcloud.com";
        var urlTest = "http://localhost/z/btn-share-record-screen.html";
        var idExt = browser.runtime.id;
        
        if(urlTab.indexOf(urlBunker) !== -1 || urlTab.indexOf(urlTest) !== -1){        
   
            browser.storage.local.set({'id_Ext': idExt}, function () {
                browser.tabs.executeScript(tab.id, {file:'screen-recording/background/background.inyeccion.js'});
            });         
        } 
    }

 });


browser.tabs.onActivated.addListener(function(activeInfo) {  
  browser.tabs.get(activeInfo.tabId, function(tab){    
    var urlTab = tab.url;
    var urlBunker = "https://bunker.globalipcloud.com";
    var urlTest = "http://localhost/z/btn-share-record-screen.html";
    var idExt = browser.runtime.id;
   
    if(urlTab.indexOf(urlBunker) !== -1 || urlTab.indexOf(urlTest) !== -1){        
   
        browser.storage.local.set({'id_Ext': idExt}, function () {
            browser.tabs.executeScript(tab.id, {file:'screen-recording/background/background.inyeccion.js'});
        });         
    }   
  });
}); 


*/