function downloadSeries() {
    var seasonNumber = getSeasonNumber();
    var chapters = getAllChapters(seasonNumber);
    if (chapters) {
        downloadAllSeries(chapters);
    }
}
function getSeasonNumber() {
    var season = document.getElementsByClassName("js-season-link-wrapper active");
    var s = season[0].getElementsByClassName("js-season-link");
    var seasonNumber = s[0].hash.replace("#", "");
    return seasonNumber;
}
function getAllChapters(seasonNumber) {
    var elem = document.getElementById(seasonNumber);
    if (elem) {
        return elem.getElementsByClassName("js-media-download");
    }
    else {
        return null;
    }
}
function downloadAllSeries(chapters) {
    var arrayOfChapters = Array.from(chapters);
    arrayOfChapters.forEach(function (chapter, index) {
        setTimeout(function () {
            chapter.click();
        }, 5000 * index);
    });
}
browser.runtime.onMessage.addListener(function (message) {
    if (message.command) {
        if (message.command === "current_season") {
            downloadSeries();
        }
        if (message.command === "all_seasons") {
            console.log("all_seasons");
        }
    }
});
