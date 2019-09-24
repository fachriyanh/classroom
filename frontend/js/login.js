function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function loginStudent() {
    var usernamenya = $('input#username').val()
    var passwordnya = $('input#password').val()

    $.ajax({
        url : 'http://127.0.0.1:5000/login/student',
        method : 'POST',

        contentType : 'application/json',
        data : JSON.stringify({
            username : usernamenya,
            password : passwordnya 
        }),

        success : function(response) {
            createCookie("asa","student",1)
            createCookie("studentid",response.data[0].studentid,1);
            window.location.href = 'templates/beranda.html';

        },
        error : function(errornya) {
            alert("Username atau Password Salah")
        }
    });
};

function loginTeacher() {
    var usernamenya = $('input#username').val();
    var passwordnya = $('input#password').val();

    $.ajax({
        url : 'http://127.0.0.1:5000/login/teacher',
        method : 'POST',
        contentType : 'application/json',
        data : JSON.stringify({
            username : usernamenya,
            password : passwordnya 
        }),

        success : function(response) {
            createCookie("asa","teacher",1);
            createCookie("teacherid",(response.data[0].teacherid),1);
            window.location.href = 'templates/beranda.html';
        },
        error : function(errornya) {
            alert("Username atau Password Salah");
            window.location.reload()
        }
    });
};

function regisTeacher() {
    var usernamenya = $('input#regusername').val();
    var passwordnya = $('input#regpassword').val();
    var emailnya = $('input#regemail').val();
    var fullnamenya = $('input#regfullname').val();

    $.ajax({
        url : 'http://127.0.0.1:5000/register/teacher',
        method : 'POST',
        contentType : 'application/json',
        data : JSON.stringify({
            
            username : usernamenya,
            password : passwordnya,
            email : emailnya,
            fullname : fullnamenya
            
        }),

        success : function(response) {
            alert ("Akun Berhasil Dibuat. Silakan Login untuk Melanjutkan");
            window.location.reload();
        },
        error : function(response) {
            alert ("Username atau Email sudah digunakan");
            window.location.reload();
        }
    });
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

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}