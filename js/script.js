// blogpaste.online — small progressive-enhancement script
// No frameworks, no build step. Everything here is optional:
// the site works fine with JS disabled since all content
// and links are plain static HTML.

document.addEventListener('DOMContentLoaded', function () {
  initYear();
  initBackToTop();
  initBoardFilter();
});

// Auto-update the copyright year in the footer.
function initYear() {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// Show a "back to top" button once the reader has scrolled down.
function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Client-side search + tag filter for the homepage corkboard.
// Works against the .clip cards already rendered in the HTML,
// so search engines and no-JS visitors still see every post.
function initBoardFilter() {
  var input = document.getElementById('board-search');
  var tagButtons = document.querySelectorAll('.tape-btn[data-tag]');
  var cards = document.querySelectorAll('.clip');
  var emptyMsg = document.getElementById('board-empty');
  if (!cards.length) return;

  var activeTag = 'all';

  function applyFilter() {
    var query = (input && input.value ? input.value : '').trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      var tag = card.getAttribute('data-tag') || '';
      var matchesTag = activeTag === 'all' || tag === activeTag;
      var matchesQuery = query === '' || text.indexOf(query) !== -1;
      var visible = matchesTag && matchesQuery;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    if (emptyMsg) {
      emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (input) {
    input.addEventListener('input', applyFilter);
  }

  tagButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tagButtons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      activeTag = btn.getAttribute('data-tag');
      applyFilter();
    });
  });
}
