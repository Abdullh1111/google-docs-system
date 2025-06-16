/* eslint-disable @next/next/no-img-element */
"use client";

import { GetSocket } from "@/lib/socket";
import { handleError } from "@/lib/toaster";
import { useAppSelector } from "@/redux/redux.hook";
import {
  useGetDocumentQuery,
  useUpdateDocumentMutation,
} from "@/redux/services/doc.service";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const MyEditor = ({ id }: { id: string }) => {
  const [users, setUsers] = useState<{ email: string; avatar: string }[]>([]);
  const getdocument = useGetDocumentQuery(id);
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const socket = GetSocket();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [hasChanges, setHasChanges] = useState(false);
  const contentRef = useRef(content);
  const [updateDocument, updateDocumentRes] = useUpdateDocumentMutation();
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (getdocument.data) {
      setTitle(getdocument.data.data.title);
      setContent(getdocument.data.data.content);
      socket?.emit("join-room", {
        roomId: getdocument.data.data._id,
        email: user?.email,
        avatar: user?.avatar,
      });
    }
    if (getdocument.error) {
      handleError(getdocument.error);
      router.push("/dashboard");
    }
  }, [getdocument, socket, router, user]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if(getdocument.data?.role) {
      console.log(getdocument.data?.role);
      setCanEdit(getdocument.data?.role === "EDITOR");
    }
  }, [getdocument.data?.role]);

  useEffect(() => {
    socket?.on("receive-document", (payload) => {
      contentRef.current = payload.content;
      setContent(payload.content);
    });
  }, [socket, id]);

  useEffect(() => {
    socket?.on("user-joined", (payload) => {
      setUsers(payload);
    });
  }, [socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasChanges) {
        updateDocument({ id, content: contentRef.current }).unwrap();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [hasChanges, updateDocument, id]);

  useEffect(() => {
    if (updateDocumentRes.data) {
      setHasChanges(false);
    }
    if (updateDocumentRes.error) {
      handleError(updateDocumentRes.error);
    }
  }, [updateDocumentRes]);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    contentRef.current = newContent;
    // console.log("Content changed:", newContent);
    setHasChanges(true);
    socket?.emit("edit-document", { roomId: id, content: newContent });
  };

  const handleLeave = () => {
    socket?.emit("leave-room", {
      roomId: id,
    });
    router.push("/dashboard/documents");
  };

  const handleSave = () => {
    updateDocument({ id, content: contentRef.current }).unwrap();
  };


  console.log(canEdit);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-3xl font-bold uppercase mb-5  ">{title}</h4>
        <Button
          disabled={!hasChanges || updateDocumentRes.isLoading}
          className="bg-green-600 text-white mb-5 hover:bg-green-700 hover:text-white"
          onClick={handleSave}
        >
          {updateDocumentRes.isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
      <Button
        className="w-full bg-red-600 text-white mb-5 hover:bg-red-700 hover:text-white"
        onClick={handleLeave}
      >
        Leave
      </Button>
      {users?.length > 0 && (
        <div className="flex flex-wrap items-center gap-5 mb-10">
          {users.map((user) => (
            <img
              title={user.email}
              key={user.email}
              src={user.avatar}
              alt={user.email}
              className="w-12 h-12 rounded-full border-2 border-green-500"
            />
          ))}
        </div>
      )}
      {isMounted && (
        <Editor
          disabled={!canEdit}
          apiKey={process.env.NEXT_PUBLIC_TYNMCE_API_KEY}
          value={content}
          init={{
            height: "90vh",
            menubar: false,
            plugins: "lists link image preview placeholder",
            placeholder: "Type here...",
            toolbar:
              "undo redo | formatselect fontselect fontsizeselect | bold italic underline strikethrough removeformat | " +
              "forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | blockquote code | " +
              "table link | preview fullscreen",

            font_size_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          }}
          onEditorChange={handleEditorChange}
        />
      )}
    </div>
  );
};

export default MyEditor;
