@extends('guest.master')
@section('header')
<style>
.modal{display: none;top: 0;left: 0;right: 0;bottom: 0;position: fixed;background-color: rgba(26,38,36,.95);z-index: 200}.content-modal{width: calc(100% - 20px);position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);box-sizing: border-box;padding: 20px;background-color: #fff;border-radius: 4px;text-align: center;max-width: 300px}.content-modal .bt-icon svg{left: 12px}.content-modal .title-modal{font-size: 17px;text-transform: uppercase;margin: 0}.content-modal p{color: #000}.content-modal .attention{color: #dc4a3d;margin-top: 10px;display: block}.cat-a .color,.cat-b .color,.cat-c .color{color: #325a9c}.content-modal .bt-close-modal{width: 38px;height: 38px;border: 1px solid #000;border-radius: 20%;background-color: #fff;position: absolute;right: 10px;top: -20px;cursor: pointer}.content-modal .bt-close-modal svg{width: 12px;height: 12px;top: 50%;left: 50%;position: absolute;transform: translate(-50%,-50%)}.content-modal .bt-close-modal rect{fill: #000}.bt-icon{position: relative}.bt-icon svg{position: absolute;top: 50%;left: 20px;transform: translate(0,-50%);width: 20px;height: 20px}svg:not(:root){overflow: hidden}.bt-face{background-color: #325193}.bt-face, .bt-goog, .bt-twit{margin-top: 10px;color: #fff;display: block;font-size: 15px;padding: 18px 20px;text-indent: 30px;text-align: left;border-radius: 4px;text-transform: uppercase;box-sizing: border-box;text-decoration: none}.bt-social{font-size: 15px;padding: 18px 20px;text-indent: 30px;text-align: left}.bt-face,.bt-goog,.bt-twit{margin-top: 10px;color: #fff;display: block;font-size: 15px;padding: 18px 20px;text-indent: 30px;text-align: left;border-radius: 4px;text-transform: uppercase;box-sizing: border-box;text-decoration: none}
</style>
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
              appId: 260108004339553,
              cookie     : true,
              xfbml      : true,
              status    : true,
              version    : 'v2.11'
            },
            readyForAds: true,
            initAds: false,
            initFB : false,
            user_status: "logged_in",
            fb_script_locale: 'en_US',
            page_type: 'landing',
          }
        
        EnvSettings.quiz = {
            id: '{{$app->id}}',
            urlLogin: '{!! getenvconf('domain') !!}/start_new',
        };
        var do_not_track = false;
        </script>
