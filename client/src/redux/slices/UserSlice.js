import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi } from 'src/repository/UsersRepository'

const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    users: [],
    loading: false
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload
    },
    loadingStart: state => {
      state.loading = true
    },
    loadingCompleted: state => {
      state.loading = false
    }
  }
})

export const useUserActions = () => {
  const dispatch = useDispatch()

  const { setUsers, loadingStart, loadingCompleted } = UserSlice.actions

  const getUsers = async () => {
    dispatch(loadingStart())
    await getUsersApi().then(res => {
      dispatch(setUsers(res?.data))
    })
    dispatch(loadingCompleted())
  }

  return { getUsers }
}

export default UserSlice
