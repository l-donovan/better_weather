function open_weather_page() {
    browser.tabs.create({url: "https://www.msn.com/en-us/weather/maps"})
        .then(_ => {
            browser.tabs.executeScript({file: "weather.js"});
        });
}

browser.browserAction.onClicked.addListener(open_weather_page);