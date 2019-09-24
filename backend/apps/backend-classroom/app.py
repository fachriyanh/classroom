import os
from src.utils.authorization import encode, decode
from flask import Flask, request, json, jsonify
from flask_cors import CORS
from src.utils.crypt import enkripsi, dekripsi
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)

POSTGRES = {
    "user" : 'postgres',
    'pw' : 'postgres',
    'db' : 'classroom',
    'host' : 'localhost',
    'port' : '5432' 
}

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s' %POSTGRES

db.init_app(app)
from model.register import regTeacher, regStudent
from model.classes import allClasses
from model.join import joinClass
from model.classwork import classWork
from model.score import score

# ------------------ routes -----------------------------------------
@app.route('/')
def testConnection():
    return "connected"

@app.route('/register/teacher', methods=["POST"])
def registerTeacher() :
    body = request.json
    teacherData = regTeacher.query.all()
    statusCode = 200

    for user in teacherData :
        print(body)
        if (user.serialize()["email"]) == body["email"] :
            statusCode = 400
            response = "Email sudah dipakai"
            break
        elif body["username"] == (user.serialize()["username"]) :
            response = "Username sudah dipakai"
            statusCode = 400
            break
    
    if statusCode == 200 :
        try:
            register = regTeacher(body['username'], enkripsi(body['password']),body['email'],body['fullname'])
            db.session.add(register)
            db.session.commit()
            response = "Akun Berhasil Dibuat"

        except Exception as e:
            return jsonify(str(e)), 500
        finally :
            db.session.close()

    return jsonify(response), statusCode
    
@app.route('/login/teacher', methods=["POST"])
def loginTeacher():
    body = request.json
    statusCode = 400
    try :
        teacherData = regTeacher.query.all()
        for user in teacherData:
            if (user.serialize()["username"]) == body["username"]:
                if dekripsi(user.serialize()["password"]) == body["password"]:
                    statusCode = 200
                    response = ({'data':[user.serialize()]});
                    return jsonify(response)
    except Exception as e :
        return jsonify(str(e)), 500

@app.route('/teachers', methods=["GET"])
def getAllTeachers():
    try:
        teachers = regTeacher.query.all()
        return jsonify({'teachers':[tcr.serialize() for tcr in teachers]})
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/teacher/<id_>', methods=["GET"])
def getTeacher(id_):
    try:
        teacher = regTeacher.query.filter_by(teacherid=id_).first()
        return jsonify(teacher.serialize())
    except Exception as e:
        return jsonify(str(e)), 500


@app.route('/register/student', methods=["POST"])
def registerStudent() :
    body= request.json
    studentData = regStudent.query.all()
    statusCode = 200

    for user in studentData :
        print(user.serialize()['email'])
        if body["email"] in (user.serialize()['email']) :
            statusCode = 400
            return jsonify("Email telah digunakan")
            break
        elif body["username"] in (user.serialize()['username']) :
            statusCode = 400
            return jsonify("Username telah digunakan")
            break
    
    if statusCode == 200 :
        try:
            register = regStudent(body['username'], enkripsi(body['password']),body['fullname'],body['email'])
            db.session.add(register)
            db.session.commit()
            return jsonify ({
                'studentid' : register.studentid
            })
        except Exception as e:
            return jsonify(str(e)), 500
        finally :
            db.session.close()


@app.route('/login/student', methods=["POST"])
def loginStudent():
    body = request.json
    statusCode = 400
    try :
        studentData = regStudent.query.all()
        for user in studentData:
            if (user.serialize()["username"]) == body["username"]:
                if dekripsi(user.serialize()["password"]) == body["password"]:
                    statusCode = 200
                    response = ({'data':[user.serialize()]})
                    return response
    except Exception as e :
        return jsonify(str(e)), 500

@app.route('/students', methods=["GET"])
def getAllStudents():
    try:
        students = regStudent.query.all()
        return jsonify({'students':[std.serialize() for std in students]})
    except Exception as e:
        return jsonify(str(e)), 500


@app.route('/student/<id_>', methods=["GET"])
def getStudent(id_):
    try:
        student = regStudent.query.filter_by(studentid=id_).first()
        return jsonify(student.serialize())
    except Exception as e:
        return jsonify(str(e)), 500


@app.route('/addclass', methods=["POST"])
def addClass():
    body = request.json
    try:
        classes = allClasses(body['classname'], body['teacherid'])
        db.session.add(classes)
        db.session.commit()
        return jsonify ({
            'classid' : classes.classid
        })
    except Exception as e:
        return jsonify(str(e)), 500
    finally :
        db.session.close()

@app.route('/classes', methods=["GET"])
def getAllClasses():
    try:
        classes = allClasses.query.all()
        response = ({'data':[cls.serialize() for cls in classes]})
        return response
    except Exception as e:
        return jsonify(str(e)), 500


@app.route('/class/<id_>', methods=["GET"])
def getClass(id_):
    try:
        classes = allClasses.query.filter_by(classid=id_).first()
        return jsonify(classes.serialize())
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/join', methods=["POST"])
def join() :
    body=request.json
    try:
        join = joinClass(body['studentid'], body['classid'])
        db.session.add(join)
        db.session.commit()
        return jsonify ({
            'joinid' : join.joinid
        })
    except Exception as e:
        return jsonify(str(e)), 500
    finally :
        db.session.close()

@app.route('/member/class/<id_>', methods=["GET"])
def getMember(id_) :
    try:
        member = joinClass.query.filter_by(classid=id_).all()
        return jsonify({"member" : [mbr.serialize() for mbr in member]})
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/classwork', methods=["POST"])
def addClasswork() :
    body = request.json
    try:
        classwork = classWork(body['classid'],body['question'],body['true_answer'])
        db.session.add(classwork)
        db.session.commit()
        return jsonify ({
            'classwork_id' : classwork.classworkid
        })
    except Exception as e:
        return jsonify(str(e)), 500
    finally :
        db.session.close()

@app.route("/classwork/class/<id_>", methods=['GET'])
def getClassworkByClass(id_) :
    try:
        classwork = classWork.query.filter_by(classid=id_).all()
        response = ({'data':[cw.serialize() for cw in classwork]})
        return response
    except Exception as e:
        return jsonify(str(e)), 500

@app.route("/answer/<id_>", methods=["POST"])
def answer(id_) :
    body = request.json
    true_answer = classWork.query.filter_by(classworkid=id_).first()
    print(true_answer)
    try:
        answer = score(body['studentid'], body['classworkid'], body['answer'], (10 if (true_answer.serialize()['true_answer'] == body['answer']) else 0))
        db.session.add(answer)
        db.session.commit()
        return jsonify(answer.serialize())
    except Exception as e :
        return jsonify(str(e)), 500
    finally :
        db.session.close()

@app.route("/score/student/<id_>", methods=["GET"])
def scoreStudent(id_) :
    try:
        scoreid = score.query.filter_by(studentid=id_).all()
        return jsonify(sum([scr.serialize()['score'] for scr in scoreid]))
    except Exception as e :
        return jsonify(str(e)), 500
