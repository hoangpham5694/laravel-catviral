<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\App;
use App\Jobs\GetImg;
use Imtigger\LaravelJobStatus\JobStatus;
class HomeController extends Controller
{
    public function getIndex()
    {
        $top=30;
     //   $lang_code = getenvconf('lang_code');
        $apps = App::join('categories','categories.id','=','apps.id_cate')
        ->select('apps.id','apps.title','apps.slug','apps.description','apps.type')
        ->where('apps.status','=','ok')
        ->limit($top)->orderBy('apps.id','DESC')->get();
        // dd($apps);
        // exit();
        return view('guest.index',['apps'=>$apps]);
    }
    public function getAppView($slug, $id){
        $app = App::findOrFail($id);
       //    var_dump($app);
      //  exit();
        return view('guest.app_view',['app'=>$app]);
    }
    public function getAppResult($slug,$id,$imagedomain,$day,$uniquename){
        $app = App::findOrFail($id);
        //http://result.catviral.net/khi-nao-ban-chet/20180308/19183956445aa0a205ed95c.jpg
        $result_img = getenvconf('image_domain').'/'.$slug.'/'.$day.'/'.$uniquename.'.jpg';
        //    var_dump($app);
       //  exit();
         return view('guest.app_result',['app'=>$app, 'result_img'=>$result_img]);

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
    
}
