jQuery.fn.extend({
  open: function () {
    this.addClass('open show');
  },
  hide: function () {
    this.removeClass('open show match');
  },
  match: function () {
    this.addClass('match');
  },
  isShowed: function () {
    return this.hasClass('show');
  },
  isMatched: function () {
    return this.hasClass('match')
  },
  matching: function (card) {
    // The second [0] gets the DOM Element from jQuery Object
    return this[0].isEqualNode(card[0]);
  },
  replace: function (card) {
    this.find('i').removeClass(this.find('i').attr('class'));
    this.find('i').addClass(card.find('i').attr('class'));
  }
});
