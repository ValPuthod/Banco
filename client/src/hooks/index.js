import { useSelector } from 'react-redux'
import { useUserActions } from 'src/redux/slices/UserSlice'

export const useUsers = () => ({
  ...useSelector(state => state.userSlice),
  ...useUserActions()
})
