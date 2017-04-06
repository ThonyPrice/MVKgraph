import { Injectable } from '@angular/core';

const engTexts = {
    heading: "KTH course dependencies",
    subheading: "Search for a course to see it's dependencies, what courses needed to applay for it and what courses it leads up to.",
    placeholder: "Search for course...",
    help: "Enter help text here",
    info: "Enter info text here"
}

const sweTexts = {
    heading: "KTH kursberoenden",
    subheading: "Fyll i underrubrikstext h�r",
    placeholder: "S�k efter kurs...",
    help: "Fyll i hj�lptext h�r",
    info: "Fyll i infotext h�r"
}

@Injectable()
export class TranslationService {

    constructor() { }

    getSweText() {
        return sweTexts;
    }

    getEngText() {
        return engTexts;
    }
}
