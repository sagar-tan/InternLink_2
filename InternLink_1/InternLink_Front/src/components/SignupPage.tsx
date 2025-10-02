import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Award, Users, Target, TrendingUp, ArrowLeft, Building, GraduationCap, Briefcase } from 'lucide-react';

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onLogin: (userType: 'recruiter' | 'candidate', userData: any) => void;
}

export function SignupPage({ onNavigate, onLogin }: SignupPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'recruiter' | 'candidate'>('candidate');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Check password match
    if (field === 'confirmPassword' || field === 'password') {
      if (field === 'confirmPassword') {
        setPasswordMatch(value === formData.password);
      } else {
        setPasswordMatch(formData.confirmPassword === value);
      }
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setPasswordMatch(false);
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:8080/api/auth/signup", {// the server will return 201 Created status code on successful registration
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        password: formData.password,
        userType
      })
    });


    const data = await response.json();
    console.log("status:", response.status); // should be 201
    console.log("ok:", response.ok);         // true
    console.log("json body:", data);



    if (!response.ok) {
      throw new Error(data.message || "Failed to register");
    }

    // success: login the user
     if(response.ok){// response.ok is true for status code 200-299
      onNavigate('login');
      alert("Registration successful! Please log in.");
     }
  } catch (err: any) {
    console.error(err.message);
    alert(err.message);
  } finally {
    setIsLoading(false);
  }
};


  const handleGoogleSignUp = () => {
    setIsLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      const userData = {
        email: 'user@gmail.com',
        name: userType === 'recruiter' ? 'Google Recruiter' : 'Google Student',
        organization: userType === 'recruiter' ? 'Google Inc.' : 'Google University',
        userType
      };
      
      onLogin(userType, userData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex">
      {/* Left Side - Signup Form */}
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
              <CardTitle className="text-center text-2xl">Join InternLink</CardTitle>
              <p className="text-center text-gray-600">
                Create your account and start your PM Internship journey
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
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Student
                </Button>
                <Button
                  type="button"
                  variant={userType === 'recruiter' ? 'default' : 'outline'}
                  onClick={() => setUserType('recruiter')}
                  className="h-12"
                >
                  <Building className="mr-2 h-4 w-4" />
                  Recruiter
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                {userType === 'recruiter' && (
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Company/Organization name"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                )}

                {userType === 'candidate' && (
                  <div className="space-y-2">
                    <Label htmlFor="organization">University/College</Label>
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Your institution name"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                      className={`h-12 pr-10 ${!passwordMatch ? 'border-red-500' : ''}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {!passwordMatch && (
                    <p className="text-red-500 text-sm">Passwords do not match</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-start space-x-2 text-sm">
                    <input type="checkbox" required className="rounded mt-0.5" />
                    <span>
                      I agree to the{' '}
                      <button type="button" className="text-primary hover:underline">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-primary hover:underline">
                        Privacy Policy
                      </button>
                    </span>
                  </label>

                  <label className="flex items-start space-x-2 text-sm">
                    <input type="checkbox" className="rounded mt-0.5" />
                    <span>
                      I want to receive updates about PM Internship Scheme opportunities
                    </span>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  disabled={isLoading || !passwordMatch}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
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

              {/* Google Sign Up */}
              <Button 
                type="button"
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50"
                onClick={handleGoogleSignUp}
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
                {isLoading ? 'Creating account...' : 'Continue with Google'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={() => onNavigate('login')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
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
              Be Part of PM Internship Scheme
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Join thousands of students and recruiters who are already part of India's 
              largest diversity-focused internship program.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Inclusive Opportunities</h3>
                <p className="text-white/80 text-sm">
                  Special focus on candidates from SC, ST, OBC, EWS, PwD communities, 
                  rural areas, and first-generation college graduates.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Top Companies Partner</h3>
                <p className="text-white/80 text-sm">
                  Connect with leading organizations across 24+ sectors committed 
                  to diversity and skill development.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Skill & Career Growth</h3>
                <p className="text-white/80 text-sm">
                  12-month structured programs with mentorship, training, 
                  and direct pathways to full-time employment.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <p className="text-sm text-white/90 text-center">
              "Building an inclusive workforce for New India - one internship at a time"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}