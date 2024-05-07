import React, { useState } from 'react';


const Person = ({ firstName, lastName, email, phone, photoUrl }) => {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleContactClick = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <div className="person">
      <div className="person-info">
        <h2>{firstName} {lastName}</h2>
        <img src={photoUrl} alt={`${firstName} ${lastName}`} />
      </div>
      <button className="contact-button" onClick={handleContactClick}>
        {showContactInfo ? 'Masquer' : 'Contacter'}
      </button>
      {showContactInfo && (
        <div className="contact-info">
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
        </div>
      )}
    </div>
  );
};

export default Person;
