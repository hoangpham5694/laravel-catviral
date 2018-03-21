<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert(
            [ 
                [
                    'name' => 'Default',
                    'slug' => 'default',          
                ],
                [
                    'name' => 'Tình yêu',
                    'slug' => 'tinh-yeu',          
                ],
                [
                    'name' => 'Tâm hồn',
                    'slug' => 'tam-hon',          
                ],
                [
                    'name' => 'Tương lai',
                    'slug' => 'tuong-lai',          
                ],
                [
                    'name' => 'Về bạn',
                    'slug' => 've-ban',          
                ],
                [
                    'name' => 'Tâm lý',
                    'slug' => 'tam-ly',          
                ],
                [
                    'name' => 'Sức khỏe',
                    'slug' => 'suc-khoe',          
                ],
                [
                    'name' => 'Lối sống',
                    'slug' => 'loi-song',          
                ],
                [
                    'name' => 'Địa lý',
                    'slug' => 'dia-ly',          
                ],
                [
                    'name' => 'Công việc',
                    'slug' => 'cong-viec',          
                ],
                [
                    'name' => 'Âm nhạc',
                    'slug' => 'am-nhac',          
                ],
                [
                    'name' => 'Giả tưởng',
                    'slug' => 'gia-tuong',          
                ],
                
            ]
           
        );
    }
}
