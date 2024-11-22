<?php

namespace App\Http\Controllers;

use App\Models\Kontak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KontakController extends Controller
{
    public function index()
    {
        $kontak = Kontak::all();
        return Inertia::render('Kontak/KontakPage', [
            'kontak_list' => $kontak
        ]);
    }
    public function show(Kontak $kontak)
    {
        return Inertia::render('Kontak/KontakShow', [
            'kontak' => $kontak
        ]);
    }
    public function create()
    {
        return Inertia::render('Kontak/KontakCreate');
    }
    public function store(Request $r)
    {
        $r->validate([
            'nama' => 'required|min:3',
            'email' => 'email|nullable',
        ]);
        Kontak::create([
            'nama' => $r->nama,
            'email' => $r->email,
            'no_hp' => $r->no_hp,
            'alamat' => $r->alamat,
        ]);
        return redirect(route('kontak.index'));
    }
    public function edit(Kontak $kontak)
    {
        return Inertia::render('Kontak/KontakEdit', compact('kontak'));
    }
    public function update(Request $r, Kontak $kontak)
    {
        $r->validate([
            'nama' => 'required|min:3',
            'email' => 'email|nullable',
        ]);
        $kontak->update([
            'nama' => $r->nama,
            'email' => $r->email,
            'no_hp' => $r->no_hp,
            'alamat' => $r->alamat,
        ]);
        return redirect(route('kontak.index'));
    }
    public function delete(Kontak $kontak)
    {
        $kontak->delete();
        return  redirect(route('kontak.index'));
    }
    public function upload_photo(Request $r, Kontak $kontak)
    {
        $r->validate([
            'file_foto' => 'required|file|mimes:png,jpg'
        ]);
        $path = $r->file('file_foto')->store('kontak', 'public');
        if ($path) {
            //hapus foto lama
            try {
                Storage::disk('public')->delete($kontak->foto);
            } catch (\Throwable $th) {
                //throw $th;
            }
            $kontak->foto = $path;
            $kontak->save();
            return redirect()->back();
        } else {
            abort(422);
        }
    }
}
