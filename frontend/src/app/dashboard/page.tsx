"use client"
import MyEditor from '@/components/MyEditor'
// import { useAppSelector } from '@/redux/redux.hook'
import React from 'react'

export default function page() {
  // const user = useAppSelector(state => state.user.user)
  // console.log(user);
  return (
    <div>
      <MyEditor />
    </div>
  )
}
