import "./card.js"
import "./cards.js" 

var pairing = []; // an array to pair clicked cards
var paired = []; // an array to store paired cards
var count = 0; // count move(click two different cards)
var card; // store current card, it's a jQuery element

// This could fix hosit problem for customize array.prototype
$(function () {
  init();

  // https://learn.jquery.com/events/event-delegation/#event-propagation
  $('.deck').on('click', 'li', function () {
    card = $(this);

    // avoid click matched and matching card
    if (paired.have(card) || pairing.have(card)) return;
    
    if (pairing.length < 2) {
      pairing.push(card);
      card.show();
    }

    if (pairing.length === 2) {
      matching(pairing);
      rate();
    }
  });

  $('.restart').click(function () {
    init();
  });
});

function init() {
  pairing.hide();
  paired.hide();
  cards().shuffled();
  pairing = [];
  paired = [];
  count = 0
  $('.moves').text(count);
  // reset to 3 stars
  $('.fa-star').eq(2).removeClass('far').addClass('fa')
  $('.fa-star').eq(1).removeClass('far').addClass('fa')
}

/**
 * Get cards' classes from HTML
 * returns an array
 */
function cards() {
  var cards = [];
  $('.card i').each(function () {
    cards.push($(this).attr('class'));
  });

  return cards;
}

/**
 * It matches two cards in array
 *  reset pairing
 *  count move
 * @param {Array} cards A copy of pairing[]
 */
function matching(cards) {
  pairing = [];
  counter();
  cards[0].match(cards[1]) ? matched(cards) : unmatched(cards);
}

/**
 * Store matched cards to paired[] and reset pairing[];
 * the for loop is to avoid click matched cards
 * it will check whether the pairing cards are already paired.
 */
function matched(cards) {
  paired = paired.concat(cards);
  cards.pin();
}

/**
 * Hide unmatched cards and empty pairing[]
 * NOTICE: there is a time out
 *  pairing[] can't be empty in event listener
 *  otherwise card won't hide
 * give player sometime to memorize cards' position
 */
function unmatched(cards) {
  setTimeout(() => {
    cards.hide();
  }, 1500);
}

/**
 * Count each pairing click, update the counter
 */
function counter() {
  // avoid to count click while matching
  if (pairing.length === 0) {
    count += 1;
    $('.moves').text(count);
  }
}

/**
 * Rate stars by current moves
 *  3 stars: 12 moves, player have 16 cards with 8 pairs,
 *    player clicks 8 cards to memorize what they are(both unique assumed),
 *    then clicks another card in the rest of 8 cards,
 *    now clicks a paired card to match in first 8 cards,
 *    8 cards * 3 clicks_each_card = 24 clicks, 24 clicks / 2 = 12 moves
 *    totally, player has 12 chances to move.
 *    That means player has no chance to make mistake,
 *    unless the player luckly paired 2 sets of cards with 2 moves,
 *    (8 cards - 2 cards) * 3 clicks_each_card / 2 = 9 moves
 *    that means player only needs 9 moves to match the rest of cards,
 *    12 moves - 2 moves - 9 moves = 1 moves
 *    in that case, player can make 1 mistake which is acceptable for 3 stars.
 *  2 stars: 16 moves, click each card twice.
 *    Player needs two moves when player paired wrong cards,
 *    1 mistake_move + 1 correct_move = 2 matched_moves
 *    One move makes a mistake, one move matches successfully.
 *    16 moves - 12 moves = 4 moves  4 moves / 2 matched_moves = 2 times_mistake
 *    Totally, player has 2 times to make mistake.
 *  1 stars: more than 16 moves.
 */
function rate() {
  var stars;
  count <= 12 ? stars = 3 : count <= 16 ? stars = 2 : stars = 1;
  $('.fa-star').eq(stars).removeClass('fa').addClass('far')
}

