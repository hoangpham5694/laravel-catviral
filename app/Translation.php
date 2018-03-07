<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    protected $table = 'translations';
    protected $fillable =[
        'id','content_id','lang_code','title','description','status','introduction'
    ];
}
