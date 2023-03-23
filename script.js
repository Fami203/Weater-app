const link = "http://api.weatherstack.com/current?access_key=9654ede85caffd34700b131ab7d77761";

const root = document.getElementById('root');

let store = {
    city: "London",
    feelslike: 0,
    cloudcover: 0,
    temperature: 0,
    humidity: 0,
    observationTime: "00:00 PM",
    pressure: 0,
    uvIndex: 0,
    visibility: 0,
    isDay: "yes",
    descriptions: "",
    windSpeed: 0,

}

const fetchData = async () => {
    const result = await fetch(`${link}&query=${store.city}`);
    const data = await result.json();

    const { 
        current: {
                feelslike, 
                cloudcover, 
                temperature, 
                humidity, 
                observation_time:observationTime, 
                pressure, 
                uv_index: uvIndex, 
                visibility, 
                is_day: isDay, 
                weather_descriptions: descriptions, 
                wind_speed: windSpeed,
            }
        } = data;

    store = {
        ...store,
        feelslike,
        cloudcover,
        temperature,
        humidity,
        observationTime,
        pressure,
        uvIndex,
        visibility,
        isDay,
        descriptions: descriptions[0],
        windSpeed,
    };
    renderComponent();
    // console.log(store)
};

const markup = () => {
    return `
    <div class="container">
      <div class="top">
        <div class="city">
          <div class="city-subtitle">Weater Today in</div>
          <div class="city-title" id="city">
            <span></span>
          </div>
        </div>
        <div class="city-info">
          <div class="top-left">
            <img class="icon" src="./img" alt="" />
            <div class="description"></div>
          </div>
          <div class="top-right">
            <div class="city-info__subtitle">as of</div>
            <div class="city-info__title">°</div>
          </div>
        </div>
      </div>
      <div id="properties"></div>
    </div>`;
}

const renderComponent = () => {
    root.innerHTML = markup();
};

fetchData();