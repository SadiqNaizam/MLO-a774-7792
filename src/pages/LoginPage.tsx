import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, KeyRound, ShieldAlert, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('user@example.com'); // Default credentials
  const [password, setPassword] = useState('password123'); // Default credentials
  const [mfaCode, setMfaCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log('LoginPage loaded');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // Mock login logic
    console.log('Login attempt:', { email, password, mfaCode });
    // On successful login (mock):
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0051B4] to-[#003A80] p-4">
      <Card className="w-full max-w-md shadow-2xl bg-white">
        <CardHeader className="text-center">
          <img src="https://placehold.co/150x50/0051B4/FFFFFF?text=FinBank" alt="FinBank Logo" className="mx-auto mb-4 h-12"/>
          <CardTitle className="text-2xl font-bold text-[#0051B4]">Welcome Back</CardTitle>
          <CardDescription>Securely access your financial dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <ShieldAlert className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-[#0051B4] focus:ring-[#0051B4]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
               <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-[#0051B4] focus:ring-[#0051B4]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0051B4]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mfa" className="text-gray-700">MFA Code (Optional)</Label>
              <div className="relative">
                <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="mfa"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-[#0051B4] focus:ring-[#0051B4]"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-[#0051B4] hover:bg-[#003A80] text-white">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <Link to="/forgot-password" className="text-[#0051B4] hover:underline">
            Forgot Password?
          </Link>
          <p className="text-gray-600">
            Don't have an account? <Link to="/register" className="text-[#0051B4] hover:underline font-medium">Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;