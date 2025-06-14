import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  type: "create" | "edit";
  id?: string;
  className?: string
}

export function CustomDialog({type, id, className}: Props) {
  console.log(type, id);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className={className} variant={type === "create" ? "default" : "outline"}>{type === "create" ? "+ Create Document" : "Edit Title"}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{type === "create" ? "Create Document" : "Edit Title"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue="Pedro Duarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className={className} variant={type === "create" ? "default" : "outline"} type="submit">{type === "create" ? "Create" : "Save" }</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
