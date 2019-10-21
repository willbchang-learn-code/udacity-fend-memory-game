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
  const cards = this.map(x => x.clone()).shuffle();
  this.map((card, i) => card.replace(cards[i]));
}

Array.prototype.hide = function () {
  this.map(card => card.hide());
}

Array.prototype.pin = function () {
  this.map(card => card.pin());
}

Array.prototype.match = function () {
  this[0].match(this[1]) ? this.pin() : setTimeout(() => this.hide(), 1500);
}

export { cards };
