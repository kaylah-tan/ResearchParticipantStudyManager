import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  userId: string;
  email: string;
}

interface UserContextType {
  userAccount: User | null;
  setUserAccount: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedUserAccount = localStorage.getItem("userAccount");
  const initialUserAccount = storedUserAccount ? JSON.parse(storedUserAccount) : null;

  const [userAccount, setUserAccount] = useState<User | null>(initialUserAccount);

  useEffect(() => {
    if (userAccount) {
      localStorage.setItem("userAccount", JSON.stringify(userAccount));
    } else {
      localStorage.removeItem("userAccount");
    }
  }, [userAccount]);

  return <UserContext.Provider value={{ userAccount, setUserAccount }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.error("useUser must be used within a UserProvider.");
    return { userAccount: null, setUserAccount: () => {} };
  }
  return context;
};
