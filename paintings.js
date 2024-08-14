export class Painting {
  constructor(title, author, year, description, assetId) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.description = description;
    this.assetId = assetId;
  }
}

export const paintings = [
  new Painting(
    "Dancers in Blue",
    "Hilaire Germain Edgar Degas",
    1890,
    "",
    "dancers-in-blue"
  ),
  new Painting(
    "The Cafe Terrace on the Place du Forum, Arles, at Night",
    "Vincent van Gogh",
    1888,
    "",
    "cafe-terrace"
  ),
  new Painting("Desperate Man", "Gustave Courbet", 1845, "", "desperate-man"),
];
