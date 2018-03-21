<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $fillable = [
        'id','name','slug', 'created_at'
    ];
    public function apps()
    {
        return $this->hasMany('App\App','id_cate','id');
    }
}
