function listenForClicks() {
    document.addEventListener("click", function (e) {
        var popupCommand = getPopupCommand(e);
        if (popupCommand === "1") {
            browser.tabs.query({
                active: true,
                currentWindow: true
            })
                .then(sendMessageCurrentSeason)["catch"](reportError);
        }
        if (popupCommand === "2") {
            browser.tabs.query({
                active: true,
                currentWindow: true
            })
                .then(sendMessageCurrentSeasonUnwanched)["catch"](reportError);
        }
    });
}
function getPopupCommand(event) {
    var popupCommand = "";
    if (event && event.target) {
        var target = event.target;
        if (target.attributes.id) {
            popupCommand = target.attributes.id.value || "";
        }
    }
    return popupCommand;
}
function sendMessageCurrentSeason(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { command: "current_season" });
}
function sendMessageCurrentSeasonUnwanched(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { command: "current_season_unwatched" });
}
function reportError(error) {
    console.error("Could not do something: " + error);
}
function reportExecuteScriptError(error) {
    console.error("Failed to execute beastify content script: " + error.message);
}
browser.tabs.executeScript({
    file: "./../script.js"
})
    .then(listenForClicks)["catch"](reportExecuteScriptError);
