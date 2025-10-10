import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Eye, EyeOff, Award, Users, Target, TrendingUp, ArrowLeft, Briefcase, AlertTriangle } from 'lucide-react';
import apiClient from '../api/apiClient';
import { toast } from 'sonner';


 
interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (userType: 'recruiter' | 'candidate', userData: any) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'recruiter' | 'candidate'>('candidate');
  const [isLoading, setIsLoading] = useState(false);
  const [roleMismatch, setRoleMismatch] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiClient.post('/auth/login', {
        email,
        password,
        userType
      });
      



      // Save token if provided 200OK
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userType', res.data.userType);
        toast.success(`Welcome back, ${res.data.userType}!`);
      }
      const userFromApi = res.data?.user || res.data?.userData || res.data;      
      // Backend might return the user object under `user` or `userData` or directly


      // Build a normalized user object expected by App.handleLogin
      const normalizedUser = {
        email: userFromApi?.email || email,
        name: userFromApi?.name || (userType === 'recruiter' ? 'Recruiter' : 'Student'),
        organization: userFromApi?.organization,
        // Prefer server-provided userType if available, otherwise fall back to UI selection
        userType: (userFromApi?.userType as 'recruiter' | 'candidate') || userType,
      };

      // Notify parent (App) that login succeeded with normalized data
      onLogin(normalizedUser.userType, normalizedUser);
    } catch (err: any) {

      if(err.response){
        const status = err.response.status;
        const message = err.response.data?.message || 'Login Failed';

        if(status === 400){
          setRoleMismatch(message);
        }
        else{
          alert(message);
        }
      }
      else{
        alert(err.message || 'Unexpected Error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      const userData = {
        email: 'user@gmail.com',
        name: userType === 'recruiter' ? 'Google Recruiter' : 'Google Student',
        userType
      };
      
      onLogin(userType, userData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex">
      {/* Role Mismatch Dialog */}
      <Dialog open={!!roleMismatch} onOpenChange={() => setRoleMismatch(null)}>
        <DialogContent className="w-full max-w-md mx-auto">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <DialogTitle className="text-center">Account Type Mismatch</DialogTitle>
            <DialogDescription className="text-center pt-2">
              {roleMismatch}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex-col sm:flex-col gap-2 mt-4">
            <Button
              onClick={() => {
                const correctType = roleMismatch?.includes('recruiter') ? 'recruiter' : 'candidate';
                setUserType(correctType);
                setRoleMismatch(null);
              }}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              Switch to {roleMismatch?.includes('recruiter') ? 'Recruiter' : 'Candidate'} Login
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onNavigate('signup');
                setRoleMismatch(null);
              }}
              className="w-full"
            >
              Create New Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')}
            className="mb-6 -ml-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-primary">InternLink</span>
              </div>
              <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
              <p className="text-center text-gray-600">
                Sign in to your account to continue your journey
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* User Type Selection */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={userType === 'candidate' ? 'default' : 'outline'}
                  onClick={() => setUserType('candidate')}
                  className="h-12"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Student
                </Button>
                <Button
                  type="button"
                  variant={userType === 'recruiter' ? 'default' : 'outline'}
                  onClick={() => setUserType('recruiter')}
                  className="h-12"
                >
                  <Target className="mr-2 h-4 w-4" />
                  Recruiter
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              {/* Google Sign In */}
              <Button 
                type="button"
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={() => onNavigate('signup')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up here
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - PM Scheme Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-accent p-8 text-white">
        <div className="flex flex-col justify-center max-w-lg mx-auto">
          <div className="mb-8">
            <Badge className="bg-white/20 text-white mb-4">
              <Award className="mr-2 h-4 w-4" />
              Government of India Initiative
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              PM Internship Scheme
            </h2>
            <p className="text-lg text-white/90 mb-6">
              A transformative initiative by the Government of India to provide quality internship 
              opportunities to India's youth, promoting diversity and inclusion in the workforce.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Diversity & Inclusion Focus</h3>
                <p className="text-white/80 text-sm">
                  Prioritizing candidates from underrepresented communities, rural backgrounds, 
                  and first-generation graduates to create equal opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Skill Development</h3>
                <p className="text-white/80 text-sm">
                  Structured 12-month internship programs across 24+ sectors to build 
                  industry-ready skills and enhance employability.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Career Opportunities</h3>
                <p className="text-white/80 text-sm">
                  Direct pathway to employment with top companies and startups, 
                  building India's skilled workforce for the future.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <p className="text-sm text-white/90 text-center">
              "Empowering India's youth through quality internships and inclusive opportunities"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}