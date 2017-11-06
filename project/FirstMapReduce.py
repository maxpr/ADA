import json
import os
import hdf5_getters
from pyspark.sql import Row
from pyspark import SparkContext, SQLContext

# context initialization
sc = SparkContext()
sqlContext = SQLContext(sc)

# fetch all needed files
files = []
for path, subdirs, files in os.walk(os.path.join("/datasets", "MillionSongSubset", "data")):
    for name in files:
        files.append(os.path.join(path, name))

# fetch year and bpm
def get_year_bpm(file):
    h5 = hdf5_getters.open_h5_file_read(file)
    bpm = hdf5_getters.get_tempo(h5)
    year = hdf5_getters.get_year(h5)
    return {bpm: bpm, year: year}
    

bpm_year = files.flatMap(get_year_bpm) \
    .map(lambda song: (song["year"], {bpm: song["bpm"], cnt: 1})) \
    .reduceByKey(lambda a, b: {bpm: a["bpm"]+b["bpm"], cnt: a["cnt"]+b["cnt"] } )

# convert to dataframe
counts = sqlContext.createDataFrame(bpm_year.map(lambda wc: Row(word=wc[0], bmp_sum=wc[1]["bmp_sum"], count=wc[1]["cnt"])))

# view the content of the dataframe
counts.show()

# save to json
counts.write.json("bmp_year.txt")