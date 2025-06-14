"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleError, handleSuccess } from "@/lib/toaster";
import {
  useCreateDocMutation,
  useUpdateDocumentMutation,
} from "@/redux/services/doc.service";
import { useEffect, useState } from "react";

type Props = {
  type: "create" | "edit";
  id?: string;
  className?: string;
};

export function CustomDialog({ type, id, className }: Props) {
  const [createDoc, createDocRes] = useCreateDocMutation();
  const [editDoc, editDocRes] = useUpdateDocumentMutation();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "create") {
      createDoc({ title: title, content: "  " });
    }

    if (type === "edit") {
      editDoc({ id: id || "", title: title });
    }

    setTitle("");
    setOpen(false);
  };

  useEffect(() => {
    if (createDocRes.isSuccess) {
      setTitle("");
      handleSuccess(
        createDocRes.data.message || "Document created successfully"
      );
    }
    if (createDocRes.isError) {
      handleError(createDocRes.error);
    }
  }, [createDocRes]);

  useEffect(() => {
    if (editDocRes.isSuccess) {
      handleSuccess(editDocRes.data.message || "Document updated successfully");
    }
    if (editDocRes.isError) {
      handleError(editDocRes.error);
    }
  }, [editDocRes]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={className}
          variant={type === "create" ? "default" : "outline"}
        >
          {type === "create" ? "+ Create Document" : "Edit Title"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {type === "create" ? "Create Document" : "Edit Title"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3 my-10">
              <Label className="text-sm font-bold" htmlFor="title">
                Title
              </Label>
              <Input
                onChange={handleChange}
                id="title"
                name="title"
                placeholder={
                  type === "create" ? "Document Title" : "Edit Title"
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={createDocRes.isLoading}
              className={className}
              variant={type === "create" ? "default" : "outline"}
              type="submit"
            >
              {type === "create" ? "Create" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
