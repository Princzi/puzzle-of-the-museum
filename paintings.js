export class Painting {
  constructor(title, author, year, description, assetId, tilesOnX, tilesOnY) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.description = description;
    this.assetId = assetId;
    this.tilesOnX = tilesOnX;
    this.tilesOnY = tilesOnY;
  }
}

export const paintings = [
  new Painting(
    "Dancers in Blue",
    "Hilaire Germain Edgar Degas",
    1890,
    "",
    "dancers-in-blue",
    4,
    5
  ),
  new Painting(
    "The Cafe Terrace on the Place du Forum, Arles, at Night",
    "Vincent van Gogh",
    1888,
    "",
    "cafe-terrace",
    4,
    5
  ),
  new Painting(
    "Desperate Man",
    "Gustave Courbet",
    1845,
    "",
    "desperate-man",
    5,
    4
  ),
];
