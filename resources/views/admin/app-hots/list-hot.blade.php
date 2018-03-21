@extends('layouts.app')
@section('title','App hot - Catviral admin')
@section('content')
    <section class="content-header">
        <h1>
            App Hot
        </h1>
    </section>
    <div class="content">
            <div class="clearfix"></div>
            @include('vendor.flash.message')
        @include('adminlte-templates::common.errors')
        <div class="box box-primary">
                <div class="box-header">
                        <a href="{!! url('admin/app-hot/create') !!}" class="btn btn-default">Create App hot </a>
                </div>
            <div class="box-body">
                    
                        <ul class="list-group">
                            @foreach($appHots as $app)
                                <li class="list-group-item" data-id="{{$app->id}}">
                                        <div class="media">
                                            <div class="media-left">
                                                <img class="media-object" src="{!!asset('images/300x180')!!}/{{$app->id}}.jpg">
                                            </div>
                                            <div class="media-body">
                                                <h4 class="media-heading">{{$app->title}}</h4>
                                            </div>
                                        </div>
                                    </li>
                            @endforeach       
                        </ul>
                   

               
            </div>
            <div class="box-footer">
                    <button class="btn btn-success order">Order</button>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

<script>
    $(document).ready(function(){
        var list = [];
        $(".list-group").sortable({
            update: function (event, ui) {
                list = [];
                $('.list-group li').each(function() {
                    var order = $(this).attr("data-id");
                    list.push(order);
                });
                console.log(list);
            }
        });
        $(".order").click(function(){
            var data=JSON.stringify(list);
            $.ajax({
                url: '{!! url('api/app-hot/order') !!}', // server url
                type: 'POST', //POST or GET 
                data: {data:data}, // data to send in ajax format or querystring format
                datatype: 'json',
                success: function(json) {
                    console.log(json);
                    alert(json.message);
                }

            });
        });
        
    });

</script>
    

@endsection