<?php

namespace App\Http\Controllers;

use App\RecieveMessage;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Mode;


class ChatAPIController extends Controller
{
    public function getNewMessage(){

        if(Mode::where("status", 'init')->where('name', 'chat')->count() == 1) {
            return $this->init();
        }

        if(RecieveMessage::all()->sortByDesc('id')->where("is_published", false)->count() > 0) {
            $message = RecieveMessage::all()->sortByDesc('id')->where("is_published", false)->first();
            $message->is_published = true;
            $message->save();

            $res = response()->json([
                "numOfMember" => User::where("is_active", true)->count(),
                'message' => [
                    'update' => 1,
                    'ID' => User::where('user_id', $message->user_id)->first()->id,
                    'answer' => $message->message
                ]
            ]);
        }else{
            $res = response()->json([
                "numOfMember" => User::where("is_active", true)->count(),
                'message' => [
                    'update' => 0,
                    'ID' => null,
                    'answer' => null
                ]
            ]);
        }


        return $res;
    }

    public function init(){
        Mode::where('name', 'chat')->get()[0]->toOngoing()->save();
        $res = response()->json([
            "numOfMember" => User::where("is_active", true)->count(),
            'message' => [
                'update' => 0,
                'ID' => null,
                'answer' => null
            ]
        ]);
        return $res;
    }

    public function pushMessage($userId, $message)
    {
        $bot = $this->__connectLine();

        $textMessageBuilder = new \LINE\LINEBot\MessageBuilder\TextMessageBuilder($message);

        return $bot->pushMessage($userId, $textMessageBuilder);
    }

    private function __connectLine()
    {
        $httpClient = new \LINE\LINEBot\HTTPClient\CurlHTTPClient(env('LINE_CHANNEL_KEY'));
        return new \LINE\LINEBot($httpClient, ['channelSecret' => env('LINE_CHANNEL_SECRET')]);
    }
}
