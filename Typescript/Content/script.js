"use strict";
function downloadSeries() {
    var seasonNumber = getSeasonNumber();
    var chapters = getAllChapters(seasonNumber);
    downloadAllSeries(chapters);
}
function getSeasonNumber() {
    var season = document.getElementsByClassName("js-season-link-wrapper active");
    var s = season[0].getElementsByClassName("js-season-link");
    var seasonNumber = s[0].hash.replace("#", "");
    return seasonNumber;
}
function getAllChapters(seasonNumber) {
    var chapters = null;
    var elem = document.getElementById(seasonNumber);
    if (elem) {
        chapters = elem.getElementsByClassName("js-media-download");
    }
    return chapters;
}
function downloadAllSeries(chapters) {
    var arrayOfChapters = Array.from(chapters);
    arrayOfChapters.forEach(function (chapter, index) {
        setTimeout(function () {
            chapter.click();
        }, 5000 * index);
    });
}
browser.runtime.onMessage.addListener(function () {
    downloadSeries();
});
