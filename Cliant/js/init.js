var Mode, nextMode;
var chatTimer;
var shiritoriTimer;
var fiveBomberTimer;
var m_data, c_data, s_data, f_data;
var h = ["50%", "50%", "50%", "50%", "55%", "55%", "65%", "65%"];
var countDown = 0;
var countStart = false;

$(document).ready(function () {
    $('#fullpage').fullpage({
        controlArrows: false,
        verticalCentered: false
    });

    for (var i = 1; i < 9; i++){
        $("#chat").children(".parts")
        .append("<div id='human"+i+"'><img src='img/human/0"+i+"-1.png' class='humanPicture'></div>");
        $("#chat").children(".parts")
        .append("<div id='fukidashi"+i+"'><img src='img/chat_fukidashi/"+i+".png' class='fukidashiPicture'></div>");
        $("#chat").children(".parts")
        .append("<div id='answer"+i+"'><span class='answers'></span></div>");
    }
});

function setHumans() {
    $("#timer").children("#remainTime").text("∞").css("font-size", "15vh");

    for (var i = 0; i < 9; i++) {
        $(('#human' + i)).css({ opacity: 0, top: 0 });
        $(('#fukidashi' + i)).css({ opacity: 0 });
        $(('#answer' + i)).css({ opacity: 0 });
    }
}


function loadFirst() {
    $.fn.fullpage.silentMoveTo(0, 1);
    change_mode_order("chat");
    Mode = "chat";
    main();
}

function main() {
    switch (Mode) {
        case "chat":
        $.fn.fullpage.moveTo(0, 1);
        setHumans();
        countStart = false;
        countDown = 30;
        chatTimer = setInterval("chat()", 1000);
        break;
        case "shiritori":
        $.fn.fullpage.moveTo(0, 0);
        shiritoriTimer = setInterval("shiritori()", 4000);
        break;
        case "fiveBomber":
        $.fn.fullpage.moveTo(0, 2);
        fiveBomberTimer = setInterval("fiveBomber()", 1000);
        break;
        default:
        break;
    }
}

function chat() {
    chat_order();

    if (c_data.member.update == 1) {
        $("#humanNum").children("#nowHumanNum").text(c_data.member.numOfHuman);
        for (var i = 0; i < 8; i++) {
            if (i < c_data.member.numOfHuman){
                $(("#human" + (i + 1))).animate({ opacity: 1, top: h[i] }, 1000, 'swing');
            } else {
                $(("#human" + (i + 1))).animate({ opacity: 0, top: 0 }, 1000, 'swing');
            }
        }
        if (c_data.member.numOfHuman >= 2) {
            countStart = true;
        }
    }
    if (countStart) {
        if (c_data.member.numOfHuman >= 2) {
            nextMode = "shiritori";
            countDown -= 1;
            $("#timer").children("#remainTime").text(countDown).css("font-size", "11vh");;
        }
        if (c_data.member.numOfHuman == 5) {
            nextMode = "fiveBomber";
        }
    }

    if (countDown > 0) {
        if (c_data.message.update == 1) {
            $(("#answer" + c_data.message.ID)).children("span").text(c_data.message.answer);
            pop(c_data.message.ID);
        }
    } else {
        change_mode_order(nextMode);
        Mode = nextMode;
        clearInterval(chatTimer);
        main();
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
var now = "right";
var s_flag = false;
function shiritori() {
    shiritori_order();

    var dataArray = s_data;
    if (s_data.update == 1) {
        s_flag = true
    }
    if (s_flag == true) {
        if (s_data != null) {
            $("#answerleft,#answerright,#wordfieldleft,#wordfieldright,#namebox_L,#namebox_R").fadeOut(500, function () {
                if (dataArray.premessage != "") {
                    document.getElementById("wordleft").textContent = dataArray.premessage;
                } else {
                    document.getElementById("wordleft").textContent = "none";
                }
                if (dataArray.nowmessage != "") {
                    document.getElementById("wordright").textContent = dataArray.nowmessage;
                } else {
                    document.getElementById("wordright").textContent = "none";
                }
                var $answerpre = document.getElementById("answerleftimg");
                var $answernow = document.getElementById("answerrightimg");
                if (dataArray.preanswer > 0) {
                    $answerpre.src = ("img/human/0" + dataArray.preanswer + "-2.png");
                    document.getElementById("answerleft_name").textContent = "前: "+ dataArray.preanswer + "番の方";
                }else{
                    document.getElementById("answerleft_name").textContent = "前: none";
                    $answerpre.src = null;
                }
                if (dataArray.nowanswer > 0) {
                    $answernow.src = ("img/human/0" + dataArray.nowanswer + "-2.png");
                    document.getElementById("answerright_name").textContent = "今: "+ dataArray.nowanswer + "番の方";
                }else{
                    document.getElementById("answerright_name").textContent = "今: none";
                    $answernow.src = "";
                }
                $("#answerleft,#answerright,#wordfieldleft,#wordfieldright,#namebox_L,#namebox_R").fadeIn(700, function () {
                    shiritoricorrect();
                });
            });
            if (dataArray.correct == 1) {
                console.log("正解!");
            } else {
                console.log("不正解...");
                console.log("chatモードに戻ります");
            }
        } else {
            console.log("data null");
        }
        s_flag = false;
        console.log("finish_s_flag: " + s_flag);
        //change_mode_order();
    }
}

function shiritoricorrect() {

    var $correct = document.getElementById("correctimg");
    if (s_data.correct == 1 ) {
        $correct.src = ("img/correct.png");
    } else {
        $correct.src = ("img/incorrect.png");
    }
    $("#correctdisplay").fadeOut(200, function () {
        $("#correctdisplay").fadeIn(200, function () {
            $("#correctdisplay").fadeOut(200, function () {
                $("#correctdisplay").fadeIn(200, function () {
                    $("#correctdisplay").fadeOut(200, function () {
                        if (s_data.correct == 0) {
                            Mode = "chat";
                            countStart = false;
                            countDown = 30;
                            clearInterval(shiritoriTimer);
                            main();
                        }
                    });
                });
            });
        });
    });
}

/*strをサーバーにgetする関数*/
function change_mode_order(str) {
    var key = "https://fast-chamber-16922.herokuapp.com/api/mode/change/"+str;
    var keyDemo = "js/json/mode.json";
    console.log("start_ajax_mode");
    $.getJSON(keyDemo, function (data_) {
        console.log("getdata: " + data_);
        m_data = data_;
        console.log(m_data.mode + str);
        if (m_data.mode == str) {
        }
    });
}

function chat_order() {
    var key = "https://fast-chamber-16922.herokuapp.com/api/chat/newmessage";
    var keyDemo = "js/json/chat.json";
    console.log("start_ajax_chat");
    $.getJSON(keyDemo, function (data_) {
        console.log("getdata: " + data_);
        c_data = data_;
    });
}

function shiritori_order() {
    var key = "https://fast-chamber-16922.herokuapp.com/api/shiritori/newmessage";
    var keyDemo = "js/json/shiritori.json";
    console.log("start_ajax_shiritori");
    $.getJSON(keyDemo, function (data_) {
        console.log("getdata: " + data_);
        s_data = data_;
    });
}
