
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>@yield('title')</title>
<meta name="robots" content="nofollow,noindex" />

<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

<link rel="stylesheet" href="{!!asset('assets/bootstrap/css/bootstrap.min.css')!!}">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">

<link rel="stylesheet" href="{!!asset('assets/dist/css/AdminLTE.min.css')!!}">


<link rel="stylesheet" href="{!!asset('assets/dist/css/skins/_all-skins.min.css')!!}">
<link href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.7.3/css/froala_editor.pkgd.min.css" rel="stylesheet" type="text/css" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.7.3/css/froala_style.min.css" rel="stylesheet" type="text/css" />
@yield('header')

<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition sidebar-mini skin-purple-light">
<div class="wrapper">
<header class="main-header">

<a href="index.php" class="logo">

<span class="logo-mini"><b>D</b>G</span>

<span class="logo-lg"><b>Di</b>Goo</span>
</a>

<nav class="navbar navbar-static-top">

<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
<span class="sr-only">Toggle navigation</span>
</a>

<div class="navbar-custom-menu">
<ul class="nav navbar-nav">

<li class="dropdown user user-menu">
<a href="#" class="dropdown-toggle" data-toggle="dropdown">
<img src="http://digoo.net/admin/assets/dist/img/user7-128x128.jpg" class="user-image" alt="User Image">
<span class="hidden-xs">{!!Auth::guard('admin')->user()->email!!}</span>
</a>
<ul class="dropdown-menu">

<li class="user-header">
<img src="http://digoo.net/admin/assets/dist/img/user7-128x128.jpg" class="user-image" alt="User Image">
<p>
	{!!Auth::guard('admin')->user()->email!!} <small>Member</small>
</p>
</li>

<li class="user-footer">
<div class="pull-right">
 <a href="http://digoo.net/admin/logout.php" class="btn btn-default btn-flat">Log out</a>
</div>
</li>
</ul>
</li>

<li>
<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
</li>
</ul>
</div>
</nav>
</header>

<aside class="main-sidebar">

<section class="sidebar">

<div class="user-panel">
<div class="pull-left image">
<img src="http://digoo.net/admin/assets/dist/img/user7-128x128.jpg" class="img-circle" alt="User Image">
</div>
<div class="pull-left info">
<p>{!!Auth::guard('admin')->user()->name!!}</p>
<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
</div>
</div>

<form action="#" method="get" class="sidebar-form">
<div class="input-group">
<input type="text" name="q" class="form-control" placeholder="Search...">
<span class="input-group-btn">
<button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
</button>
</span>
</div>
</form>


