<li class="{{ Request::is('admin/apps*') ? 'active' : '' }}">
    <a href="{!! route('app-index') !!}"><i class="fa fa-edit"></i><span>Apps</span></a>
</li>
<li class="{{ Request::is('admin/app-hot*') ? 'active' : '' }}">
    <a href="{!! route('get-app-list-hot') !!}"><i class="fa fa-edit"></i><span>App hot</span></a>
</li>

<li class="{{ Request::is('admin/categories*') ? 'active' : '' }}">
    <a href="{!! route('categories.index') !!}"><i class="fa fa-edit"></i><span>Categories</span></a>
</li>

<li class="{{ Request::is('admin/users*') ? 'active' : '' }}">
    <a href="{!! route('users.index') !!}"><i class="fa fa-edit"></i><span>Users</span></a>
</li>

<li class="{{ Request::is('admin/tools*') ? 'active' : '' }} treeview">
        <a href="#">
            <i class="fa fa-gears"></i> <span>Tools</span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
            <li><a href=""><i class="fa fa-eraser"></i> Clear Cloudflare cache</a></li>
            <li><a href=""><i class="fa fa-eraser"></i> Clear memcached</a></li>
            <li><a href="{!! route('get-tool-upload') !!}"><i class="fa fa-code"></i> Upload code</a></li>
            <li><a href="{!! route('get-tool-upload') !!}"><i class="fa fa-code"></i> Override code</a></li>
        </ul>
</li>