import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";

export default function AddContact({ isModalOpen, setIsModalOpen }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        contact_number: "",
        email: "",
        address: "",
        company: "",
    });

    const addContact = (e) => {
        e.preventDefault();

        post(route("contact.store"), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal show={isModalOpen} onClose={closeModal}>
            <div className="p-2">
                <p className="text-lg font-bold">ADD NEW CONTACT INFORMATION</p>
                <div className="p-2">
                    <form onSubmit={addContact}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
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
                                className="mt-1 block w-full"
                                autoComplete="company"
                                isFocused={true}
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
                                className="mt-1 block w-full"
                                autoComplete="contact_number"
                                onChange={(e) =>
                                    setData("contact_number", e.target.value)
                                }
                                required
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
                                className="mt-1 block w-full"
                                autoComplete="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
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
                                className="mt-1 block w-full"
                                autoComplete="address"
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
                            <SecondaryButton type="button" onClick={closeModal}>
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton className="ms-4" type="submit">
                                Add New Contact
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
