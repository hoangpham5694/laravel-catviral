<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $table = 'contents';
    protected $fillable =[
        'id','image','type','id_category','id_user','views','shared','id_setting','status','time','permission'
    ];
    // protected $hidden = [
    //     'password'
    // ];
}
