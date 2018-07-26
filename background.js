function onError(error) {
    console.error("Error: " + error);
}
function sendMessageToTabs(tabs) {
    for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
        var tab = tabs_1[_i];
        var tabId = tab.id ? tab.id : 0;
        browser.tabs.sendMessage(tabId, { message: "download" });
    }
}
browser.browserAction.onClicked.addListener(function () {
    browser.tabs.query({
        active: true,
        currentWindow: true
    }).then(sendMessageToTabs)["catch"](onError);
});
