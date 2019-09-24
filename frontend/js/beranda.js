function getScore() {
    var studentid = getCookie("studentid");
    var asa = getCookie("asa");

    $.ajax({
        url : 'http://127.0.0.1:5000/score/student/'+studentid,
        method : 'GET',
        success : function(response) {
            if (asa == "student") {
                var urscore = `
                    <div> <b> ${response} <b></div>
                `
                $('.container').append(urscore)
            }
        }
    })
}

function getClasses() {
    var studentid = getCookie("studentid");
    var teacherid = getCookie("teacherid");
    var asa = getCookie("asa");
    
    $.ajax({
        url : 'http://127.0.0.1:5000/classes',
        method : 'GET',
        success: function (response) {
            if (asa=="student") {
                for (var i = 0; i < response.data.length; i++){
                            var classTampil = `
                            <div class="petak">
                                <div class="background">
                                    <div class="icon"><i class="fa fa-ellipsis-v"  aria-hidden="true" style="font-size: 20px; color: rgba(255, 255, 255, 0.644)"></i></div>
                                    <a href = "class.html?id=${response.data[i].classid}">${response.data[i].classname}</a>
                                </div>
                                <div class="pict"> <img src="../asset/city.jpg" width="150px"></div>
                                <div class="footer">
                                    <div style="margin-left: auto"><i class="fa fa-address-book-o" aria-hidden="true" style= "font-size: 25px; color: rgba(67, 101, 90, 0.651)" ></i></div>
                                    <div><i class="fa fa-folder-o" aria-hidden="true" style="font-size: 25px; color: rgba(67, 101, 90, 0.651)"></i></div>
                                </div>
                            </div>
                            `
                        $('.body').append(classTampil)
                    }
                } else {
                    for (var i = 0; i< response.data.length; i++){
                        if (response.data[i].teacherid == teacherid){
                            var classTampil = `
                            <div class="petak">
                                <div class="background">
                                    <div class="icon"><i class="fa fa-ellipsis-v"  aria-hidden="true" style="font-size: 20px; color: rgba(255, 255, 255, 0.644)"></i></div>
                                    <a href = "class.html?id=${response.data[i].classid}">${response.data[i].classname}</a>
                                </div>
                                <div class="pict"> <img src="../asset/city.jpg" width="150px"></div>
                                <div class="footer">
                                    <div style="margin-left: auto"><i class="fa fa-address-book-o" aria-hidden="true" style= "font-size: 25px; color: rgba(67, 101, 90, 0.651)" ></i></div>
                                    <div><i class="fa fa-folder-o" aria-hidden="true" style="font-size: 25px; color: rgba(67, 101, 90, 0.651)"></i></div>
                                </div>
                            </div>
                            `
                        $('.body').append(classTampil)

                        }
                    }
                }
        },
        error : function(errornya) {
            alert(JSON.parse(errornya.responseText))
        },
        complete : function() {
            console.log('Sudah Complete')
        }
    })
}
getScore()
getClasses()

function addClass () {
    var asa = getCookie("asa")
    var teacherid = getCookie("teacherid")
    if (asa == "teacher") {
        var classnamenya = $('input#classname').val()
        $.ajax({
            url : 'http://127.0.0.1:5000/addclass',
            method : 'POST',
    
            contentType : 'application/json',
            data : JSON.stringify({
                classname : classnamenya,
                teacherid : teacherid 
            }),
    
            success : function(response) {
                window.location.href = 'beranda.html';
            },
            error : function(errornya) {
                alert("Eroor")
            }
        });
    } else {
        alert("You have to login as Teacher to create a class")
    }
}



function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var submit = document.getElementsByClassName("submit")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
submit.onclick = function() {
  modal.style.display = addClass();
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}