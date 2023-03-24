const link = "http://api.weatherstack.com/current?access_key=9654ede85caffd34700b131ab7d77761";

const root = document.getElementById('root');

let store = {
    city: "Los Angeles",
    feelslike: 0,
    temperature: 0,
    observationTime: "00:00 PM",
    isDay: "yes",
    description: "",

    properties: {
      cloudcover: 0,
      humidity: 0,
      windSpeed: 0,
      pressure: 0,
      uvIndex: 0,
      visibility: 0,
    },

}

const fetchData = async () => {
    const result = await fetch(`${link}&query=${store.city}`);
    const data = await result.json();
    console.log(data)
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
                weather_descriptions: description, 
                wind_speed: windSpeed,
            }
        } = data;

    store = {
        ...store,
        feelslike,
        temperature,
        observationTime,

        isDay,
        description: description[0],

        properties: {
          cloudcover: {
            value: `${cloudcover}%`,
            icon: "cloud.png",
          },
          humidity: {
            value: `${humidity}%`,
            icon: "humidity.png",
          },
          windSpeed: {
            value: `${windSpeed} km/h`,
            icon: "wind.png"
          },
          
          pressure: {
            value: `${pressure} Pa`,
            icon: "gauge.png"
          },
          uvIndex: {
            value: `${uvIndex} / 100`,
            icon: "uv-index.png"
          },
          visibility: {
            value: `${visibility}%`,
            icon: "visibility.png"
          },
        },
    };
    renderComponent();
    // console.log(data)
};

const getImage = (description) => {
  const value = description.toLowerCase();
  switch(value) {
    case "partly cloudy":
      return "partly.png";
    case "cloud":
      return "cloud.png";
    case "overcast":
      return "cloud.png";
    case "fog":
      return "fog.png";
    case "sunny":
      return "sunny.png";
    case "rain shower":
      return "rain.png"
      case "clear":
        return "partly.png"
    case "patchy rain possible":
      return "maybeRain.png"

    default:
      return "the.png";
    
  }
}

const renderProperty = (properties) => {
  console.log(properties)
  return `<div class="property">
            <div class="property-icon">
              <img src="./img/icons/" alt="">
            </div>
            <div class="property-info">
              <div class="property-info__value"></div>
              <div class="property-info__description"></div>
            </div>
          </div>`;
}

const markup = () => {
const { city, description, observationTime, temperature, isDay, properties } = store;

const containerClass = isDay === "yes" ? "is-day" : "";

    return `
    <div class="container ${containerClass}">
      <div class="top">
        <div class="city">
          <div class="city-subtitle">Weater Today in</div>
          <div class="city-title" id="city">
            <span>${city}</span>
          </div>
        </div>
        <div class="city-info">
          <div class="top-left">
            <img class="icon" src="./img/${getImage(description)}" alt="" />
            <div class="description">${description}</div>
          </div>
          <div class="top-right">
            <div class="city-info__subtitle">as of ${observationTime}</div>
            <div class="city-info__title">${temperature}°</div>
          </div>
        </div>
      </div>
      <div id="properties">${renderProperty(properties)}</div>
    </div>`;
}

const renderComponent = () => {
    root.innerHTML = markup();
};

fetchData();