var MasterTimer;
var m_data, c_data, s_data, f_data;
var h = ["50%", "50%", "50%", "50%", "55%", "55%", "65%", "65%"];
var existed = [0, 0, 0, 0, 0, 0, 0, 0];
var chatLog = [0, ""];

/*後で消す*/
var num_c = 0;
var num_s = 0;

function loadFirst() {
    $.fn.fullpage.silentMoveTo(0, 1);
    MasterTimer = setInterval("timer()", 2000);
}

function timer() {
    get_Json("mode");
}

function update_view() {

    switch (m_data.mode) {
        case "chat":
            $.fn.fullpage.moveTo(0, 1);
            get_Json("chat");
            break;
        case "shiritori":
            $.fn.fullpage.moveTo(0, 0);
            get_Json("shiritori");
            break;
        case "fiveBomber":
            $.fn.fullpage.moveTo(0, 2);
            fiveBomber(get_Json("fiveBomber"));
            break;
        default:
            break;
    }
}

$(document).ready(function () {
    $('#fullpage').fullpage({
        controlArrows: false,
        verticalCentered: false
        // anchors: ['fiveBomber', 'chat', 'shiritori']
    });

    for (var i = 0; i < 9; i++) {
        $(('#human' + i)).css({ opacity: 0, top: 0 });
        $(('#fukidashi' + i)).css({ opacity: 0 });
        $(('#answer' + i)).css({ opacity: 0 });
    }
});

function get_Json(str) {
    $.getJSON(("js/json/" + str + ".json"), function (data_) {
        switch (str) {
            case "mode":
                m_data = data_; update_view();
                break;
            case "chat":
                c_data = data_; chat();
                break;
            case "shiritori":
                s_data = data_; shiritori();
                break;
            case "fiveBomber":
                f_data = data_; break;
            default:
                break;
        }
    });
}

function chat() {
    if (m_data != null) {
        var exist = m_data.exist;
        for (var i = 0; i < exist.length; i++) {
            if (exist[i] == 1 && existed[i] == 0) {
                existed[i] = 1;
                $(("#human" + (i + 1))).animate({ opacity: 1, top: h[i] }, 1000, 'swing');
            } else if (exist[i] == 0 && existed[i] == 1) {
                existed[i] = 0;
                $(("#human" + (i + 1))).animate({ opacity: 0, top: 0 }, 1000, 'swing');
            }
        }
    }
    if (c_data != null) {
        var dataArray = c_data.message;
        if (dataArray.ID > 0 && dataArray.ID < 9) {
            if ((dataArray.ID != chatLog[0] || dataArray.answer != chatLog[1]) && dataArray.answer != "") {
                chatLog[0] = dataArray.ID;
                chatLog[1] = dataArray.answer;
                $(("#answer" + dataArray.ID)).children("span").text(dataArray.answer);
                pop(dataArray.ID);
            }
        }
    } else {
        console.log("data null");
    }
}

function pop(idNum) {
    $("#human" + idNum).children("img").attr("src", ("img/human/0" + idNum + "-2.png"));
    $("#fukidashi" + idNum + "," + "#answer" + idNum).animate({ opacity: 1 }, 500, 'swing',
        function () {
            $(this).animate({ opacity: 1 }, 3000, 'swing',
                function () {
                    $(this).animate({ opacity: 0 }, 500, 'swing');
                    $("#human" + idNum).children("img").attr("src", ("img/human/0" + idNum + "-1.png"));
                });
        });
}

/*しりとり変化用変数*/
var pre = "left";
    var pre = "right";
    function shiritori() {
        console.log("s_data: " + s_data);
        if (s_data.update == 1) {
            if (s_data != null) {
                $("#answerleft,#answerright,#wordfieldleft,#wordfieldright").fadeOut(500);
                var dataArray = s_data;
                document.getElementById("wordleft").textContent = dataArray.nowmessage;
                document.getElementById("wordright").textContent = dataArray.premessage;
                var $answerpre = document.getElementById("answerleftimg");
                var $answernow = document.getElementById("answerrightimg");
                $answerpre.src = ("img/human/0" + dataArray.preanswer + "-2.png");
                $answernow.src = ("img/human/0" + dataArray.nowanswer + "-2.png");
                $("#answerleft,#answerright,#wordfieldleft,#wordfieldright").fadeIn(500);
                if (dataArray.correct == 1) {
                    console.log("正解!");
                } else {
                    console.log("不正解...");
                }
            } else {
                console.log("data null");
            }
        }
    }

    function shiritorisecond() {
        if (s_data != null) {
            $("#answerpre,#answernow").fadeOut(500);
            var dataArray = s_data;
            document.getElementById("wordfieldpre").textContent = dataArray.nowmessage;
            document.getElementById("wordfieldnow").textContent = dataArray.premessage;
            var $answerpre = document.getElementById("answerpreimg");
            var $answernow = document.getElementById("answernowimg");
            $answerpre.src = ("img/human/0" + dataArray.preanswer + "-2.png");
            $answernow.src = ("img/human/0" + dataArray.nowanswer + "-2.png");
            $("#answerpre,#answernow").fadeIn(500);
            if (dataArray.correct == 1) {
                console.log("正解!");
            } else {
                console.log("不正解...");
            }
        } else {
            console.log("data null");
        }
        s_flag = false;
        if (s_flag != true) {
            console.log("afadsfaff");
        }
    }