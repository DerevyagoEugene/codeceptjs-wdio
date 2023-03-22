export const dateUtils = {

    convertDateToPath: (date: Date): string => {
        const format = '2-digit';
        let mo: string = new Intl.DateTimeFormat('en', { month: format }).format(date);
        let da: string = new Intl.DateTimeFormat('en', { day: format }).format(date);

        return da + mo;
    }
};

export const stringUtils = {

    convertStringToDistance: (str: string): number => {
        const _getMultiplierByChar = (char: string): number => {
            switch(char) {
                case 'д':
                    return 10000;
                case 'ч':
                    return 100;
                case 'м':
                    return 1;
                default:
                    throw new Error('Wrong parameter!'); 
            }
        }

        return str
            .replace('В пути:','')
            .trim()
            .split(" ")
            .map(it => parseInt(it.replace(/\D/g, '')) * _getMultiplierByChar(it.slice(-1)))
            .reduce((a,b) => a + b, 0)
    }
};
