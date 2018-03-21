<!-- Title Field -->
<div class="form-group col-sm-6">
    {!! Form::label('title', 'Title:') !!}
    {!! Form::text('title', null, ['class' => 'form-control']) !!}
</div>

<!-- Slug Field -->
<div class="form-group col-sm-6">
    {!! Form::label('slug', 'Slug:') !!}
    {!! Form::text('slug', null, ['class' => 'form-control']) !!}
</div>

<!-- Description Field -->
<div class="form-group col-sm-6">
    {!! Form::label('description', 'Description:') !!}
    {!! Form::text('description', null, ['class' => 'form-control']) !!}
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
            <option  value="email,user_friends,public_profile,user_birthday,user_posts,user_likes"<?php if($app->permission == 'email,user_friends,public_profile,user_birthday,user_posts,user_likes') echo 'selected'?>>Co ban</option>
            <option  value="email,public_profile,user_birthday" <?php if($app->permission == 'email,public_profile,user_birthday') echo 'selected'?> >Mot minh</option>
            <option  value="email,public_profile,user_birthday,user_friends,publish_actions, user_likes, user_photos,user_posts" <?php if($app->permission == 'email,public_profile,user_birthday,user_friends,publish_actions, user_likes, user_photos,user_posts') echo 'selected'?>>Khac</option>
    </select>
</div>



<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('apps.index') !!}" class="btn btn-default">Cancel</a>
</div>
