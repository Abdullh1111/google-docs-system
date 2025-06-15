import { useAppSelector } from '@/redux/redux.hook';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const GetSocket = () => {
  const userId = useAppSelector(state => state?.user?.user?._id);
  console.log(userId);
  if (!socket && userId) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL,{
      query: {
        userId: userId
      }
    });
  }
  return socket;
};
