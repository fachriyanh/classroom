from app import db

class score(db.Model) : 
    __tablename__ = 'score'

    scoreid = db.Column(db.Integer, primary_key=True)
    studentid = db.Column (db.Integer, db.ForeignKey('student.studentid'))
    classworkid = db.Column(db.Integer, db.ForeignKey('classwork.classworkid'))
    answer = db.Column (db.String())
    score = db.Column (db.Integer())
    # created_at = db.Column(db.datetime())
    # updated_at = db.Column(db.datetime())
    # deleted_at = db.Column(db.datetime())

    def __init__(self, studentid, classworkid, answer, score) :  
        self.studentid = studentid
        self.classworkid = classworkid
        self.answer = answer
        self.score = score
        # self.created_at = created_at
        # self.updated_at = updated_at
        # self.deleted_at = deleted_at

    def __repr__(self) :
        return '<score id{}>'.format(self.scoreid)

    def serialize(self) :
        return {
            'studentid' : self.studentid,
            'classworkid' : self.classworkid,
            'answer' : self.answer,
            'score' : self.score 
            # 'created_at' : self.created_at,
            # 'updated_at' : self.updated_at,
            # 'deleted_at' : self.deleted_at
        }
