<?php

namespace App\Http\Controllers;

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
            if(User::whereNotNull('latest_message')->where('is_published', false)->count() > 0){
                $prevPostUsers = User::whereNotNull('latest_message')->where('is_published', false)->get();
                var_dump ($prevPostUsers);return 0 ;
                $prevPostUsers[0]->is_published = false;
                $prevPostUsers[0]->latest_message = null;
                $prevPostUsers[0]->save();


                $nowPostUser = User::whereNotNull('latest_message')->where('is_published', false)->first();
                $nowPostUser->is_published = true;
                $nowPostUser->save();

                $res = response()->json([
                    'update' => 0,
                    'preanswer' => $prevPostUsers[1]->user_id,
                    'premessage' => $prevPostUsers[1]->latest_message,
                    'nowanswer' => $nowPostUser->user_id,
                    'nowmessage' => $nowPostUser->latest_message,
                    'correct' => true
                ]);

                //新規投稿なし
            }else{
                $postUsers = User::whereNotIn('latest_message', [null])->where('is_published', true)->get();
//                $res = response()->json([
//                    'update' => 0,
//                    'preanswer' => $postUsers[0]->user_id,
//                    'premessage' => $postUsers[0]->latest_message,
//                    'nowanswer' => $postUsers[1]->user_id,
//                    'nowmessage' => $postUsers[1]->latest_message,
//                    'correct' => true
//                ]);
                $res = $postUsers;
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
