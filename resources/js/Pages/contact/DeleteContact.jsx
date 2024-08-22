import { router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function DeleteContact({
    selectedContactId,
    setIsModalOpen,
    isModalOpen,
}) {
    const handleDelete = () => {
        router.delete(`/contacts/${selectedContactId}`, {
            preserveState: true,
            preserveScroll: true,
            only: ["contacts"],
        });
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal show={isModalOpen} onClose={closeModal}>
            <div className="p-6 text-gray-900">
                <h3 className="text-lg font-medium">Delete Contact</h3>
                <p className="mt-2">
                    Are you sure you want to delete this contact?
                </p>
                <div className="mt-4 flex justify-end">
                    <SecondaryButton onClick={closeModal} className="mr-2">
                        Cancel
                    </SecondaryButton>
                    <DangerButton onClick={handleDelete}>Delete</DangerButton>
                </div>
            </div>
        </Modal>
    );
}
