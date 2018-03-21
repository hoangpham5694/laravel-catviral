@extends('guest.master')
@section('title')
    {{ getenvconf('sitename')}}- ứng dụng vui facebook
@endsection

@section('meta')
<meta property="og:image" content="{!! asset('/')!!}static/img/logo.png"/>
<meta property="og:title" content="{{getenvconf('sitename')}}"/>
<meta property="og:description" content="Ứng dụng vui Facebook!"/>

@endsection

@section('content')
    <div id="list-quiz" class="row">
        {{--  @foreach ($apps as $app)
            <div class="quiz-holder">
				<div class="ibox quiz-listing hover-highlight">
					<a href="/app/{{$app->slug}}/{{$app->id}}">
						<div class=" wide-img-wrapper">
							<div class="wide-img">
								<img src="/public/images/360x189/{{$app->id}}.jpg">
							</div>
						</div>
						<!-- <div class="button-wrapper">
							<div class="button" href="#">Chơi Ngay</div>
						</div> -->
						<p>{{$app->title}}</p>
					</a>
				</div>
			</div>
        @endforeach  --}}

            
                        
                        
            
    </div>
@endsection

@section('footer')


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"></script>
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
        
        var template = $('#hidden-template').html();
        var customTags = [ '<%', '%>' ];
        var pagina =1;
        Mustache.parse(template, customTags);
        function carrega(page){
            var url ="api/apps/listappsnew?max=6&page="+page;
            console.log(url);
            $.getJSON(url, function(result){
                $.each(result, function(i, field){
                    console.log(field);
                    var html = Mustache.render(template, field);
                    $("#list-quiz").append(html);
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