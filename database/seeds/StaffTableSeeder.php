<?php

use Illuminate\Database\Seeder;

class StaffTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('staff')->insert([
            'name' => 'Hoang',
            'email' => 'testuser@gmail.com',
            'password' => bcrypt('123123'),
            'time_create' => new DateTime(),
        ]);
    }
}
