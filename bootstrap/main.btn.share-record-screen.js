$(document).ready(function(){   
    
});	

  
function closeModal(){
    document.getElementById("modal-content").classList.remove('active');
    document.getElementById("modal-background").classList.remove('active');   
}

function launchModal(){    
    $("#modal-content").attr("class","active");
    $("#modal-background").attr("class","active");
}

function sendMsj(msj){
    var editorExtensionId = $("#ext_ID").html();            
    browser.runtime.sendMessage(editorExtensionId, {msjBunker: msj});        
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction(menu) {    
    if(menu==1){
        document.getElementById("myDropdown").classList.toggle("show");
        document.getElementById("myDropdown2").classList.remove('show');
    }else{
        document.getElementById("myDropdown2").classList.toggle("show");
        document.getElementById("myDropdown").classList.remove('show');
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}