"use client";
import MyEditor from "@/components/MyEditor";
import { useParams } from "next/navigation";

export default function Docs() {
  const { docid } = useParams() as { docid: string };
  console.log(docid);
  return (
    <div>
      <MyEditor />
    </div>
  );
}
