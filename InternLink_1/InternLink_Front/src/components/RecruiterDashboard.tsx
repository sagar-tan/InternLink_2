import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Briefcase, Users, Eye, TrendingUp, Plus, Star, Award, Target, BarChart3 } from 'lucide-react';

interface RecruiterDashboardProps {
  onNavigate: (page: string) => void;
}

export function RecruiterDashboard({ onNavigate }: RecruiterDashboardProps) {
  const stats = [
    {
      title: "Active PM Internships",
      value: "12",
      change: "+3 this month",
      icon: Award,
      color: "text-primary"
    },
    {
      title: "Diverse Applicants",
      value: "247",
      change: "68% from target groups",
      icon: Users,
      color: "text-accent"
    },
    {
      title: "First-Time Interns",
      value: "156",
      change: "63% of total applicants",
      icon: Target,
      color: "text-orange-500"
    },
    {
      title: "Diversity Match Rate",
      value: "92%",
      change: "+5% improvement",
      icon: BarChart3,
      color: "text-green-500"
    }
  ];



  const recentInternships = [
    {
      title: "Software Development Intern (PM Scheme)",
      applicants: 43,
      diverseApplicants: 29,
      firstTimeApplicants: 31,
      status: "Active",
      posted: "3 days ago"
    },
    {
      title: "Data Analytics Intern (PM Scheme)",
      applicants: 31,
      diverseApplicants: 22,
      firstTimeApplicants: 19,
      status: "Active",
      posted: "1 week ago"
    },
    {
      title: "Digital Marketing Intern (PM Scheme)",
      applicants: 28,
      diverseApplicants: 18,
      firstTimeApplicants: 21,
      status: "Closed",
      posted: "2 weeks ago"
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            PM Internship Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Track your PM Internship Scheme recruitment and diversity metrics.</p>
        </div>
        <Button 
          onClick={() => onNavigate('post-internship')}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Post PM Internship
        </Button>
      </div>

      {/* PM Scheme Info */}
      <Alert>
        <Award className="h-4 w-4" />
        <AlertDescription>
          <strong>PM Internship Scheme Dashboard:</strong> Monitor your 12-month internship opportunities and track 
          diversity metrics. Prioritize candidates from underrepresented backgrounds and first-time participants.
        </AlertDescription>
      </Alert>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent PM Internships */}
      <div className="max-w-4xl">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Recent PM Internships
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('my-internships')}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInternships.map((internship, index) => (
              <div key={index} className="p-4 border-2 border-primary/20 rounded-lg hover:border-primary/40 transition-colors bg-gradient-to-r from-blue-50 to-teal-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{internship.title}</h4>
                      <Badge className="bg-primary text-white text-xs">PM Scheme</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Posted {internship.posted}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="font-medium text-gray-700">Total Applicants</p>
                        <p className="text-primary font-semibold">{internship.applicants}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Diverse Candidates</p>
                        <p className="text-accent font-semibold">{internship.diverseApplicants}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">First-Time Interns</p>
                        <p className="text-green-600 font-semibold">{internship.firstTimeApplicants}</p>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant={internship.status === 'Active' ? 'default' : 'secondary'}
                    className={internship.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {internship.status}
                  </Badge>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate('post-internship')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New PM Internship
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>PM Scheme Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onNavigate('post-internship')}
            >
              <Award className="w-6 h-6 text-primary" />
              <span>Post PM Internship</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onNavigate('my-internships')}
            >
              <Users className="w-6 h-6 text-accent" />
              <span>Review Applications</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onNavigate('my-internships')}
            >
              <BarChart3 className="w-6 h-6 text-green-500" />
              <span>Diversity Analytics</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onNavigate('settings')}
            >
              <Target className="w-6 h-6 text-orange-500" />
              <span>Set Diversity Targets</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}