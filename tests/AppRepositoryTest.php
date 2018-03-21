<?php

use App\Models\App;
use App\Repositories\AppRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AppRepositoryTest extends TestCase
{
    use MakeAppTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var AppRepository
     */
    protected $appRepo;

    public function setUp()
    {
        parent::setUp();
        $this->appRepo = App::make(AppRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateApp()
    {
        $app = $this->fakeAppData();
        $createdApp = $this->appRepo->create($app);
        $createdApp = $createdApp->toArray();
        $this->assertArrayHasKey('id', $createdApp);
        $this->assertNotNull($createdApp['id'], 'Created App must have id specified');
        $this->assertNotNull(App::find($createdApp['id']), 'App with given id must be in DB');
        $this->assertModelData($app, $createdApp);
    }

    /**
     * @test read
     */
    public function testReadApp()
    {
        $app = $this->makeApp();
        $dbApp = $this->appRepo->find($app->id);
        $dbApp = $dbApp->toArray();
        $this->assertModelData($app->toArray(), $dbApp);
    }

    /**
     * @test update
     */
    public function testUpdateApp()
    {
        $app = $this->makeApp();
        $fakeApp = $this->fakeAppData();
        $updatedApp = $this->appRepo->update($fakeApp, $app->id);
        $this->assertModelData($fakeApp, $updatedApp->toArray());
        $dbApp = $this->appRepo->find($app->id);
        $this->assertModelData($fakeApp, $dbApp->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteApp()
    {
        $app = $this->makeApp();
        $resp = $this->appRepo->delete($app->id);
        $this->assertTrue($resp);
        $this->assertNull(App::find($app->id), 'App should not exist in DB');
    }
}
