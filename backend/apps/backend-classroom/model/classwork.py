from app import db

class classWork(db.Model) : 
    __tablename__ = 'classwork'

    classworkid = db.Column(db.Integer, primary_key=True)
    classid = db.Column (db.Integer, db.ForeignKey('classes.classid'))
    question = db.Column (db.String())
    true_answer = db.Column (db.String())
    # created_at = db.Column(db.datetime())
    # updated_at = db.Column(db.datetime())
    # deleted_at = db.Column(db.datetime())

    def __init__(self, classid, question, true_answer) :  
        self.classid = classid
        self.question = question
        self.true_answer = true_answer
        # self.created_at = created_at
        # self.updated_at = updated_at
        # self.deleted_at = deleted_at

    def __repr__(self) :
        return '<classwork id{}>'.format(self.classworkid)

    def serialize(self) :
        return {
            'classworkid' : self.classworkid,
            'classid' : self.classid,
            'question' : self.question,
            'true_answer' : self.true_answer 
            # 'created_at' : self.created_at,
            # 'updated_at' : self.updated_at,
            # 'deleted_at' : self.deleted_at
        }
