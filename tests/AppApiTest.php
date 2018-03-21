<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AppApiTest extends TestCase
{
    use MakeAppTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateApp()
    {
        $app = $this->fakeAppData();
        $this->json('POST', '/api/v1/apps', $app);

        $this->assertApiResponse($app);
    }

    /**
     * @test
     */
    public function testReadApp()
    {
        $app = $this->makeApp();
        $this->json('GET', '/api/v1/apps/'.$app->id);

        $this->assertApiResponse($app->toArray());
    }

    /**
     * @test
     */
    public function testUpdateApp()
    {
        $app = $this->makeApp();
        $editedApp = $this->fakeAppData();

        $this->json('PUT', '/api/v1/apps/'.$app->id, $editedApp);

        $this->assertApiResponse($editedApp);
    }

    /**
     * @test
     */
    public function testDeleteApp()
    {
        $app = $this->makeApp();
        $this->json('DELETE', '/api/v1/apps/'.$app->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/apps/'.$app->id);

        $this->assertResponseStatus(404);
    }
}
