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
          @foreach ($apps as $app)
            <div class="quiz-holder">
				<div class="ibox quiz-listing hover-highlight">
					<a href="/app/{{$app->slug}}/{{$app->id}}">
						<div class=" wide-img-wrapper">
							<div class="wide-img">
								<img src="{!!asset('images')!!}/360x189/{{$app->id}}.jpg">
							</div>
						</div>
						<!-- <div class="button-wrapper">
							<div class="button" href="#">Chơi Ngay</div>
						</div> -->
						<p>{{$app->title}}</p>
					</a>
				</div>
			</div>
        @endforeach  

            
                        
                        
            
    </div>
@endsection

@section('footer')





@endsection