// YourComponent.tsx
import { GoogleLogin } from '@react-oauth/google';

export const Login = () => {
  const handleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await fetch('http://localhost:8000/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      console.log('Backend response:', data);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-126 h-70 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome to MIS-3</h1>
        <p className="mb-4 text-gray-600">Sign in with Google to continue</p>
        <div
          className="flex items-center justify-center "
          style={{
            width: '100%',
          }}
        >
          <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Login Failed')} />
        </div>
      </div>
    </div>
  );
};
