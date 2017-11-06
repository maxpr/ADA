# -*- coding: utf-8 -*-
"""
Created on Mon Nov  6 14:42:49 2017

@author: M4X
"""

import sqlite3 as sq
import os
import pandas as pd

def db_list_tables(path):
    print ("Connecting to DB at path {}".format(path))
    conn = sq.connect(path)
    c = conn.cursor()
    
    c.execute("select sql from sqlite_master where type = 'table'")
    
    print ("Tables in database:")
    for row in c.fetchall():
        print (row)
    print ()
  

path_artists_genres = os.path.join(".", "AdditionalFiles", "subset_artist_term.db")
db_list_tables(path_artists_genres)

path_artists_similarity = os.path.join(".", "AdditionalFiles", "subset_artist_similarity.db")
db_list_tables(path_artists_similarity)

path_track_metadata = os.path.join(".", "AdditionalFiles", "subset_track_metadata.db")
db_list_tables(path_track_metadata)
    
# get number of songs per year per artist
conn = sq.connect(path_track_metadata)
c = conn.cursor()
c.execute("""SELECT artist_id, artist_name, year, count(*) as cnt
            FROM songs
            GROUP BY artist_id, year
            Having year>0
            ORDER BY year""")

res_art_song_year = c.fetchall()
for i in range(5):
    print (res_art_song_year[i])
print()

#get mapping artist genre
conn = sq.connect(path_artists_genres)
c = conn.cursor()
c.execute("""SELECT artist_id, term
              FROM artist_term""")

res_art_genre = c.fetchall()
for i in range(5):
    print (res_art_genre[i])
print()

# merge lists: count number of songs per genre (if artist has 2 gernres, count for each one)
df_art_song_year = pd.DataFrame(res_art_song_year)
df_art_song_year.columns = ["artist_id", "artist_name", "year", "tracks"]
print(df_art_song_year.head())

df_art_genre = pd.DataFrame(res_art_genre)
df_art_genre.columns = ["artist_id", "genre"]
print(df_art_genre.head())

df_art_song_year_genre = pd.merge(df_art_song_year, df_art_genre, on="artist_id")
print(df_art_song_year_genre.head())

df_song_year_genre = df_art_song_year_genre.drop(df_art_song_year_genre.columns[:2], axis=1)
print(df_song_year_genre.head())

print(df_song_year_genre.sort_values(["tracks"], ascending=False).head())