<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppHot extends Model
{
    
    protected $primaryKey = 'app_id';
    protected $table = 'app_hots';
    protected $fillable = [
     'app_id','pos','created_at','updated_at'
    ];
}
