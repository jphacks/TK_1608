var MasterTimer;
var data;

/*後で消す*/
var num_s=0; 

function loadFirst() {
    $.fn.fullpage.silentMoveTo(0, 1);
    MasterTimer = setInterval("update_view()", 1000);
}

function update_view() {
    get_Json("mode");

    switch (data.mode) {
        case "chat":
        $.fn.fullpage.moveTo(0, 1);
            get_Json("chat")
            chat();
            break;
        case "shiritori":
        $.fn.fullpage.moveTo(0, 0);
        get_Json("shiritori")
            shiritori();
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
    $.getJSON(("js/json/" + str + ".json"), function(data_){
        data = data_;
    });
    /*$.ajax({
        type: "get",
        url: ("js/json/" + str + ".json"),
        dataType: "json",
        success: function (data) {
            console.log("succes!");
            result = $.parseJSON("data");
            console.log("result " + result);
        },
        error: function (data) {
            console.log("json error");
            result=null;
        }
    });
    return result;
    */

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

function shiritori() {
    if (data != null) {
        console.log("shiritori data "+ data);
        alert(String(data));
        var dataArray = data.message;
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
        num_s += 1;
        if(num_s>3){
            num_s=0;
        }
    } else {
        console.log("data null");
    }
}