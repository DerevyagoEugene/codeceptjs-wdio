const { I } = inject();

import * as waits from '../config/waits.json';
import { stringUtils } from '../utils/utils';

class ResultsPage {

    private searchCountDown = { css: '.search-countdown' };

    async waitForResultsToLoad(): Promise<void> {
        await I.waitForVisible(this.searchCountDown, waits.smallWait);
        await I.waitForInvisible(this.searchCountDown, waits.longWait);
    }

    async getDistanceForAllVariants(): Promise<Pair[]> {
        let list = await I.grabTextFromAll('.segment-route__duration');
        return list.map((it: string): Pair => {
            return { text: it, value: stringUtils.convertStringToDistance(it) }
        });
    }
}

export type Pair = {
    text: string,
    value: number
}

export default new ResultsPage();
