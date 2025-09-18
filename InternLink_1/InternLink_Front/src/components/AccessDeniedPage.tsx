import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ShieldX, ArrowLeft, LogOut, User, Building } from 'lucide-react';

interface AccessDeniedPageProps {
  onNavigate: (page: string) => void;
  currentUserType: 'recruiter' | 'candidate';
  requiredUserType: 'recruiter' | 'candidate';
  targetPage: string;
  userName?: string;
}

export function AccessDeniedPage({ 
  onNavigate, 
  currentUserType, 
  requiredUserType, 
  targetPage,
  userName 
}: AccessDeniedPageProps) {
  
  const getPageTitle = (page: string) => {
    switch (page) {
      case 'for-recruiters': return 'Recruiter Portal';
      case 'for-candidates': return 'Student Portal';
      case 'post-internship': return 'Post Internship';
      case 'browse-internships': return 'Browse Internships';
      default: return 'Page';
    }
  };

  const getCurrentUserTypeDisplay = (type: 'recruiter' | 'candidate') => {
    return type === 'recruiter' ? 'Recruiter' : 'Student';
  };

  const getRequiredUserTypeDisplay = (type: 'recruiter' | 'candidate') => {
    return type === 'recruiter' ? 'Recruiter' : 'Student';
  };

  const getDashboardPage = (type: 'recruiter' | 'candidate') => {
    return type === 'recruiter' ? 'recruiter-dashboard' : 'candidate-dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldX className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Access Restricted</CardTitle>
            <p className="text-gray-600 mt-2">
              You don't have permission to access this page
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Current User Info */}
            <Alert className="border-blue-200 bg-blue-50">
              <User className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Currently logged in as:</strong> {getCurrentUserTypeDisplay(currentUserType)}
                {userName && ` (${userName.split(' ')[0]})`}
              </AlertDescription>
            </Alert>

            {/* Required Access Info */}
            <Alert className="border-orange-200 bg-orange-50">
              <Building className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Required access:</strong> {getRequiredUserTypeDisplay(requiredUserType)} account needed to access "{getPageTitle(targetPage)}"
              </AlertDescription>
            </Alert>

            {/* Message */}
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">
                The <strong>{getPageTitle(targetPage)}</strong> is only accessible to {getRequiredUserTypeDisplay(requiredUserType)} accounts. 
              </p>
              <Badge className="bg-primary/10 text-primary">
                PM Internship Scheme - Role-based Access
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={() => onNavigate(getDashboardPage(currentUserType))}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to My {getCurrentUserTypeDisplay(currentUserType)} Dashboard
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full h-12"
                onClick={() => onNavigate('home')}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout & Login as {getRequiredUserTypeDisplay(requiredUserType)}
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p>
                Need help? Each user type has access to specific features aligned 
                with the PM Internship Scheme requirements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}