var count = 60;

function loadFirst() {
    $.fn.fullpage.silentMoveTo(0, 0);
    setInterval("timer()", 1000);
}

function timer() {
    count = count - 1;
    document.getElementById("remainTime").textContent = count;
    if(count < 0){
        count = 60;
    }
    // count = (count + 1) % 3;
    // $.fn.fullpage.moveTo(0, count);
}

$(document).ready(function() {
    $('#fullpage').fullpage({
        controlArrows : false,
        verticalCentered : false
        // anchors: ['fiveBomber', 'chat', 'shiritori']
    });
});
