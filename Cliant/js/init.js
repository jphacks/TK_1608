var MasterTimer;
var m_data, c_data, s_data, f_data;

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
    // console.log("mode: " + m_data.mode);
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

    $('#fukidashi1, #answer1').css({ opacity: 0 });
    $('#fukidashi2, #answer2').css({ opacity: 0 });
    $('#fukidashi3, #answer3').css({ opacity: 0 });
    $('#fukidashi4, #answer4').css({ opacity: 0 });
    $('#fukidashi5, #answer5').css({ opacity: 0 });
    $('#fukidashi6, #answer6').css({ opacity: 0 });
    $('#fukidashi7, #answer7').css({ opacity: 0 });
    $('#fukidashi8, #answer8').css({ opacity: 0 });
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
    console.log("c_data: " + c_data);
    if (c_data != null) {
        var dataArray = c_data.message;
        $(("#answer" + dataArray[num_c].ID)).children("span").text(dataArray[num_c].answer);
        pop(dataArray[num_c].ID);
        num_c = (num_c + 1) % 8;
    } else {
        console.log("data null");
    }
}

function pop(idNum) {
    $("#fukidashi" + idNum + "," + "#answer" + idNum).animate({ opacity: 1 }, 500, 'swing',
        function () {
            $(this).animate({ opacity: 1 }, 500, 'swing',
                function () {
                    $(this).animate({ opacity: 0 }, 500, 'swing');
                });
        });
}
/*しりとり変化用変数*/
var pre="left";
var pre="right";
function shiritori() {
    console.log("s_data: " + s_data);
    if(s_data.update==1){
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