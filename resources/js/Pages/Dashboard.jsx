import { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import AddContact from "@/Pages/contact/AddContact";
import ShowContact from "@/Pages/contact/ShowContact";
import DeleteContact from "@/Pages/contact/DeleteContact";
import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";

export default function Dashboard({ auth, contacts, search }) {
    const [isAddContactModal, setIsAddContactModal] = useState(false);
    const [isViewContactModal, setIsViewContactModal] = useState(false);
    const [isDeleteContactModal, setIsDeleteContactModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchContact, setSearchContact] = useState(search || "");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                "/contacts",
                { search: searchContact, page: 1 },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["contacts"],
                }
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchContact]);

    const viewContact = (contact) => {
        setIsViewContactModal(true);
        setSelectedContact(contact);
    };

    //Pagination Page Change
    const handlePageChange = (page) => {
        router.get(
            "/contacts",
            { search: searchContact, page },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["contacts"],
            }
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Contacts" />

            <div className="pt-8 pb-2">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex justify-between items-center">
                            <div className="flex-1 flex items-center pr-4 border-r border-gray-300">
                                <p className="text-4xl font-bold mr-4">
                                    Contacts
                                </p>

                                <TextInput
                                    placeholder="Search"
                                    className="flex-1"
                                    value={searchContact}
                                    onChange={(e) =>
                                        setSearchContact(e.target.value)
                                    }
                                />
                            </div>
                            <div className="pl-4 border-l border-gray-300">
                                <PrimaryButton
                                    onClick={() => setIsAddContactModal(true)}
                                    className="w-full"
                                >
                                    Add Contact
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        {/* Contact List */}
                        {contacts?.data.length > 0 ? (
                            contacts.data.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="p-2 flex justify-between items-center border-b border-gray-300"
                                >
                                    <p
                                        className="text-xl font-bold w-full cursor-pointer"
                                        onClick={() => viewContact(contact)}
                                    >
                                        {contact.name}
                                    </p>
                                    <DangerButton
                                        onClick={() => {
                                            setIsDeleteContactModal(true);
                                            setSelectedContact(contact.id);
                                        }}
                                    >
                                        Delete
                                    </DangerButton>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-gray-500 text-center">
                                {searchContact
                                    ? "No contacts found for your search."
                                    : "No Contacts yet."}
                            </div>
                        )}
                        <Pagination
                            links={contacts.links}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>

            <DeleteContact
                isModalOpen={isDeleteContactModal}
                setIsModalOpen={setIsDeleteContactModal}
                selectedContactId={selectedContact}
            />

            <ShowContact
                isModalOpen={isViewContactModal}
                setIsModalOpen={setIsViewContactModal}
                selectedContact={selectedContact}
            />

            <AddContact
                isModalOpen={isAddContactModal}
                setIsModalOpen={setIsAddContactModal}
            />
        </AuthenticatedLayout>
    );
}
