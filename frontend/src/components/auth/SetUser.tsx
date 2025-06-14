'use client';
import { handleError } from "@/lib/toaster";
import { useAppDispatch } from "@/redux/redux.hook";
import { useUserDataQuery } from "@/redux/services/auth.service";
import { setusers } from "@/redux/slices/user.slice";
import { useEffect } from "react";

export default function SetUser() {
  const { data, error } = useUserDataQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
  });
  const dispatch = useAppDispatch();
  console.log(data);
  useEffect(() => {
      if (data) {
        dispatch(setusers(data.data));
      }
      if(error) {
        handleError(error);
      }
  }, [data, error]);
  return null;
}
