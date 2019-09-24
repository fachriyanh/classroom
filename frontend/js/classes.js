// var greet = "selamat datang, ";
// var name = "Udin";

// var greeting = greet + name;
// console.log(greeting);

// var angka = 12;

// // if (angka == 10) {
// //     alert("angka sekarng"+angka);
// // } else if (angka > 10){
// //     alert("sekarang lebih dari 10. yaitu"+angka)
// // } else{
// //     alert(angka);
// // }

// var kendaraan = ["Mobil", "Motor"];

// kendaraan.push("Becak");
// console.log(kendaraan);

// for(var i=0; i < kendaraan.length; i++){
//     console.log(kendaraan[i])
// }

// var dict = {
//     number : 2
// }

// dict.number;
// dict["number"];

// console.log(dict.number);
// console.log(dict["number"]);

// dict.kelas = "Makers";
// dict["alamat"] = "JL Kyai Gede";

// var biodata = {
//     kantor : [
//         {
//             nama : "Asep",
//             alamat : "Bandung",
//             telepon :[776445, 084567890098],
//             game :{
//                 mobile : "PUBG",
//                 pc : "Dota 2",
//                 console : ["Winning Eleven", "CTR"]
//             }
//         },
//         {
//             nama : "pram",
//             alamat : "sumedang"
//         }
//     ],
//     rumah : [
//         {
//             nama :"robby",
//             alamat : "bandung"
//         },
//         {
//             nama :"hirzy",
//             alamat : "aceh"
          
//         }
//     ]
// }

// console.log(dict)
// console.log(biodata.kantor[0].game.console[1])


var xhr = new XMLHttpRequest();

function getClasses() {
    xhr.open("GET", "http://127.0.0.1:5000/classes");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status < 400) {
            respon = JSON.parse(this.response);
            console.log(respon);
        } else if (this.readyState == 4) {
            respon = JSON.parse(this.response)
            console.log(respon)
        }
    }
}


function getClasswork (){
    xhr.open("GET", "http://127.0.0.1:5000/classwork/2");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status < 400){
            respon = JSON.parse(this.response);
            console.log(respon)
        }
    }
}

function login() {
    xhr.open("POST", "http://127.0.0.1:5000/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "username" : "admin",
        "password" : "admin"
    }));
    xhr.onreadystatechange = function (){
        if (this.readyState == 4 && this.status < 400){
            respon = JSON.parse(this.response);
            alert(respon.message);
        } else if (this.readyState == 4){
            respon = JSON.parse(this.response);
            alert(respon);
        }
    }
}

// login()

function createClassXhr () {
    xhr.open("POST", "http://127.0.0.1:5000/class");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "classid" : 3,
        "classname" : "frontend",
        "teacher" : [1]
    }));
    xhr.onreadystatechange = function (){
        if (this.readyState == 4 && this.status < 400){
            respon = JSON.parse(this.response);
            alert(respon.message);
        } else if (this.readyState == 4){
            respon = JSON.parse(this.response);
            alert(respon);
        }
    }
}

// createClass();

function getClasses() {
    $.ajax({
        url : 'http://127.0.0.1:5000/classes',
        method : 'GET',
        success: function (response) {
            console.log(response)
            for (var i = 0; i < response.length; i++){
                console.log(i)
                var classTampil = `
                <div class="petak">
                    <div class="background">
                        <div class="icon"><i class="fa fa-ellipsis-v"  aria-hidden="true" style="font-size: 20px; color: rgba(255, 255, 255, 0.644)"></i></div>
                        <div class="name" style="font-size: 26px" >${response[i].classname}</div>
                        <div class="name"><small>Makers Institut</small></div>
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
        },
        error : function(errornya) {
            alert(JSON.parse(errornya.responseText))
        },
        complete : function() {
            alert('Sudah Complete')
        }
    })
}
getClasses()

function getClasses() {
    $.ajax({
        url : 'http://127.0.0.1:5000/classes',
        method : 'GET',
        success: function (response) {
            console.log(response)
            for (var i = 0; i < response.length; i++){
                console.log(i)
                var classTampil = `
                <div class="petak">
                    <div class="background">
                        <div class="icon"><i class="fa fa-ellipsis-v"  aria-hidden="true" style="font-size: 20px; color: rgba(255, 255, 255, 0.644)"></i></div>
                        <div class="name" style="font-size: 26px" >${response[i].classname}</div>
                        <div class="name"><small>Makers Institut</small></div>
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
        },
        error : function(errornya) {
            alert(JSON.parse(errornya.responseText))
        },
        complete : function() {
            alert('Sudah Complete')
        }
    })
}