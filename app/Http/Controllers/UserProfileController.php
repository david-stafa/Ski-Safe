<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{
    // Show the profile for the given user
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    // Update the profile of the authenticated user
    public function update(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'image' => 'url', 
        ]);

        // If an image URL is provided, update the 'image_url' column
        if ($request->has('image')) {
            $validatedData['image'] = $request->input('image');
        }

        $user->update($validatedData);

        return response()->json(['message' => 'Profile updated successfully']);
    }
}
