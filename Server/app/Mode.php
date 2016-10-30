<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mode extends Model
{
    protected $fillable = ['name', 'status', 'status'];

    public function enable(){
        $this->status = 'init';

        return $this;

    }
    public function toOngoing(){
        $this->status = 'ongoing';

        return $this;

    }

    public function disable(){
        $this->status = 'disabled';

        return $this;
    }

}
