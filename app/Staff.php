<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Staff extends Authenticatable
{
    protected $table = 'staff';
    protected $fillable =[
        'id','name','email','rule','status'
    ];
    protected $hidden = [
        'password'
    ];

}
