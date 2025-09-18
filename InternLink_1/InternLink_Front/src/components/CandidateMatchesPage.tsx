import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Star, Users, Award, MapPin, GraduationCap, Mail, Phone } from 'lucide-react';

interface CandidateMatchesPageProps {
  onNavigate: (page: string) => void;
  internshipId?: string;
  internshipTitle?: string;
}

export function CandidateMatchesPage({ onNavigate, internshipId, internshipTitle }: CandidateMatchesPageProps) {
  // Mock candidates data - in real app, this would be filtered by internshipId
  const candidates = [
    {
      id: 1,
      name: "Aman Preet Kaur",
      email: "aman.kaur@email.com",
      phone: "+91 98765 43210",
      skills: ["React", "Node.js", "Python", "JavaScript"],
      match: 96,
      university: "Galgotias University",
      degree: "B.Tech Computer Science",
      gpa: "9.8",
      graduationYear: "2024",
      location: "Punjab",
      diversityProfile: "First-generation graduate, Women in Tech",
      isFirstTime: true,
      appliedDate: "2 days ago",
      resumeUrl: "#"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul.kumar@email.com", 
      phone: "+91 87654 32109",
      skills: ["Data Science", "Machine Learning", "Python", "SQL"],
      match: 94,
      university: "Govt. Engineering College",
      degree: "B.Tech Information Technology",
      gpa: "8.7",
      graduationYear: "2024",
      location: "Jharkhand",
      diversityProfile: "SC category, Rural background",
      isFirstTime: true,
      appliedDate: "3 days ago",
      resumeUrl: "#"
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 76543 21098", 
      skills: ["Digital Marketing", "Analytics", "Content Creation", "Social Media"],
      match: 91,
      university: "Local State University",
      degree: "BBA Marketing",
      gpa: "8.9",
      graduationYear: "2025",
      location: "Madhya Pradesh",
      diversityProfile: "OBC category, First-generation graduate",
      isFirstTime: false,
      appliedDate: "5 days ago",
      resumeUrl: "#"
    },
    {
      id: 4,
      name: "Arjun Patel",
      email: "arjun.patel@email.com",
      phone: "+91 65432 10987",
      skills: ["Java", "Spring Boot", "AWS", "MySQL"],
      match: 89,
      university: "Technical Institute",
      degree: "B.E. Computer Engineering",
      gpa: "8.2",
      graduationYear: "2024",
      location: "Gujarat", 
      diversityProfile: "EWS category, Rural Gujarat",
      isFirstTime: true,
      appliedDate: "1 week ago",
      resumeUrl: "#"
    },
    {
      id: 5,
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 54321 09876",
      skills: ["UI/UX Design", "Figma", "Adobe XD", "User Research"],
      match: 87,
      university: "National Institute of Design Programs",
      degree: "B.Des Visual Communication",
      gpa: "8.5",
      graduationYear: "2024",
      location: "Telangana",
      diversityProfile: "Women in Design, Tier-2 city background",
      isFirstTime: true,
      appliedDate: "1 week ago",
      resumeUrl: "#"
    }
  ];

  const handleContactCandidate = (candidateId: number) => {
    // In real app, this would initiate contact/interview process
    console.log('Contacting candidate:', candidateId);
  };

  const handleViewProfile = (candidateId: number) => {
    // In real app, this would show detailed candidate profile
    console.log('Viewing profile:', candidateId);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onNavigate('my-internships')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Internships
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidate Matches</h1>
          <p className="text-gray-600">
            {internshipTitle ? `Candidates for: ${internshipTitle}` : 'Review candidates matched to your internship'}
          </p>
        </div>
      </div>

      {/* PM Scheme Alert */}
      <Alert>
        <Award className="h-4 w-4" />
        <AlertDescription>
          <strong>PM Internship Scheme Candidates:</strong> These candidates are ranked by their diversity match score 
          and eligibility for the PM Scheme. Priority is given to first-time interns and underrepresented groups.
        </AlertDescription>
      </Alert>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">First-Time Interns</p>
                <p className="text-2xl font-bold text-green-600">{candidates.filter(c => c.isFirstTime).length}</p>
              </div>
              <Award className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Match Score</p>
                <p className="text-2xl font-bold text-accent">
                  {Math.round(candidates.reduce((acc, c) => acc + c.match, 0) / candidates.length)}%
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Diverse Backgrounds</p>
                <p className="text-2xl font-bold text-accent">{candidates.length}</p>
              </div>
              <Users className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <Card key={candidate.id} className="border-2 border-primary/20 shadow-lg hover:border-primary/40 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                      <Badge className="bg-primary/10 text-primary">Rank #{index + 1}</Badge>
                      {candidate.isFirstTime && (
                        <Badge className="bg-green-100 text-green-800">First-Time Intern</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {candidate.degree} • {candidate.university}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {candidate.location} • GPA {candidate.gpa}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {candidate.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-bold text-gray-900">{candidate.match}%</span>
                  </div>
                  <p className="text-xs text-gray-500">match score</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Diversity Profile */}
              <div className="p-3 bg-accent/10 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent-foreground">Diversity Profile:</span>
                </div>
                <p className="text-sm text-accent-foreground">{candidate.diversityProfile}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Applied {candidate.appliedDate} • Graduating {candidate.graduationYear}
                </div>
                <div className="space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewProfile(candidate.id)}
                  >
                    View Full Profile
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    onClick={() => handleContactCandidate(candidate.id)}
                  >
                    Contact Candidate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {candidates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates yet</h3>
            <p className="text-gray-600 mb-4">
              No candidates have applied for this internship yet. Share your opportunity to attract diverse talent.
            </p>
            <Button onClick={() => onNavigate('post-internship')}>
              Create Another Internship
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}