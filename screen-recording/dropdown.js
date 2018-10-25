$(document).ready(function() {
    $('#booNavigation').booNavigation({
        slideSpeed: 200
    });
    $('#booNavigationTwo').booNavigation({
        slideSpeed: 200
    });
});





/*
document.getElementById('stop-section').onclick = function() {
    $("#wrapper").show();
    $("#stop-section").hide();
    stopRecord();

};


document.addEventListener('DOMContentLoaded', function() {
  
var runtimePort = browser.runtime.connect({
    name: location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, '').split('\n').join('').split('\r').join('')
    //name: "bunker_msj"
});

runtimePort.onMessage.addListener(function(message) {
    if (!message || !message.messageFromContentScript1234) {
        return;
    }
});
    
    


document.getElementById('take-picture').onclick = function() {  
    browser.storage.sync.set({"isTakePicture": true});
    
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'false',
        enableCamera: 'false',
        enableScreen: 'true', // TRUE
        isRecording: 'true', // TRUE
        enableSpeakers: 'false' // FALSE
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startRecording: true
        });
        window.close();
    }); 
};


browser.storage.sync.set({"isTakePicture": false});

var isRecording = false;

browser.storage.sync.get('isRecording', function(obj) {
    document.getElementById('default-section').style.display = obj.isRecording === 'true' ? 'none' : 'block';
    document.getElementById('stop-section').style.display = obj.isRecording === 'true' ? 'block' : 'none';

    isRecording = obj.isRecording === 'true';

    // auto-stop-recording
    if (isRecording === true) {
        document.getElementById('stop-recording').click();

        browser.tabs.query({}, function(tabs) {
        var tabIds = [];
        var url = 'browser-extension://' + browser.runtime.id + '/video.html';
        for (var i = tabs.length - 1; i >= 0; i--) {
            if (tabs[i].url === url) {
                tabIds.push(tabs[i].id);
                browser.tabs.update(tabs[i].id, {
                    active: true,
                    url: url
                });
                break;
            }
        }
        if (tabIds.length) {
            browser.tabs.remove(tabIds);
        }
    });
    }
});






document.getElementById('full-screen-audio').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'false',
        enableCamera: 'false',
        enableScreen: 'true', // TRUE
        isRecording: 'true', // TRUE
        enableSpeakers: 'true' // TRUE
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startRecording: true
        });
        window.close();
    });
};

document.getElementById('selected-tab').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'true', // TRUE
        enableMicrophone: 'false',
        enableCamera: 'false',
        enableScreen: 'false',
        isRecording: 'true', // TRUE
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startRecording: true
        });
        window.close();
    });
};

document.getElementById('microphone-screen').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'true', // TRUE
        enableCamera: 'false',
        enableScreen: 'true', // TRUE
        isRecording: 'true', // TRUE
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startRecording: true
        });
        window.close();
    });
};

document.getElementById('microphone-screen-camera').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'true', // TRUE
        enableCamera: 'true', // TRUE
        enableScreen: 'true', // TRUE
        isRecording: 'true', // TRUE
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startRecording: true
        });
        window.close();
    });
};

document.getElementById('microphone-webcam').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'true', // TRUE
        enableCamera: 'true', // TRUE
        enableScreen: 'false', // FALSE
        isRecording: 'true', // TRUE
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startRecording: true
        });
        window.close();
    });
};

document.getElementById('see_all_recordings').onclick = function() {
    window.close();
    var url = 'browser-extension://' + browser.runtime.id + '/screen-recording/preview.html';    
    window.open(url,"_blank");
};



document.getElementById('stop-sharing').onclick = function() {
    browser.storage.sync.set({
        isSharingOn: 'false' // FALSE
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            stopSharing: true
        });
        window.close();
    });
};

document.getElementById('full-screen-p').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'false',
        enableCamera: 'false',
        enableScreen: 'true', // TRUE
        isSharingOn: 'true', // TRUE
        enableSpeakers: 'false' // FALSE
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startSharing: true
        });
        window.close();
    });
};

document.getElementById('full-screen-audio-p').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'false',
        enableCamera: 'false',
        enableScreen: 'true', // TRUE
        isSharingOn: 'true', // TRUE
        enableSpeakers: 'true' // TRUE
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startSharing: true
        });
        window.close();
    });
};

document.getElementById('full-screen-audio-microphone-p').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'true', // TRUE
        enableCamera: 'false',
        enableScreen: 'true', // TRUE
        isSharingOn: 'true', // TRUE
        enableSpeakers: 'true' // TRUE
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startSharing: true
        });
        window.close();
    });
};

document.getElementById('full-screen-audio-microphone-camera-p').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'true', // TRUE
        enableCamera: 'true',
        enableScreen: 'true', // TRUE
        isSharingOn: 'true', // TRUE
        enableSpeakers: 'true' // TRUE
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startSharing: true
        });
        window.close();
    });
};

document.getElementById('selected-tab-p').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'true', // TRUE
        enableMicrophone: 'false',
        enableCamera: 'false',
        enableScreen: 'false',
        isSharingOn: 'true', // TRUE
        enableSpeakers: 'true'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startSharing: true
        });
        window.close();
    });
};

document.getElementById('microphone-screen-p').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'true', // TRUE
        enableCamera: 'false',
        enableScreen: 'true', // TRUE
        isSharingOn: 'true', // TRUE
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startSharing: true
        });
        window.close();
    });
};

document.getElementById('microphone-screen-camera-p').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'true', // TRUE
        enableCamera: 'true', // TRUE
        enableScreen: 'true', // TRUE
        isSharingOn: 'true', // TRUE
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startSharing: true
        });
        window.close();
    });
};

document.getElementById('microphone-webcam-p').onclick = function() {
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'true', // TRUE
        enableCamera: 'true', // TRUE
        enableScreen: 'false', // FALSE
        isSharingOn: 'true', // TRUE
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startSharing: true
        });
        window.close();
    });
};

document.getElementById('btn-options').onclick = function(e) {
    e.preventDefault();
    location.href = this.href;
};

var isSharingOn = false;
browser.storage.sync.get('isSharingOn', function(obj) {
    document.getElementById('default-section').style.display = obj.isSharingOn === 'true' ? 'none' : 'block';
    document.getElementById('stop-section2').style.display = obj.isSharingOn === 'true' ? 'block' : 'none';

    isSharingOn = obj.isSharingOn === 'true';

    // auto-stop-sharing
    if (isSharingOn === true) {
        document.getElementById('stop-sharing').click();
    }
});



        
});



*/