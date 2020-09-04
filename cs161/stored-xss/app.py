#!/usr/bin/env python

import sqlite3

from flask import Flask, redirect, render_template, request, url_for

CREATE_QUERY = "CREATE table IF NOT EXISTS comment (id integer primary key, name TEXT, comment TEXT)"

conn = sqlite3.connect('db.sqlite3')
conn.execute(CREATE_QUERY)
conn.close()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.debug = True
    app.run()
