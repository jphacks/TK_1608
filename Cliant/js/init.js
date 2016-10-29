var count = 60;
var num = 1;

/*各種タイマー*/
var shiritoriflag = 1;
var shiritori_timer;
/*ajax通信テスト変数*/
var num_s = 0;

function loadFirst() {
    $.fn.fullpage.silentMoveTo(0, 0);

    setInterval("timer()", 2000);
    shiritori_timer = setInterval("siritori_update()", 2000);

}

function timer() {
    count = count - 1 > 0 ? count - 1 : 60;
    document.getElementById("remainTime").textContent = count;
    // count = (count + 1) % 3;
    // $.fn.fullpage.moveTo(0, count);
    pop(("#fukidashi" + num), ("#answer" + num));
    num = 1 + num % 8;
}

$(document).ready(function () {
    $('#fullpage').fullpage({
        controlArrows: false,
        verticalCentered: false
        // anchors: ['fiveBomber', 'chat', 'shiritori']
    });

    $('#fukidashi1, #answer1').css({ opacity: 0 });
    $('#fukidashi2, #answer2').css({ opacity: 0 });
    $('#fukidashi3, #answer3').css({ opacity: 0 });
    $('#fukidashi4, #answer4').css({ opacity: 0 });
    $('#fukidashi5, #answer5').css({ opacity: 0 });
    $('#fukidashi6, #answer6').css({ opacity: 0 });
    $('#fukidashi7, #answer7').css({ opacity: 0 });
    $('#fukidashi8, #answer8').css({ opacity: 0 });
});

function siritori_update() {
    $.ajax({
        type: "get",
        url: "js/json/shiritori.json",
        dataType: "json",
        success: function (data) {
            /*ajax通信テスト関数*/
            console.log(num_s);
            var dataArray = data.message;
            console.log("success");
            document.getElementById("wordnow").textContent = dataArray[num_s].nowmessage;
            document.getElementById("wordpre").textContent = dataArray[num_s].premessage;
            if (dataArray[num_s].answer == 1) {
                console.log("正解!");
            } else {
                console.log("不正解...");
            }
            num_s = num_s + 1;
            if (num_s > 3) {
                num_s = 0;
            }
        },
        error: function (data) {
            console.log("error");
        }
    });
}

function pop(fukidashi, answer) {
    $(fukidashi + "," + answer).animate({ opacity: 1 }, 500, 'swing',
        function () {
            $(this).animate({ opacity: 1 }, 500, 'swing',
                function () {
                    $(this).animate({ opacity: 0 }, 500, 'swing');
                });
        });
}
