import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState, useEffect } from "react";

export default function ShowContact({
    selectedContact,
    setIsModalOpen,
    isModalOpen,
}) {
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, put, errors, processing } = useForm({
        name: "",
        contact_number: "",
        email: "",
        address: "",
        company: "",
    });

    useEffect(() => {
        if (selectedContact) {
            setData({
                name: selectedContact.name,
                contact_number: selectedContact.contact_number,
                email: selectedContact.email,
                address: selectedContact.address,
                company: selectedContact.company,
            });
        }
    }, [selectedContact]);

    console.log("Selected Contact: ", selectedContact);
    const updateContact = (e) => {
        e.preventDefault();

        put(`/contacts/${selectedContact.id}`, {
            onSuccess: () => {
                setIsModalOpen(false); // Close the modal on success
                setIsEditMode(false); // Reset edit mode
            },
            preserveScroll: true,
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
    };

    const enableEditMode = (e) => {
        e.preventDefault();
        setIsEditMode(true);
    };

    return (
        <Modal show={isModalOpen} onClose={closeModal}>
            <div className="p-2">
                <p className="text-lg font-bold">CONTACT INFORMATION</p>
                <div className="p-2">
                    <form onSubmit={updateContact}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className={`mt-1 block w-full ${
                                    !isEditMode ? "cursor-not-allowed" : ""
                                }`}
                                autoComplete="name"
                                isFocused={true}
                                disabled={!isEditMode}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="company" value="Company" />
                            <TextInput
                                id="company"
                                type="text"
                                name="company"
                                value={data.company}
                                className={`mt-1 block w-full ${
                                    !isEditMode ? "cursor-not-allowed" : ""
                                }`}
                                autoComplete="company"
                                disabled={!isEditMode}
                                onChange={(e) =>
                                    setData("company", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.company}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="contact_number"
                                value="Contact Number"
                            />
                            <TextInput
                                id="contact_number"
                                type="text"
                                name="contact_number"
                                value={data.contact_number}
                                className={`mt-1 block w-full ${
                                    !isEditMode ? "cursor-not-allowed" : ""
                                }`}
                                autoComplete="contact_number"
                                disabled={!isEditMode}
                                onChange={(e) =>
                                    setData("contact_number", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.contact_number}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`mt-1 block w-full ${
                                    !isEditMode ? "cursor-not-allowed" : ""
                                }`}
                                autoComplete="email"
                                disabled={!isEditMode}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="address" value="Address" />
                            <TextInput
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className={`mt-1 block w-full ${
                                    !isEditMode ? "cursor-not-allowed" : ""
                                }`}
                                autoComplete="address"
                                disabled={!isEditMode}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            {!isEditMode ? (
                                <>
                                    <SecondaryButton
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </SecondaryButton>
                                    <PrimaryButton
                                        className="ms-2"
                                        type="button"
                                        onClick={enableEditMode}
                                    >
                                        Edit Contact
                                    </PrimaryButton>
                                </>
                            ) : (
                                <>
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => setIsEditMode(false)}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton
                                        className="ms-2"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Save Changes
                                    </PrimaryButton>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
