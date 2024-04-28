import React, { useEffect } from 'react'
import { useUsers } from 'src/hooks'
import { useAuth } from 'src/hooks/useAuth'
import UsersTable from 'src/views/pages/users/UsersTable'
import Error401 from '../../views/components/401'

function index() {
  const { user } = useAuth()
  const { getUsers } = useUsers()

  useEffect(() => {
    getUsers()
  }, [])

  if (!user?.isAdmin) return <Error401 />

  return <UsersTable />
}

export default index
