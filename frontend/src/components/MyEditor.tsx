"use client";

import { handleError } from "@/lib/toaster";
import { useGetDocumentQuery } from "@/redux/services/doc.service";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";

const MyEditor = ({id}: { id: string }) => {
  const getdocument = useGetDocumentQuery(id);
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (getdocument.data) {
      setTitle(getdocument.data.data.title);
      setContent(getdocument.data.data.content);
    }
    if (getdocument.error) {
      handleError(getdocument.error);
    }
  }, [getdocument]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEditorChange = (newContent: string) => {
    console.log(newContent);
  };


  return (
    <div>
      <h4 className="text-3xl font-bold uppercase mb-10">{title}</h4>
      {isMounted && (
        <Editor
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
