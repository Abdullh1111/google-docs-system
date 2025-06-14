import { toast } from "react-hot-toast";
 const handleSuccess = (message: string) => {
  return toast.success(message, {
    position: "top-center",
  });
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleError = (error: any) => {
  return toast.error(error?.data?.message || "Something went wrong", {
    position: "top-center",
  });
};
export { handleSuccess, handleError };