<ul class="sidebar-menu">
<li class="header">MAIN NAVIGATION</li>
<li class="active treeview">
<a href="#">
<i class="fa fa-dashboard"></i> <span>Dashboard</span>
<span class="pull-right-container">
<i class="fa fa-angle-left pull-right"></i>
</span>
</a>
<ul class="treeview-menu">
<li class="active"><a href="http://digoo.net/admin/"><i class="fa fa-circle-o"></i> Dashboard</a></li>
</ul>
</li>
<li class=" treeview">
<a href="#">
<i class="fa fa-diamond"></i>
<span>Apps</span>
<span class="pull-right-container">
<i class="fa fa-angle-left pull-right"></i>
</span>
</a>
<ul class="treeview-menu">
<li><a href="http://digoo.net/admin/apps/index.php"><i class="fa fa-list"></i> List apps</a></li>
<li><a href="http://digoo.net/admin/apps/create.php"><i class="fa fa-plus"></i> Create new app</a></li>
</ul>
</li>
<li class=" treeview">
<a href="#">
<i class="fa fa-bolt"></i>
<span>App hot</span>
<span class="pull-right-container">
<i class="fa fa-angle-left pull-right"></i>
</span>
</a>
<ul class="treeview-menu">
<li><a href="http://digoo.net/admin/appshot/index.php"><i class="fa fa-list"></i> List app hot</a></li>
<li><a href="http://digoo.net/admin/appshot/create.php"><i class="fa fa-plus"></i> Create app hot</a></li>
<li><a href="http://digoo.net/admin/appshot/order.php"><i class="fa fa-sort"></i> Order app hot</a></li>
</ul>
</li>
<li class="treeview">
<a href="#">
<i class="fa fa-folder-open"></i>
<span>App in category</span>
<span class="pull-right-container">
<i class="fa fa-angle-left pull-right"></i>
</span>
</a>
<ul class="treeview-menu">
<li><a href="http://digoo.net/admin/appscategories/index.php"><i class="fa fa-list"></i> List app in categories</a></li>
<li><a href="http://digoo.net/admin/appscategories/create.php"><i class="fa fa-plus"></i> Create app in category</a></li>
</ul>
</li>
<li class=" treeview">
<a href="#">
<i class="fa fa-folder"></i> <span>Category</span>
<span class="pull-right-container">
<i class="fa fa-angle-left pull-right"></i>
</span>
</a>
<ul class="treeview-menu">
<li><a href="http://digoo.net/admin/categories/index.php"><i class="fa fa-list"></i> List categories</a></li>
<li><a href="http://digoo.net/admin/categories/create.php"><i class="fa fa-plus"></i> Creat Category</a></li>
</ul>
</li>
<li class=" treeview">
<a href="#">
<i class="fa fa-gears"></i> <span>Tools</span>
<span class="pull-right-container">
<i class="fa fa-angle-left pull-right"></i>
</span>
</a>
<ul class="treeview-menu">
<li><a href="http://digoo.net/admin/tools/clear_cloudflare.php"><i class="fa fa-eraser"></i> Clear Cloudflare cache</a></li>
<li><a href="http://digoo.net/admin/tools/clear_memcached.php"><i class="fa fa-eraser"></i> Clear memcached</a></li>
<li><a href="http://digoo.net/admin/tools/upload_code.php"><i class="fa fa-code"></i> Upload code</a></li>
<li><a href="http://digoo.net/admin/tools/overrideapp.php"><i class="fa fa-code"></i> Override code</a></li>
</ul>
</li>
<li class=" treeview">
<a href="#">
<i class="fa fa-bell"></i> <span>Push Notifications</span>
<span class="pull-right-container">
<i class="fa fa-angle-left pull-right"></i>
</span>
</a>
<ul class="treeview-menu">
<li><a href="http://digoo.net/admin/push/index.php"><i class="fa fa-list"></i> Summary</a></li>
<li><a href="http://digoo.net/admin/push/create.php"><i class="fa fa-plus"></i> Create Notification</a></li>
<li><a href="http://digoo.net/admin/push/push.php"><i class="fa fa-paper-plane-o"></i> Send Notification</a></li>
<li><a href="http://digoo.net/admin/push/report.php"><i class="fa fa-bar-chart"></i> Report</a></li>
</ul>
</li>
<li class="header">LABELS</li>
<li><a href="#"><i class="fa fa-circle-o text-green"></i> <span>It's Ok</span></a></li>
<li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
<li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
<li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
</ul>
</section>

</aside>

<div class="content-wrapper">

<section class="content-header">
<h1>
Dashboard
<small>Version 2.0</small>
</h1>
<ol class="breadcrumb">
<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
<li class="active">Dashboard</li>
</ol>
</section>

<section class="content">
	@yield('content')

</section>

</div>

<footer class="main-footer">
<div class="pull-right hidden-xs">
<b>Version</b> 2.3.8
</div>
<strong>Copyright &copy; 2014-2016 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights
reserved.
</footer>

<aside class="control-sidebar control-sidebar-dark">

<ul class="nav nav-tabs nav-justified control-sidebar-tabs">
<li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
<li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
</ul>

<div class="tab-content">

