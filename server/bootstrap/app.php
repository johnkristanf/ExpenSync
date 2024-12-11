<?php

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();
    })

    ->withExceptions(function (Exceptions $exceptions) {

        // pwede pod ka mag create og custom exceptions nga naay render
        // and report na method sulod sa class, I try ni para sa custom error handling

        $exceptions->dontReport([
            ValidationException::class,
            NotFoundHttpException::class,
            TooManyRequestsHttpException::class,
            ModelNotFoundException::class
        ]);


        // REPORTS

        $exceptions->report(function (QueryException $e){
            // $query = $e->getSql();
            // $bindings = $e->getBindings();

            $errMessage = $e->getMessage();

            Log::error("Query Exception occurred:", [
                'errors' => $errMessage,
            ]);
        });


        // RENDERS


        $exceptions->render(function (ValidationException $e){
            return response()->json([
                'error' => 'Input Validation Error',
                'errors' => $e->errors(),

            ], 422);
        });


        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'error' => 'User unauthenticated',
                    'message' => $e->getMessage(),
                ], 401);  
            }
            
        });


        $exceptions->render(function (UnauthorizedException $e){
            return response()->json([
                'error' => 'Unauthorized action',
                'errors' => $e->getMessage(),
            ], 401);
        });
        

        $exceptions->render(function (ModelNotFoundException $e, Request $request){
            $routes = [
                'api/wallets/*' => 'Wallet Not Found',
                'api/budgets/*' => 'Budget Not Found'
            ];
    
            foreach($routes as $route => $message){
                if($request->is($route)){
                    return response()->json([
                        'message' => $message,
                        'error' =>   $e->getMessage()
                    ], 404);
                }
            }
        });

        $exceptions->render(function (NotFoundHttpException $e){
            return response()->json([
                'message' => 'Resource not found',
                'error' => $e->getMessage()
            ], 404);
        });
        

    })->create();
