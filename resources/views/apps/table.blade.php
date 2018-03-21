<table class="table table-responsive" id="apps-table">
    <thead>
        <tr>
            <th>Title</th>
        <th>Slug</th>
        <th>Description</th>
        <th>Introdution</th>
        <th>Result Text</th>
        <th>Id User</th>
        <th>Id Cate</th>
        <th>View</th>
        <th>Share</th>
        <th>Type</th>
        <th>Permission</th>
        <th>Status</th>
            <th colspan="3">Action</th>
        </tr>
    </thead>
    <tbody>
    @foreach($apps as $app)
        <tr>
            <td>{!! $app->title !!}</td>
            <td>{!! $app->slug !!}</td>
            <td>{!! $app->description !!}</td>
            <td>{!! $app->introdution !!}</td>
            <td>{!! $app->result_text !!}</td>
            <td>{!! $app->id_user !!}</td>
            <td>{!! $app->id_cate !!}</td>
            <td>{!! $app->view !!}</td>
            <td>{!! $app->share !!}</td>
            <td>{!! $app->type !!}</td>
            <td>{!! $app->permission !!}</td>
            <td>{!! $app->status !!}</td>
            <td>
                {!! Form::open(['route' => ['apps.destroy', $app->id], 'method' => 'delete']) !!}
                <div class='btn-group'>
                    <a href="{!! route('apps.show', [$app->id]) !!}" class='btn btn-default btn-xs'><i class="glyphicon glyphicon-eye-open"></i></a>
                    <a href="{!! route('apps.edit', [$app->id]) !!}" class='btn btn-default btn-xs'><i class="glyphicon glyphicon-edit"></i></a>
                    {!! Form::button('<i class="glyphicon glyphicon-trash"></i>', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
                </div>
                {!! Form::close() !!}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>