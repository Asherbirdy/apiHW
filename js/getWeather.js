let name = document.querySelector(".mb-0"); //台北哪個天氣
let curWeath = document.querySelector(".large-font"); //當天天氣
let nextFiveDayWeather = document.getElementById("weekday"); //下五天天氣

const weatherData = async function () {
  const res = await fetch(`
  https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-8E615831-94BB-4EA1-839F-105DFDBCD510&format=JSON&sort=time`);
  const data = await res.json(); // 轉資料資訊
  const curTapeiLocation = data.records.locations[0].location[0]; // 地區
  const allTimeWeather = curTapeiLocation.weatherElement[1].time; // 所有時間平均溫度
  let nextFiveWeather = allTimeWeather.filter((_, index) => index % 2 === 0); //取得偶數資料，因為分白天黑天

  nextFiveWeather.slice(1, 6).forEach((weather) => {
    const date = dayjs(weather.startTime);
    const weekday = date.locale("en").format("ddd"); //星期幾
    const everyDayWeather = weather.elementValue[0].value; //當天天氣
    const html = `
      <div class="d-flex flex-column block first-block"> <small class="text-muted mb-0">${weekday}</small>
      <div class="text-center"><img class="symbol-img" src="https://i.imgur.com/BeWfUuG.png"></div> <h6><strong>${everyDayWeather}&#176;</strong></h6> </div>`;
    nextFiveDayWeather.innerHTML += html;
  });
  name.innerText = curTapeiLocation.locationName;
  curWeath.innerText = nextFiveWeather[0].elementValue[0].value; // 現在天氣
};
weatherData();
