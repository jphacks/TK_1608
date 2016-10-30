<?php
namespace App\Http\Controllers;

use App\User;
use App\RecieveMessage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;



class LineAPIController extends Controller {

    public function pushMessage($userId, $message)
    {
        $bot = $this->__connectLine();

        $textMessageBuilder = new \LINE\LINEBot\MessageBuilder\TextMessageBuilder($message);
        $bot->pushMessage($userId, $textMessageBuilder);

        return $bot->pushMessage($userId, $textMessageBuilder);
    }

    public function recieveMessage(Request $request)
    {
        $bot = $this->__connectLine();


        if(!User::where('user_id', $request->input('events.0.source.userId'))->exists()){
            $profile = $bot->getProfile($request->input('events.0.source.userId'))->getJSONDecodedBody();

            $newUser = new User();
            $newUser->user_id = $profile['userId'];
            $newUser->picture_url = $profile['pictureUrl'];
            $newUser->display_name = $profile['displayName'];
            $newUser->latest_message = $request->input("events.0.message.text");
            $newUser->save();
        }else{
            $user = User::where('user_id', $request->input("events.0.source.userId"))->first();
            $user->latest_message = $request->input("events.0.message.text");
            $user->save();
        }

//        $recieveMessage = new RecieveMessage();
//        $recieveMessage->user_id = $request->input("events.0.source.userId");
//        $recieveMessage->message = $request->input("events.0.message.text");
//        $recieveMessage->save();

        $textMessageBuilder = new \LINE\LINEBot\MessageBuilder\TextMessageBuilder($request->input("events.0.message.text"));
        $response = $bot->replyMessage($request->input("events.0.replyToken"), $textMessageBuilder);
        return response()->json([
            'message' => 'LINE送ったよ！'
        ]);
    }

    private function __connectLine()
    {
        $httpClient = new \LINE\LINEBot\HTTPClient\CurlHTTPClient(env('LINE_CHANNEL_KEY'));
        return new \LINE\LINEBot($httpClient, ['channelSecret' => env('LINE_CHANNEL_SECRET')]);
    }



}
