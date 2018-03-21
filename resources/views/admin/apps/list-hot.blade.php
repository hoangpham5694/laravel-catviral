@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            App Hot
        </h1>
    </section>
    <div class="content">
        @include('adminlte-templates::common.errors')
        <div class="box box-primary">
            <div class="box-body">
                    <a href="{!! url('admin/app-hot/create') !!}" class="btn btn-default">Create App hot </a>
                        <ul class="list-group">
                                <li class="list-group-item" data-id="">
                                        <div class="media">
                                            <div class="media-left">
                                                <img class="media-object" src="">
                                            </div>
                                            <div class="media-body">
                                                <h4 class="media-heading">ád</h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item" data-id="">
                                            <div class="media">
                                                <div class="media-left">
                                                    <img class="media-object" src="">
                                                </div>
                                                <div class="media-body">
                                                    <h4 class="media-heading">aaa</h4>
                                                </div>
                                            </div>
                                        </li>
                        </ul>
                   

               
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
                url: 'order.php', // server url
                type: 'POST', //POST or GET 
                data: {data:data}, // data to send in ajax format or querystring format
                datatype: 'json',
                success: function(json) {
                    alert(json.message);
                }
            });
        });
        
    });

</script>
    

@endsection