<?php

namespace App\Repositories;

use App\Models\App;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class AppRepository
 * @package App\Repositories
 * @version March 10, 2018, 10:36 am +07
 *
 * @method App findWithoutFail($id, $columns = ['*'])
 * @method App find($id, $columns = ['*'])
 * @method App first($columns = ['*'])
*/
class AppRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
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
     * Configure the Model
     **/
    public function model()
    {
        return App::class;
    }
}
