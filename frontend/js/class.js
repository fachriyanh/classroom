function getClass() {
    var asa = getCookie("asa");
    $.ajax({
        url : 'http://127.0.0.1:5000/classwork/class/'+classId,
        method : 'GET',
        success: function (response) {
            $('.tasklist').empty();
            if (asa=="student"){
                for (var i = 0; i < response.data.length ; i++){
                    var classTampil = `
                        <div class="taskspec">
                            <div class="comp"><i class="fa fa-list-alt" aria-hidden="true" style="font-size: 29px; color: #43655A"></i></div>
                            <div class="comp">${response.data[i].question}</div>
                            <div style="margin-left : auto"><input type="text" id="answer" name="answer" placeholder="Your Answer"></div>
                            <input type="button" class="answer-button" onclick="submit(${response.data[i].classworkid})" value="Submit">
                    </div>
                    `
                    $('.tasklist').append(classTampil);
                }
            } else if(asa=="teacher"){
                // var pertanyaan = $('input#quest').val();
                var adding = `                    
                <div class="taskspec">
                <div style="margin-left:1cm"><input type="text" style="width:12cm ;height: 0.8cm; text-align:center" id="quest" name="quest" placeholder="Add Classwork"></div>
                <div style="margin-left:1cm"><input type="text" style="width:4cm ;height: 0.8cm; text-align:center" id="answer" name="answer" placeholder="True Answer"></div>
                <input float="right" type="button" class="answer-button" onclick="addQuest(($('input#quest').val()),($('input#answer').val()))" value="Submit">
                </div>
                `
                $('.tasklist').append(adding);

                for (var i = 0; i < response.data.length ; i++){
                    var classTampil = `
                        <div class="taskspec">
                                <div class="comp">${response.data[i].question}</div>
                                <div class="comp" style="margin-right: 7cm">Answer = ${response.data[i].true_answer}</div>
                                <input style="margin-left:auto" type="button" class="answer-button" onclick="delQuest(${response.data[i].classworkid})" value="Delete">
                        </div>
                        `
                    $('.tasklist').append(classTampil);
                }
            }
            },
            error : function(errornya) {
                console.log((JSON.parse(errornya.responseText)))
            },
            complete : function() {
                console.log('Sudah Complete')
            }
    })
}

function getMember() {
    $.ajax({
        url : 'http://127.0.0.1:5000/class/'+classId,
        method : 'GET',
        success: function (response) {
            $('.tasklist').empty();
            for (var i = 0; i < response.data.students.length ; i++){
                var classTampil = `
                <div class="taskspec">
                    <div class="comp">${response.data.students[i]}</div>
                </div>
                `
                $('.tasklist').append(classTampil);
            }
        },
        error : function(errornya) {
            console.log((JSON.parse(errornya.responseText)))
        },
        complete : function() {
            console.log('Sudah Complete')
        }
    })
}

var classId=window.location.search.slice(4,(window.location.search.length));

function submit(classworkid) {
    var answernya = $('input#answer').val()
    var studentid = getCookie("studentid");

    $.ajax({
        url : 'http://127.0.0.1:5000/answer/'+classworkid,
        method : 'POST',

        contentType : 'application/json',
        data : JSON.stringify({
            studentid : studentid,
            classworkid : classworkid, 
            answer : answernya 
        }),

        success : function(response) {
            // scoring(answernya);
            alert('Jawaban berhasil di submit');
            join(studentid);
            location.reload()
        },

        error : function(errornya) {
            alert("error")
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

function addQuest(pertanyaan, jawaban) {
    $.ajax({
        url : 'http://127.0.0.1:5000/classwork',
        method : 'POST',
        contentType : 'application/json',
        data : JSON.stringify({
            classid : parseInt(classId),
            question : pertanyaan,
            true_answer : jawaban 
        }),

        success : function(response) {
            alert('Pertanyaan berhasil di submit')
        },

        error : function(errornya) {
            alert("error")
        }
    });
}

function delQuest(classworkid) {
    $.ajax({
        url : 'http://127.0.0.1:5000/classwork/'+classworkid,
        method : 'DELETE',
        success: function (response) {
            alert(response);
        }
    })
}

