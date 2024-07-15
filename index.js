const carouselIndicators = $('.indi');
const cardContainer = $('.cardcontainer');

// Update indicator based on scroll position
function updateIndicator() {
  const scrollPosition = cardContainer.scrollLeft();
  const cardWidth = ($('.card').outerWidth(true) * 3) + 10;
  const activeIndex = Math.floor(scrollPosition / cardWidth);

  carouselIndicators.each(function(index, indicator) {
    $(indicator).removeClass('active');
    if (index === activeIndex) {
      $(indicator).addClass('active');
    }
  });
}

// Add click event listener to indicators
carouselIndicators.each(function(index, indicator) {
  $(indicator).on('click', function() {
    const cardWidth = ($('.card').outerWidth(true) * 3) + 10;
    const scrollPosition = index * cardWidth;
    cardContainer.animate({ scrollLeft: scrollPosition }, 'smooth');
  });
});

// Update indicator on initial load (optional)
updateIndicator();

// Update indicator on scroll event
cardContainer.on('scroll', updateIndicator);

function changeImage(url) {
  $('#changingimg').attr('src', url);
  $('.about-photos').removeClass('active');
  $(event.target).addClass('active');
  console.log($(event.target).attr('class'));
}

// ANIMATION FUNCTION
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    $(obj).text(Math.floor(progress * (end - start) + start) + "+");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// scroll watcher
function isElementAlmostInMiddle(element) {
  const rect = element.get(0).getBoundingClientRect();
  const viewportHeight = $(window).height();

  // The middle range can be defined as a certain percentage of the viewport height
  const threshold = 0.1; // 10% above and below the middle point
  const middleStart = viewportHeight - (viewportHeight * threshold);
  const middleEnd = viewportHeight + (viewportHeight * threshold);

  const elementMiddle = rect.top + (rect.height / 2);

  return elementMiddle >= middleStart && elementMiddle <= middleEnd;
}

let count = 0;
$(document).on('scroll', function() {
  const el = $('.stats');
  if (isElementAlmostInMiddle(el) && count === 0) {
    $('.countin').each(function(index, el) {
      if (index === 0) {
        animateValue(el, 0, 199, 2000);
      } else if (index === 1) {
        animateValue(el, 0, 1591, 2000);
      } else if (index === 2) {
        animateValue(el, 0, 283, 2000);
      } else if (index === 3) {
        animateValue(el, 0, 75, 2000);
      }
    });
    count = 1;
  }
});
