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

    if (year > 2000){
      $('#div-loudness-descr').html("Description for after 2000");
    } else if (year > 1970){
      $('#div-loudness-descr').html("Description for after 1970");
    } else {
      $('#div-loudness-descr').html("Description for beginning");
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
      $('#div-duration-descr').html("Description for after 2000");
    } else if (year > 1970){
      $('#div-duration-descr').html("Description for after 1970");
    } else {
      $('#div-duration-descr').html("Description for beginning");
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
                let radius = d.datasets[t.datasetIndex].data[t.index].v
                return d.datasets[t.datasetIndex].label + ": " + (t.yLabel*100).toFixed(2) + '%';
              }
           }
          }
        }
      });
    }
  });

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

      if (year > 2000){
        $('#div-genres-descr').html("Description for after 2000");
      } else if (year > 1970){
        $('#div-genres-descr').html("Description for after 1970");
      } else {
        $('#div-genres-descr').html("Description for beginning");
      }
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
              let radius = d.datasets[t.datasetIndex].data[t.index].v;
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
