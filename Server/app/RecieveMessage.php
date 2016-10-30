<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecieveMessage extends Model
{
        protected $fillable = ['user_id', 'message'];
}
