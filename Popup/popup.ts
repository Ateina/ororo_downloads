function listenForClicks(): void {
    document.addEventListener("click", (e: Event) => {
        const popupCommand: string = getPopupCommand(e);
        if (popupCommand === "1") {
            browser.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                })
                .then(sendMessageCurrentSeason)
                .catch(reportError);
        }
        if (popupCommand === "2") {
            browser.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                })
                .then(sendMessageAllSeasons)
                .catch(reportError);
        }
    });
}

function getPopupCommand(event: Event): string {
    let popupCommand: string = "";
    if (event && event.target) {
        const target: any = event.target;
        if (target.attributes.id) {
            popupCommand = target.attributes.id.value || "";
        }
    }
    return popupCommand;
}

function sendMessageCurrentSeason(tabs: any): void {
    browser.tabs.sendMessage(
        tabs[0].id,
        { command: "current_season" },
    );
}

function sendMessageAllSeasons(tabs: any): void {
    browser.tabs.sendMessage(
        tabs[0].id,
        { command: "all_seasons" },
    );
}

function reportError(error: Error): void {
    console.error(`Could not do something: ${error}`);
}

function reportExecuteScriptError(error: Error): void {
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.executeScript(
    {
        file: "./../script.js",
    },
)
.then(listenForClicks)
.catch(reportExecuteScriptError);
