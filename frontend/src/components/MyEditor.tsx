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
import debounce from "lodash.debounce";

const MyEditor = ({ id }: { id: string }) => {
  const [users, setUsers] = useState<{ email: string; avatar: string }[]>([]);
  const getdocument = useGetDocumentQuery(id);
  const [title, setTitle] = useState<string>("");
  const socket = GetSocket();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [hasChanges, setHasChanges] = useState(false);
  const contentRef = useRef<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const [updateDocument, updateDocumentRes] = useUpdateDocumentMutation();
  const [canEdit, setCanEdit] = useState(false);

  const debouncedEmit = useRef(
    debounce((roomId: string, content: string) => {
      socket?.emit("edit-document", { roomId, content });
    }, 300)
  ).current;

  useEffect(() => {
    if (getdocument.data) {
      const doc = getdocument.data.data;
      setTitle(doc.title);
      contentRef.current = doc.content;
      setCanEdit(getdocument.data.role === "EDITOR");

      socket?.emit("join-room", {
        roomId: doc._id,
        email: user?.email,
        avatar: user?.avatar,
      });

      if (editorRef.current) {
        editorRef.current.setContent(doc.content);
      }
    }

    if (getdocument.error) {
      handleError(getdocument.error);
      router.push("/dashboard");
    }
  }, [getdocument, socket, router, user]);

  useEffect(() => {
    const handleReceive = (payload: { content: string }) => {
      if (
        editorRef.current &&
        editorRef.current.getContent() !== payload.content
      ) {
        editorRef.current.setContent(payload.content);
        contentRef.current = payload.content;
      }
    };

    socket?.on("receive-document", handleReceive);

    return () => {
      socket?.off("receive-document", handleReceive);
    };
  }, [socket, id]);

  useEffect(() => {
    const handleUserJoined = (payload: { email: string; avatar: string }[]) => {
      setUsers(payload);
    };

    socket?.on("user-joined", handleUserJoined);

    return () => {
      socket?.off("user-joined", handleUserJoined);
    };
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
    contentRef.current = newContent;
    setHasChanges(true);
    debouncedEmit(id, newContent);
  };

  const handleLeave = () => {
    socket?.emit("leave-room", { roomId: id });
    socket?.off("receive-document");
    socket?.off("user-joined");
    router.push("/dashboard/documents");
  };

  const handleSave = () => {
    updateDocument({ id, content: contentRef.current }).unwrap();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-3xl font-bold uppercase mb-5">{title}</h4>
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
              key={user.email}
              src={user.avatar}
              alt={user.email}
              title={user.email}
              className="w-12 h-12 rounded-full border-2 border-green-500"
            />
          ))}
        </div>
      )}

      <Editor
        key={canEdit ? "editable" : "readonly"}
        onInit={(_, editor) => {
          editorRef.current = editor;
          editor.setContent(contentRef.current);
        }}
        initialValue={contentRef.current}
        disabled={!canEdit}
        apiKey={process.env.NEXT_PUBLIC_TYNMCE_API_KEY}
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
    </div>
  );
};

export default MyEditor;
