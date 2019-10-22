function cards() {
  return $.map($('.card'), card => $(card));
}

// Shuffle function from https://stackoverflow.com/a/6274381/9984029
Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }

  return this;
};

Array.prototype.disorder = function () {
  // Deep copy and shuffle cards
  // https://api.jquery.com/clone/
  const cards = this.map(card => card.clone()).shuffle();
  this.map((card, i) => card.replace(cards[i]));
}

Array.prototype.hide = function () {
  this.map(card => card.hide());
}

Array.prototype.pin = function () {
  this.map(card => card.pin());
}

Array.prototype.matching = function () {
  this[0].matching(this[1]) ? this.pin() : setTimeout(() => this.hide(), 1500);
}

Array.prototype.showed = function () {
  return this.filter(card => card.showed());
}

Array.prototype.opening = function () {
  return this.showed().filter(card => !card.matched());
}

export { cards };
