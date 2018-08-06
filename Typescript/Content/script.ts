function downloadSeries(): void {
    const seasonNumber: string = getSeasonNumber();
    const chapters: NodeListOf<Element> = getAllChapters(seasonNumber);
    downloadAllSeries(chapters);
}

function getSeasonNumber(): string {
    const season: HTMLCollectionOf<Element> = document.getElementsByClassName("js-season-link-wrapper active");
    const s: NodeListOf<Element> = season[0].getElementsByClassName("js-season-link");
    const seasonNumber: string = s[0].hash.replace("#", "");
    return seasonNumber;
}

function getAllChapters(seasonNumber: string): NodeListOf<Element> {
    let chapters: NodeListOf<Element> = null;
    const elem: HTMLElement | null = document.getElementById(seasonNumber);
    if (elem) {
        chapters = elem.getElementsByClassName("js-media-download");
    }
    return chapters;
}

function downloadAllSeries(chapters: NodeListOf<Element>): void {
    const arrayOfChapters: Element[] = Array.from(chapters);
    arrayOfChapters.forEach((chapter, index: number) => {
        setTimeout(() => {
            chapter.click();
        }, 5000 * index);
    });
}

browser.runtime.onMessage.addListener((message: any) => {
    if (message.command) {
        if (message.command === "current_season") {
            downloadSeries();
        }
        if (message.command === "all_seasons") {
            console.log("all_seasons");
        }
    }
});
