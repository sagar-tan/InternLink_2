import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ForRecruitersPage } from './components/ForRecruitersPage';
import { ForCandidatesPage } from './components/ForCandidatesPage';
import { AccessDeniedPage } from './components/AccessDeniedPage';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { PostInternshipPage } from './components/PostInternshipPage';
import { MyInternshipsPage } from './components/MyInternshipsPage';
import { CandidateMatchesPage } from './components/CandidateMatchesPage';
import { CandidateDashboard } from './components/CandidateDashboard';
import { BrowseInternshipsPage } from './components/BrowseInternshipsPage';
import { CandidateProfilePage } from './components/CandidateProfilePage';
import { Toaster } from './components/ui/sonner';

type PageType = 
  | 'home' 
  | 'for-recruiters' 
  | 'for-candidates' 
  | 'about' 
  | 'login' 
  | 'signup'
  | 'recruiter-dashboard'
  | 'post-internship'
  | 'my-internships'
  | 'candidate-matches'
  | 'settings'
  | 'candidate-dashboard'
  | 'browse-internships'
  | 'my-applications'
  | 'profile'
  | 'account'
  | 'access-denied-for-recruiters'
  | 'access-denied-for-candidates'
  | 'access-denied-post-internship'
  | 'access-denied-browse-internships';

type UserType = 'recruiter' | 'candidate' | null;

interface UserData {
  email: string;
  name: string;
  organization?: string;
  userType: 'recruiter' | 'candidate';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [userType, setUserType] = useState<UserType>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [intendedDestination, setIntendedDestination] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    // Handle public pages that don't require authentication
    if (page === 'home' || page === 'login' || page === 'signup' || page === 'about') {
      setCurrentPage(page as PageType);
      if (page === 'home') {
        // Logout functionality
        setUserType(null);
        setUserData(null);
        setIsAuthenticated(false);
        setIntendedDestination(null);
      }
      return;
    }

    // Handle role-specific pages
    if (page === 'for-recruiters' || page === 'for-candidates') {
      if (!isAuthenticated) {
        // Save intended destination and redirect to login
        setIntendedDestination(page);
        setCurrentPage('login');
        return;
      }
      
      // Check if user has correct role
      const requiredRole = page === 'for-recruiters' ? 'recruiter' : 'candidate';
      if (userType !== requiredRole) {
        // Show access denied page
        setCurrentPage(`access-denied-${page}` as PageType);
        return;
      }
      
      // User has correct role, show the page
      setCurrentPage(page as PageType);
      return;
    }

    // Handle action-specific pages (post-internship, browse-internships)
    if (page === 'post-internship') {
      if (!isAuthenticated) {
        setIntendedDestination(page);
        setCurrentPage('login');
        return;
      }
      
      if (userType !== 'recruiter') {
        setCurrentPage(`access-denied-${page}` as PageType);
        return;
      }
      
      setCurrentPage(page as PageType);
      return;
    }

    if (page === 'browse-internships') {
      if (!isAuthenticated) {
        setIntendedDestination(page);
        setCurrentPage('login');
        return;
      }
      
      if (userType !== 'candidate') {
        setCurrentPage(`access-denied-${page}` as PageType);
        return;
      }
      
      setCurrentPage(page as PageType);
      return;
    }

    // Handle other protected pages
    if (!isAuthenticated) {
      setIntendedDestination(page);
      setCurrentPage('login');
      return;
    }

