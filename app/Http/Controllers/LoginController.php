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
       
    	if (Auth::guard('staffs')->attempt($login)) {
            echo "login success";
        }else{
            redirect()->back();
        }
    }
}
