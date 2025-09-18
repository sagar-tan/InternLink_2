import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  Plus, 
  Briefcase, 
  Users, 
  Settings, 
  Search,
  FileText,
  User,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  userType: 'recruiter' | 'candidate';
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ userType, currentPage, onNavigate }: SidebarProps) {
  const recruiterItems = [
    { id: 'recruiter-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'post-internship', label: 'Post Internship', icon: Plus },
    { id: 'my-internships', label: 'My Internships', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const candidateItems = [
    { id: 'candidate-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'browse-internships', label: 'Browse Internships', icon: Search },
    { id: 'my-applications', label: 'My Applications', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: CreditCard },
  ];

  const items = userType === 'recruiter' ? recruiterItems : candidateItems;

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-16">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-sidebar-foreground mb-1">
            {userType === 'recruiter' ? 'Recruiter Portal' : 'Student Portal'}
          </h2>
          <p className="text-sm text-sidebar-foreground/60">
            {userType === 'recruiter' ? 'Manage your internships' : 'Find your opportunity'}
          </p>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start font-medium ${
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 pt-8 border-t border-sidebar-border">
          <h3 className="text-sm font-medium text-sidebar-foreground/60 mb-3">Quick Actions</h3>
          {userType === 'recruiter' ? (
            <Button 
              size="sm" 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => onNavigate('post-internship')}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Internship
            </Button>
          ) : (
            <Button 
              size="sm" 
              className="w-full bg-accent hover:bg-accent/90"
              onClick={() => onNavigate('browse-internships')}
            >
              <Search className="mr-2 h-4 w-4" />
              Find Internships
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}