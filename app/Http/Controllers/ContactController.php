<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    //Shows all the contact stored and search through it
    public function index(Request $request)
    {
        $query = Contact::where('user_id', Auth::id());

        $search = $request->input('search', '');

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        //if they want to have multiple data to search
        // if ($search) {
        //     $query->where(function($query) use ($search) {
        //         $query->where('name', 'like', "%{$search}%")
        //               ->orWhere('address', 'like', "%{$search}%");
        //     });
        // }

        $contacts = $query->orderBy('name', 'asc')->paginate(5);

        return $request->wantsJson()
            ? response()->json(['contacts' => $contacts])
            : Inertia::render('Dashboard', compact('contacts', 'search'));
    }

    //Create new contact
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|min:2|max:55',
            'contact_number' => 'required|numeric|digits:11',
            'email' => 'required|email',
            'address' => 'nullable|string|max:255',
            'company' => 'required|string|max:255'
        ]);

        $data['user_id'] = Auth::id();

        Contact::create($data);

        return redirect()->back()->with('success', 'Contact created successfully.');
    }

    // View single contact
    public function show(Contact $contact)
    {

        return Inertia::render('contact/ViewContact', compact('contact'));
    }

    // Update single contact
    public function update(Request $request, Contact $contact)
    {
        $data = $request->validate([
            'name' => 'required|string|min:2|max:55',
            'contact_number' => 'required|numeric|digits:11',
            'email' => 'required|email',
            'address' => 'nullable|string|max:255',
            'company' => 'required|string|max:255',
        ]);
        $contact->update($data);

        return redirect()->back()->with('success', 'Contact updated successfully.');
    }

    // Delete single contact
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->back()->with('success', 'Contact deleted successfully.');
    }
}
