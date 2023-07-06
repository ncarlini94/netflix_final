import React, { createContext, useState } from "react";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
    {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };