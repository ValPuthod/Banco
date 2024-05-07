import React from 'react';
import Person from './Person'; 


const PersonGrid = () => {
  const personData = [
    {
      id: 1,
      firstName: 'Fahd',
      lastName: 'BOUDAOUINE',
      email: 'boudaouine@tvt.fr',
      phone: '06 06 06 06 06',
      photoUrl: '/images/fahd.png',
    },
    {
      id: 2,
      firstName: 'Val',
      lastName: 'PUTHOD',
      email: 'puthod@tvt.fr',
      phone: '07 07 07 07 07',
      photoUrl: '/images/valentin.png'
    },
    {
      id: 3,
      firstName: 'test',
      lastName: 'PUTHOD',
      email: 'puthod@tvt.fr',
      phone: '07 07 07 07 07',
      photoUrl: '/images/valentin.png'
    },
    {
      id: 4,
      firstName: 'test',
      lastName: 'PUTHOD',
      email: 'puthod@tvt.fr',
      phone: '07 07 07 07 07',
      photoUrl: '/images/valentin.png'
    },
    {
      id: 5,
      firstName: 'test',
      lastName: 'PUTHOD',
      email: 'puthod@tvt.fr',
      phone: '07 07 07 07 07',
      photoUrl: '/images/valentin.png'
    },
    {
      id: 6,
      firstName: 'test',
      lastName: 'PUTHOD',
      email: 'puthod@tvt.fr',
      phone: '07 07 07 07 07',
      photoUrl: '/images/valentin.png'
    },
  ];

  return (
    <div className="person-grid">
      {personData.map(person => (
        <Person
          key={person.id}
          firstName={person.firstName}
          lastName={person.lastName}
          email={person.email}
          phone={person.phone}
          photoUrl={person.photoUrl}
        />
      ))}
    </div>
  );
};

export default PersonGrid;
