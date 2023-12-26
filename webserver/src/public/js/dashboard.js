$(document).ready(() => {
  updateHeaderValue(datas);

  var currentCardHeader = "temperature";
  $("#header-temperature-card").on("click", () => {
    currentCardHeader = "temperature";
    updateChartData(
      $chart.data("chart"),
      datas.timestamp,
      datas.engineTemperature,
      "#E23E3E",
      "Temperature (℃)"
    );
    updateChartAvg(
      $chart_avg.data("chart"),
      dates,
      avg_temperatures,
      "#E23E3E"
    );
  });
  $("#header-pressure-card").on("click", () => {
    currentCardHeader = "pressure";
    updateChartData(
      $chart.data("chart"),
      datas.timestamp,
      datas.pressure,
      "#D96D3E",
      "Pressure (hPa)"
    );
    updateChartAvg($chart_avg.data("chart"), dates, avg_pressures, "#D96D3E");
  });

  $("#header-windspeed-card").on("click", () => {
    currentCardHeader = "windspeed";
    updateChartData(
      $chart.data("chart"),
      datas.timestamp,
      datas.wind_speed,
      "#EFCF2B",
      "Windspeed (m/s)"
    );
    updateChartAvg($chart_avg.data("chart"), dates, avg_windspeeds, "#EFCF2B");
  });

  $("#header-performance-card").on("click", () => {
    currentCardHeader = "performance";
    updateChartData(
      $chart.data("chart"),
      datas.timestamp,
      datas.power_output,
      "#2BD5EF",
      "Performance (%)"
    );
    updateChartAvg(
      $chart_avg.data("chart"),
      dates,
      avg_performances,
      "#2BD5EF"
    );
  });

  $("#customSelect").on("change", function () {
    const selectedDate = $(this).val();
    const selectedIndex = dates.indexOf(selectedDate);
    datas = allDatas[selectedIndex];
    // updateHeaderValue(datas);
    switch (currentCardHeader) {
      case "temperature":
        updateChartData(
          $chart.data("chart"),
          datas.timestamp,
          datas.engineTemperature,
          "#E23E3E",
          "Temperature (℃)"
        );
        break;
      case "pressure":
        updateChartData(
          $chart.data("chart"),
          datas.timestamp,
          datas.pressure,
          "#D96D3E",
          "Pressure (hPa)"
        );
        break;
      case "windspeed":
        updateChartData(
          $chart.data("chart"),
          datas.timestamp,
          datas.wind_speed,
          "#EFCF2B",
          "Windspeed (m/s)"
        );
        break;
      case "performance":
        updateChartData(
          $chart.data("chart"),
          datas.timestamp,
          datas.power_output,
          "#2BD5EF",
          "Performance (%)"
        );
        break;
    }
  });
});
