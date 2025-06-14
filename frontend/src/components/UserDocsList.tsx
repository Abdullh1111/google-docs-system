"use client";

import { Document } from "@/types/documens.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserDocumentList() {
  const router = useRouter();

  const documents: Document[] = [
    { id: "1", title: "Document 1" },
    { id: "2", title: "Document 2" },
    { id: "3", title: "Document 3" },
  ];

  const onEdit = (id: string) => {
    console.log("Edit:", id);
    // Handle edit logic (e.g., modal or redirect)
  };

  const onDelete = (id: string) => {
    console.log("Delete:", id);
    // Handle delete logic
  };

  const handleAdd = () => {
    router.push("/documents/create");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Documents</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add New
        </button>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border rounded-md bg-white shadow hover:shadow-md transition"
          >
            <Link href={`/documents/${doc.id}`} className="flex-1">
              <h3 className="font-medium text-lg hover:underline text-gray-800">
                {doc.title}
              </h3>
            </Link>

            <div className="flex space-x-3 ml-4">
              <button
                onClick={() => onEdit(doc.id)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(doc.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
