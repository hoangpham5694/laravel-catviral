@extends('layouts.app')
@section('title','Quản lý app - Catviral admin')
@section('content')
    <section class="content-header">
        <h1 class="pull-left">Apps</h1>
        <h1 class="pull-right">
           <a class="btn btn-primary pull-right" style="margin-top: -10px;margin-bottom: 5px" href="{!! route('app-create') !!}">Add New</a>
        </h1>
    </section>
    <div class="content">
       
        <div class="clearfix"></div>
        @include('vendor.flash.message')
        <div ng-controller="AppController">
                
                  <div class="row" >
                  <div class="col-lg-2 col-md-3">
                    <div class="form-group">
                      
                        <span>Sắp xếp</span>
                
                    </div>
                  </div>
                
                    <div class="col-lg-2 col-md-3">
                     <div class="form-group">
                      
                        <select name="" ng-model="sltStatus" class="form-control" ng-change="changeStatus()" id="">
                          <option value="">-Trạng thái-</option>
                         
                          <option value="pending" >Pending</option>
                          <option value="ok" >Active</option>
                          <option value="stop" >Stop</option>
                        </select>
                     
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-3">
                    <div class="form-group">
                      
                        <select name="" ng-model="sltCateId" class="form-control" ng-change="changeCate()" id="">
                          <option value="">-Danh mục-</option>
                          @foreach($cates as $cate)
                          <option value="{{ $cate->id }}" >{{ $cate->name }}</option>
                          @endforeach
                
                        </select>
                      
                
                    </div>
                  </div>
                    
                      <div class="col-lg-2 col-md-3">
                    <div class="form-group">
                      
                        <select name="" ng-model="sltUserId" class="form-control" ng-change="changeUser()" id="">
                          <option value="">-User-</option>
                          @foreach($users as $user)
                          <option value="{{ $user->id }}" >{{ $user->name }} </option>
                          @endforeach
                
                        </select>
                      
                
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-12">
                    <div class="input-group custom-search-form">
                      <input type="text" ng-model="txtKeyword" ng-change="changeKey()" class="form-control" placeholder="Nhập Tên app... ">
                      <span class="input-group-addon" id="sizing-addon2"> <i class="fa fa-search"></i></span>
                
                    </div>
                  </div>
                </div>
                <div class="btn-toolbar" role="toolbar" aria-label="...">
                    <div class="btn-group" role="group" aria-label="...">
                        <button type="button" ng-repeat="n in [1,total] | makeRange" ng-click="changePage(n)" class="btn btn-default" ng-disabled="page == n">{% n %}</button>
                    </div>
                  
                  </div>
                <table class="table table-hover" >
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Tiêu đề</th>
                      <th>Slug</th>
                      <th>Người tạo</th>
                      <th>Danh mục</th>
                     
                      
                      <th>Image</th>
                      <th>Status</th>
                
                <th></th>
                 
                    </tr>
                  </thead>
                  <tbody>
                   <tr ng-repeat="app in apps">
                    <td>{%app.id%}</td>
                    <td><a href="{!! asset('app')!!}/{%app.slug%}/{%app.id%}" target="_blank">{%app.title%}</a> </td>
                    <td>{%app.slug%} </td>
                    <td>{%app.user_name%} </td>
                    <td>{%app.cate_name%}</td>
                  
                   
                     <td><img ng-src="{!!asset('images/300x180')!!}/{% app.id%}.jpg" alt=""></td>
                    <td> 
                <div class="btn-group">
                  <button type="button" ng-class="{'btn-success':app.status =='ok','btn-warning':app.status =='pending','btn-danger':app.status =='stop'}" style="color:white;" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   {%app.status%} <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a ng-click="setStatus(app.id,'ok')" style="color:white;" class="btn btn-success btn-xs" ng-disabled="app.status == 'ok'">Active</a> </li>
                  <li> <a ng-disabled="app.status == 'pending'" style="color:white;" class="btn btn-warning btn-xs" ng-click="setStatus(app.id,'pending')">Pending</a>  </li>
                   <li>  <a ng-disabled="app.status == 'stop'" style="color:white;" class="btn btn-danger btn-xs" ng-click="setStatus(app.id,'stop')">Stop</a></li>
                  </ul>
                </div>
                
                    
                   
                  
                   </td>
                    <td>
                   
                
                          <a class="btn btn-xs btn-primary" ng-href="{{ url('admin/apps') }}/{%app.id%}" >
                            <i class="glyphicon glyphicon-edit" aria-hidden="true"></i> Detail
                          </a>
                          <a class="btn btn-xs btn-primary" ng-href="{{ url('/admin/test-apps/') }}/{%app.slug%}/{%app.id%}" target="_blank" >
                           <i class="glyphicon glyphicon-edit" aria-hidden="true"></i> Test
                         </a>
                          <a class="btn btn-xs btn-primary" ng-href="{{ url('admin/apps/') }}/{%app.id%}/edit" >
                            <i class="glyphicon glyphicon-edit" aria-hidden="true"></i> Sửa
                          </a>
                         
        
                         
                           <button class="btn btn-xs btn-danger" ng-click="delete(app.id)" ng-disabled="<?php echo getenvconf('disable_delete');?>"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i> Xóa</button>
                         
               
                
                   </td>
                 </tr>
                </tbody>
                </table>
                
              
                
                
                </div>
    </div>
@endsection

@section('scripts')
    <script src="<?php echo asset('angular/app/lib/angular.min.js') ; ?>"></script>  
    <script src="<?php echo asset('angular/app/app.js?sdfsdf') ; ?>"></script>   
    <script src="<?php echo asset('angular/app/controller/admins/AppController.js?ghfghfgh') ; ?>"></script>  
@endsection