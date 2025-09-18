import { useState } from 'react';
import { IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Users, 
  Calendar, 
  MapPin, 
  DollarSign, 
  MoreVertical,
  Filter,
  TrendingUp,
  Clock
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface MyInternshipsPageProps {
  onNavigate: (page: string) => void;
}

export function MyInternshipsPage({ onNavigate }: MyInternshipsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      domain: "Software Engineering",
      location: "Gurugram, Haryana",
      type: "Remote",
      status: "Active",
      description: "Join our frontend team to build cutting-edge web applications using React, TypeScript, and modern development practices. You'll work on user-facing features that impact thousands of users daily.",
      skills: ["React", "TypeScript", "JavaScript", "CSS", "Git"],
      stipend: "₹30000/month",
      duration: "3 months",
      postedDate: "2024-01-15",
      applications: 45,
      interviews: 8,
      shortlisted: 3,
      requirements: "Currently pursuing Computer Science or related field, experience with React and JavaScript"
    },
    {
      id: 2,
      title: "UX Design Intern",
      domain: "Design (UI/UX)",
      location: "Noida, UP",
      type: "Hybrid",
      status: "Active",
      description: "Work with our design team to create intuitive user experiences for our mobile and web platforms. You'll participate in user research, wireframing, prototyping, and design system development.",
      skills: ["Figma", "UI Design", "User Research", "Prototyping", "Design Systems"],
      stipend: "₹25000/month",
      duration: "4 months",
      postedDate: "2024-01-10",
      applications: 32,
      interviews: 5,
      shortlisted: 2,
      requirements: "Portfolio demonstrating UX/UI design skills, proficiency in Figma, understanding of design principles"
    },
    {
      id: 3,
      title: "Data Science Intern",
      domain: "Data Science",
      location: "Pune, Hyderabad",
      type: "On-site",
      status: "Closed",
      description: "Analyze large datasets and build predictive models to drive business insights. You'll work with our data team on machine learning projects and data visualization.",
      skills: ["Python", "SQL", "Machine Learning", "Pandas", "Jupyter"],
      stipend: "₹28000/month",
      duration: "3 months",
      postedDate: "2023-12-20",
      applications: 28,
      interviews: 12,
      shortlisted: 4,
      requirements: "Experience with Python, SQL, and basic machine learning concepts"
    },
    {
      id: 4,
      title: "Product Management Intern",
      domain: "Product Management",
      location: "Gurugram, Haryana",
      type: "Hybrid",
      status: "Draft",
      description: "Support product managers in defining product roadmaps and gathering user requirements. You'll analyze user data, conduct market research, and help prioritize feature development.",
      skills: ["Product Strategy", "Analytics", "User Research", "Agile", "Data Analysis"],
      stipend: "₹32000/month",
      duration: "6 months",
      postedDate: "2024-01-20",
      applications: 0,
      interviews: 0,
      shortlisted: 0,
      requirements: "Strong analytical skills, experience with product management tools, understanding of agile methodologies"
    },
    {
      id: 5,
      title: "Marketing Analytics Intern",
      domain: "Marketing",
      location: "Noida, UP",
      type: "Remote",
      status: "Active",
      description: "Drive marketing campaigns and analyze performance metrics to optimize growth strategies. You'll work with marketing automation tools and create data-driven insights.",
      skills: ["Google Analytics", "SEO", "Content Marketing", "A/B Testing", "Marketing Automation"],
      stipend: "₹22000/month",
      duration: "3 months",
      postedDate: "2024-01-08",
      applications: 41,
      interviews: 7,
      shortlisted: 5,
      requirements: "Experience with Google Analytics, understanding of digital marketing, data analysis skills"
    }
  ];

  const statusOptions = ['All Status', 'Active', 'Closed', 'Draft'];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || internship.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Remote':
        return 'bg-blue-100 text-blue-800';
      case 'Hybrid':
        return 'bg-purple-100 text-purple-800';
      case 'On-site':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalStats = {
    total: internships.length,
    active: internships.filter(i => i.status === 'Active').length,
    applications: internships.reduce((sum, i) => sum + i.applications, 0),
    interviews: internships.reduce((sum, i) => sum + i.interviews, 0)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Internships</h1>
          <p className="text-gray-600 mt-1">Manage and track all your posted internship opportunities.</p>
        </div>
        <Button onClick={() => onNavigate('post-internship')} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Post New Internship
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posted</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalStats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalStats.active}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalStats.applications}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalStats.interviews}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search internships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Internships List */}
      <div className="space-y-6">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
                    <Badge className={getStatusColor(internship.status)}>
                      {internship.status}
                    </Badge>
                    <Badge className={getTypeColor(internship.type)}>
                      {internship.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>{internship.domain}</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-4 h-4" />
                      <span>{internship.stipend}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{internship.duration}</span>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onNavigate(`candidate-matches-${internship.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Matches
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Internship
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      Manage Candidates
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{internship.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {internship.skills.slice(0, 5).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {internship.skills.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{internship.skills.length - 5} more
                  </Badge>
                )}
              </div>

              {/* Application Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{internship.applications}</p>
                  <p className="text-xs text-gray-600">Applications</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{internship.interviews}</p>
                  <p className="text-xs text-gray-600">Interviews</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{internship.shortlisted}</p>
                  <p className="text-xs text-gray-600">Shortlisted</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {internship.applications > 0 ? Math.round((internship.interviews / internship.applications) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-600">Interview Rate</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Posted on {new Date(internship.postedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                
                <div className="flex space-x-3">
                  {internship.status === 'Draft' ? (
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Publish
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => onNavigate(`candidate-matches-${internship.id}`)}
                      className="bg-accent hover:bg-accent/90"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      View Matches ({internship.applications})
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== 'All Status' 
                ? 'Try adjusting your search criteria.' 
                : 'Start by posting your first internship opportunity.'}
            </p>
            <Button onClick={() => onNavigate('post-internship')}>
              <Plus className="mr-2 h-4 w-4" />
              Post Your First Internship
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}