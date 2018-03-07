<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="https://www.w3.org/1999/xhtml" lang="vi" xml:lang="vi">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title> {{getenvconf('sitename')}} - Ứng dụng vui Facebook!</title>
<meta property="fb:app_id" content="{!!getenvconf('fbapp')!!}"/>
<meta property="og:image" content="{!! asset('public/static/img/logo.png')!!}"/>
<meta property="og:image:secure_url" content="{!! asset('public/static/img/logo.png')!!}"/>
<meta property="og:image:type" content="image/jpeg"/>
<meta property="og:image:width" content="800"/>
<meta property="og:image:height" content="420"/>
<meta property="og:url" content="{{getenvconf('domain')}}"/>
<meta property="og:type" content="article"/>
<meta property="og:title" content="{{getenvconf('sitename')}}"/>
<meta property="og:description" content="Ứng dụng vui Facebook!"/>
<meta property="og:site_name" content="{{getenvconf('sitename')}}"/>
<meta property="og:locale" content="en_US"/>
<meta property="article:tag" content="quiz">
<meta property="article:author" content="{{getenvconf('fanpage')}}"/>
<meta property="article:publisher" content="{{getenvconf('fanpage')}}"/>
<meta name="description" content="Ứng dụng vui Facebook!">
<meta name="theme-color" content="#201a26">
@yield('header')
<link rel="apple-touch-icon" sizes="57x57" href="{!! asset('public/static/img/apple-touch-icon-57x57.png')!!}">
<link rel="apple-touch-icon" sizes="60x60" href="{!! asset('public/static/img/apple-touch-icon-60x60.png')!!}">
<link rel="apple-touch-icon" sizes="72x72" href="{!! asset('public/static/img/apple-touch-icon-72x72.png')!!}">
<link rel="apple-touch-icon" sizes="76x76" href="{!! asset('public/static/img/apple-touch-icon-76x76.png')!!}">
<link rel="apple-touch-icon" sizes="114x114" href="{!! asset('public/static/img/apple-touch-icon-114x114.png')!!}">
<link rel="apple-touch-icon" sizes="120x120" href="{!! asset('public/static/img/apple-touch-icon-120x120.png')!!}">
<link rel="apple-touch-icon" sizes="144x144" href="{!! asset('public/static/img/apple-touch-icon-144x144.png')!!}">
<link rel="apple-touch-icon" sizes="152x152" href="{!! asset('public/static/img/apple-touch-icon-152x152.png')!!}">
<link rel="apple-touch-icon" sizes="180x180" href="{!! asset('public/static/img/apple-touch-icon-180x180.png')!!}">

<link rel="canonical" href="{{getenvconf('domain')}}"/>
<link rel="shortcut icon" href="/public/static/img/favicon.ico" type="image/x-icon">

<link href="public/static/css/style.css" rel="stylesheet">
<script>
	var EnvSettings = {
		country_group: "Other",
		country: "VN",
		locale: "vi",
		experiment: "",
		fbApiToken: "",
		mobile: false,
		show_related: true,
		fb_settings: {
			appId: {{getenvconf('fbapp')}},
			cookie     : true,
			xfbml      : true,
			status: true,
			version    : '{{getenvconf('fbapp_version')}}'
		},
		readyForAds: true,
		initAds: false,
		user_status: "logged_in",
		fb_script_locale: 'vi_VN',
		pusherPublicKey: '4f8535a2b8ea9bf4cf4f',
		taboola_position: '6',
		page_type: 'root'
	}

	EnvSettings.quiz = {"id":"1","options":{}};
	var do_not_track = false;
