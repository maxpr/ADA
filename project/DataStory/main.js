$(function() {
  console.log("Loaded");

  let dataTempo;
  let dataLoudness;
  let dataDuration;

  let chartTempo;
  let chartLoudness;
  let chartDuration;

  $('#div-tempo').append(document.createElement('canvas'));

  $('#div-tempo canvas')
    .attr('id', 'chart-tempo')
    .attr('height', 200);

  let chartTempoCanvas = document.getElementById('chart-tempo');
  $.ajax({
    url:"data/SongTempoMean.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){

      for (let i=0; i< data.length; i++){
        data[i] = JSON.parse(data[i]);
        for (let j= 0; j < 3; j++){
          data[i].years.splice(-1,1);
          data[i].fit.splice(-1,1);
          data[i].points.splice(-1,1);
        }
      }
      dataTempo = data.slice();
      drawTempoChart(dataTempo);

      $('#SliderTempo').ionRangeSlider({
        type: "single",
        min: 1961,
        max: 2008,
        from: 2008,
        hide_min_max: true,
        prettify_enabled: false,
        onChange: sliderTempChange
      });
    }
  });

  function sliderTempChange(sliderData){
    let year = sliderData.from;
    let yearIndex = year-1961;
    let data = JSON.parse(JSON.stringify(dataTempo));
    for (let i=0; i< data.length; i++){
      for (let j=2008-1961; j > yearIndex; j--){
        data[i].fit.splice(-1,1);
        data[i].points.splice(-1,1);
      }
    }
    drawTempoChart(data);

    if (year > 1992){
      $('#div-tempo-descr').html('Last but not least, from the 90s to 2010, the tempo has slightly increase from 125 BPM again, which might be due to the popularisation of <b>Electronic</b> music due to the apparition of tools such as Autothune or Software as Ableton, new way of making music. From the same <a href="https://en.wikipedia.org/wiki/1970s_in_music">article</a> as before : "Electronic music, which had risen in popularity in the 1980s, grew highly popular in the 1990s; house and techno from the 1980s rose to international success in this decade, as well as new electronic dance music genres such as trance, happy hardcore, drum and bass, intelligent dance and trip hop." Example of Artists are: Daft Punk, Moby or more recently Justice.');
    } else if (year > 1980){
      $('#div-tempo-descr').html("Then from the 80s to 1992 there is a slight decrease in the tempo of 5 BPM, that might be linked to the apparition of important <b>Pop</b> star such as Michael Jackson, Prince, and the emergence of Madonna and Whitney Houston. <b>Pop</b> has a tempo under <b>Hard Rock</b> and was more popular at this time.");
    } else if (year > 1964){
      $('#div-tempo-descr').html("Then from 1964 to 1980, there is a clear increase in the Tempo(115 to 125). This might be in correlation with the appartion of <b>Hard Rock</b> group and reduction in <b>Folk</b> and <b>Blues</b> " +
                                  "Indeed the <b>Metal</b> percentage went from 2% to 4.72%, <b>Folk</b> from 9.71% to 5.4% and <b>Blues</b> from 11% to 6.67%"+
                                  'From this <a href="https://en.wikipedia.org/wiki/1970s_in_music">article</a> it states: "The 1970s saw the emergence of hard rock as one of the most prominent subgenres of rock music with acts such as Alice Cooper, Deep Purple, Led Zeppelin, Queen, Nazareth, Black Sabbath and Blue Öyster Cult were highly popular during the first half of the decade".'+
                                  "This style has indeed a higher tempo, and was highly popular so that's why the overall tempo raised this way.");
    } else {
      $('#div-tempo-descr').html("There is a first gap between 1962 and 1964 were the tempo dropped, and with our confidence analysis, we can actually see that it's not outliers, but the curve do not fit 2 points that are so close.");
    }
  }

  function drawTempoChart(data){

    let chartData = {
      labels: data[0].years,
      datasets: []
    };

    for (let i = 0; i < data.length; i++) {
      if (data[i].genre === "All"){
        let genreData = {
          label: "Mean Song Tempo Smoothed",
          data: data[i].fit,
          fill: false,
          borderColor: '#756bb1',
          pointRadius:0,
          pointHitRadius:4,
          pointHoverRadius:4
        };
        chartData.datasets.push(genreData);
        genreData = {
          label: "Mean Song Tempo",
          data: data[i].points,
          fill: false,
          borderColor: '#bcbddc',
          showLine: false
        };
        chartData.datasets.push(genreData);
      }
    }

    if (chartTempo){
      chartTempo.destroy();
    }

    chartTempo = new Chart(chartTempoCanvas, {
      type: 'line',
      data: chartData,
      options: {scales:{
        xAxes: [{
          ticks: {min:1961, max:2008}}],
        yAxes: [{ticks: {min:112, max:130}}],
      },
      animation:false}
    });
  }

  $('#div-loudness').append(document.createElement('canvas'));

  $('#div-loudness canvas')
    .attr('id', 'chart-loudness')
    .attr('height', 200);

  let chartLoudnessCanvas = document.getElementById('chart-loudness');
  $.ajax({
    url:"data/SongLoudnessMean.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let i=0; i< data.length; i++){
        data[i] = JSON.parse(data[i]);
        for (let j= 0; j < 3; j++){
          data[i].years.splice(-1,1);
          data[i].fit.splice(-1,1);
          data[i].points.splice(-1,1);
        }
      }

      dataLoudness = data.slice();
      drawLoudnessChart(dataLoudness);

      $('#SliderLoudness').ionRangeSlider({
        type: "single",
        min: 1961,
        max: 2008,
        from: 2008,
        hide_min_max: true,
        prettify_enabled: false,
        onChange: sliderLoudnessChange
      });
    }
  });

  function sliderLoudnessChange(sliderData){
    let year = sliderData.from;
    let yearIndex = year-1961;
    let data = JSON.parse(JSON.stringify(dataLoudness));
    for (let i=0; i< data.length; i++){
      for (let j=2008-1961; j > yearIndex; j--){
        data[i].fit.splice(-1,1);
        data[i].points.splice(-1,1);
      }
    }
    drawLoudnessChart(data);

    if (year > 1990){
      $('#div-loudness-descr').html('A real <a href="https://en.wikipedia.org/wiki/Loudness_war"><b>Loudness War</b></a> began in the 90s (from -10 to almost -5) with the introduction of digital signal processing capable of producing further loudness increases. The CDs capacity could grow higher and higher and optimization were really advanced. This trend to increased audio level for songs was highly criticized by the public, but producer were seeing a correlation ( true or false, we cannot judge here because the popularity given in our dataset was at the time of the released of the datas (2010s)) in the loudness and popularity. </p>');
    } else if (year > 1980){
      $('#div-loudness-descr').html('There was a slight increased during the 80s to the 90s due to the use of <a href="https://en.wikipedia.org/wiki/Compact_disc">CDs</a> released in 1982 that replaced Vynil. There was a slow decreasd from 82 to 90s due to rock popularity with the average level of the average rock song during most of the decade was around <a href="https://en.wikipedia.org/wiki/Loudness_war#cite_note-Katz3rd-6">−16.8</a>).');
    } else {
      $('#div-loudness-descr').html("In the early years(1940 to 1970), the song <b>Loudness</b> was just limited by the electronic limitations(analog peaks example). That's why the mean values are around -12.");
    }
  }

  function drawLoudnessChart(data){
    let chartData = {
      labels: data[0].years,
      datasets: []
    };

    for (let i = 0; i < data.length; i++) {
      if (data[i].genre === "All"){
        let genreData = {
          label: "Mean Song Loudness Smoothed",
          data: data[i].fit,
          fill: false,
          borderColor: '#756bb1',
          pointRadius:0,
          pointHitRadius:4,
          pointHoverRadius:4
        };
        chartData.datasets.push(genreData);
        genreData = {
          label: "Mean Song Loudness",
          data: data[i].points,
          fill: false,
          borderColor: '#bcbddc',
          showLine: false
        };
        chartData.datasets.push(genreData);
      }
    }

    if (chartLoudness){
      chartLoudness.destroy();
    }
    chartLoudness = new Chart(chartLoudnessCanvas, {
      type: 'line',
      data: chartData,
      options: {scales:{
        xAxes: [{ticks: {min:1961, max:2008}}],
        yAxes: [{ticks: {min:-13, max:-7}}],
      },
      animation: false
    }
    });
  }

  $('#div-duration').append(document.createElement('canvas'));

  $('#div-duration canvas')
    .attr('id', 'chart-duration')
    .attr('height', 200);

  let chartDurationCanvas = document.getElementById('chart-duration');
  $.ajax({
    url:"data/DurationMean.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let i=0; i< data.length; i++){
        data[i] = JSON.parse(data[i]);
        for (let j= 0; j < 3; j++){
          data[i].years.splice(-1,1);
          data[i].fit.splice(-1,1);
          data[i].points.splice(-1,1);
        }
      }

      dataDuration = data.slice();
      drawDurationChart(dataDuration);

      $('#SliderDuration').ionRangeSlider({
        type: "single",
        min: 1961,
        max: 2008,
        from: 2008,
        hide_min_max: true,
        prettify_enabled: false,
        onChange: sliderDurationChange
      });
    }
  });

  function sliderDurationChange(sliderData){
    let year = sliderData.from;
    let yearIndex = year-1961;
    let data = JSON.parse(JSON.stringify(dataDuration));
    for (let i=0; i< data.length; i++){
      for (let j=2008-1961; j > yearIndex; j--){
        data[i].fit.splice(-1,1);
        data[i].points.splice(-1,1);
      }
    }
    drawDurationChart(data);

    if (year > 2000){
      $('#div-duration-descr').html('Then finally, the Duration stabilized to be get to the 3.50 minute means in the 2010s. This is hard to explain in a sense as music variety has become insane during these years, and duration change a lot in function of new styles ( R&B, Dubstep, Trance music, ....).</p>');
    } else if (year > 1980){
      $('#div-duration-descr').html('Then fom the 80s to the 2000s, the songDuration increased really slowly from 3.45 minutes to almost 4 minutes, which is the period where <b>Downtempo</b> and <b>Electronic</b> music get popular. The song might have a been a little longer due to the digitalisation of the music and the repeated pattern of techno/electro.');
    } else {
      $('#div-duration-descr').html('From this <a href="http://www.slate.fr/story/95041/trois-minutes">article</a> songs had a really great increased from the 1960. Jimi Hendrix and Led Zeppelin, for example, did songs that were more than 5 minutes. Between 1962 and 1965, the <i>Beatles</i> only recorded songs less than 3 minutes !'+
      'At this date, the song were recored on Vynil (45 rpm size), which was limited to 3 minutes by faces, and to be on the radio (the biggest way to be known during this time) your song had to be on a 45rpm Vynil');
    }
  }

  function drawDurationChart(data){
    let chartData = {
        labels: data[0].years,
        datasets: []
      };

      for (let i = 0; i < data.length; i++) {
        if (data[i].genre === "All"){
          let genreData = {
            label: "Mean Song Duration Smoothed",
            data: data[i].fit,
            fill: false,
            borderColor: '#756bb1',
            pointRadius:0,
            pointHitRadius:4,
            pointHoverRadius:4
          };
          chartData.datasets.push(genreData);
          genreData = {
            label: "Mean Song Duration",
            data: data[i].points,
            fill: false,
            borderColor: '#bcbddc',
            showLine: false
          };
          chartData.datasets.push(genreData);
        }
      }


      let chartDuration = new Chart(chartDurationCanvas, {
        type: 'line',
        data: chartData,
        options: {scales:{
          xAxes: [{ticks: {min:1961, max:2008}}],
          yAxes: [{ticks: {min:160, max:240}}],
          },
          animation: false
        }
      });
  }

  $('#div-genres').append(document.createElement('canvas'));

  $('#div-genres canvas')
    .attr('id', 'chart-genres')
    .attr('height', 200);

  let chartGenresCanvas = document.getElementById('chart-genres');
  $.ajax({
    url:"data/GenreEvolution.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let j= 0; j < 3; j++){
        data.x.splice(-1,1);
      }
      console.log(data);

      let chartData = {
        labels: data.x,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']


      for (let i = 0; i < data.vals.length; i++) {
        data.vals[i].data.splice(-1,1);
        let genreData = {
          label: data.vals[i].genre,
          data: data.vals[i].data,
          borderColor: color[i],
          pointHighlightStroke: color[i],
          backgroundColor: color[i],
          fill: 'origin'
        };
        chartData.datasets.push(genreData);
      }


      let chartGenres = new Chart(chartGenresCanvas, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            yAxes: [{
              stacked: true,
              ticks: {max: 1.0}
            }],
            xAxes: [{
              ticks: {min: 1950}
            }]
          },
          elements: { point: {
             radius: 0,
              hitRadius: 4,
               hoverRadius: 4 }
          },
          tooltips: {
            callbacks: {
              label: function(t, d) {
                displayGenreDescription(d.datasets[t.datasetIndex].label);
                return d.datasets[t.datasetIndex].label + ": " + (t.yLabel*100).toFixed(2) + '%';
              }
           }
         }
        }
      });
    }
  });

  function displayGenreDescription(genre){
      if (genre === "ROCK"){
        $('#div-genres-descr').html('Firstly <b>Rock</b> music since the 1950 has almost only increased with a stability around 20% of the music distribution. It is indeed one of the most popular genre, as band classified as <b>Rock</b> are amoung the most famous ones: The Beatles, The Rolling Stones, Queen , and Red Hot Chilli Peppers for example.');
      } else if (genre === "POP"){
        $('#div-genres-descr').html('<b>Pop</b> music has increased a lot between the 70s-80s due to popularity of Disco music and subgenre linked to it. Then it has kept a solid part of the music around 15%.');
      } else if (genre === "ELECTRONIC" || genre === "DOWNTEMPO"){
        $('#div-genres-descr').html('<b>Electronic</b> and <b>Downtempo</b> have a really similar evolution, as it due to the digitalisation of the material and music. To be precise <b>Downtempo</b> (or <a href="https://fr.wikipedia.org/wiki/Downtempo">chill-music</a>) is characterized by calmer electronic music, for example <a href="https://www.youtube.com/watch?v=jfFTT3iz740">this artist</a> which is personnaly one of my favourite.'+
                                      'So both of these genre were not very popular in the early years ( 1950) with less than 5% of the genre, and became more popular from the mid 80s with digitalisation of material and mostly in the begining of the 90s thanks to new technology (synthetisors, software, new songs, science discoveries with sound and waves manipulations), to get to a solid 15% each. Nowadays <b>Downtempo</b> is really popular notably thanks to a sub genre called <b>lofi</b>.');
      } else if (genre === "REGGAE"){
        $('#div-genres-descr').html('<b>Reggae</b> music as always been under 10%, but had a pick around 1975-1980, probably because of the apparition of Bob Marley, and its influence around the world.');
      } else if (genre === "JAZZ" || genre === "BLUES"){
        $('#div-genres-descr').html('<b>Jazz</b> and <b>Blues</b> also had a similar evolution throught the time. It was widely popular in the 60s with 15% of distribution each. However it decreases widely since nowadays, where it represents only 8% and 5% respectively. It might be because of the influence it had on the other genres and cultural movement. Indeed <b>Jazz</b> and <b>Blues</b> were both created by afro american population in the US in the early 1920s. It is thanks to both this'+
                                    'music that <b>Rock, Pop</b> and almost all the other genres exist. This is why it is less popular now, even if really big name were doing this type of music ( Ray Charles, Louis Amstrong');
      } else if (genre === "FOLK"){
        $('#div-genres-descr').html('<b>Folk</b> music has known a bug peak in 1952 were it was 15% of the music genre. Today it represent only 4% of music distribution. It is associated to <a href="https://en.wikipedia.org/wiki/Contemporary_folk_music">traditional music</a>.'+
                                    '<b>Folk</b> has also helped the creation of Indi music.');
      } else if (genre === "METAL"){
         $('#div-genres-descr').html('<b>Metal</b> music is one of the most special genre here. It was quasi inexistant before the 60s (less than 1.5%) , and then increase to get a 5% part of the genre nowadays. <b>Metal</b> movement has cultural origin in the late 60s in the united Kingdom. It was qualified by heavy distrosion and concentrated on the melodic part of the music with guitar solos and really hard guitar riffs. The major group were : Metallica, Motorhead or Iron Maiden');
      } else if (genre === "R&B"){
        $('#div-genres-descr').html('<b>R&B</b> which was around 10% until the 80s and dropped to 5% since this time. It is also an affro American genre from the 40s, which is the genre that gave birth to Rap music. I think our matching did not put enough information into R&B as it is not supposed to decrease so much.');
      }

  }

  $('#div-genres-time').append(document.createElement('canvas'));

  $('#div-genres-time canvas')
    .attr('id', 'chart-genres-time')
    .attr('height', 200);

  let dataGenresTime;
  let chartGenresTime;

  let chartGenresTimeCanvas = document.getElementById('chart-genres-time');
  $.ajax({
    url:"data/GenreEvolution.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let j= 0; j < 3; j++){
        data.x.splice(-1,1);
      }
      console.log(data);
      dataGenresTime = data;

      drawChartGenresTime(getYearValues(2008));

      $('#SliderGenres').ionRangeSlider({
        type: "single",
        min: 1961,
        max: 2008,
        from: 2008,
        hide_min_max: true,
        prettify_enabled: false,
        onChange: sliderGenreChange
      });
    }
  });

  function getYearValues(year){
      let yearIndex;
      for (let i = 0; i < dataGenresTime.x.length; i++ ){
        if (year === dataGenresTime.x[i]){
          yearIndex = i;
          break;
        }
      }

      let labels = [];
      let data = [];
      for (let i = 0; i < dataGenresTime.vals.length; i++ ){
        labels.push(dataGenresTime.vals[i].genre);
        data.push(dataGenresTime.vals[i].data[yearIndex]);
      }
      return {labels: labels, data:data};
  }

  function sliderGenreChange(sliderData){
    let year = sliderData.from;
    let yearIndex = year-1961;

    drawChartGenresTime(getYearValues(year));
  }

  function drawChartGenresTime(data){
    let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']


    let chartData = {
      labels: data.labels,
      datasets: [{
        label: "% of Songs",
        data: data.data,
        backgroundColor: color
      }]
    };


    if (chartGenresTime){
      chartGenresTime.destroy();
    }
    chartGenresTime = new Chart(chartGenresTimeCanvas, {
      type: 'horizontalBar',
      data: chartData,
      options: {
        scales: {
          yAxes: [{
          }],
          xAxes: [{
            ticks: {max: 0.3}
          }]
        },
        tooltips: {
          callbacks: {
            label: function(t, d) {
              displayGenreDescription(t.yLabel);
              return d.datasets[t.datasetIndex].label + ": " + (t.xLabel*100).toFixed(2) + '%';
            }
         }
       },
       animation: false,
       legend: false
      }
    });
  }

  let years = []
  for (let year = 1961; year < 2012; year++){
    years.push(year);
  }

  $('#div-genres-loudness-Mean').append(document.createElement('canvas'));

  $('#div-genres-loudness-Mean canvas')
    .attr('id', 'chart-genres-loudness-mean')
    .attr('height', 200);
  let chartGenresLoudnessMeanCanvas = document.getElementById('chart-genres-loudness-mean');

  $.ajax({
    url:"data/SongLoudnessMean.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let i=0; i< data.length; i++){
        data[i] = JSON.parse(data[i]);
      }

      console.log(data);


      let dataYears = years.slice()

      for (let j= 0; j < 3; j++){
        dataYears.splice(-1,1);
      }

      let chartData = {
        labels: dataYears,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {

        for (let year = 0; year<years.length; year++){
          if (data[i].years[year] === years[year]){
            continue;
          } else {
            data[i].years.splice(year,0,year);
            data[i].fit.splice(year,0,NaN);
          }
        }

        for (let j= 0; j < 3; j++){
          data[i].fit.splice(-1,1);
        }

        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i],
          spanGaps: true
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMean = new Chart(chartGenresLoudnessMeanCanvas, {
        type: 'line',
        data: chartData,
        options: {
          elements: { point: {
             radius: 0,
              hitRadius: 4,
               hoverRadius: 4 }
          },
          tooltips: {
            callbacks: {
              label: function(t, d) {
                let radius = d.datasets[t.datasetIndex].data[t.index].v
                return d.datasets[t.datasetIndex].label + ": " + (t.yLabel*100).toFixed(2) + '%';
              }
           }
          }
        }
      });
    }
  });

  $('#div-genres-loudness-MinMax').append(document.createElement('canvas'));

  $('#div-genres-loudness-MinMax canvas')
    .attr('id', 'chart-genres-loudness-MinMax')
    .attr('height', 200);
  let chartGenresLoudnessMinMaxCanvas = document.getElementById('chart-genres-loudness-MinMax');

  $.ajax({
    url:"data/SongLoudnessMaxMin.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let i=0; i< data.length; i++){
        data[i] = JSON.parse(data[i]);
      }

      console.log(data);

      let dataYears = years.slice()

      for (let j= 0; j < 3; j++){
        dataYears.splice(-1,1);
      }

      let chartData = {
        labels: dataYears,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {
        for (let year = 0; year<years.length; year++){
          if (data[i].years[year] === years[year]){
            continue;
          } else {
            data[i].years.splice(year,0,year);
            data[i].fit.splice(year,0,NaN);
          }
        }

        for (let j= 0; j < 3; j++){
          data[i].fit.splice(-1,1);
        }

        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i],
          spanGaps: true
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMean = new Chart(chartGenresLoudnessMinMaxCanvas, {
        type: 'line',
        data: chartData,
        options: {
          elements: { point: {
             radius: 0,
              hitRadius: 4,
               hoverRadius: 4 }
          },
          tooltips: {
            callbacks: {
              label: function(t, d) {
                let radius = d.datasets[t.datasetIndex].data[t.index].v
                return d.datasets[t.datasetIndex].label + ": " + (t.yLabel*100).toFixed(2) + '%';
              }
           }
          }
        }
      });
    }
  });

  $('#div-genres-tempo-Mean').append(document.createElement('canvas'));

  $('#div-genres-tempo-Mean canvas')
    .attr('id', 'chart-genres-tempo-mean')
    .attr('height', 200);
  let chartGenresTempoMeanCanvas = document.getElementById('chart-genres-tempo-mean');

  $.ajax({
    url:"data/SongTempoMean.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let i=0; i< data.length; i++){
        data[i] = JSON.parse(data[i]);
      }

      console.log(data);

      let dataYears = years.slice()

      for (let j= 0; j < 3; j++){
        dataYears.splice(-1,1);
      }

      let chartData = {
        labels: dataYears,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {
        for (let year = 0; year<years.length; year++){
          if (data[i].years[year] === years[year]){
            continue;
          } else {
            data[i].years.splice(year,0,year);
            data[i].fit.splice(year,0,NaN);
          }
        }

        for (let j= 0; j < 3; j++){
          data[i].fit.splice(-1,1);
        }

        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i],
          spanGaps: true
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMean = new Chart(chartGenresTempoMeanCanvas, {
        type: 'line',
        data: chartData,
        options: {
          elements: { point: {
             radius: 0,
              hitRadius: 4,
               hoverRadius: 4 }
          },
          tooltips: {
            callbacks: {
              label: function(t, d) {
                let radius = d.datasets[t.datasetIndex].data[t.index].v
                return d.datasets[t.datasetIndex].label + ": " + (t.yLabel*100).toFixed(2) + '%';
              }
           }
          }
        }
      });
    }
  });

  $('#div-genres-tempo-MinMax').append(document.createElement('canvas'));

  $('#div-genres-tempo-MinMax canvas')
    .attr('id', 'chart-genres-tempo-MinMax')
    .attr('height', 200);
  let chartGenresTempoMinMaxCanvas = document.getElementById('chart-genres-tempo-MinMax');

  $.ajax({
    url:"data/SongTempoMaxMin.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let i=0; i< data.length; i++){
        data[i] = JSON.parse(data[i]);
      }

      console.log(data);

      let dataYears = years.slice()

      for (let j= 0; j < 3; j++){
        dataYears.splice(-1,1);
      }

      let chartData = {
        labels: dataYears,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {
        for (let year = 0; year<years.length; year++){
          if (data[i].years[year] === years[year]){
            continue;
          } else {
            data[i].years.splice(year,0,year);
            data[i].fit.splice(year,0,NaN);
          }
        }

        for (let j= 0; j < 3; j++){
          data[i].fit.splice(-1,1);
        }

        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i],
          spanGaps: true
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMinMax = new Chart(chartGenresTempoMinMaxCanvas, {
        type: 'line',
        data: chartData,
        options: {elements: { point: {
           radius: 0,
            hitRadius: 4,
             hoverRadius: 4 }
        },
        tooltips: {
          callbacks: {
            label: function(t, d) {
              let radius = d.datasets[t.datasetIndex].data[t.index].v
              return d.datasets[t.datasetIndex].label + ": " + (t.yLabel*100).toFixed(2) + '%';
            }
         }
        }}
      });
    }
  });
});
