import React from 'react';
import { UserProvider } from './contexts/user';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const GlobalProviders = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="718852823294-kqblm62mep2csf5cqbp9p3p17lgpl7gr.apps.googleusercontent.com">
      <UserProvider>{children}</UserProvider>
    </GoogleOAuthProvider>
  );
};
