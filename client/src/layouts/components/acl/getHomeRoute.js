/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = user => {
  return user?.isAdmin ? '/users' : '/reservations'
}

export default getHomeRoute
