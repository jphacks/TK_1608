<?php

namespace App\Http\Controllers;

use App\RecieveMessage;
use App\User;

use App\Http\Requests;
use App\Mode;

class ShiritoriAPIController extends Controller
{
    public function getNewMessage(){
        if(Mode::where("status", 'init')->where('name', 'shiritori')->count() == 1){
            $this->init();
        }else{
            //新規投稿あり
//            if(User::whereNotNull('latest_message')->where('is_published', false)->count() > 0){
//                //3件目以上
//                if(User::whereNotNull('latest_message')->where('is_published', false)->count() == 2) {
//                    $prevPostUsers = User::whereNotNull('latest_message')->where('is_published', false)->get();
//                    $prevPostUsers[0]->is_published = false;
//                    $prevPostUsers[0]->latest_message = null;
//                    $prevPostUsers[0]->save();
//
//
//                    $nowPostUser = User::whereNotNull('latest_message')->where('is_published', false)->first();
//                    $nowPostUser->is_published = true;
//                    $nowPostUser->save();
//
//                    $res = response()->json([
//                        'update' => 0,
//                        'preanswer' => $prevPostUsers[1]->user_id,
//                        'premessage' => $prevPostUsers[1]->latest_message,
//                        'nowanswer' => $nowPostUser->user_id,
//                        'nowmessage' => $nowPostUser->latest_message,
//                        'correct' => true
//                    ]);
//                }else if(User::whereNotNull('latest_message')->where('is_published', false)->count() == 1){
//                    //2件目
//                    $prevPostUsers = User::whereNotNull('latest_message')->where('is_published', false)->get();
//
//                    $nowPostUser = User::whereNotNull('latest_message')->where('is_published', false)->first();
//                    $nowPostUser->is_published = true;
//                    $nowPostUser->save();
//
//                    $res = response()->json([
//                        'update' => 0,
//                        'preanswer' => $prevPostUsers[0]->user_id,
//                        'premessage' => $prevPostUsers[0]->latest_message,
//                        'nowanswer' => $nowPostUser->user_id,
//                        'nowmessage' => $nowPostUser->latest_message,
//                        'correct' => true
//                    ]);
//                }else if(User::whereNotNull('latest_message')->where('is_published', false)->count() == 0){
//                    //1件目
//
//
//                    $res = response()->json([
//                        'update' => 0,
//                        'preanswer' => null,
//                        'premessage' => null,
//                        'nowanswer' => $nowPostUser->user_id,
//                        'nowmessage' => $nowPostUser->latest_message,
//                        'correct' => true
//                    ]);
//                }
//
//                //新規投稿なし
//            }else{
//                $res = response()->json([
//                    'update' => 0,
//                    'preanswer' => null,
//                    'premessage' => null,
//                    'nowanswer' => null,
//                    'nowmessage' => null,
//                    'correct' => true
//                ]);
//            }
            if(RecieveMessage::all()->sortByDesc('id')->where("is_published", false)->count() > 0) {
                $message = RecieveMessage::all()->sortByDesc('id')->where("is_published", false)->first();
                $prevMessage = RecieveMessage::all()->sortByDesc('id')->where("is_published", true)->first();
                $message->is_published = true;
                $message->save();
//                var_dump(mb_substr($prevMessage->message, -1));
//                var_dump(mb_substr($message->message, 0));
                $correct = (mb_substr($prevMessage->message, -1, 1) == mb_substr($message->message, 0, 1) ? 1 : 0);

                $res = response()->json([
                    'update' => 1,
                    'preanswer' => User::where('user_id', $prevMessage->user_id)->first()->id,
                    'premessage' => $prevMessage->message,
                    'nowanswer' => User::where('user_id', $message->user_id)->first()->id,
                    'nowmessage' => $message->message,
                    'correct' => $correct
                ]);
                $this->pushMessage($prevMessage->user_id, "あなたの番です。");
            }else{
                $res = response()->json([
                    'update' => 0,
                    'preanswer' => null,
                    'premessage' => null,
                    'nowanswer' => null,
                    'nowmessage' => null,
                    'correct' => true
                ]);
            }


            return $res;
        }
    }

    public function init(){
        Mode::where('name', 'shiritori')->get()[0]->toOngoing()->save();
        $firstUser = User::all()->sortBy("id")->first();
        $this->pushMessage($firstUser->user_id, "あなたの番です。");

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
