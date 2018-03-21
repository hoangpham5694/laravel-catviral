<?php

use Faker\Factory as Faker;
use App\Models\App;
use App\Repositories\AppRepository;

trait MakeAppTrait
{
    /**
     * Create fake instance of App and save it in database
     *
     * @param array $appFields
     * @return App
     */
    public function makeApp($appFields = [])
    {
        /** @var AppRepository $appRepo */
        $appRepo = App::make(AppRepository::class);
        $theme = $this->fakeAppData($appFields);
        return $appRepo->create($theme);
    }

    /**
     * Get fake instance of App
     *
     * @param array $appFields
     * @return App
     */
    public function fakeApp($appFields = [])
    {
        return new App($this->fakeAppData($appFields));
    }

    /**
     * Get fake data of App
     *
     * @param array $postFields
     * @return array
     */
    public function fakeAppData($appFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'title' => $fake->word,
            'slug' => $fake->word,
            'description' => $fake->word,
            'introdution' => $fake->text,
            'result_text' => $fake->word,
            'id_user' => $fake->randomDigitNotNull,
            'id_cate' => $fake->randomDigitNotNull,
            'view' => $fake->randomDigitNotNull,
            'share' => $fake->randomDigitNotNull,
            'type' => $fake->word,
            'permission' => $fake->word,
            'status' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s')
        ], $appFields);
    }
}
