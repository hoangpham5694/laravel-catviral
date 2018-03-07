<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CatTemp extends Model
{
    protected $table = 'cat_temp';
    protected $fillable =[
        'content_id','cat_id'
    ];
}
