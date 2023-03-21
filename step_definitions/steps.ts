const { I } = inject();

import homePage from "../pages/home_page";
import resultsPage, { Pair } from "../pages/results_page";
import { expect } from "chai";
import { dateUtils } from "../utils/utils";

type DataTable = {
    departure: string,
    arrival: string,
    dateFrom: string,
    dateTo: string,
    type: string
};

let data: DataTable;

Before(() => {
    I.defineTimeout({ pageLoad: 20000, script: 10000 });
})

Given('I navigate to the site', () => {
    I.amOnPage('/search');
});

When('I fill the info', async (table) => {
    const dataTable: DataTable = table.parse().hashes()[0];

    data = {
        departure: dataTable.departure,
        arrival: dataTable.arrival,
        dateFrom: dataTable.dateFrom,
        dateTo: dataTable.dateTo,
        type: dataTable.type
    } as DataTable;

    await homePage.waitForHomePage();
    await homePage.fillDepartureField(dataTable.departure);
    await homePage.fillArrivalField(dataTable.arrival);
    await homePage.selectDepartureDate(dataTable.dateFrom);
    await homePage.selectArrivalDate(dataTable.dateTo);
    await homePage.selectPassengerType(dataTable.type);
    await homePage.clickSubmit();
});

Then('List of flights is loaded', async () => {
    await resultsPage.waitForResultsToLoad();
});

Then('Search criteria are correct', async () => {
    let url = await I.grabCurrentUrl();
    let dateArrival = dateUtils.convertDateToPath(new Date(data.dateTo));
    let dateDeparture = dateUtils.convertDateToPath(new Date(data.dateFrom));
    expect(url).to.include(`MSQ${dateDeparture}BUS${dateArrival}c1`);
})

Then('Print the fastest route from', async () => {
    let fastest = await getFastest((_: Pair, i: number) => i % 2 !== 0);
    console.log(`Fastest route to: (${fastest.text})`);
})

Then('Print the fastes route to', async () => {
    let fastest = await getFastest((_pair: Pair, i: number) => i % 2 === 0);
    console.log(`Fastest route from: (${fastest.text})`);
})

async function getFastest(predicate: Function): Promise<Pair> {
    return (await resultsPage.getDistanceForAllVariants())
        .filter((it, index) => predicate(it, index))
        .sort((a: Pair, b: Pair) => a.value - b.value)[0];
}
