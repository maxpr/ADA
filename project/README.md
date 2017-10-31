# Title
Time changed Music

# Abstract
A 150 word description of the project idea, goals, dataset used. What story you would like to tell and why? What's the motivation behind your project?
The music world is constantly increasing with lot of songs published everyday from all over the world. Moreover, the world is becoming more connected and this helps to spread music popularity.


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
These are the field that could be exploited https://labrosa.ee.columbia.edu/millionsong/faq [Second div].
Possibly further facts can be retrieved from the Spotify API since the Echo Nest API is shut down.

# A list of internal milestones up until project milestone 2
Add here a sketch of your planning for the next project milestone.

# Questions for TAa
Add here some questions you have for us, in general or project-specific.
Is there a possibility to convert Echo Nest IDs to Spotify URNs?