const navigation = () => {
  return [
    {
      title: 'Contacts',
      path: '/users',
      icon: 'ph:users',
      adminOnly: true
    },
    {
      title: 'Réservations',
      path: '/reservations',
      icon: 'fluent-mdl2:reservation-orders'
    },
    {
      title: 'L équipe TVT',
      path: '/consult-my-team',
      icon: 'fluent:people-team-toolbox-20-regular'
    },
    {
      title: 'Nous rejoindre',
      path: '/join-us',
      icon: 'fluent:people-team-add-20-regular'
    },
    {
      title: 'Mon profil',
      path: '/settings/profile',
      icon: 'gg:profile'
    }
  ]
}

export default navigation
