from backend.database import db
from sqlalchemy import Column, Integer, String


class User(db.Base):
    __tablename__ = 'user'
    uid = Column(String(50), primary_key=True)
    name = Column(String(30), nullable=False)
    username = Column(String(30), nullable=False)
    email = Column(String(50))
    password = Column(String(50))

    def __init__(self, uid, name, username, email, password):
        self.uid = uid
        self.name = name
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return {"uid": self.uid,
                "name": self.name,
                "username": self.username,
                "email": self.email,
                "password": self.password}

    def __str__(self):
        return self.username

class Session(db.Base):
    __tablename__ = 'session'
    sid = Column(Integer, primary_key=True)
    uid = Column(Integer)

    def __init__(self, sid, uid):
        self.sid = sid
        self.uid = uid

    def __dict__(self):
        return {"sid": self.sid,
                "userId": self.uid}
