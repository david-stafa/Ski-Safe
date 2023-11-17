<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;


class RoleController extends Controller 
{ 
public function getAllRoles()
   {
       $roles = User::distinct("role")->pluck("role");

       return($roles);
   }

   public function updateRole(Request $request) 
   {    
        $user = User::findOrFail($request->input("user_id"));

        $user->role = $request->input("role");
        $user->save();
        return [
            "message" => "success"
        ];
   }



}