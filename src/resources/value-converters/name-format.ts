

export class NameFormatValueConverter {

    toView(value: string, gender: string) {
        return `${gender === 'Male' ? "Mr." : "Mrs."} ${value}`;
    }

}