import { useState } from 'react';
import authService from "../services/authService";

export default function useAuthData() {
  const [authData, setAuthData] = useState(authService.getAuthData());

  const saveAuthData = (authData) => {
    authService.saveAuthData(authData);
    setAuthData(authData);
  };

  return [
    authData,
    saveAuthData
  ];
}