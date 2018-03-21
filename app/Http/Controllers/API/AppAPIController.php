<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateAppAPIRequest;
use App\Http\Requests\API\UpdateAppAPIRequest;
use App\Models\App;
use App\Repositories\AppRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use App\AppHot;
/**
 * Class AppController
 * @package App\Http\Controllers\API
 */

class AppAPIController extends AppBaseController
{
    /** @var  AppRepository */
    private $appRepository;

    public function __construct(AppRepository $appRepo)
    {
        $this->appRepository = $appRepo;
    }

    /**
     * Display a listing of the App.
     * GET|HEAD /apps
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->appRepository->pushCriteria(new RequestCriteria($request));
        $this->appRepository->pushCriteria(new LimitOffsetCriteria($request));
        $apps = $this->appRepository->all();

        return $this->sendResponse($apps->toArray(), 'Apps retrieved successfully');
    }
    public function total(){
        return App::count();
    }
    public function listapps(Request $request){
        $numberRecord= $request->max;
        $offset =($request->page -1 ) * $numberRecord;
        $cateId = $request->cateid;
        $userId = $request->userid;
        $keyword = $request->key;
        $status = $request->status;
        if($cateId == ""){
          $cateId = null;
        }
        if($status == ""){
          $status = null;
        }
        if($userId == ""){
          $userId = null;
        }
        $apps = App::join('categories','categories.id','=','apps.id_cate')
        
            ->join('users','users.id','=','apps.id_user')
        
            ->select('apps.id','apps.title','apps.view','apps.slug','apps.share','categories.name as cate_name','users.name as user_name','apps.status','apps.type')
            ->where(function($query) use ($keyword){
                $query->where('apps.title','LIKE','%'.$keyword.'%');
            })
            ->where('apps.id_user','LIKE', $userId)
            ->where('apps.id_cate','LIKE', $cateId)
            ->where('apps.status','LIKE', $status)
            ->limit($numberRecord)->offset($offset)
            ->orderBy('apps.id','DESC')
            //->groupBy('apps.id')
            ->get();
      //  dd($apps);
      return json_encode($apps);
    }
    public function listAppsNew(Request $request){
        $numberRecord= $request->max;
        $offset =($request->page -1 ) * $numberRecord;
        $cateId = $request->cateid;
       
        if($cateId == ""){
          $cateId = null;
        }

        $apps = App::select('apps.id','apps.title','apps.view','apps.slug','apps.share','apps.type','apps.permission') 
            ->where('apps.status','=', 'ok')
            ->where('apps.id_cate','LIKE', $cateId)
            ->limit($numberRecord)->offset($offset)
            ->orderBy('apps.id','DESC')
            //->groupBy('apps.id')
            ->get();

       
      //  dd($apps);
      return json_encode($apps);
    }

    public function getAppDetail(Request $request){
        $numberRecord= 100;
        $appNews = App::select('apps.id','apps.title','apps.view','apps.slug','apps.share','apps.type','apps.permission') 
        ->where('apps.status','=', 'ok')
        ->limit($numberRecord)
        ->orderBy('apps.id','DESC')
        ->get();
        $appHots = App::join('app_hots','app_hots.app_id','=','apps.id')
        ->select('apps.id','apps.title','apps.view','apps.slug','apps.share','apps.type','apps.permission') 
        ->where('apps.status','=', 'ok')
        ->orderBy('app_hots.pos','ESC')
        ->get();
        //dd($appHots);
        $rs = array();
        foreach($appHots as $app){
            array_push($rs, array(
                'href' => '/app/'.$app->slug.'/'.$app->id,
                'id' => $app->id,
                'thumb' => asset('images').'/360x189/'.$app->id.'.jpg',
                'title' => $app->title
            ));
        }
        foreach($appNews as $app){
            array_push($rs, array(
                'href' => '/app/'.$app->slug.'/'.$app->id,
                'id' => $app->id,
                'thumb' => asset('images').'/360x189/'.$app->id.'.jpg',
                'title' => $app->title
            ));
        }
        //dd($rs);
        return json_encode($rs );

    }
    public function setStatus($id,$status)
    {
        $app = App::findOrFail($id);
        $app->status = $status;
        $app->save();
        return "Set status: ".$status;
    }

    public function delete($id)
    {
        if(getenvconf('disable_delete')){
             return "Delete function is disable";
        }
     
        $app = App::findOrFail($id);
        $app->delete();
        return "Delete success";
    }

    public function postOrderAppHot(Request $request)
    {
       $data = json_decode($request->data);
    //    echo sizeof($data);
    //    exit();
        if(sizeof($data) ==0){
          //  $msg = ["message"=>"Không có gì để order"];
         //   return $this->sendError('Không có gì để order');
            return $this->sendResponse(null,'Không có gì để order');
        }
        $count=1;
       foreach($data as $val){
            $appHot = AppHot::where('app_id','=',$val)->first();
            $appHot->pos = $count;
            $appHot->save();
            $count++;
       }
    //    $msg = ["message"=>"Order thành công!"];
    //    return json_encode($msg);
        return $this->sendResponse(null,'Order thành công!');
    }
    /**
     * Store a newly created App in storage.
     * POST /apps
     *
     * @param CreateAppAPIRequest $request
     *
     * @return Response
     */
    public function store(CreateAppAPIRequest $request)
    {
        $input = $request->all();

        $apps = $this->appRepository->create($input);

        return $this->sendResponse($apps->toArray(), 'App saved successfully');
    }

    /**
     * Display the specified App.
     * GET|HEAD /apps/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var App $app */
        $app = $this->appRepository->findWithoutFail($id);

        if (empty($app)) {
            return $this->sendError('App not found');
        }

        return $this->sendResponse($app->toArray(), 'App retrieved successfully');
    }

    /**
     * Update the specified App in storage.
     * PUT/PATCH /apps/{id}
     *
     * @param  int $id
     * @param UpdateAppAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateAppAPIRequest $request)
    {
        $input = $request->all();

        /** @var App $app */
        $app = $this->appRepository->findWithoutFail($id);

        if (empty($app)) {
            return $this->sendError('App not found');
        }

        $app = $this->appRepository->update($input, $id);

        return $this->sendResponse($app->toArray(), 'App updated successfully');
    }

    /**
     * Remove the specified App from storage.
     * DELETE /apps/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var App $app */
        $app = $this->appRepository->findWithoutFail($id);

        if (empty($app)) {
            return $this->sendError('App not found');
        }

        $app->delete();

        return $this->sendResponse($id, 'App deleted successfully');
    }
}
