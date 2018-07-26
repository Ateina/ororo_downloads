"use strict";
function listenForClicks() {
    document.addEventListener("click", function (e) {
        if (e) {
            console.log(e.target.children[0].id);
        }
    });
}
function reportExecuteScriptError(error) {
    console.error("Failed to execute beastify content script: " + error.message);
}
browser.tabs.executeScript({ file: "./../script.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
