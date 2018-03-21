@extends('admin.master')
@section('title','Admin Dashboard')
@section('content')
<div class="row">
    <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
            <span class="info-box-icon bg-aqua"><i class="fa fa-diamond"></i></span>

            <div class="info-box-content">
                <span class="info-box-text">Total apps</span>
                <span class="info-box-number">{!! $numApps !!}</span>
            </div>
            <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
    </div>
    <!-- /.col -->
    <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
            <span class="info-box-icon bg-green"><i class="fa fa-check"></i></span>

            <div class="info-box-content">
                <span class="info-box-text">App Published</span>
                <span class="info-box-number">{!! $numAppsPublish !!}</span>
            </div>
            <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
    </div>
    <!-- /.col -->

    <!-- fix for small devices only -->
    <div class="clearfix visible-sm-block"></div>

    <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
            <span class="info-box-icon bg-yellow"><i class="fa fa-pause"></i></span>

            <div class="info-box-content">
                <span class="info-box-text">App pending</span>
                <span class="info-box-number">{!! $numAppsPending !!}</span>
            </div>
            <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
    </div>
    <!-- /.col -->
    <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
            <span class="info-box-icon bg-red"><i class="fa fa-power-off"></i></span>

            <div class="info-box-content">
                <span class="info-box-text">App Off</span>
                <span class="info-box-number">{!! $numAppsOff !!}</span>
            </div>
            <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
    </div>
    <!-- /.col -->
</div>
<!-- /.row -->



<!-- Main row -->
<div class="row">
    <!-- Left col -->
    <div class="col-md-8">
        <!-- TABLE: LATEST ORDERS -->
        <div class="box box-info">
            <div class="box-header with-border">
                <h3 class="box-title">Recent Apps</h3>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="table-responsive">
                    <table class="table no-margin">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Status</th>
                             
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php
                            foreach($recentApps as $app) {
                            ?>
                            <tr>
                                <td>{{$app->id}}</td>
                                <td><a href="" target="_blank">{{$app->title}}</a></td>
                                <?php 
                                    if($app['status'] == 'ok') {
                                        echo '<td><span class="label label-success">'.$app->status.'</span></td>';
                                    } elseif($app['status'] == 'pending') {
                                        echo '<td><span class="label label-warning">'.$app->status.'</span></td>';
                                    } else {
                                        echo '<td><span class="label label-danger">'.$app->status.'</span></td>';
                                    }
                                ?>
                                
                                
                                <td>{{$app->name}}</td>
                            </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>
                <!-- /.table-responsive -->
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix">
                <a href="/adminv2/apps" class="btn btn-sm btn-default btn-flat pull-right">View All Apps</a>
            </div>
            <!-- /.box-footer -->
        </div>
        <!-- /.box -->
    </div>
    <!-- /.col -->

    <div class="col-md-4">
        

        <!-- PRODUCT LIST -->
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">App hot</h3>
                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <ul class="products-list product-list-in-box">
                <?php
                    // foreach($apphot as $app) {
                    
                ?>
                    <!--<li class="item">
                        <div class="product-img">
                            <img src=""" alt="">
                        </div>
                        <div class="product-info">
                            <a href="" class="product-title">
                            <span class="product-description"><?php echo $app['description']; ?></span>
                        </div>
                    </li>-->
                <?php // } ?>
                </ul>
            </div>
            <!-- /.box-body -->
            <div class="box-footer text-center">
                <a href="/adminv2/appshot" class="uppercase">View All App Hot</a>
            </div>
            <!-- /.box-footer -->
        </div>
        <!-- /.box -->
    </div>
    <!-- /.col -->
</div>
@endsection