<?php

use App\Http\Controllers\KontakController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/kontak', [KontakController::class, 'index'])->name('kontak.index');
    Route::get('/kontak/create', [KontakController::class, 'create'])->name('kontak.create');
    Route::get('/kontak/{kontak}', [KontakController::class, 'show'])->name('kontak.show');
    Route::post('/kontak', [KontakController::class, 'store'])->name('kontak.store');
    Route::get('/kontak/edit/{kontak}', [KontakController::class, 'edit'])->name('kontak.edit');
    Route::put('/kontak/update/{kontak}', [KontakController::class, 'update'])->name('kontak.update');
    Route::delete('/kontak/delete/{kontak}', [KontakController::class, 'delete'])->name('kontak.delete');
    Route::post('/kontak/upload-photo/{kontak}', [KontakController::class, 'upload_photo'])->name('kontak.upload_photo');
});

require __DIR__ . '/auth.php';
