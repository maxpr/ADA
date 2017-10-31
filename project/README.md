# Title
Evolution in music through the years.

# Abstract
A 150 word description of the project idea, goals, dataset used.
What story you would like to tell and why? What's the motivation behind your project?

The music world is constantly increasing with lot of songs published everyday from all over the world. Moreover, the world is becoming more connected and this helps to spread music popularity. We want to understand how music popularity evolved in the last roughly 60 years, as music is a really important social factor. People express themselves, and lot of cultural events and customs are derived from it.
This popularity could help explain some movements influence, the creation of some music styles and what makes a song popular.
If there was a "perfect" composition it would be interesting as it has also become a money-making industry.
We will use the dataset from MillionSongDB, coupled with some website such as The Echo Nest API (Spotify now) and musicbrainz.


# Research questions
A list of research questions you would like to address during the project. 

Which features did change (e.g. bpm, beats)?  
How did genres change (e.g. popularity, features of specific genre, higher variance)?  
How did the distribution of music change (e.g. change of number of genres, variance of features)?  
Which songs from the past are still trending (why)?  
How did song titles (artist names) change over time?  
Where did songs get released at which time (find dependecies between similar Songs)?  

# Dataset
We want to use the dataset from MillionSong DB.  
It consist of .h5 files containing song, classified in different subfolders.
For each .h5 files, we can use the method given in the hdf5_getters provided by the website to extract useful information.
The most important one is the .get_num_song(file) that return the number of rows in the actual files, then you can get lot of information on the artists, songs, etc.
These are the field that could be exploited https://labrosa.ee.columbia.edu/millionsong/faq [second item].  
Furthermore a few additional files can be bundled via offered scripts (longitude, similarities, year).  
Genres are called "terms" in the dataset. The genres of an artist can be fetched from the field "artist terms". Or from one of the additinal files.
There are several features which have been calculated with algorithms: bpm ("tempo"), dancabilty, duration, ...
Possibly further facts can be retrieved from the Spotify API since the Echo Nest API is shut down.  
Since the dataset is quite large and we will start to look at the additional files to get as much as we can.
Furthermore, a subset exits, which we can use for first tests.
Later on, we can fetch additional information from the whole data set.


# A list of internal milestones up until project milestone 2
**10.11.2017**: Fetch all needed data

**17.11.2017**: Clean data and get the features we are interested in

**28.11.2017**: Submit the data collection with descriptive analysis

**11.12.2017**: State relevant conclusions and start the blog design

**19.12.2017**: Submit the report

**29.12.2017**: Submit the project

# Questions for TAa
Add here some questions you have for us, in general or project-specific.

Is there a possibility to convert IDs from the dataset to Spotify URNs?
