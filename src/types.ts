export enum TileFont {
    MANZU1 = "q",
    MANZU2 = "w",
    MANZU3 = "e",
    MANZU4 = "r",
    MANZU5 = "t",
    MANZU6 = "y",
    MANZU7 = "u",
    MANZU8 = "i",
    MANZU9 = "o",
    PINZU1 = "a",
    PINZU2 = "s",
    PINZU3 = "d",
    PINZU4 = "f",
    PINZU5 = "g",
    PINZU6 = "h",
    PINZU7 = "j",
    PINZU8 = "k",
    PINZU9 = "l",
    SOUZU1 = "z",
    SOUZU2 = "x",
    SOUZU3 = "c",
    SOUZU4 = "v",
    SOUZU5 = "b",
    SOUZU6 = "n",
    SOUZU7 = "m",
    SOUZU8 = ",",
    SOUZU9 = ".",
    TON = "1",
    NAN = "2",
    SHA = "3",
    PEI = "4",
    HAKU = "5",
    HATSU = "6",
    CHUN = "7"
}

export enum Suit {
    MANZU = "manzu",
    PINZU = "pinzu",
    SOUZU = "souzu",
    HONOR = "honor",
}

export type Tile = {
    tileSvg: TileFont;
    suit: Suit;
    number: number;
}

export const allTiles = [
    {tileSvg: TileFont.MANZU1, suit: Suit.MANZU, number: 1},
    {tileSvg: TileFont.MANZU2, suit: Suit.MANZU, number: 2},
    {tileSvg: TileFont.MANZU3, suit: Suit.MANZU, number: 3},
    {tileSvg: TileFont.MANZU4, suit: Suit.MANZU, number: 4},
    {tileSvg: TileFont.MANZU5, suit: Suit.MANZU, number: 5},
    {tileSvg: TileFont.MANZU6, suit: Suit.MANZU, number: 6},
    {tileSvg: TileFont.MANZU7, suit: Suit.MANZU, number: 7},
    {tileSvg: TileFont.MANZU8, suit: Suit.MANZU, number: 8},
    {tileSvg: TileFont.MANZU9, suit: Suit.MANZU, number: 9},
    {tileSvg: TileFont.PINZU1, suit: Suit.PINZU, number: 1},
    {tileSvg: TileFont.PINZU2, suit: Suit.PINZU, number: 2},
    {tileSvg: TileFont.PINZU3, suit: Suit.PINZU, number: 3},
    {tileSvg: TileFont.PINZU4, suit: Suit.PINZU, number: 4},
    {tileSvg: TileFont.PINZU5, suit: Suit.PINZU, number: 5},
    {tileSvg: TileFont.PINZU6, suit: Suit.PINZU, number: 6},
    {tileSvg: TileFont.PINZU7, suit: Suit.PINZU, number: 7},
    {tileSvg: TileFont.PINZU8, suit: Suit.PINZU, number: 8},
    {tileSvg: TileFont.PINZU9, suit: Suit.PINZU, number: 9},
    {tileSvg: TileFont.SOUZU1, suit: Suit.SOUZU, number: 1},
    {tileSvg: TileFont.SOUZU2, suit: Suit.SOUZU, number: 2},
    {tileSvg: TileFont.SOUZU3, suit: Suit.SOUZU, number: 3},
    {tileSvg: TileFont.SOUZU4, suit: Suit.SOUZU, number: 4},
    {tileSvg: TileFont.SOUZU5, suit: Suit.SOUZU, number: 5},
    {tileSvg: TileFont.SOUZU6, suit: Suit.SOUZU, number: 6},
    {tileSvg: TileFont.SOUZU7, suit: Suit.SOUZU, number: 7},
    {tileSvg: TileFont.SOUZU8, suit: Suit.SOUZU, number: 8},
    {tileSvg: TileFont.SOUZU9, suit: Suit.SOUZU, number: 9},
    {tileSvg: TileFont.TON, suit: Suit.HONOR, number: 1},
    {tileSvg: TileFont.NAN, suit: Suit.HONOR, number: 2},
    {tileSvg: TileFont.SHA, suit: Suit.HONOR, number: 3},
    {tileSvg: TileFont.PEI, suit: Suit.HONOR, number: 4},
    {tileSvg: TileFont.HAKU, suit: Suit.HONOR, number: 5},
    {tileSvg: TileFont.HATSU, suit: Suit.HONOR, number: 6},
    {tileSvg: TileFont.CHUN, suit: Suit.HONOR, number: 7},
]