</script>
</head>
<body class=" ">
	<!-- <div class="mobile-sidebar">
        <a href="/categories/5971b076ebb68179ceccc5c3 ">Vận may</a>
        <a href="/categories/5971b083ebb68179ceccc5c4 ">Tính cách</a>
        <a href="/categories/5971b09eebb68179ceccc5c5 ">Cuộc sống &amp; Bạn bè</a>
        <a href="/categories/5971b0a4ebb68179ceccc5c6 ">Tình yêu</a>
        <a href="/categories/5971b0a9ebb68179ceccc5c7 ">Hài hước</a>
        <a href="/categories/5971b0bfebb68179ceccc5c8 ">Xem mặt!</a>
        <a href="/user/logout">Log Out</a>
    </div> -->
    <div class="navbar " id="main" style="">
      	<div class="container">
        	<a class="mobile-menu" href="javascript:;"></a>
        	<a class="navbar-brand" href="/"><div id="logo"></div></a>
      	</div>
    </div>
	<!-- <div class="navbar" id="categories">
        <div class="container">
            <span class="category"><a href="/categories/5971b076ebb68179ceccc5c3 ">Vận may</a></span>
            <span class="category"><a href="/categories/5971b083ebb68179ceccc5c4 ">Tính cách</a></span>
            <span class="category"><a href="/categories/5971b09eebb68179ceccc5c5 ">Cuộc sống &amp; Bạn bè</a></span>
            <span class="category"><a href="/categories/5971b0a4ebb68179ceccc5c6 ">Tình yêu</a></span>
            <span class="category"><a href="/categories/5971b0a9ebb68179ceccc5c7 ">Hài hước</a></span>
            <span class="category"><a href="/categories/5971b0bfebb68179ceccc5c8 ">Xem mặt!</a></span>
        </div>
	</div> -->

	<div class="container" id="main-container">
		<div class="row">

			@yield('content')
			

		</div>
    </div> <!-- /container -->
    <div class="footer">
      <div class="container">
        <div class="footer-item">
          <p><b>Miễn trách:</b> Tất cả nội dung được cung cấp chỉ nhằm mục đích giải trí!</p>
        </div>
        <div class="footer-item"><a href="/privacy">Chính sách Bảo mật</a></div>
        <div class="footer-item"><a href="/terms">Điều khoản Dịch vụ</a></div>
        <!-- <div class="footer-item"><a href="https://docs.google.com/forms/d/e/1FAIpQLSf3_Yl2sIVsmAEhM0Y4z5bwdOM4ghk-JkgoFFMtNi7ZIC0tpQ/viewform?usp=sf_link">Advertising & Partnerships</a></div> -->
        <div class="footer-item"><a href="/user/history">Xóa ứng dụng / Xóa tài khoản</a></div>
        <div class="footer-item"><a href="/user/logout">Log Out</a></div>
      </div>
    </div>
    <div id="loadingbar-frame"></div>

	<script id="related-template" type="template">
		
	</script>
	<script>
		AdSettings = {};
		AdSettings.adUnits = [];
		AdSettings.adSlotDefinitions = [];
	</script>

	<script src="/static/js/script.js"></script>

	<script type="text/javascript">
		var pendingActions = [];
		var pendingIntervalCounter = 0;
		var pendingInterval = setInterval(function(){
			console.log('interval', pendingIntervalCounter);
			if('Tracking' in window) {
			window.clearInterval(pendingInterval);
			console.log('running pending actions');
			for(var i = 0; i<pendingActions.length; i++) {
				pendingActions[i]();
			}
			return;
			}
			++pendingIntervalCounter;
			if(pendingIntervalCounter == 5) {
			throw new Error('not loaded after 500ms');
			}
			if(pendingIntervalCounter == 10) {
			throw new Error('not loaded after 1000ms');
			}
			if(pendingIntervalCounter == 20) {
			throw new Error('not loaded after 2000ms');
			}
			if(pendingIntervalCounter == 30) {
			window.clearInterval(pendingInterval);
			throw new Error('not loaded after 3000ms');
			}
		}, 100);
		pendingActions.push(function(){ Tracking.analytics_send("{{getenvconf('GA')}}"); console.log('analytics_send'); });
	</script>
</body>
</html>