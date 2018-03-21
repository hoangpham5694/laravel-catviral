<?php

namespace App\Http\Controllers;
use Flash;
use Illuminate\Http\Request;
use App\Http\Requests\Tool\UploadCodeRequest;
use Illuminate\Contracts\Filesystem\Filesystem;
class ToolController extends Controller
{
    public function getUploadCode()
    {
        return view('admin.tools.upload');
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
    public function postUploadCode(UploadCodeRequest $request)
    {
        $slug = $request->slug;
        $destinationPath = 'handle/data/'.$slug;
        $this->makeimagedir($destinationPath);
        if ($request->has('file')) {
            $files = $request->file('file');
            $s3 = \Storage::disk('s3');
            
            foreach($files as $file) {             
                $filename = $file->getClientOriginalName();
                $upload_success = $file->move($destinationPath, $filename);  
                if($upload_success){
                    $s3->put($destinationPath.'/'. $filename, file_get_contents($destinationPath.'/'. $filename), 'public');
                }              
            }
            Flash::success('Upload Thành công');
            return redirect(route('get-tool-upload'));
        }else{
            Flash::error('Không có file');
            return redirect(route('get-tool-upload'));
        }


        // var_dump($files);
        // exit();
    }
    public function getOverride(){
        return view('admin.tools.override');
    }
}