@endsection
@section('content')
    <div id='div-gpt-ad-top-landing' class='gpt-ad ad-top'>
        <ins class="adsbygoogle" id="ad-top-landing" ></ins>
    </div>
    <script>
        var ads_responsive = document.getElementById('ad-top-landing');
        ads_responsive.style.display = 'inline-block';
        ads_responsive.setAttribute('data-ad-slot','8206513229');
        ads_responsive.setAttribute('data-ad-client', 'ca-pub-4629886296503257');
        if(screen.width >= 500 ) {
            /*
            ads_responsive.style.width = '300px';
            ads_responsive.style.height = '100px';
            ads_responsive.setAttribute('data-ad-slot','8206513229');
        } else {*/
            ads_responsive.style.width = '720px';
            ads_responsive.style.height = '90px';
            ads_responsive.setAttribute('data-ad-slot','5123741238');
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    </script>
    <div class="row">
			<div class="quiz-main">
				<div class="ibox quiz-box">
                    <div id="quiz-result">
                        <div class="result-wrapper">
                                    
                            <div class="result-section">
                    
                                <div style="display: block;">
                                    <h3 class="quiz-title">{{$app->title}}</h3>
                                    <h1 class="result-title">Đây là kết quả của bạn!</h1>
                                </div>
                    
                                <a class="button tlnf" href="#"><img class="logo-f" src="{!! asset('static/img/logo-f.png')!!}" alt="Logo f" />Chia sẻ lên Facebook</a>
                    
                                <div class="quiz-result-img tlnf wide-img-wrapper"><div class="wide-img"><img src="{!! $result_img !!}" alt="Eb9e5dc64" /></div></div>
                            </div>
                    
                            <!--
                            <div class="result-section">
                                <div class="result-text-wrapper">
                                    <span class="description"><p>Truly <strong>inspirational</strong>. You can always rely on the bible to supply some <strong>timeless advice</strong> and motivation. The <strong>holy</strong> words within can help <strong>brighten</strong> even the darkest day. There&#39;s a reason they call it the <strong>Good Book!</strong> Keeping a verse close to your <strong>heart</strong> can help you <strong>achieve</strong> anything!</p>
                                        <p><em><strong>Remember to SHARE this with your loved ones today!</strong></em></p>
                                    </span>
                                </div>
                            </div>
                            -->
                            <div id='div-gpt-ad-bottom-result' class='gpt-ad ad-bottom'></div>
                    
                            <div class="result-section">
                                <a class="button tlnf bottom-tlnf" href="#"><img class="logo-f" src="{!! asset('static/img/logo-f.png')!!}" alt="Logo f" />Chia sẻ lên Facebook</a>
                                <a class="button refresh" href="/app/start_new" style="margin-top: 30px; margin-bottom: 20px;">
                                    <img src="/static/img/refresh-arrow.svg" alt="Refresh arrow" />
                                    thử lại
                                </a>
                            </div>
                    
                        </div>
                    </div> <!-- end result -->
                </div>
			</div>
		
		<div class="sidebar">
			<div id="sidebar-related-quizzes">
				<div class="quiz-holder">
					<div class="ibox quiz-listing hover-highlight">
						<a href="#">
							<div class="wide-img-wrapper">
								<div class="wide-img">
								<img src="/static/img/spinner.gif">
								</div>
							</div>
							<div class="animated-background"></div><div class="animated-background" style="width: 60%"></div>
						</a>
					</div>
				</div>
				<div class="quiz-holder">
					<div class="ibox quiz-listing hover-highlight">
						<a href="#">
						<div class="wide-img-wrapper">
							<div class="wide-img">
							<img src="/static/img/spinner.gif">
							</div>
						</div>
						<div class="animated-background"></div><div class="animated-background" style="width: 60%"></div>
						</a>
					</div>
					</div>
				</div>
			</div>
        </div>
        <div id="bottom-related-quizzes" class="row">
            
        </div>

@endsection

@section('footer')
<div class="modal" id="modal-login">
		<div class="content-modal content">
			<p class="title-modal">Kết nối với Facebook!</p>
			<p style="font-size: 10px;">
			Bằng cách nhập chúng tôi có thể xuất bản thay mặt bạn theo <a href="#" target="_blank" style="color: #4469B0; text-decoration: none;"> Điều khoản</a>!</p>
			<a class="bt-social bt-face bt-icon bt-gerar-go" href="javascript:changeLoading();" title="Connect your facebook! " style="font-size: 13px;">
				<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="200px" height="200px" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve">
				<path fill="#FFFFFF" d="M200,11.015v177.924c0,6.094-4.943,11.037-11.038,11.037h-50.966v-77.45h25.997l3.893-30.184h-29.89V73.071
					c0-8.739,2.427-14.694,14.96-14.694l15.982-0.007V31.374c-2.766-0.367-12.252-1.189-23.291-1.189
					c-23.044,0-38.821,14.066-38.821,39.899v22.26H80.762v30.184h26.064v77.45H11.039C4.941,199.977,0,195.033,0,188.939V11.015
					C0,4.918,4.941-0.023,11.039-0.023h177.923C195.057-0.023,200,4.918,200,11.015z"></path>
				</svg>
				<center>
					<span style="margin-left:-30px;">Chơi và chia sẻ ngay</span>
				</center>
			</a>
			<!--<span class="bt-close-modal close-modal"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="6.943px" height="6.943px" viewBox="0 0 6.943 6.943" enable-background="new 0 0 6.943 6.943" xml:space="preserve"><defs></defs><rect x="-0.423" y="2.456" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.4379 3.4715)" fill="#FFFFFF" width="7.788" height="2.031"></rect><rect x="2.456" y="-0.423" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.4379 3.4717)" fill="#FFFFFF" width="2.031" height="7.788"></rect></svg></span> -->
			<br>
			<a href="javascript:changeLoading2();" style="color: #333; font-size: 14px; text-decoration: none;">Chơi mà không chia sẻ</a>
		</div>
	</div>
<script id="related-template" type="template">
    
</script>
<script>
    AdSettings = {};
    AdSettings.adUnits = [];
    AdSettings.adSlotDefinitions = [];
</script>

<script src="{!!asset('/')!!}/static/js/common_js.js?t=<?php echo rand(1,1000000) ; ?>"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lazyload@2.0.0-beta.2/lazyload.js"></script>
<script id="hidden-template" type="text/x-custom-template">
    <div class="quiz-holder">
            <div class="ibox quiz-listing hover-highlight">
                <a href="/app/<%slug%>/<%id%>">
                    <div class=" wide-img-wrapper">
                        <div class="wide-img">
                                <img data-src="{!!asset('images/360x189')!!}/<%id%>.jpg" class="lazy"  src="{!! asset('static/img/spinner.gif')!!}">
                        </div>
                        
                    </div>
                    <p><%title%></p>
                    <!-- <div class="button-wrapper">
                        <div class="button" href="#">Chơi Ngay</div>
                    </div> -->
                    
                </a>
            </div>
        </div>
</script>
<script>

</script>

        <script>
                var template = $('#hidden-template').html();
                var customTags = [ '<%', '%>' ];
                var pagina =1;
                Mustache.parse(template, customTags);
                function carrega(page){
                    var url ="{!!url('api')!!}/apps/listappsnew?max=6&page="+page;
                    console.log(url);
                    $.getJSON(url, function(result){
                        $.each(result, function(i, field){
                            console.log(field);
                            var html = Mustache.render(template, field);
                            $("#bottom-related-quizzes").append(html);
                            $("img.lazy").lazyload();
                        });
                    });
                }
                $(document).ready(function(){
                    carrega(pagina);     
                });
                $(window).scroll(function() {
                    if($(window).scrollTop() + $(window).height() == $(document).height()) {
                        pagina += 1;
                        carrega(pagina);
                    }
                 });
        
              
        </script>

@endsection