var runtimePort = browser.runtime.connect({
    name: location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, '').split('\n').join('').split('\r').join('')
});

runtimePort.onMessage.addListener(function(message) {
    if (!message || !message.messageFromContentScript1234) {
        return;
    }
});

$("#myVideo").hide();
$("#myImage").hide();
$("#btn2").hide();
$("#btn1").hide();

const btn2 = document.querySelector('#btn2');
btn2.onclick = function() {

    browser.storage.sync.set({"isTakePicture": true});
    
    browser.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableMicrophone: 'false',
        enableCamera: 'false',
        enableScreen: 'true', 
        isRecording: 'true', 
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startRecording: true
        });
        window.close();
    });     
    $("#btn2").hide();
};

const video2 = document.querySelector('video');
const canvas = window.canvas = document.querySelector('#myImage');
canvas.width = 480;
canvas.height = 360;

const btn1 = document.querySelector('#btn1');
btn1.onclick = function() {
    //$("#btn2").show();
    $("#btn1").hide();
  captureImage();
};

function captureImage() {   
    var audio = new Audio('screenshot/camara.mp3');
    audio.play(); 
    canvas.width = video2.videoWidth;
    canvas.height = video2.videoHeight;
    canvas.getContext('2d').drawImage(video2, 0, 0, canvas.width, canvas.height);
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
}
