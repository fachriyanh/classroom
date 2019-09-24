from app import db

class allClasses(db.Model) : 
    __tablename__ = 'classes'

    classid = db.Column(db.Integer, primary_key=True)
    classname = db.Column(db.String())
    teacherid = db.Column (db.Integer, db.ForeignKey('teacher.teacherid'))
    # created_at = db.Column(db.datetime())
    # updated_at = db.Column(db.datetime())
    # deleted_at = db.Column(db.datetime())

    def __init__(self, classname, teacherid) :  
        self.classname = classname
        self.teacherid = teacherid
        # self.created_at = created_at
        # self.updated_at = updated_at
        # self.deleted_at = deleted_at

    def __repr__(self) :
        return '<class id{}>'.format(self.classid)

    def serialize(self) :
        return {
            'classid' : self.classid,
            'classname' : self.classname,
            'teacherid' : self.teacherid
            # 'created_at' : self.created_at,
            # 'updated_at' : self.updated_at,
            # 'deleted_at' : self.deleted_at
        }
