from app import db

class regTeacher(db.Model) : 
    __tablename__ = 'teacher'

    teacherid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    password = db.Column (db.String())
    email = db.Column(db.String())
    fullname = db.Column(db.String())

    # created_at = db.Column(db.datetime())
    # updated_at = db.Column(db.datetime())
    # deleted_at = db.Column(db.datetime())

    def __init__(self, username, password, fullname, email) :  
        self.username = username
        self.password = password
        self.email = email
        self.fullname = fullname
        # self.created_at = created_at
        # self.updated_at = updated_at
        # self.deleted_at = deleted_at

    def __repr__(self) :
        return '<teacher id{}>'.format(self.teacherid)

    def serialize(self) :
        return {
            'teacherid' : self.teacherid,
            'username' : self.username,
            'password' : self.password,
            'fullname' : self.fullname,
            'email' : self.email
            # 'created_at' : self.created_at,
            # 'updated_at' : self.updated_at,
            # 'deleted_at' : self.deleted_at
        }

class regStudent(db.Model) : 
    __tablename__ = 'student'

    studentid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    password = db.Column (db.String())
    email = db.Column(db.String())
    fullname = db.Column(db.String())
    
    # created_at = db.Column(db.datetime())
    # updated_at = db.Column(db.datetime())
    # deleted_at = db.Column(db.datetime())

    def __init__(self, username, password, email, fullname) :  
        self.username = username
        self.password = password
        self.email = email
        self.fullname = fullname
        
        # self.created_at = created_at
        # self.updated_at = updated_at
        # self.deleted_at = deleted_at

    def __repr__(self) :
        return '<student id{}>'.format(self.studentid)

    def serialize(self) :
        return {
            'studentid' : self.studentid,
            'username' : self.username,
            'password' : self.password,
            'email' : self.email,
            'fullname' : self.fullname
            
            # 'created_at' : self.created_at,
            # 'updated_at' : self.updated_at,
            # 'deleted_at' : self.deleted_at
        }
