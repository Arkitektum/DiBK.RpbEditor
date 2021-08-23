function hideScrollbar() {
   document.querySelector('html').style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
   document.querySelector('html').style.overflowY = 'hidden';
}

function showScrollbar() {
   document.querySelector('html').style.paddingRight = 0;
   document.querySelector('html').style.overflowY = 'scroll';
}

function callback(mutationsList) {
   mutationsList.forEach(mutation => {
      if (mutation.attributeName === 'class' && /\bmodal-open\b/.test(mutation.target.className)) {
         hideScrollbar();
      } else {
         showScrollbar();
      }
   });
}

const mutationObserver = new MutationObserver(callback);

mutationObserver.observe(document.getElementsByTagName('body')[0], { attributes: true });
