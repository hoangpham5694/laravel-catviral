<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
class LoginController extends Controller
{
    public function getLogin(){
    	return view('admin.login.login');
    }
    public function postLogin(LoginRequest $request){
        $login = ['email' => $request->txtEmail,
                'password' => $request->txtPassword,
                'status'=> 'activated'
        ];
     //   echo "login";
    	if (Auth::guard('admin')->attempt($login)) {
           
            return redirect('admin/home');
        }else{
            echo "wrong passwprd";
        }
       
    }
    public function getLogout()
    {
        Auth::logout();
        return redirect()->route('getLogin');
    }
}
