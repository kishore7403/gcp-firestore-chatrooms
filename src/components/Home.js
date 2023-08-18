import React, { useState, useEffect } from 'react';

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    // Fetching data from localStorage when the component mounts
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedProfilePicture = localStorage.getItem("profilePicture");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedProfilePicture) setProfilePicture(storedProfilePicture);
  }, []);

  // Check if the profile picture is a URL or base64
  const isUrl = profilePicture && profilePicture.startsWith("http");

  return (
    <div>
      <h2>Profile Details</h2>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Email:</strong> {email}
      </div>
      <div>
        <strong>Profile Picture:</strong>
        {isUrl ? (
          <img src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px' }}/>
        ) : profilePicture && (
          <img src={`data:image/jpeg;base64,${profilePicture}`} alt="Profile" style={{ width: '100px', height: '100px' }}/>
        )}
      </div>
    </div>
  );
}

export default Home;
