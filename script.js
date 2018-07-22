function downloadSeries() {
    var elem = document.getElementById("3");
    var chapters = elem.getElementsByClassName("js-media-download");
    var firstChapter = chapters[0];
    firstChapter.click();
}

browser.runtime.onMessage.addListener(() => {
    downloadSeries();
});