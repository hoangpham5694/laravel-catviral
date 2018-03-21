@extends('layouts.app')
@section('title','Quản lý app - Catviral admin')
@section('content')
    <section class="content-header">
        <h1>
            App
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($app, ['route' => ['app-post-edit', $app->id],'files' => true]) !!}

                        <!-- Title Field -->
                        <div class="form-group col-sm-12">
                                {!! Form::label('title', 'Title:') !!}
                                {!! Form::text('title', null, ['class' => 'form-control']) !!}
                            </div>
                            
                            <!-- Slug Field -->
                            <div class="form-group col-sm-12">
                                {!! Form::label('slug', 'Slug:') !!}
                                {!! Form::text('slug', null, ['class' => 'form-control']) !!}
                            </div>
                            
                            <!-- Description Field -->
                            <div class="form-group col-sm-12">
                                {!! Form::label('description', 'Description:') !!}
                                {!! Form::text('description', null, ['class' => 'form-control']) !!}
                            </div>
                            <div class="form-group col-sm-12">
                                    {!! Form::label('image', 'Image:') !!}
                                    <div class='clear-fix'></div>
                                    <img src="{!! asset('images/300x180')!!}/{!!$app->id!!}.jpg"  alt="" >
                                    {!! Form::file('image') !!}
                            </div>
                            
                            <!-- Introdution Field -->
                            <div class="form-group col-sm-12 col-lg-12">
                                {!! Form::label('introdution', 'Introdution:') !!}
                                {!! Form::textarea('introdution', null, ['class' => 'form-control']) !!}
                            </div>
                            
                            
                            
                            <div class="form-group col-sm-6">
                                {!! Form::label('category', 'Category:') !!}
                                <select class='form-control' name='id_cate'>
                                    @foreach($categories as $category)
                            
                                        <option value="{!!$category->id!!}" <?php if($app->id_cate == $category->id) echo 'selected';?> >{!!$category->name!!}</option>
                                    @endforeach
                                    
                                    
                                </select>
                            </div>
                            
                            <!-- Type Field -->
                            <div class="form-group col-sm-6">
                                {!! Form::label('type', 'Type:') !!}
                            
                                <select id="apps_type" name="type" id="type" required="required" class="form-control">
                                        <option  value="test" <?php if($app->type == 'test') echo 'selected'?>  >Test</option>
                                        <option  value="gif" <?php if($app->type == 'gif') echo 'selected'?>>Gif</option>
                                </select>
                            </div>
                            
                            <!-- Permission Field -->
                            <div class="form-group col-sm-6">
                                {!! Form::label('permission', 'Permission:') !!}
                            
                                <select id="apps_type" name="permission" id="type" required="required" class="form-control">
                                        
                                        <option>--Permission--</option>
                                        <option  value="public_profile"<?php if($app->permission == 'public_profile') echo 'selected'?> >Mot minh</option>
                                        <option  value="public_profile,user_photos" <?php if($app->permission == 'public_profile,user_photos') echo 'selected'?> >Khac</option>
                                        <option  value="public_profile,user_birthday" <?php if($app->permission == 'public_profile,user_birthday') echo 'selected'?>>Ngay sinh</option>
                                        <option  value="user_friends,public_profile,user_posts" <?php if($app->permission == 'user_friends,public_profile,user_posts') echo 'selected'?>>Co ban</option>
                                        <option  value="public_profile,user_birthday" <?php if($app->permission == 'public_profile,user_birthday') echo 'selected'?>>Ngay sinh</option>
                                        <option  value="user_birthday,user_photos,user_friends,public_profile,user_posts" <?php if($app->permission == 'user_birthday,user_photos,user_friends,public_profile,user_posts') echo 'selected'?>>Full</option>
                                    </select>
                            </div>
                            
                            
                            
                            <!-- Submit Field -->
                            <div class="form-group col-sm-12">
                                {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
                                <a href="{!! route('app-index') !!}" class="btn btn-default">Cancel</a>
                            </div>

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection