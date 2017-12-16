$(function() {
  console.log("Loaded");

  $('#div-tempo').append(document.createElement('canvas'));

  $('#div-tempo canvas')
    .attr('id', 'chart-tempo')
    .attr('height', 200);

  let years = Array(50).fill().map((v, i) => i + 1960);

  let chartTempoCanvas = document.getElementById('chart-tempo');
  let chartTempo = new Chart(chartTempoCanvas, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
          label: 'Average Song Tempo Smoothed',
          data: [115.07696533, 115.11660767, 115.02072144, 114.93606567, 114.96435547, 115.16894531, 115.58045959, 116.20324707, 117.02008057, 117.99760437, 119.09152222, 120.25030518, 121.41947937, 122.5453186, 123.57736206, 124.47183228, 125.19233704, 125.71292114, 126.01768494, 126.10206604, 125.97273254, 125.64674377, 125.15078735, 124.52020264, 123.79624939, 123.02494812, 122.25445557, 121.53199768, 120.90193176, 120.40310669, 120.06539917, 119.90820312, 119.93843079, 120.14927673, 120.51853943, 121.00996399, 121.57395935, 122.1502533, 122.6723938, 123.07336426, 123.29414368, 123.29478455, 123.06689453, 122.65180969, 122.15919495, 121.79283142, 121.87960815, 122.90161133, 125.53738403, 130.70689392, 139.62309265]
        },
        {
          label: 'Average Song Tempo',
          showLine: false,
          data: [115.1505, 113.8395, 117.2895, 114.484, 113.7555, 116.4235, 115.864, 115.8485, 114.5555, 116.579, 122.217, 122.15, , 121.838, 122.658, 121.992, 121.501, 126.314, 125.154, 125.909, 126.2675, 128.947, 126.3235, 125.572, 124.045, 123.319, 122.482, 121.998, 119.975, 119.957, 119.912, 119.85, , 120.3275, 119.8375, 122.2455, 122.253, 121.403, 122.3495, 122.6005, 121.5775, 121.712, 122.202, 122.127, 121.889, 122.087, 123.005, 123.9495, 124.057, 124.8405, 124.011, 124.984, 143.005]
        }
      ]
    },
    options: {}
  });

  $('#div-genres-duration-Mean').append(document.createElement('canvas'));

  $('#div-genres-duration-Mean canvas')
    .attr('id', 'chart-genres-dur-mean')
    .attr('height', 200);
  let chartGenresDurationMeanCanvas = document.getElementById('chart-genres-dur-mean');

  $.ajax({
    url:"data/DurationMean.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let i=0; i< data.length; i++){
        data[i] = JSON.parse(data[i]);
      }

      console.log(data);

      let chartData = {
        labels: data[0].years,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {
        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i]
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMean = new Chart(chartGenresDurationMeanCanvas, {
        type: 'line',
        data: chartData,
        options: {}
      });
    }
  });

  $('#div-genres-duration-MinMax').append(document.createElement('canvas'));

  $('#div-genres-duration-MinMax canvas')
    .attr('id', 'chart-genres-dur-MinMax')
    .attr('height', 200);
  let chartGenresDurationMinMaxCanvas = document.getElementById('chart-genres-dur-MinMax');

  $.ajax({
    url:"data/DurationMaxMin.txt",
    dataType: 'json',
    mimeType: "application/json",
    success:function(data){
      for (let i=0; i< data.length; i++){
        data[i] = JSON.parse(data[i]);
      }

      console.log(data);

      let chartData = {
        labels: data[0].years,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {
        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i]
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMean = new Chart(chartGenresDurationMinMaxCanvas, {
        type: 'line',
        data: chartData,
        options: {}
      });
    }
  });

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

      let chartData = {
        labels: data[0].years,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {
        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i]
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMean = new Chart(chartGenresLoudnessMeanCanvas, {
        type: 'line',
        data: chartData,
        options: {}
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

      let chartData = {
        labels: data[0].years,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {
        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i]
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMean = new Chart(chartGenresLoudnessMinMaxCanvas, {
        type: 'line',
        data: chartData,
        options: {}
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

      let chartData = {
        labels: data[0].years,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {
        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i]
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMean = new Chart(chartGenresTempoMeanCanvas, {
        type: 'line',
        data: chartData,
        options: {}
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

      let chartData = {
        labels: data[0].years,
        datasets: []
      };

      let color = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

      for (let i = 0; i < data.length; i++) {
        let genreData = {
          label: data[i].genre,
          data: data[i].fit,
          fill: false,
          borderColor: color[i]
        };
        chartData.datasets.push(genreData);
      }


      let chartGenresTempoMean = new Chart(chartGenresTempoMinMaxCanvas, {
        type: 'line',
        data: chartData,
        options: {}
      });
    }
  });
});
