var videoPlayers = [];

function initVideoPlayerForRecord(stream) {
    var videoPlayer = document.createElement('video');
    videoPlayer.muted = !enableTabCaptureAPI;
    videoPlayer.volume = !!enableTabCaptureAPI;
    console.log("url: ");
    console.log(URL.createObjectURL(stream));
    videoPlayer.src = URL.createObjectURL(stream);

    videoPlayer.play();

    videoPlayers.push(videoPlayer);
}
