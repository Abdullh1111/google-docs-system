"use client";

import { handleError, handleSuccess } from "@/lib/toaster";
import { useDeleteDocumentMutation, useGetDocumentsQuery } from "@/redux/services/doc.service";
import { TDocument } from "@/types/documens.interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomDialog } from "./CustomDialog";
import LoadingSpinner from "./Loading";
import { Button } from "./ui/button";

export default function UserDocumentList() {
  const getDocRes = useGetDocumentsQuery();
  const [deleteDocs, deleteDocsRes] = useDeleteDocumentMutation();
  const [documents, setDocuments] = useState<TDocument[]>([]);


  useEffect(() => {
    if (getDocRes.data) {
      setDocuments(getDocRes.data.data);
    }
    if (getDocRes.error) {
      handleError(getDocRes.error);
    }
  }, [getDocRes]);


  const onDelete = (id: string) => {
    deleteDocs(id);
  };
  console.log(documents);

  useEffect(() => {
    if (deleteDocsRes.data) {
      handleSuccess(deleteDocsRes.data.message || "Document deleted successfully");
    }
    if (deleteDocsRes.error) {
      handleError(deleteDocsRes.error);
    }
  }, [deleteDocsRes]);


  if (getDocRes.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Documents</h2>
        <CustomDialog
          type="create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white transition"
        />
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc._id}
            className="flex items-center justify-between p-4 border rounded-md bg-white shadow hover:shadow-md transition"
          >
            <Link href={`/dashboard/documents/${doc._id}`} className="flex-1">
              <h3 className="font-medium text-lg hover:underline text-gray-800">
                {doc.title}
              </h3>
            </Link>

            <div className="flex space-x-3 ml-4">
              <CustomDialog
                type="edit"
                id={doc._id}
                className="text-sm text-blue-600 hover:underline bg-transparent hover:text-blue-700"
              />
              <Button
                variant={"outline"}
                onClick={() => onDelete(doc._id as string)}
                className="text-sm text-red-600 hover:underline hover:text-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
