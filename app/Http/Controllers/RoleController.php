<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    function __construct()
    {
        $this->middleware('permission:role-list|role-create|role-edit|role-delete', ['only' => ['index','store']]);
        $this->middleware('permission:role-create', ['only' => ['create','store']]);
        $this->middleware('permission:role-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:role-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     */
    public function index(array $modalProps = [])
    {
        $roles = Role::all();

        return inertia('Management/RoleAndPermission/RoleIndex', array_merge([
            'roles' => $roles,
        ], $modalProps));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $permissions = Permission::all('id','name')->sortBy('id')->values();

        inertia()->modal('Management/RoleAndPermission/RoleCreateAndEdit');
        return $this->index([
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:roles,name',
            'permissions' => 'required',
        ]);

        $role = Role::create(['name' => $request->input('name'), 'guard_name' => 'web']);
        $role->syncPermissions($request->input('permissions'));

        return redirect()->route('roles.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Role  $role
     * @return Response
     */
    public function show(Role $role): Response
    {
        $role->permissions;
        $permissions = Permission::all('id','name')->sortBy('id')->values();

        inertia()->modal('Management/RoleAndPermission/RoleCreateAndEdit');
        return $this->index([
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Role  $role
     * @return Response
     */
    public function edit(Role $role)
    {
        $role->permissions;
        $permissions = Permission::all('id','name')->sortBy('id')->values();

        inertia()->modal('Management/RoleAndPermission/RoleCreateAndEdit');
        return $this->index([
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  Role  $role
     * @return RedirectResponse
     */
    public function update(Request $request, Role $role)
    {
        if ($role->id === 1)
            return back()->withErrors(__('message.cannot_edit_role', $role->toArray()));

        $this->validate($request, [
            'name' => 'required',
            'permissions' => 'required',
        ]);

        $role->name = $request->input('name');
        $role->save();
        $role->syncPermissions($request->input('permissions'));

        return redirect()->route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Role  $role
     * @return RedirectResponse
     */
    public function destroy(Role $role)
    {
        if ($role->id === 1)
            return redirect()->route('roles.index')->withErrors(__('message.cannot_delete_role', $role->toArray()));

        $role->delete();

        return redirect()->route('roles.index');
    }
}
