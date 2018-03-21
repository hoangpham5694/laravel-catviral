@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            App
        </h1>
    </section>
    <div class="content">
        @include('adminlte-templates::common.errors')
        <div class="box box-primary">

            <div class="box-body">
                <div class="row">
                    {!! Form::open(['route' => 'app-post-create','files' => true]) !!}

                            <!-- Title Field -->
                        <div class="form-group col-sm-12">
                                {!! Form::label('title', 'Title:') !!}
                                {!! Form::text('title', null, ['class' => 'form-control']) !!}
                            </div>
                            
                            <!-- Slug Field -->
                            <div class="form-group col-sm-12">
                                {!! Form::label('slug', 'Slug:') !!}
                                {!! Form::text('slug', null, ['class' => 'form-control']) !!}
                            </div>
                            
                            <!-- Description Field -->
                            <div class="form-group col-sm-12">
                                {!! Form::label('description', 'Description:') !!}
                                {!! Form::text('description', null, ['class' => 'form-control']) !!}
                            </div>
                            <div class="form-group col-sm-12">
                                    {!! Form::label('image', 'Image:') !!}
                                    {!! Form::file('image') !!}
                            </div>
                            
                            <!-- Introdution Field -->
                            <div class="form-group col-sm-12 col-lg-12">
                                {!! Form::label('introdution', 'Introdution:') !!}
                                {!! Form::textarea('introdution', null, ['class' => 'form-control']) !!}
                            </div>
                            
                            
                            
                            <div class="form-group col-sm-6">
                                {!! Form::label('category', 'Category:') !!}
                                <select class='form-control' name='id_cate'>
                                    @foreach($categories as $category)
                            
                                        <option value="{!!$category->id!!}" <?php if($app->id_cate == $category->id) echo 'selected';?> >{!!$category->name!!}</option>
                                    @endforeach
                                    
                                    
                                </select>
                            </div>
                            
                            <!-- Type Field -->
                            <div class="form-group col-sm-6">
                                {!! Form::label('type', 'Type:') !!}
                            
                                <select id="apps_type" name="type" id="type" required="required" class="form-control">
                                        <option  value="test" <?php if($app->type == 'test') echo 'selected'?>  >Test</option>
                                        <option  value="gif" <?php if($app->type == 'gif') echo 'selected'?>>Gif</option>
                                </select>
                            </div>
                            
                            <!-- Permission Field -->
                            <div class="form-group col-sm-6">
                                {!! Form::label('permission', 'Permission:') !!}
                            
                                <select id="apps_type" name="permission" id="type" required="required" class="form-control">
                                        <option>--Permission--</option>
                                        <option  value="public_profile" >Mot minh</option>
                                        <option  value="public_profile,user_photos">Khac</option>
                                        <option  value="public_profile,user_birthday">Ngay sinh</option>
                                        <option  value="user_friends,public_profile,user_posts">Co ban</option>
                                        <option  value="public_profile,user_birthday">Ngay sinh</option>
                                        <option  value="user_birthday,user_photos,user_friends,public_profile,user_posts">Full</option>
                                </select>
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
@section('scripts')
<script>
    function ChangeToSlug(text)
    {
        
     
        //Lấy text từ thẻ input title 
        title = text;
     
        //Đổi chữ hoa thành chữ thường
        slug = title.toLowerCase();
     
        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, " - ");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        slug = slug.replace(/\s+/g, '');
        //In slug ra textbox có id “slug”
       // document.getElementById('slug').value = slug;
       return slug;
    }
    $("#title").keyup(function(){
        var Text = $(this).val();
        Text = ChangeToSlug(Text);
        console.log(Text);
       $("#slug").val(Text);        
});
</script>
@endsection