<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    protected $table = 'apps';
    protected $fillable = [
     'id','title','slug','description','result_text','type','id_cate','id_user','view','share','created_at','updated_at','status'
    ];
    public function category() {
        return $this->belongsTo('App\Category','id_cate','id');
    }
}
