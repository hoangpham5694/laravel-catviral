<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CreateAppRequest;
use App\Http\Requests\UpdateAppRequest;
use App\Repositories\AppRepository;
use App\Http\Controllers\AppBaseController;
use Illuminate\Http\Request;
use Flash;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use App\Category;
use App\User;
use App\App;
use App\AppHot;

use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Auth;

class AppController extends AppBaseController
{
    /** @var  AppRepository */
    private $appRepository;

    public function __construct(AppRepository $appRepo)
    {
        $this->appRepository = $appRepo;
    }

    /**
     * Display a listing of the App.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        // $this->appRepository->pushCriteria(new RequestCriteria($request));
        // $apps = $this->appRepository->all();
        $users= User::all();
        $cates = Category::all();
        return view('admin.apps.index',['users'=>$users,'cates'=>$cates]);
            
    }

    /**
     * Show the form for creating a new App.
     *
     * @return Response
     */
    public function create()
    {
        $categories = Category::all();
        $app = new App();
        $app->id_cate=-1;
        return view('admin.apps.create',['categories'=>$categories,'app'=>$app]);
    }
    private function makeimagedir($path)
    {
      if (!file_exists(public_path() .'/'. $path )) {
        $oldmask = umask(0);
        mkdir(public_path() .'/'. $path , 0777, true);
        umask($oldmask);
      }
      return;
    }
    public function postCreate(CreateAppRequest $request){
        $app = new App();
        $app->title = $request->title;
        $app->slug= $request->slug;
        $app->description = $request->description;
        $app->introdution = $request->introdution;
        $app->id_cate = $request->id_cate;
        $app->type= $request->type;
        $app->permission = $request->permission;
        $app->id_user = Auth::user()->id;
        $app->status = 'pending';
        $file = $request->file('image');
        $app->save();
        $insertedId = $app->id;
   
        if(strlen($file) >0){
            $filename = $insertedId.'.jpg';
            $destinationPath = 'images';
            $this->makeimagedir($destinationPath.'/800x420/');
            $this->makeimagedir($destinationPath.'/300x180/');

            $img = Image::make($file);
            $img->resize(800, 420);
            $img->save($destinationPath.'/800x420/'.$filename);
            $img = Image::make($file);
            $img->resize(360, 189);
            $img->save($destinationPath.'/360x189/'.$filename);
            $img = Image::make($file);
            $img->resize(300, 180);
            $img->save($destinationPath.'/300x180/'.$filename);
        }
        Flash::success('App Create successfully.');
        return redirect(route('app-index'));

    }

    public function getListAppHot()
    {
        $appHots = AppHot::join('apps','apps.id','=','app_hots.app_id')->select('apps.title','apps.id')->orderBy('app_hots.pos','ASC')->get();
        return view('admin.app-hots.list-hot',['appHots'=>$appHots]);
    }
    public function getCreateAppHot(){
        return view('admin.app-hots.create');
    }
    public function postCreateAppHot(Request $request){
      
        if(App::where('id','=',$request->idApp)->count() >0){
           $appHot = new AppHot();
           $appHot->app_id= $request->idApp;
           $appHot->pos=0;
           $appHot->save();
           Flash::success('Add app Hot success');
           return redirect(route('get-app-list-hot'));
        }
        Flash::error('App not found');
        return redirect(route('get-app-create-hot'));
    }


    /**
     * Store a newly created App in storage.
     *
     * @param CreateAppRequest $request
     *
     * @return Response
     */
    public function store(CreateAppRequest $request)
    {
        $input = $request->all();

        $app = $this->appRepository->create($input);

        Flash::success('App saved successfully.');

        return redirect(route('apps.index'));
    }

    /**
     * Display the specified App.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $app = $this->appRepository->findWithoutFail($id);

        if (empty($app)) {
            Flash::error('App not found');

            return redirect(route('apps.index'));
        }

        return view('admin.apps.show')->with('app', $app);
    }

    /**
     * Show the form for editing the specified App.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $app = $this->appRepository->findWithoutFail($id);

        if (empty($app)) {
            Flash::error('App not found');

            return redirect(route('apps.index'));
        }
        $categories = Category::all();
        return view('admin.apps.edit',['categories'=>$categories])->with('app', $app);
    }
    public function postEdit($id,UpdateAppRequest $request){
        $app = $this->appRepository->findWithoutFail($id);
        $app->title = $request->title;
        $app->slug= $request->slug;
        $app->description = $request->description;
        $app->introdution = $request->introdution;
        $app->id_cate = $request->id_cate;
        $app->type= $request->type;
        $app->permission = $request->permission;
        
        
        $file = $request->file('image');
        $app->save();
        if(strlen($file) >0){
            $filename = $id.'.jpg';
            $destinationPath = 'images';
            $this->makeimagedir($destinationPath.'/800x420/');
            $this->makeimagedir($destinationPath.'/300x180/');

            $img = Image::make($file);
            $img->resize(800, 420);
            $img->save($destinationPath.'/800x420/'.$filename);
            $img = Image::make($file);
            $img->resize(360, 189);
            $img->save($destinationPath.'/360x189/'.$filename);
            $img = Image::make($file);
            $img->resize(300, 180);
            $img->save($destinationPath.'/300x180/'.$filename);


        }
        Flash::success('App Update successfully.');
        return redirect(route('app-index'));

    }

    /**
     * Update the specified App in storage.
     *
     * @param  int              $id
     * @param UpdateAppRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateAppRequest $request)
    {
        $app = $this->appRepository->findWithoutFail($id);

        if (empty($app)) {
            Flash::error('App not found');

            return redirect(route('apps.index'));
        }

        $app = $this->appRepository->update($request->all(), $id);

        Flash::success('App updated successfully.');

        return redirect(route('apps.index'));
    }

    /**
     * Remove the specified App from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $app = $this->appRepository->findWithoutFail($id);

        if (empty($app)) {
            Flash::error('App not found');

            return redirect(route('apps.index'));
        }

        $this->appRepository->delete($id);

        Flash::success('App deleted successfully.');

        return redirect(route('apps.index'));
    }
}
