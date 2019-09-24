from app import db

class joinClass(db.Model) : 
    __tablename__ = 'joinClass'

    joinid = db.Column(db.Integer, primary_key=True)
    studentid = db.Column (db.Integer, db.ForeignKey('student.studentid'))
    classid = db.Column (db.Integer, db.ForeignKey('classes.classid'))
    # created_at = db.Column(db.datetime())
    # updated_at = db.Column(db.datetime())
    # deleted_at = db.Column(db.datetime())

    def __init__(self, studentid, classid) :  
        self.studentid = studentid
        self.classid = classid
        # self.created_at = created_at
        # self.updated_at = updated_at
        # self.deleted_at = deleted_at

    def __repr__(self) :
        return '<join id{}>'.format(self.joinid)

    def serialize(self) :
        return {
            'joinid' : self.joinid,
            'classid' : self.classid,
            'studentid' : self.studentid
            # 'created_at' : self.created_at,
            # 'updated_at' : self.updated_at,
            # 'deleted_at' : self.deleted_at
        }
