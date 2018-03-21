@extends('layouts.app')
@section('title','Override code')
@section('content')
    <section class="content-header">
        <h1>
            Override Code
        </h1>
    </section>
    <div class="content">
        <div class="box box-primary">
            <div class="box-body">
                <div class="row" style="padding-left: 20px">
                        <form method="POST" action="" accept-charset="UTF-8" enctype="multipart/form-data">
                            
                            {!! csrf_field() !!}
                            
                            <div class="form-group col-sm-12">
                                <label for="slug">Slug:</label>
                                <input class="form-control" name="slug" type="text" id="slug">
                            </div>
                         
                            <div class="form-group col-sm-12">
                            <input class="btn btn-primary" type="submit" value="Save">
                            
                            </div>
                            </form>
                            
                            
                    
                </div>
                @include('admin.blocks.error')  
                @include('vendor.flash.message')
            </div>
        </div>
    </div>
@endsection
