const navigation = () => {
  return [
    {
      title: 'Users',
      path: '/users',
      icon: 'ph:users',
      adminOnly: true
    },
    {
      title: 'Reservations',
      path: '/reservations',
      icon: 'fluent-mdl2:reservation-orders'
    },
    {
      title: 'Consult my Team',
      path: '/consult-my-team',
      icon: 'fluent:people-team-toolbox-20-regular'
    },
    {
      title: 'Join Us',
      path: '/join-us',
      icon: 'fluent:people-team-add-20-regular'
    },
    {
      title: 'My Profile',
      path: '/settings/profile',
      icon: 'gg:profile'
    }
  ]
}

export default navigation
