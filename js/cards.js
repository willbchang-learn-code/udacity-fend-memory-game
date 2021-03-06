// For single card's dot functions please check card.js
export default class Cards {
  static cards = $.map($('.card'), card => $(card))
  // Change cards status to hide.
  static hide(cards) {
    cards.map(card => card.hide())
  }

  // Change cards status to match.
  static match(cards) {
    cards.map(card => card.match())
  }

  // Get matched cards.
  static matched() {
    return this.cards.filter(card => card.matched())
  }

  // Get showed cards -- opened or matched.
  static showed() {
    return this.cards.filter(card => card.showed())
  }

  // Get opened cards -- opened but not matched.
  static opened() {
    return this.showed().filter(card => !card.matched())
  }

  static isMatched(cards) {
    return cards[0].isMatched(cards[1])
  }

  // Check if two cards is matched, then match or hide them. 
  static matching() {
    const openedCards = this.opened()
    this.isMatched(openedCards) ? this.match(openedCards)
      : setTimeout(() => this.hide(openedCards), 1500)
  }

  // Shuffle cards after turning NodeList to Array
  static disorder() {
    const shuffledCards = this.shuffle([...this.cards])
    this.cards.map((card, i) => card.replace(shuffledCards[i]))
  }

  static reset() {
    this.hide(this.cards)
    this.disorder()
  }

  // https://stackoverflow.com/a/6274381/9984029
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  static shuffle = function (cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]
    }
    return cards
  }
}
