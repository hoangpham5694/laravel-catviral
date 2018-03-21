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

<!-- Result Text Field -->
<div class="form-group col-sm-6">
    {!! Form::label('result_text', 'Result Text:') !!}
    {!! Form::text('result_text', null, ['class' => 'form-control']) !!}
</div>

<!-- Id User Field -->
<div class="form-group col-sm-6">
    {!! Form::label('id_user', 'Id User:') !!}
    {!! Form::number('id_user', null, ['class' => 'form-control']) !!}
</div>

<!-- Id Cate Field -->
<div class="form-group col-sm-6">
    {!! Form::label('id_cate', 'Id Cate:') !!}
    {!! Form::number('id_cate', null, ['class' => 'form-control']) !!}
</div>

<!-- View Field -->
<div class="form-group col-sm-6">
    {!! Form::label('view', 'View:') !!}
    {!! Form::number('view', null, ['class' => 'form-control']) !!}
</div>

<!-- Share Field -->
<div class="form-group col-sm-6">
    {!! Form::label('share', 'Share:') !!}
    {!! Form::number('share', null, ['class' => 'form-control']) !!}
</div>

<!-- Type Field -->
<div class="form-group col-sm-6">
    {!! Form::label('type', 'Type:') !!}
    {!! Form::text('type', null, ['class' => 'form-control']) !!}
</div>

<!-- Permission Field -->
<div class="form-group col-sm-6">
    {!! Form::label('permission', 'Permission:') !!}
    {!! Form::text('permission', null, ['class' => 'form-control']) !!}
</div>

<!-- Status Field -->
<div class="form-group col-sm-6">
    {!! Form::label('status', 'Status:') !!}
    {!! Form::text('status', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('apps.index') !!}" class="btn btn-default">Cancel</a>
</div>
