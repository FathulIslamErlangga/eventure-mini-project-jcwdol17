import Image from "next/image";
import Link from "next/link";
import { IEvents } from "@/utils/interfaces/interfaces";
import { useState } from "react";
import { toast } from "react-toastify";
import useEvent from "@/hooks/useEvent.hooks";
import { useRouter } from "next/navigation";

export function EventListDataItem(props: IEvents) {
  const router = useRouter();
  const { events } = useEvent();
  const { deleteEvent } = events;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteEvent(props.slug);
      toast.success(`Event "${props.name}" deleted successfully`);
      router.refresh();
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={props.gallery?.[0]?.imageUrl} alt={props.name} />
              </div>
            </div>
            <div>
              <div className="font-bold">{props.name}</div>
            </div>
          </div>
        </td>
        <td>
          {new Date(props.startDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })}
        </td>
        <td>
          {new Date(props.endDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })}
        </td>
        <td>Rp.{props.price?.toLocaleString()}</td>
        <th className="flex gap-2">
          <button
            className="btn btn-warning
             p-2"
          >
            <Link
              href={`/admin/events/${props.slug}`}
              className="flex gap-3 items-center"
            >
              <Image
                src="/assets/images/icons/edit.svg"
                alt="edit"
                width={20}
                height={10}
              />
              Edit
            </Link>
          </button>
          <button
            onClick={openDeleteModal}
            disabled={isDeleting}
            className="btn btn-error
             p-2"
          >
            <Image
              src="/assets/images/icons/delete.svg"
              alt="delete"
              width={20}
              height={10}
            />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </th>
      </tr>
      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete the event "{props.name}"?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDeleteModal}
                className="btn btn-ghost"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-error"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
