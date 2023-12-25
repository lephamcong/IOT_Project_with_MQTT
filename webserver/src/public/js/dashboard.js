$(document).ready(() => {
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
  });

  function updateHeaderValue() {
    $("#header-temperature-card .value").html(
      `${datas.engineTemperature[datas.engineTemperature.length - 1]} ℃`
    );
    $("#header-pressure-card .value").html(
      `${datas.pressure[datas.pressure.length - 1]} hPa`
    );
    $("#header-windspeed-card .value").html(
      `${datas.wind_speed[datas.wind_speed.length - 1]} m/s`
    );
    $("#header-performance-card .value").html(
      `${datas.power_output[datas.power_output.length - 1]} %`
    );
  }
  updateHeaderValue();

  $("#customSelect").on("change", function () {
    const selectedDate = $(this).val();
    const selectedIndex = dates.indexOf(selectedDate);
    datas = datass[selectedIndex];
    updateHeaderValue();
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
