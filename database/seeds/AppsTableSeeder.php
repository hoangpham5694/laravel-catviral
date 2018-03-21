<?php

use Illuminate\Database\Seeder;

class AppsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('apps')->insert(
            [ 
                [
                    'title' => 'Xem tướng qua avatar facebook của bạn !',
                    'slug' => 'xem-tuong-qua-avatar-facebook-cua-ban-',    
                    'description'=>'Xem tướng click ngay thôi nào',
                    'id_user'=>1,
                    'id_cate'=>1,
                    'type'=>'test',
                    'permission'=>'email,public_profile,user_birthday',
                    'status'=>'ok',

                ],
                [
                    'title' => 'Lý lịch kiếp trước của bạn như thế nào?',
                    'slug' => 'ly-lich-kiep-truoc-cua-ban-nhu-the-nao',    
                    'description'=>'Click để xem lý lịch kiếp trước của bạn nhé !! Cùng share nhé !!',
                    'id_user'=>1,
                    'id_cate'=>1,
                    'type'=>'test',
                    'permission'=>'email,public_profile,user_birthday',
                    'status'=>'ok',

                ],
                [
                    'title' => 'Điều gì đang chờ đợi bạn trong tháng 10?',
                    'slug' => 'dieu-gi-dang-cho-doi-ban-trong-thang-10',    
                    'description'=>'Điều gì đang chờ đợi bạn trong tháng 10?',
                    'id_user'=>1,
                    'id_cate'=>1,
                    'type'=>'test',
                    'permission'=>'email,public_profile,user_birthday',
                    'status'=>'ok',

                ],
               
                
            ]
           
        );
    }
}
