import os
import hdf5_getters3 as hdf5_getters



from pyspark.sql import HiveContext, Row
import hdf5_getters3 as hdf5_getters
from pyspark import SparkConf, SparkContext

#conf = SparkConf().setMaster("iccluster064.iccluster.epfl.ch:8042").setAppName("milliong_song_pace")\
#    .set("spark.num-executors", "4").set("spark.executor-cores", "5")\
#    .set("spark.executor-memory", "2g")
sc = SparkContext()





def create_csv():
    rows = []
    rows.append(','.join(['track_id', 'title', 'song_id', 'artist_mbid',
                          'artist_id', 'artist_name', 'artist_familiarity',
                          'artist_similarity', 'artist_latitude',
                          'artist_longitude', 'artist_mbtags',  'artist_terms',
                          'artist_hotttnesss', 'danceability', 'energy',
                          'duration', 'key', 'loudness',  'song_hotttnesss',
                          'tempo', 'year', 'SongKeyConfidence', 'SongTimeSignature', 'SongTimeSignatureConfindece',
                          'ArtistLocation', 'ArtistTermFreq', 'ArtistTermWeight', 'num_songs'])+"\n")
    counter = 1 
    written = 0
    # We will cover each h5 files
    for (dirpath, dirnames, filenames) in os.walk("/buffer/million-song/dataset/"):
	if "AdditionalFiles" in dirpath:
	    continue
        for filename in filenames:
            if counter % 100000 == 0:
                print(str(int(counter / 10000)) + "%")
    		with open('/home/ruenz/pace/millionsong.csv', 'a+') as f:
    		    f.writelines(rows[written:])
		    written = len(rows)
            counter += 1
            # We extract the metadata we are interested in.
            h5 = hdf5_getters.open_h5_file_read(
                os.path.join(dirpath, filename))
            track_id = hdf5_getters.get_track_id(h5)
            title = hdf5_getters.get_title(h5)
            song_id = hdf5_getters.get_song_id(h5)
            artist_id = hdf5_getters.get_artist_id(h5)
            artist_mbid = hdf5_getters.get_artist_mbid(h5)
            artist_name = hdf5_getters.get_artist_name(h5)
            artist_familiarity = hdf5_getters.get_artist_familiarity(h5)
            artist_similarity = '['+";".join([item.replace("\n","") for item in hdf5_getters.get_similar_artists(h5)])+']'
#	    print(artist_similarity)
            artist_latitude = hdf5_getters.get_artist_latitude(h5)
            artist_longitude = hdf5_getters.get_artist_longitude(h5)
            artist_mbtags = '['+";".join([item.replace("\n","") for item in hdf5_getters.get_artist_mbtags(h5)])+']'
            artist_hotttnesss = hdf5_getters.get_artist_hotttnesss(h5)
            artist_terms = '['+";".join([item.replace("\n","") for item in hdf5_getters.get_artist_terms(h5)])+']'
            danceability = hdf5_getters.get_danceability(h5)
            energy = hdf5_getters.get_energy(h5)
            duration = hdf5_getters.get_duration(h5)
            key = hdf5_getters.get_key(h5)
            loudness = hdf5_getters.get_loudness(h5)
            song_hotttnesss = hdf5_getters.get_song_hotttnesss(h5)
            tempo = hdf5_getters.get_tempo(h5)
            year = hdf5_getters.get_year(h5)


	    # Additional fields
	    key_confidence = hdf5_getters.get_key_confidence(h5)
            time_signature = hdf5_getters.get_time_signature(h5)
            time_signature_confidence = hdf5_getters.get_time_signature_confidence(h5)
            artist_location = hdf5_getters.get_artist_location(h5).replace(',',';')
            artist_terms_freq = "["+";".join([str(item) for item in hdf5_getters.get_artist_terms_freq(h5)])+']'
            artist_terms_weight = "["+";".join([str(item) for item in hdf5_getters.get_artist_terms_weight(h5)])+']'

	    num_songs = hdf5_getters.get_num_songs(h5)

            # We add the metadata to our list
            row = [track_id,title, song_id, artist_mbid, artist_id,
                   artist_name, artist_familiarity,
                   artist_similarity, artist_latitude,
                   artist_longitude, artist_mbtags,
                   artist_terms, artist_hotttnesss,
                   danceability, energy, duration, key,
                   loudness, song_hotttnesss, tempo, year, 
		   key_confidence, time_signature, time_signature_confidence,
		   artist_location, artist_terms_freq, artist_terms_weight, num_songs]
#            print(row)
            row = map(lambda x : str(x),row)
            rows.append(', '.join(row)+"\n")
            h5.close()
    return rows


rows = create_csv()
with open('/home/ruenz/millionsong_total.csv', 'w+') as f:
    f.writelines(rows)
