<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\App;
use App\Jobs\GetImg;
use Imtigger\LaravelJobStatus\JobStatus;

class GuestController extends Controller
{
    public function getIndex()
    {
        $top=30;
     //   $lang_code = getenvconf('lang_code');
        $apps = App::join('categories','categories.id','=','apps.id_cate')
        ->select('apps.id','apps.title','apps.slug','apps.description','apps.type')
        ->where('apps.status','=','ok')
        ->limit($top)->orderBy('apps.id','DESC')->get();
        //dd($apps);
        // exit();

        return view('guest.index',['apps'=>$apps]);
    }
    public function getAppView($slug, $id){
        $app = App::find($id);
        if (empty($app)) {
            
            return redirect(route('getIndex'));
        }
    //       var_dump($app);
    //    exit();
        return view('guest.app_view',['app'=>$app]);
    }
    public function getAppResult($slug,$id,$imagedomain,$day,$uniquename, Request $request){
        // $imagedomain_replace = str_replace("https://","",getenvconf('image_domain'));   
        // $url_share = getenvconf('domain') . '/app/'.$slug.'/'.$id.'/'.$imagedomain_replace.'/'.$day.'/'.$uniquename;
        // if(isset($request->autoshare)){
        //     if(  $request->autoshare == 'at') {
        //         echo "--Auto Share--";
        //         $linkData = [
        //             'link' => $url_share,
        //         ];
        //         try {
        //             $response = $fb->post('/me/feed', $linkData );
        //         // $response = $fb->post('/me/feed', $linkData, $_SESSION['fb_access_token'] );
        //         } catch(Facebook\Exceptions\FacebookResponseException $e) {
        //         // $txt = 'share Graph returned an error: ' . $e->getMessage();
        //         } catch(Facebook\Exceptions\FacebookSDKException $e) {
        //         // $txt = 'share Facebook SDK returned an error: ' . $e->getMessage();
        //         }
            
        //     }
        // }
        
        $app = App::findOrFail($id);
        //http://result.catviral.net/khi-nao-ban-chet/20180308/19183956445aa0a205ed95c.jpg
        $result_img = getenvconf('image_domain').'/'.$slug.'/'.$day.'/'.$uniquename.'.jpg';
        //    var_dump($app);
       //  exit();
         return view('guest.app_result',['app'=>$app, 'result_img'=>$result_img,'imagedomain'=>$imagedomain,'day'=>$day,'uniquename'=>$uniquename]);

    }
    public function getAppViewShare($slug,$id,$imagedomain,$day,$uniquename){
        $app = App::findOrFail($id);
        $og_img = getenvconf('image_domain').'/'.$slug.'/'.$day.'/'.$uniquename.'.jpg';
       //    var_dump($app);
      //  exit();
        return view('guest.app_view',['app'=>$app,'og_img'=>$og_img]);
    }
    public function getTestJob(){
        
        // dispatch(
        //     (new GetImg())->onQueue('default')
        // );
        // for($i=0;$i<5;$i++)
        // {
        //     $jobId = GetImg::dispatch(123);
            
        // }
        $job = (new GetImg('sdfsdf'));
        $this->dispatch($job);
        $jobStatusId = $job->getJobStatusId();
        echo "job id: ".$jobStatusId.'<br>';
     //   $jobStatus = JobStatus::find($jobStatusId)->getIsQueuedAttribute();
        while(JobStatus::find($jobStatusId)->getIsQueuedAttribute() || JobStatus::find($jobStatusId)->getIsExecutingAttribute()){
           
        }
        if(JobStatus::find($jobStatusId)->getIsFinishedAttribute()){
            echo "job success<Br>";

        }
        if(JobStatus::find($jobStatusId)->getIsFailedAttribute()){
            echo "job error<Br>";
        }
        JobStatus::find($jobStatusId)->delete();
     //   echo '<br>'.$jobStatus;
        return 'done';
    }
    public function getAppLoading($slug,$id,$imagedomain,$day,$uniquename,$jobId,Request $request){
        $app = App::findOrFail($id);
        return view('guest.app_loading',['jobid'=>$jobId,'slug'=>$slug,'appid'=>$id,'imagedomain'=>$imagedomain,'day'=>$day,'uniquename'=>$uniquename,'app'=>$app,'autoshare'=>$request->autoshare]);

    }
}
