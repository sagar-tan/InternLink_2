import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Search, FileText, TrendingUp, Clock, MapPin, Building2, Star, Award, Users, AlertTriangle } from 'lucide-react';

interface CandidateDashboardProps {
  onNavigate: (page: string) => void;
}

export function CandidateDashboard({ onNavigate }: CandidateDashboardProps) {
  const stats = [
    {
      title: "PM Scheme Applications",
      value: "8",
      change: "+2 this week",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Diversity Score",
      value: "High",
      change: "Excellent diversity profile",
      icon: Users,
      color: "text-accent"
    },
    {
      title: "Interview Invites",
      value: "3",
      change: "+1 this week",
      icon: Clock,
      color: "text-green-500"
    },
    {
      title: "PM Scheme Eligibility",
      value: "Verified",
      change: "Profile complete",
      icon: Award,
      color: "text-yellow-500"
    }
  ];

  const recommendedInternships = [
    {
      title: "Software Development Intern (PM Scheme)",
      company: "TechFlow India Pvt. Ltd.",
      location: "Mumbai, Maharashtra",
      type: "Remote",
      match: 94,
      skills: ["React", "JavaScript", "CSS"],
      posted: "2 days ago",
      stipend: "₹25,000/month",
      isPMScheme: true,
      diversityFocus: "First-generation graduate priority"
    },
    {
      title: "Digital Marketing Intern (PM Scheme)",
      company: "DesignHub Solutions",
      location: "Bangalore, Karnataka",
      type: "Hybrid",
      match: 91,
      skills: ["Social Media", "Analytics", "Content Creation"],
      posted: "1 week ago",
      stipend: "₹20,000/month",
      isPMScheme: true,
      diversityFocus: "SC/ST/OBC candidates encouraged"
    },
    {
      title: "Data Analytics Intern (PM Scheme)",
      company: "Analytics Pro India",
      location: "Hyderabad, Telangana",
      type: "On-site",
      match: 89,
      skills: ["Python", "SQL", "Excel"],
      posted: "3 days ago",
      stipend: "₹22,000/month",
      isPMScheme: true,
      diversityFocus: "Rural background preferred"
    }
  ];

  const recentApplications = [
    {
      title: "Software Engineering Intern",
      company: "InnovateTech Pvt. Ltd.",
      appliedDate: "3 days ago",
      status: "Under Review"
    },
    {
      title: "Product Management Intern",
      company: "BigTech India Ltd.",
      appliedDate: "1 week ago",
      status: "Interview Scheduled"
    },
    {
      title: "Marketing Intern",
      company: "GrowthCo India",
      appliedDate: "2 weeks ago",
      status: "Application Viewed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Application Viewed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PM Internship Dashboard</h1>
          <p className="text-gray-600 mt-1">Your gateway to the Prime Minister's Internship Scheme opportunities.</p>
        </div>
        <Button 
          onClick={() => onNavigate('browse-internships')}
          className="bg-accent hover:bg-accent/90"
        >
          <Search className="mr-2 h-4 w-4" />
          Browse PM Internships
        </Button>
      </div>

      {/* PM Internship Scheme Info */}
      <Alert>
        <Award className="h-4 w-4" />
        <AlertDescription>
          <strong>PM Internship Scheme:</strong> You're eligible for government-sponsored internships with top companies. 
          Complete your profile to get matched with opportunities that promote diversity and skill development.
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* PM Scheme Recommended Matches */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                PM Scheme Matches for You
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('browse-internships')}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendedInternships.map((internship, index) => (
              <div key={index} className="p-4 border-2 border-primary/20 rounded-lg hover:border-primary/40 transition-all cursor-pointer bg-gradient-to-r from-blue-50 to-teal-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{internship.title}</h4>
                      <Badge className="bg-primary text-white text-xs">PM Scheme</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4" />
                      <span>{internship.company}</span>
                      <span>•</span>
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{internship.match}%</span>
                    </div>
                    <p className="text-xs text-gray-500">diversity match</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {internship.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="p-2 bg-accent/10 rounded text-xs text-accent-foreground mb-3">
                  <Users className="w-3 h-3 inline mr-1" />
                  Diversity Focus: {internship.diversityFocus}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="font-medium text-primary">{internship.stipend}</span>
                  <span>Posted {internship.posted}</span>
                </div>
                
                <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  Apply for PM Scheme
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Applications</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('my-applications')}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplications.map((application, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{application.title}</h4>
                  <p className="text-sm text-gray-600">{application.company} • Applied {application.appliedDate}</p>
                </div>
                <Badge className={getStatusColor(application.status)}>
                  {application.status}
                </Badge>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate('browse-internships')}
            >
              <Search className="mr-2 h-4 w-4" />
              Find More Opportunities
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* PM Scheme Profile Status */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            PM Internship Scheme Profile Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">PM Scheme Eligibility: Verified</span>
            <span className="text-sm text-gray-600">85% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            {/* progress bar to be dynamic based on user profile completion */}
            <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Complete your diversity & demographic information to improve your PM Scheme matching and ensure priority consideration.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-1"
              onClick={() => onNavigate('profile')}
            >
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm">Update Demographics</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-1"
              onClick={() => onNavigate('profile')}
            >
              <FileText className="w-5 h-5 text-accent" />
              <span className="text-sm">Upload Resume</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-1"
              onClick={() => onNavigate('profile')}
            >
              <Star className="w-5 h-5 text-green-500" />
              <span className="text-sm">Add Skills</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-1"
              onClick={() => onNavigate('profile')}
            >
              <TrendingUp className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">Complete Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}