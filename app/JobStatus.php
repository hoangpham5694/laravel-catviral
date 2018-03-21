<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JobStatus extends Model
{
    protected $table = 'job_statuses';
    protected $fillable = [
        '147','App\Jobs\GetImg','slug', 'created_at'
    ];
}
