from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

MYSQL_HOST = 'localhost'
MYSQL_USER = 'root'
MYSQL_PASSWORD = ''
MYSQL_DB = 'profiler'
engine_url = "mysql://{}:{}@{}/{}?charset=utf8mb4".format(MYSQL_USER,
                                                          MYSQL_PASSWORD,
                                                          MYSQL_HOST,
                                                          MYSQL_DB)

engine = create_engine(engine_url)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()
