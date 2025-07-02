const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();


const updateUI = (data) => {

    // normal method
    // const cityDeets = data.cityDeets;
    // const weather = data.weather;

    //destructure properties method
    const { cityDeets, weather } = data;

    //update details template
    details.innerHTML = ` 
        <h5 class="my-3">${cityDeets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day images and icoms
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    //ternary operator method
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // normal method
    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    // time.setAttribute('src', timeSrc);


    // remove the d-none class if present
    if (card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }

};

// const updateCity = async (city) => {

//     const cityDeets = await getCity(city);
//     const weather = await getWeather(cityDeets.Key);

//     // object shorthand notation
//     return{cityDeets, weather};
    

//     //     normal way
//     // return{
//     //     cityDeets: cityDeets,
//     //     weather: weather
//     // };
// };

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update ui with new city
    // updateCity(city)
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
    // updateCity(localStorage.getItem('city'))
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}
