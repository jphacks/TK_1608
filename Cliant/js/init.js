var count = 60;

/*しりとりタイマー起動停止用変数*/
var shiritoriflag=1;
var shiritori_timer; 
/*ajax通信テスト変数*/
var num=0; 

function loadFirst() {
    $.fn.fullpage.silentMoveTo(0, 0);
    setInterval("timer()", 1000);
    shiritori_timer=setInterval("siritori_update()", 2000);
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

function siritori_update(){
    $.ajax({
    type: "get",
    url: "js/json/shiritori.json",
    dataType: "json",
    success: function(data){
        /*ajax通信テスト関数*/
        console.log(num); 
        var dataArray=data.message;
        console.log("success");
        document.getElementById("wordnow").textContent=dataArray[num].nowmessage;
        document.getElementById("wordpre").textContent=dataArray[num].premessage;
        if(dataArray[num].answer==1){
            console.log("正解!");
        }else{
            console.log("不正解...");
        }
        num=num+1;
        if(num>3){
            num=0;
        }
    },
    error: function(data) {
        console.log("error");
    }
});
}