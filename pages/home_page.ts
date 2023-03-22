const { I } = inject();

import * as waits from '../config/waits.json';

class HomePage {

    private departureField = { css: "input[aria-labelledby*='origin-label']" };
    private departureDateDropDown = { css: "[data-test-id='departure-date-field']" };
    private arrivalDateDropDown = { css: "[data-test-id='return-date-field']" };
    private calendarDate = (date: string) => { return { css: `.calendar__day-cell[aria-label='${date}']` } };
    private passengerDropDown = { css: ".additional-fields__dropdown-container" };
    private passengerOptionType = (type: string) => { return { css: `label.custom-radio.--additional-fields.--${type} > div` } };
    private submitButton = { css: '.avia-form__submit' };

    async waitForHomePage(): Promise<void> {
        await I.waitForFunction(() => document.readyState == "complete");
        await I.wait(waits.interactionsWait);
    }

    async fillDepartureField(text: string): Promise<void> {
        await I.click(this.departureField);
        await I.clearAndType(text);
        await I.pressKey('Tab');
    }

    async fillArrivalField(text: string): Promise<void> {
        await I.clearAndType(text);
    }

    async selectDepartureDate(date: string): Promise<void> {
        await I.click(this.departureDateDropDown);
        await I.click(this.calendarDate(date));
    }

    async selectArrivalDate(date: string): Promise<void> {
        await I.click(this.arrivalDateDropDown);
        await I.click(this.calendarDate(date));
    }

    async selectPassengerType(type: string): Promise<void> {
        await I.click(this.passengerDropDown);
        await I.click(this.passengerOptionType(type));
        await I.click(this.passengerDropDown);
    }

    async clickSubmit(): Promise<void> {
        await I.click(this.submitButton);
    }
}

export default new HomePage();
