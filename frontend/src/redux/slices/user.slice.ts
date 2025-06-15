import { TUser } from '@/types/user.interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
  user: TUser
}

const initialState: UserState = {
  user: {
    _id: "",
    fullName: "",
    email: "",
    avatar: "",
    role: "USER"
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setusers: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setusers } = userSlice.actions

export default userSlice.reducer