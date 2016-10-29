var count = 0;

function loadFirst() {
    $.fn.fullpage.silentMoveTo(0, 1);
    setInterval("timer()", 3000);
}

function timer() {
    count = (count + 1) % 3;
    $.fn.fullpage.moveTo(0, count);
}

$(document).ready(function() {
    $('#fullpage').fullpage({
        controlArrows : false,
        // anchors: ['fiveBomber', 'chat', 'shiritori']
    });
});
