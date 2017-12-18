$(function() {
  console.log("Loaded");

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

      console.log(data);

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


      let chartTempo = new Chart(chartTempoCanvas, {
        type: 'line',
        data: chartData,
        options: {}
      });
    }
  });

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

      console.log(data);

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


      let chartLoudness = new Chart(chartLoudnessCanvas, {
        type: 'line',
        data: chartData,
        options: {}
      });
    }
  });

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

      console.log(data);

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
        options: {}
      });
    }
  });

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
