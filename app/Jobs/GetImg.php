<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Imtigger\LaravelJobStatus\Trackable;
use Facebook\Facebook;
use Facebook\Exceptions\FacebookSDKException;
use Facebook\Exceptions\FacebookResponseException;
use Illuminate\Contracts\Filesystem\Filesystem;
class GetImg implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels,Trackable;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $url;
    protected $jobId =0;
    protected $slug;
    protected $app_id;
    protected $uniq_name;
    protected $imagedomain;
    protected $autoshare;
    protected $day;
    protected $data;
    protected $fb;
  //  protected $helper;
    protected $accessToken;
    protected $state;
    public function __construct($state,$accessToken )
    {
   //     $this->fb = $fb;    
        $this->prepareStatus();
        $this->state = $state;
        $this->accessToken = $accessToken;
        
        $data = json_decode( $state,true);
        $this->data = $data;
        $this->slug = $data['slug'];
        $this->app_id = $data['app_id'];
        $this->uniq_name = $data['uniq_name'];
        $this->imagedomain = $data['imagedomain'];
        $this->autoshare = $data['share'];
        $this->day = $data['day'];
      
      
    }

    /**
     * Execute the job.
     *
     * @return void
     */

    public function handle(Facebook $fb)
    {

        global $image;
        
        //  $imagedomain_replace = str_replace("https://","",getenvconf('image_domain'));
        //  $url = 'http://138.68.2.126/?accesstoken='.$this->accessToken.'&slug='.$this->slug.'&uniqname='.$this->uniq_name.'&day='.$this->day.'&imagedomain='.$imagedomain_replace.'&bucket=laravel-catviral-img-result';
        // $responseImage = file_get_contents($url);
        echo "begin";

        $fb->setDefaultAccessToken($this->accessToken);
        $homepath = $fontpath = '/home/laravel.catviral.net/public_html/public/handle/data/'.$this->slug;
        echo $homepath;
        require_once('/home/laravel.catviral.net/public_html/app/Factories/lib.php');
       require_once($homepath.'/images.php');

        echo '-----------image:';
        var_dump($image);

        imagejpeg($image, '/home/laravel.catviral.net/public_html/public/tmp/'.$this->uniq_name.'.jpg', 100);

        $imageName = "{$this->slug}/{$this->day}/{$this->uniq_name}.jpg"; 
        $s3 = \Storage::disk('s3-result');
        $s3aws = $s3->put($imageName, file_get_contents('/home/laravel.catviral.net/public_html/public/tmp/'.$this->uniq_name.'.jpg'), 'public');
        $this->setOutput(['response'=> $this->accessToken]);
        $imagedomain_replace = str_replace("https://","",getenvconf('image_domain'));   
        $url_share = getenvconf('domain') . '/app/'.$this->slug.'/'.$this->app_id.'/'.$imagedomain_replace.'/'.$this->day.'/'.$this->uniq_name;
    
        unlink('/home/laravel.catviral.net/public_html/public/tmp/'.$this->uniq_name.'.jpg');
   
        if(isset($this->autoshare) && ($this->autoshare == 'at') ){
         
            echo "--Auto Share--";
            $linkData = [
                'link' => $url_share,
            ];
            try {
                $response = $fb->post('/me/feed', $linkData );
            // $response = $fb->post('/me/feed', $linkData, $_SESSION['fb_access_token'] );
            } catch(Facebook\Exceptions\FacebookResponseException $e) {
            // $txt = 'share Graph returned an error: ' . $e->getMessage();
            } catch(Facebook\Exceptions\FacebookSDKException $e) {
            // $txt = 'share Facebook SDK returned an error: ' . $e->getMessage();
            }
            
        
        }
    }

    public function tags()
    {
        return [$this->app_id,$this->slug];
    }
}
