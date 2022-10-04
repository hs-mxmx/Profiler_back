import uuid
from flask_cors import CORS, cross_origin
import flask
from backend.config.logging import LoggingClass
from flask import Flask, render_template, redirect, request, session, Response
from backend.database.manager import DBManager

dictConfig = LoggingClass()


def __create_app__(test_config=None):
    app = Flask(__name__,
                instance_relative_config=True)
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    dbManager = DBManager()

    if test_config is None:
        app.config['SECRET_KEY'] = 'fromdev'

    else:
        app.config['SECRET_KEY'] = 'fromtest'

    @app.before_request
    def make_session_permanent():
        session.permanent = True

    @app.route('/auth/signup', methods=["PUT"], strict_slashes=False)
    @cross_origin(origin='*', headers=['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'])
    def set_session():
        session["name"] = request.json['name']
        session["username"] = request.json['username']
        session["email"] = request.json['email']
        session["password"] = request.json['password']
        session["uid"] = uuid.uuid4()
        session["accessToken"] = uuid.uuid4()
        session["logged_in"] = True
        dbManager.__insert_user__(str(session["uid"]),
                                  str(session["accessToken"]),
                                  str(session["name"]),
                                  str(session["username"]),
                                  str(session["email"]),
                                  str(session["password"]))

        response = flask.jsonify(
            {
                "Name": str(session["name"]),
                "Username": str(session["username"]),
                "Mail": str(session["email"]),
                "Password": str(session["password"]),
                "UID": str(session["uid"]),
                "accessToken": str(session["accessToken"]),
            }
        )
        return response

    @app.route('/auth/signin', methods=["POST"], strict_slashes=False)
    @cross_origin(origin='*', headers=['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'])
    def get_login():
        if session.get('username') and session.get('email'):
            if str(session["accessToken"]) == dbManager.__get_user_byUsername__(session["username"]):
                print("ok")
            session["logged_in"] = True
            # El usuario mantiene sesion activa
        else:
            user = dbManager.__get_user_byUsername__(request.json["username"])
            if user:
                session["name"] = user.name
                session["username"] = user.username
                session["email"] = user.email
                session["uid"] = user.uid
                session["accessToken"] = user.accessToken
                session["logged_in"] = True
                response = flask.jsonify({
                    "username": str(session["username"]),
                    "accessToken": str(session["accessToken"])
                },
                )
            else:
                response = Response(status=400, mimetype='application/json', response='null')
            return response

    @app.route('/', methods=["GET"], strict_slashes=False)
    @cross_origin(origin='*', headers=['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'])
    def get_session():
        if session.get('username'):
            response = flask.jsonify({
                "username": str(session["username"]),
                "accessToken": str(session["accessToken"])
            },
            )
        else:
            response = Response(status=400, mimetype='application/json', response='null')
        return response

    @app.route('/db')
    def db_manager():
        dbManager = DBManager()
        dbManager.__create__()
        return 'Ok'

    return app


app = __create_app__()
