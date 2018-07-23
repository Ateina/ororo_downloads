function downloadSeries() {
    var seasonNumber = getSeasonNumber();
    var chapters = getAllChapters(seasonNumber);
    downloadAllSeries(chapters);
}

function getSeasonNumber() {
    var season = document.getElementsByClassName("js-season-link-wrapper active");
    var s = season[0].getElementsByClassName('js-season-link');
    var seasonNumber = s[0].hash.replace('#', '');
    console.log(seasonNumber);
    return seasonNumber;
}

function getAllChapters(seasonNumber) {
    var elem = document.getElementById(seasonNumber);
    var chapters = elem.getElementsByClassName("js-media-download");
    return chapters;
}

function downloadAllSeries(chapters){
    chapters = Array.from(chapters);
    chapters.forEach((chapter, index) => {
        setTimeout(() => {
            chapter.click();
        }, 5000 * index);
    });
}

browser.runtime.onMessage.addListener(() => {
    downloadSeries();
});
