<?php

namespace App\Models;

use Eloquent as Model;

/**
 * Class App
 * @package App\Models
 * @version March 10, 2018, 10:36 am +07
 *
 * @property string title
 * @property string slug
 * @property string description
 * @property string introdution
 * @property string result_text
 * @property integer id_user
 * @property integer id_cate
 * @property integer view
 * @property integer share
 * @property string type
 * @property string permission
 * @property string status
 */
class App extends Model
{

    public $table = 'apps';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';



    public $fillable = [
        'title',
        'slug',
        'description',
        'introdution',
        'result_text',
        'id_user',
        'id_cate',
        'view',
        'share',
        'type',
        'permission',
        'status'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'title' => 'string',
        'slug' => 'string',
        'description' => 'string',
        'introdution' => 'string',
        'result_text' => 'string',
        'id_user' => 'integer',
        'id_cate' => 'integer',
        'view' => 'integer',
        'share' => 'integer',
        'type' => 'string',
        'permission' => 'string',
        'status' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    
}
