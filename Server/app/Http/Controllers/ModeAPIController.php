<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Mode;

class ModeAPIController extends Controller
{
    public function getMode(){
        return response()->json([
            'mode' => Mode::where('status', 'ongoing')->get()[0]->name
        ]);
    }

    public function changeMode($modename){
        Mode::where('status', 'ongoing')->get()[0]->disable()->save();
        $res = Mode::where('name', $modename)->get()[0]->enable()->save();

        return $res->toJson();
    }



}