<div class="tab-pane" id="control-sidebar-home-tab">
<h3 class="control-sidebar-heading">Recent Activity</h3>
<ul class="control-sidebar-menu">
<li>
<a href="javascript:void(0)">
<i class="menu-icon fa fa-birthday-cake bg-red"></i>
<div class="menu-info">
<h4 class="control-sidebar-subheading">Langdon's Birthday</h4>
<p>Will be 23 on April 24th</p>
</div>
</a>
</li>
<li>
<a href="javascript:void(0)">
<i class="menu-icon fa fa-user bg-yellow"></i>
<div class="menu-info">
<h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>
<p>New phone +1(800)555-1234</p>
</div>
</a>
</li>
<li>
<a href="javascript:void(0)">
<i class="menu-icon fa fa-envelope-o bg-light-blue"></i>
<div class="menu-info">
<h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>
<p><span class="__cf_email__" data-cfemail="6d03021f0c2d0815">[email&#160;protected]</span>ample.com</p>
</div>
</a>
</li>
<li>
<a href="javascript:void(0)">
<i class="menu-icon fa fa-file-code-o bg-green"></i>
<div class="menu-info">
<h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>
<p>Execution time 5 seconds</p>
</div>
</a>
</li>
</ul>

<h3 class="control-sidebar-heading">Tasks Progress</h3>
<ul class="control-sidebar-menu">
<li>
<a href="javascript:void(0)">
<h4 class="control-sidebar-subheading">
Custom Template Design
<span class="label label-danger pull-right">70%</span>
</h4>
<div class="progress progress-xxs">
<div class="progress-bar progress-bar-danger" style="width: 70%"></div>
</div>
</a>
</li>
<li>
<a href="javascript:void(0)">
<h4 class="control-sidebar-subheading">
Update Resume
<span class="label label-success pull-right">95%</span>
</h4>
<div class="progress progress-xxs">
<div class="progress-bar progress-bar-success" style="width: 95%"></div>
</div>
</a>
</li>
<li>
<a href="javascript:void(0)">
<h4 class="control-sidebar-subheading">
Laravel Integration
<span class="label label-warning pull-right">50%</span>
</h4>
<div class="progress progress-xxs">
<div class="progress-bar progress-bar-warning" style="width: 50%"></div>
</div>
</a>
</li>
<li>
<a href="javascript:void(0)">
<h4 class="control-sidebar-subheading">
Back End Framework
<span class="label label-primary pull-right">68%</span>
</h4>
<div class="progress progress-xxs">
<div class="progress-bar progress-bar-primary" style="width: 68%"></div>
</div>
</a>
</li>
</ul>

</div>


<div class="tab-pane" id="control-sidebar-settings-tab">
<form method="post">
<h3 class="control-sidebar-heading">General Settings</h3>
<div class="form-group">
<label class="control-sidebar-subheading">
Report panel usage
<input type="checkbox" class="pull-right" checked>
</label>
<p>
Some information about this general settings option
</p>
 </div>

<div class="form-group">
<label class="control-sidebar-subheading">
Allow mail redirect
<input type="checkbox" class="pull-right" checked>
</label>
<p>
Other sets of options are available
</p>
</div>

<div class="form-group">
<label class="control-sidebar-subheading">
Expose author name in posts
<input type="checkbox" class="pull-right" checked>
</label>
<p>
Allow the user to show his name in blog posts
</p>
</div>

<h3 class="control-sidebar-heading">Chat Settings</h3>
<div class="form-group">
<label class="control-sidebar-subheading">
Show me as online
<input type="checkbox" class="pull-right" checked>
</label>
</div>

<div class="form-group">
<label class="control-sidebar-subheading">
Turn off notifications
<input type="checkbox" class="pull-right">
</label>
</div>

<div class="form-group">
<label class="control-sidebar-subheading">
Delete chat history
<a href="javascript:void(0)" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>
</label>
</div>

</form>
</div>

</div>
</aside>


<div class="control-sidebar-bg"></div>
</div>


<script data-cfasync="false" src="/cdn-cgi/scripts/d07b1474/cloudflare-static/email-decode.min.js"></script><script src="http://digoo.net/admin/assets/plugins/jQuery/jquery-2.2.3.min.js"></script>

<script src="http://digoo.net/admin/assets/bootstrap/js/bootstrap.min.js"></script>

<script src="http://digoo.net/admin/assets/dist/js/app.min.js"></script>

<script src="http://digoo.net/admin/assets/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<script src="http://digoo.net/admin/assets/plugins/datatables/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.7.3/js/froala_editor.pkgd.min.js"></script>
<script src="http://digoo.net/admin/assets/dist/js/demo.js"></script>
@yield('footer')

</body>
</html>