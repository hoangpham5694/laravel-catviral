<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Facebook\Facebook;
use App\Jobs\GetImg;
use Imtigger\LaravelJobStatus\JobStatus;
class FacebookController extends Controller
{
    public function fbGo(Request $request){
  
        $state = array(
            "slug" => $request->slug,
            "app_id" => $request->id,
            "day" =>  date("Ymd"),
            "uniq_name" => uniqid(rand()),
            "imagedomain" => 'result.catviral.net',
            "share" => isset($request->share) ? $request->share : "nm",
            "debug" => isset($request->debug) ? "true" : "false"
        );
        $state_json = json_encode($state);
        
        $scope = $request->permission;
        if(isset($request->share)){
            $scope .= ',publish_actions';
        }
        $url_login = "https://www.facebook.com/v2.11/dialog/oauth?client_id=".config('facebook.config')['app_id']."&redirect_uri=".urlencode('http://laravel.catviral.net/fb-callback')."&state={$state_json}&scope=".urlencode($scope);
     //   echo $url_login;
        return redirect($url_login);
    }
    public function fbCallback(Request $request,Facebook $fb)
    {
        $helper = $fb->getRedirectLoginHelper();
        if (isset($_GET['state'])) {
            $helper->getPersistentDataHandler()->set('state', $_GET['state']);
            
            $data = json_decode($_GET['state'],true);
            $slug = $data['slug'];
            $app_id = $data['app_id'];
            $uniq_name = $data['uniq_name'];
            $imagedomain = $data['imagedomain'];
            $autoshare = $data['share'];
            $day = $data['day'];
        }
        try {
            $accessToken = $helper->getAccessToken();
        } catch(Facebook\Exceptions\FacebookResponseException $e) {

                echo 'gettoken Graph returned an error: ' . $e->getMessage();

        } catch(Facebook\Exceptions\FacebookSDKException $e) {
           
                echo 'gettoken Facebook SDK returned an error: ' . $e->getMessage();
        }
        
         $imagedomain_replace = str_replace("https://","",getenvconf('image_domain'));
        // $url = 'http://138.68.2.126//?accesstoken='.$accessToken.'&slug='.$slug.'&uniqname='.$uniq_name.'&day='.$day.'&imagedomain='.$imagedomain_replace.'&bucket=laravel-catviral-img-result';
        // // echo $url;
        // // exit();
        $state = $_GET['state'];
       

        $job = (new GetImg($state, $accessToken));
        $this->dispatch($job);

        // $state = json_decode($state,true);
         $jobStatusId = $job->getJobStatusId();
        // $urlImg = $state['imagedomain'].'/'.$state['slug'].'/'.$state['day'].'/'.$state['uniq_name'].'.jpg';

        // echo $jobStatusId;
        // echo '<br>'.$urlImg;
        // //var_dump($state);
        $url_result = getenvconf('domain') . '/app/loading/'.$slug.'/'.$app_id.'/'.$imagedomain_replace.'/'.$day.'/'.$uniq_name.'/'.$jobStatusId;
        if( $autoshare == 'at') {
            $url_result.='?autoshare=at';    
         }
        return redirect($url_result);

         exit();

        echo "job id: ".$jobStatusId.'<br>';
     //   $jobStatus = JobStatus::find($jobStatusId)->getIsQueuedAttribute();
        while(JobStatus::find($jobStatusId)->getIsQueuedAttribute() || JobStatus::find($jobStatusId)->getIsExecutingAttribute()){
           
        }
        $jobStatus;
        if(JobStatus::find($jobStatusId)->getIsFinishedAttribute()){
           // echo "job success<Br>";
           $jobStatus = "success";
        }
        if(JobStatus::find($jobStatusId)->getIsFailedAttribute()){
           // echo "job error<Br>";
           $jobStatus = "error";
        }
        $jobResponse = JobStatus::find($jobStatusId);
        $responseImage = $jobResponse['output']['response'];
       // exit();
        //JobStatus::find($jobStatusId)->delete();

        $url_result = getenvconf('domain') . '/app/loading/'.$slug.'/'.$app_id.'/'.$imagedomain_replace.'/'.$day.'/'.$uniq_name.'/'.$jobStatusId;
        $url_result = getenvconf('domain') . '/app/result/'.$slug.'/'.$app_id.'/'.$imagedomain_replace.'/'.$day.'/'.$uniq_name;
        $url_share = getenvconf('domain') . '/app/'.$slug.'/'.$app_id.'/'.$imagedomain_replace.'/'.$day.'/'.$uniq_name;
        $url='';
        
      //  echo $imagedomain_replace.'<br>';
       
       // dd($jobResponse['output']['response']);
        
        // var_dump(implode(" ",$jobResponse['output']));
        // //var_dump($responseImage['output'],true) ) ;
        // exit();
       // echo $responseImage; exit();
        if ((strpos($responseImage,$imagedomain_replace) >-1) && ($jobStatus === 'success')) {
     
            echo "have image<br>";
            if( $autoshare == 'at') {
                $url=$url_result."?utm_source=Shared&utm_medium=Result&utm_campaign=ResultActivity"; 
            }else{
                $url = $url_result."?utm_source=Share&utm_medium=Result&utm_campaign=ResultActivity"; 
            }
    
        
        } else {
            $url = getenvconf('domain').'/app/'.$slug.'/'.$app_id.'?utm_source=ErrorImg&utm_medium=CreateImg&utm_campaign=Fail';
          //  header("Location: ".$domain.'/app/'.$slug.'/id/'.$app_id.'?utm_source=ErrorImg&utm_medium=CreateImg&utm_campaign=Fail'); 
        }
        
        if( $autoshare == 'at') {
           // echo "autoshare"; exit();
            $linkData = [
                'link' => $url_share."?utm_source=Sharedat&utm_medium=Home&utm_campaign=ResultActivity",
            ];
            try {
            // // Returns a `Facebook\FacebookResponse` object
                $response = $fb->post('/me/feed', $linkData ,$accessToken);
            // //$response = $fb->post('/me/feed', $linkData, $_SESSION['fb_access_token'] );
            } catch(Facebook\Exceptions\FacebookResponseException $e) {
            // $txt = 'share Graph returned an error: ' . $e->getMessage();
            } catch(Facebook\Exceptions\FacebookSDKException $e) {
            // $txt = 'share Facebook SDK returned an error: ' . $e->getMessage();
            }
        
        }

       // echo $url ; exit();
        return redirect($url);
       // $url_loading = $domain . '/app/'.$app_id.'/result/'.$imagedomain_replace.'/'.$day.'/'.$uniq_name;
        
        
    }
    public function getCheckJob($jobid){
        $jobStatus = 'STATUS_WAITING';
        
        if(JobStatus::find($jobid)->getIsExecutingAttribute()){
            // echo "job success<Br>";
            $jobStatus = "STATUS_RUNNING";
        }
        if(JobStatus::find($jobid)->getIsFinishedAttribute()){
            // echo "job success<Br>";
            $jobStatus = "STATUS_COMPLETE";
            
        }
        if(JobStatus::find($jobid)->getIsFailedAttribute()){
            // echo "job error<Br>";
            $jobStatus = "STATUS_FAILED";
            
        }
        if(($jobStatus=="STATUS_COMPLETE") ||($jobStatus=="STATUS_FAILED") ){
            JobStatus::find($jobid)->delete();
        }
        return $jobStatus;
    }
   
}
