
export enum Suit {
    MANZU = "manzu",
    PINZU = "pinzu",
    SOUZU = "souzu",
    HONOR = "honor",
}

export type Tile = {
    filename: string;
    suit: Suit;
    number: number;
    key: string;
}

export const allTiles = [
    {filename: "Man1.svg", suit: Suit.MANZU, number: 1},
    {filename: "Man2.svg", suit: Suit.MANZU, number: 2},
    {filename: "Man3.svg", suit: Suit.MANZU, number: 3},
    {filename: "Man4.svg", suit: Suit.MANZU, number: 4},
    {filename: "Man5.svg", suit: Suit.MANZU, number: 5},
    {filename: "Man6.svg", suit: Suit.MANZU, number: 6},
    {filename: "Man7.svg", suit: Suit.MANZU, number: 7},
    {filename: "Man8.svg", suit: Suit.MANZU, number: 8},
    {filename: "Man9.svg", suit: Suit.MANZU, number: 9},
    {filename: "Pin1.svg", suit: Suit.PINZU, number: 1},
    {filename: "Pin2.svg", suit: Suit.PINZU, number: 2},
    {filename: "Pin3.svg", suit: Suit.PINZU, number: 3},
    {filename: "Pin4.svg", suit: Suit.PINZU, number: 4},
    {filename: "Pin5.svg", suit: Suit.PINZU, number: 5},
    {filename: "Pin6.svg", suit: Suit.PINZU, number: 6},
    {filename: "Pin7.svg", suit: Suit.PINZU, number: 7},
    {filename: "Pin8.svg", suit: Suit.PINZU, number: 8},
    {filename: "Pin9.svg", suit: Suit.PINZU, number: 9},
    {filename: "Sou1.svg", suit: Suit.SOUZU, number: 1},
    {filename: "Sou2.svg", suit: Suit.SOUZU, number: 2},
    {filename: "Sou3.svg", suit: Suit.SOUZU, number: 3},
    {filename: "Sou4.svg", suit: Suit.SOUZU, number: 4},
    {filename: "Sou5.svg", suit: Suit.SOUZU, number: 5},
    {filename: "Sou6.svg", suit: Suit.SOUZU, number: 6},
    {filename: "Sou7.svg", suit: Suit.SOUZU, number: 7},
    {filename: "Sou8.svg", suit: Suit.SOUZU, number: 8},
    {filename: "Sou9.svg", suit: Suit.SOUZU, number: 9},
    {filename: "Ton.svg", suit: Suit.HONOR, number: 1},
    {filename: "Nan.svg", suit: Suit.HONOR, number: 2},
    {filename: "Shaa.svg", suit: Suit.HONOR, number: 3},
    {filename: "Pei.svg", suit: Suit.HONOR, number: 4},
    {filename: "Haku.svg", suit: Suit.HONOR, number: 5},
    {filename: "Hatsu.svg", suit: Suit.HONOR, number: 6},
    {filename: "Chun.svg", suit: Suit.HONOR, number: 7},
];