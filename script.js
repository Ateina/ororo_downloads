function downloadSeries() {
    var seasonNumber = getSeasonNumber();
    var chapters = gettAllChapters(seasonNumber);
    chapters = Array.from(chapters);
    chapters[0].click();
}

function getSeasonNumber() {
    var season = document.getElementsByClassName("js-season-link-wrapper active");
    var s = season[0].getElementsByClassName('js-season-link');
    var seasonNumber = s[0].hash.replace('#', '');
    console.log(seasonNumber);
    return seasonNumber;
}

function gettAllChapters(seasonNumber) {
    var elem = document.getElementById(seasonNumber);
    var chapters = elem.getElementsByClassName("js-media-download");
    return chapters;
}

browser.runtime.onMessage.addListener(() => {
    downloadSeries();
});
