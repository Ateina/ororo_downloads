function listenForClicks(): void {
    document.addEventListener("click", (e) => {
        if (e && e.target && e.target.children[0]) {
            console.log(e.target.children[0].id);
        }

    });
}

function reportExecuteScriptError(error: Error): void {
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.executeScript({ file: "./../script.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
