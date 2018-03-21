<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\App;
use App\Jobs\GetImg;
use Imtigger\LaravelJobStatus\JobStatus;
use Facebook\Facebook;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
      //  $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }
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

        return view('admin.test-apps.index',['apps'=>$apps]);
    }
    public function getAppView($slug, $id){
        $app = App::find($id);
        if (empty($app)) {
            
            return redirect(route('getIndex'));
        }
    //       var_dump($app);
    //    exit();
        return view('admin.test-apps.app_view',['app'=>$app]);
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
         return view('admin.test-apps.app_result',['app'=>$app, 'result_img'=>$result_img,'imagedomain'=>$imagedomain,'day'=>$day,'uniquename'=>$uniquename]);

    }
    public function getAppViewShare($slug,$id,$imagedomain,$day,$uniquename){
        $app = App::findOrFail($id);
        $og_img = getenvconf('image_domain').'/'.$slug.'/'.$day.'/'.$uniquename.'.jpg';
       //    var_dump($app);
      //  exit();
        return view('guest.app_view',['app'=>$app,'og_img'=>$og_img]);
    }

    public function getAppLoading($slug,$id,$imagedomain,$day,$uniquename,$jobId,Request $request){
        $app = App::findOrFail($id);
        return view('guest.app_loading',['jobid'=>$jobId,'slug'=>$slug,'appid'=>$id,'imagedomain'=>$imagedomain,'day'=>$day,'uniquename'=>$uniquename,'app'=>$app,'autoshare'=>$request->autoshare]);

    }
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

              $url_login = "https://www.facebook.com/v2.11/dialog/oauth?client_id=".config('facebook.config')['app_id']."&redirect_uri=".urlencode('http://laravel.catviral.net/admin/test-apps/fb-callback')."&state={$state_json}&scope=".urlencode($scope);
            //   echo $url_login;
            //   exit();
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
            //   var_dump($data);
            //   exit();
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
             
              $fb->setDefaultAccessToken($accessToken);
              $homepath = $fontpath = '/home/laravel.catviral.net/public_html/public/handle/data/'.$slug;
              echo $homepath;
              require_once('/home/laravel.catviral.net/public_html/app/Factories/lib.php');
             require_once($homepath.'/images.php');
      
              echo '-----------image:';
              var_dump($image);
      
              imagejpeg($image, '/home/laravel.catviral.net/public_html/public/tmp/'.$uniq_name.'.jpg', 100);
      
              $imageName = "{$slug}/{$day}/{$uniq_name}.jpg"; 
              $s3 = \Storage::disk('s3-result');
              $s3aws = $s3->put($imageName, file_get_contents('/home/laravel.catviral.net/public_html/public/tmp/'.$uniq_name.'.jpg'), 'public');
           
              $imagedomain_replace = str_replace("https://","",getenvconf('image_domain'));   
        //      $url_share = getenvconf('domain') . '/app/'.$slug.'/'.$app_id.'/'.$imagedomain_replace.'/'.$day.'/'.$uniq_name;
          
              unlink('/home/laravel.catviral.net/public_html/public/tmp/'.$uniq_name.'.jpg');

              $url_result = getenvconf('domain') . '/admin/test-apps/result/'.$slug.'/'.$app_id.'/'.$imagedomain_replace.'/'.$day.'/'.$uniq_name;
            //   if( $autoshare == 'at') {
            //       $url_result.='?autoshare=at';    
            //    }
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
}
