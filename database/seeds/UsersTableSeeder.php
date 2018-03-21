<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Hoang',
            'email' => 'hoang@gmail.com',
            'password' => bcrypt('123123'),
            'role' => 'admin',
            'status' => 'activated',
        ]);
    }
}
