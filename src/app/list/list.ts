import { element } from "protractor";

export class List {
    name: string;
    cards: string[];
    add: boolean;
    cardContent: string;
    editCardInProgress: boolean;
    editCard: any; // object with key as number and value as boolean 

    constructor(name: string, cards: string[] = []) {
        this.name = name;
        this.cards = cards;
        this.add = false;
        this.cardContent = "";
        this.editCardInProgress = false;
        this.editCard = {};
        this.cards.map((element, index) => {
            this.editCard[index] = false;
        })

    }
}
