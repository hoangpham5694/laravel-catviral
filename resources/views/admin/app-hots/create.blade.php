@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            App
        </h1>
    </section>
    <div class="content">
            <div class="clearfix"></div>
        @include('vendor.flash.message')
        @include('adminlte-templates::common.errors')
        <div class="box box-primary">

            <div class="box-body">
                <div class="row">
                    {!! Form::open(['route' => 'post-app-create-hot','files' => true]) !!}

                            <!-- Title Field -->
                        <div class="form-group col-sm-12">
                                {!! Form::label('idApp', 'ID App:') !!}
                                {!! Form::number('idApp', null, ['class' => 'form-control']) !!}
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
