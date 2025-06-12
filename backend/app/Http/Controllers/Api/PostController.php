<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use Exception;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{

    public function index(): JsonResponse
    {
        $posts = Post::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'posts' => $posts
        ]);
    }

    public function store(PostRequest $request) : JsonResponse
    {
        DB::beginTransaction();
        
        try
        {
            
            $post= Post::create([
                'title' => $request->title,
                'content' => $request->content,
                'status' => $request->status
            ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => "Post created",
                'post' => $post
            ], 201);

        }catch(Exception $e)
        {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => "Post not created"
            ], 400);
        }
    }

    public function show(string $id) : JsonResponse
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Post not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'post' => $post
        ]);
    }

    public function update(Request $request, string $id) : JsonResponse
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Post not found'
            ], 404);
        }

        DB::beginTransaction();

        try {
            $updateData = [];

            if ($request->has('title')) {
                $updateData['title'] = $request->title;
            }

            if ($request->has('content')) {
                $updateData['content'] = $request->content;
            }

            if ($request->has('status')) {
                $updateData['status'] = $request->status;
            }

            $post->update($updateData);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Post updated',
                'post' => $post
            ], 200);

        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Post not updated'
            ], 400);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Post not found'
            ], 404);
        }

        try {
            $post->delete();

            return response()->json([
                'status' => true,
                'post' => $post,
                'message' => 'Post deleted'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Post not deleted'
            ], 400);
        }
    }
}
