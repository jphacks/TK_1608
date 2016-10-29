var count = 60;
var num = 1;

function loadFirst() {
    $.fn.fullpage.silentMoveTo(0, 0);
    setInterval("timer()", 2000);
}

function timer() {
    count = count - 1 > 0 ? count - 1 : 60;
    document.getElementById("remainTime").textContent = count;
    // count = (count + 1) % 3;
    // $.fn.fullpage.moveTo(0, count);
    pop(("#fukidashi" + num), ("#answer" + num));
    num = 1 + num % 8;
}

$(document).ready(function() {
    $('#fullpage').fullpage({
        controlArrows : false,
        verticalCentered : false
        // anchors: ['fiveBomber', 'chat', 'shiritori']
    });

    $('#fukidashi1, #answer1').css({ opacity : 0 });
    $('#fukidashi2, #answer2').css({ opacity : 0 });
    $('#fukidashi3, #answer3').css({ opacity : 0 });
    $('#fukidashi4, #answer4').css({ opacity : 0 });
    $('#fukidashi5, #answer5').css({ opacity : 0 });
    $('#fukidashi6, #answer6').css({ opacity : 0 });
    $('#fukidashi7, #answer7').css({ opacity : 0 });
    $('#fukidashi8, #answer8').css({ opacity : 0 });
});

function pop(fukidashi, answer) {
    $(fukidashi + "," + answer).animate({ opacity : 1 }, 500, 'swing',
    function(){
        $(this).animate({ opacity : 1 }, 500, 'swing',
        function(){
            $(this).animate({ opacity : 0 }, 500, 'swing');
        });
    });
}
