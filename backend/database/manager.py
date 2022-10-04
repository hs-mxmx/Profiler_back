from backend.database import db
from backend.database.models import User, Session


class DBManager:

    def __create__(self):
        db.Base.metadata.create_all(db.engine)

    def __insert_user__(self, uuid, accessToken, name, username, mail, password):
        user = User(uuid, accessToken, name, username, mail, password)
        db.session.add(user)
        db.session.commit()

    def __get_all_user__(self):
        return db.session.query(User).all()

    def __get_user_byUid__(self, uid):
        return db.session.query(User).filter_by(uid=uid).first()

    def __get_user_byUsername__(self, username):
        return db.session.query(User).filter_by(username=username).first()

    def __get_user_byEmail__(self, email):
        return db.session.query(User).filter_by(email=email).first()

    def _get_user_count(self):
        return db.session.query(User).count()

    def __insert_session__(self, session):
        db.session.add(session)

    def __get_sid_byUid__(self, uid):
        return db.session.query(Session).filter_by(uid=uid).first()
