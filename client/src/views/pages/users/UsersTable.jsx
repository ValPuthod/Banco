// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'

import { useUsers } from 'src/hooks'

const UsersTable = () => {
  const { users } = useUsers()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Prénom</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Téléhone</TableCell>
            <TableCell>Société</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.length > 0 ? (
            users?.map(user => {
              return (
                <TableRow
                  key={user?.id}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {user?.firstName}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {user?.lastName}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {user?.email}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {user?.phone}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {user?.company}
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                No users found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
