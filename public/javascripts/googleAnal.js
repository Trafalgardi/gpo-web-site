
gtag('send', {
    hitType: 'event',
    eventCategory: 'Session',
    eventAction: 'Start',
    eventLabel: new Date()
  });
window.onunload = function () {
    gtag('send', {
        hitType: 'event',
        eventCategory: 'Session',
        eventAction: 'Stop',
        eventLabel: new Date()
    });
};