function downloadSeries(): void {
    const seasonNumber: string = getSeasonNumber();
    const chapters: NodeListOf<HTMLElement> | null = getAllChapters(seasonNumber);
    if (chapters) {
        downloadAllSeries(chapters);
    }
}

function getSeasonNumber(): string {
    const season: HTMLCollectionOf<Element> = document.getElementsByClassName("js-season-link-wrapper active");
    const s: NodeListOf<HTMLAnchorElement> =
        season[0].getElementsByClassName("js-season-link") as NodeListOf<HTMLAnchorElement>;
    const seasonNumber: string = s[0].hash.replace("#", "");
    return seasonNumber;
}

function getAllChapters(seasonNumber: string): NodeListOf<HTMLElement> | null {
    const elem: HTMLElement | null = document.getElementById(seasonNumber);
    if (elem) {
        return elem.getElementsByClassName("js-media-download") as NodeListOf<HTMLElement>;
    } else {
        return null;
    }
}

function downloadAllSeries(chapters: NodeListOf<HTMLElement>): void {
    const arrayOfChapters: HTMLElement[] = Array.from(chapters);
    arrayOfChapters.forEach((chapter: HTMLElement, index: number) => {
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
