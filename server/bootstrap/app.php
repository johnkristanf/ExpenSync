<?php

use Illuminate\Auth\Access\AuthorizationException;
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
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
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

        $exceptions->render(function (Exception $e, Request $request){

            if ($e instanceof ModelNotFoundException){
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
            }

            if ($e instanceof NotFoundResourceException){
                return response()->json([
                    'message' => 'Resource not found',
                    'error' => $e->getMessage()
                ], 404);
            }
            

            
        });

        $exceptions->render(function (ValidationException $e){
            return response()->json([
                'error' => 'Input Validation Error',
                'errors' => $e->errors(),

            ], 422);
        });


        $exceptions->render(function (UnauthorizedHttpException $e){
            return response()->json([
                'error' => 'Unauthorized action',
                'errors' => $e->getMessage(),
            ], 401);
        });


        $exceptions->render(function (AuthorizationException $e) {
            return response()->json([
                'error' => 'Forbidden action',
                'message' => $e->getMessage(),
            ], 403);  
        });
        

    })->create();
