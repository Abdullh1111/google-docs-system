'use client';

import { useAppSelector } from '@/redux/redux.hook';

export default function Navbar() {
  const user = useAppSelector(state => state.user.user);

  return (
    <nav className="w-full px-4 py-3 gap-5 bg-white shadow-md flex justify-end items-center">
        <span className="font-medium text-gray-800">{user?.fullName}</span>
      <div className="flex items-center gap-3">
        {user?.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatar}
            alt={user.fullName || 'User Avatar'}
            width={35}
            height={40}
            className="rounded-full object-cover"
          />
        )}
      </div>
    </nav>
  );
}
