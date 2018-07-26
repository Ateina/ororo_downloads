function onError(error: Error): void {
    console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs: browser.tabs.Tab[]): void {
    for (const tab of tabs) {
        const tabId: number = tab.id ? tab.id : 0;
        browser.tabs.sendMessage(
            tabId,
            { message: "download" },
        );
    }
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
    ).then(sendMessageToTabs).catch(onError);
});
