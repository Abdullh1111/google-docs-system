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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { handleError, handleSuccess } from "@/lib/toaster";
import { useSharedWithMutation } from "@/redux/services/doc.service";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  className?: string;
};

export function ShareDialog({ id, className }: Props) {
    const docUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/documents/${id}`
    const [share, shareRes] = useSharedWithMutation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !role) return;

    share({ email, role, id: id || "" });
    setEmail("");
    setRole("");
    setOpen(false);
  };

  useEffect(() => {
    if (shareRes.data) {
        handleSuccess(shareRes.data.message || "Document shared successfully");
      setOpen(false);
    }
    if (shareRes.error) {
      handleError(shareRes.error);
    }
  }, [shareRes]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className={className}>
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Share Document</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3 my-10">
              <Label className="text-sm font-bold" htmlFor="email">
                Email
              </Label>
              <Input
                value={email}
                onChange={handleChange}
                id="email"
                name="email"
                placeholder="Enter email..."
              />
              <Label className="text-sm font-bold" htmlFor="role">
                Role
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                  <SelectItem value="VIEWER">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <Button onClick={() => navigator.clipboard.writeText(docUrl)} className="text-blue-500 bg-white hover:bg-blue-500 hover:text-white" type="button">Copy Link</Button>
            <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className={className} disabled={!email || !role || shareRes.isLoading}>
              {shareRes.isLoading ? "Sharing..." : "Share"}
            </Button>
          </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