    // Protected page navigation for authenticated users
    setCurrentPage(page as PageType);
  };

  const handleLogin = (loginUserType: 'recruiter' | 'candidate', loginUserData: UserData) => {
    setUserType(loginUserType);
    setUserData(loginUserData);
    setIsAuthenticated(true);
    
    // Check if there was an intended destination
    if (intendedDestination) {
      const destination = intendedDestination;
      setIntendedDestination(null);
      
      // Validate the intended destination against user role
      if (destination === 'for-recruiters' && loginUserType === 'recruiter') {
        setCurrentPage('for-recruiters');
      } else if (destination === 'for-candidates' && loginUserType === 'candidate') {
        setCurrentPage('for-candidates');
      } else if (destination === 'post-internship' && loginUserType === 'recruiter') {
        setCurrentPage('post-internship');
      } else if (destination === 'browse-internships' && loginUserType === 'candidate') {
        setCurrentPage('browse-internships');
      } else {
        // Role mismatch, go to appropriate dashboard
        if (loginUserType === 'recruiter') {
          setCurrentPage('recruiter-dashboard');
        } else {
          setCurrentPage('candidate-dashboard');
        }
      }
    } else {
      // No intended destination, go to appropriate dashboard
      if (loginUserType === 'recruiter') {
        setCurrentPage('recruiter-dashboard');
      } else {
        setCurrentPage('candidate-dashboard');
      }
    }
  };

  const renderPage = () => {
    // Handle access denied pages
    if (currentPage.startsWith('access-denied-')) {
      const targetPage = currentPage.replace('access-denied-', '');
      let requiredUserType: 'recruiter' | 'candidate' = 'candidate';
      
      if (targetPage === 'for-recruiters' || targetPage === 'post-internship') {
        requiredUserType = 'recruiter';
      } else if (targetPage === 'for-candidates' || targetPage === 'browse-internships') {
        requiredUserType = 'candidate';
      }
      
      return (
        <AccessDeniedPage
          onNavigate={handleNavigate}
          currentUserType={userType!}
          requiredUserType={requiredUserType}
          targetPage={targetPage}
          userName={userData?.name}
        />
      );
    }

    // Handle candidate matches for specific internships
    if (currentPage.startsWith('candidate-matches-')) {
      const internshipId = currentPage.split('-')[2];
      
      // Mock data - in real app, you'd fetch the internship details by ID
      const internshipTitles = {
        '1': 'Frontend Developer Intern',
        '2': 'UX Design Intern', 
        '3': 'Data Science Intern',
        '4': 'Product Management Intern',
        '5': 'Marketing Analytics Intern'
      };
      
      const internshipTitle = internshipTitles[internshipId as keyof typeof internshipTitles];
      
      return (
        <CandidateMatchesPage 
          onNavigate={handleNavigate} 
          internshipId={internshipId}
          internshipTitle={internshipTitle}
        />
      );
    }

    switch (currentPage) {
      case 'home':
      case 'about':
        return <LandingPage onNavigate={handleNavigate} />;
      
      case 'for-recruiters':
        return <ForRecruitersPage onNavigate={handleNavigate} />;
      
      case 'for-candidates':
        return <ForCandidatesPage onNavigate={handleNavigate} />;
      
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      
      case 'recruiter-dashboard':
        return <RecruiterDashboard onNavigate={handleNavigate} />;
      
      case 'post-internship':
        return <PostInternshipPage onNavigate={handleNavigate} />;
      
      case 'candidate-dashboard':
        return <CandidateDashboard onNavigate={handleNavigate} />;
      
      case 'browse-internships':
        return <BrowseInternshipsPage />;
      
      case 'my-internships':
        return <MyInternshipsPage onNavigate={handleNavigate} />;
      
      case 'candidate-matches':
        return <CandidateMatchesPage onNavigate={handleNavigate} />;
      
      case 'my-applications':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Applications</h1>
            <p className="text-gray-600">Track all your internship applications.</p>
          </div>
        );
      
      case 'profile':
        return <CandidateProfilePage onNavigate={handleNavigate} />;
      
      case 'settings':
      case 'account':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences.</p>
          </div>
        );
      
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  const showSidebar = isAuthenticated && userType && !['home', 'login', 'signup'].includes(currentPage);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        userType={userType} 
        userData={userData}
        isAuthenticated={isAuthenticated}
      />
      
      <div className="flex">
        {showSidebar && (
          <Sidebar 
            userType={userType} 
            currentPage={currentPage} 
            onNavigate={handleNavigate} 
          />
        )}
        
        <main className={`flex-1 ${showSidebar ? '' : 'w-full'}`}>
          {renderPage()}
        </main>
      </div>

      {/* Footer */}
      {!showSidebar && !isAuthenticated && (
        <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">IL</span>
                  </div>
                  <span className="text-xl font-bold text-primary">InternLink</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Connecting ambitious students with forward-thinking companies through AI-powered matching.
                </p>
                <p className="text-sm text-gray-500">
                  © 2024 InternLink. All rights reserved.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">For Students</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <button onClick={() => handleNavigate('browse-internships')} className="hover:text-primary">
                      Browse Internships
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('candidate-dashboard')} className="hover:text-primary">
                      Student Dashboard
                    </button>
                  </li>
                  <li>Career Resources</li>
                  <li>Success Stories</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">For Companies</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <button onClick={() => handleNavigate('post-internship')} className="hover:text-primary">
                      Post Internships
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('recruiter-dashboard')} className="hover:text-primary">
                      Recruiter Dashboard
                    </button>
                  </li>
                  <li>Pricing</li>
                  <li>Enterprise Solutions</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
              <p>
                Built with ❤️ to help students and companies build their future together.
              </p>
            </div>
          </div>
        </footer>
      )}
      
      <Toaster />
    </div>
  );
}