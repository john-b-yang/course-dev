#!/usr/bin/env python

import sqlite3

from flask import Flask, redirect, render_template, request, url_for

CREATE_QUERY = "CREATE table IF NOT EXISTS comments (id integer primary key, name TEXT, comment TEXT)"

conn_ = sqlite3.connect('db.sqlite3')
conn_.execute(CREATE_QUERY)
conn_.close()

app = Flask(__name__)

class Comment(object):
    def __init__(self, name, comment):
        self.name = name
        self.comment = comment

@app.route('/')
def index():
    comments = []
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    for row in c.execute('SELECT name, comment FROM comments'):
        comments.append(Comment(*row))
    conn.close()
    return render_template('index.html', posts=comments)

@app.route('/clear', methods=['GET', 'POST'])
def clear():
    conn = sqlite3.connect('db.sqlite3')
    with conn:
        conn.execute('DELETE FROM comments')
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

@app.route('/comment', methods=['POST'])
def comment():
    name, text = request.form['name'], request.form['comment']
    conn = sqlite3.connect('db.sqlite3')
    with conn:
        conn.execute('INSERT INTO comments(name, comment) values (?, ?)', (name, text))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.debug = True
    app.run()
