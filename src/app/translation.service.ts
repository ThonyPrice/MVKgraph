import { Injectable } from '@angular/core';

const engTexts = {
    heading: "KTH Course Dependencies",
    subheading: "Search for a course to see its dependencies, what courses needed to apply for it and what courses it leads up to.",
    placeholder: "Search for course...",
    info: "KTH Graph visualization is a project in the course Mjukvarukontruktion. The idea and the assignment is from the company Findwise. We who created this webpage are Jens Berntsen, Jonathan Bäckström, Sara Ervin, Emmeli Fall, David Kirsch, Niclas Lindqvist, Thony Price & William Skagerström.",
    languageSwitch: "På svenska",
    credits: "credits"
}

const sweTexts = {
    heading: "KTH Kursberoende",
    subheading: "Sök på en kurs för att se dess beroende, vad du behövt läsa och vad kursen leder till.",
    placeholder: "Sök efter kurs...",
    info: "KTH Graph visualization är ett projekt i kursen Mjukvarukonstruktion. Idén och uppgiften kommer från företaget Findwise. Vi som skapat denna hemsida är Jens Berntsen, Jonathan Bäckström, Sara Ervin, Emmeli Fall, David Kirsch, Niclas Lindqvist, Thony Price & William Skagerström.",
    languageSwitch: "In english",
    credits: "hp"
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
