import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Building2, Star, Clock, Filter, Heart } from 'lucide-react';
import { toast } from 'sonner';

export function BrowseInternshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const domains = [
    'All Domains',
    'Software Engineering',
    'Data Science',
    'Product Management',
    'Design (UI/UX)',
    'Marketing',
    'Finance',
    'Operations',
    'Sales'
  ];

  const locations = [
    'All Locations',
    'Mumbai, Maharashtra',
    'Bangalore, Karnataka',
    'Delhi, NCR',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Pune, Maharashtra',
    'Kolkata, West Bengal',
    'Remote',
    'Hybrid'
  ];

  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechFlow India Pvt. Ltd.",
      location: "Mumbai, Maharashtra",
      type: "Remote",
      domain: "Software Engineering",
      match: 94,
      skills: ["React", "JavaScript", "CSS", "TypeScript"],
      description: "Join our frontend team to build cutting-edge web applications using modern technologies...",
      stipend: "₹25,000/month",
      duration: "3 months",
      posted: "2 days ago",
      applicants: 45
    },
    {
      id: 2,
      title: "UX Design Intern",
      company: "DesignHub Solutions",
      location: "Bangalore, Karnataka",
      type: "Hybrid",
      domain: "Design (UI/UX)",
      match: 91,
      skills: ["Figma", "UI Design", "User Research", "Prototyping"],
      description: "Work with our design team to create intuitive user experiences for our mobile and web platforms...",
      stipend: "₹20,000/month",
      duration: "4 months",
      posted: "1 week ago",
      applicants: 32
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "Analytics Pro India",
      location: "Hyderabad, Telangana",
      type: "On-site",
      domain: "Data Science",
      match: 89,
      skills: ["Python", "SQL", "Machine Learning", "Pandas"],
      description: "Analyze large datasets and build predictive models to drive business insights...",
      stipend: "₹22,000/month",
      duration: "3 months",
      posted: "3 days ago",
      applicants: 28
    },
    {
      id: 4,
      title: "Product Management Intern",
      company: "InnovateTech Pvt. Ltd.",
      location: "Delhi, NCR",
      type: "Hybrid",
      domain: "Product Management",
      match: 87,
      skills: ["Product Strategy", "Analytics", "User Stories", "Agile"],
      description: "Support product managers in defining product roadmaps and gathering user requirements...",
      stipend: "₹26,000/month",
      duration: "6 months",
      posted: "5 days ago",
      applicants: 67
    },
    {
      id: 5,
      title: "Marketing Analytics Intern",
      company: "GrowthCo India",
      location: "Chennai, Tamil Nadu",
      type: "Remote",
      domain: "Marketing",
      match: 85,
      skills: ["Google Analytics", "SEO", "Content Marketing", "A/B Testing"],
      description: "Drive marketing campaigns and analyze performance metrics to optimize growth strategies...",
      stipend: "₹18,000/month",
      duration: "3 months",
      posted: "1 week ago",
      applicants: 41
    },
    {
      id: 6,
      title: "Software Engineering Intern",
      company: "BigTech India Ltd.",
      location: "Pune, Maharashtra",
      type: "On-site",
      domain: "Software Engineering",
      match: 92,
      skills: ["Java", "Spring Boot", "AWS", "Docker"],
      description: "Develop backend services and APIs for our enterprise platform serving millions of users...",
      stipend: "₹30,000/month",
      duration: "3 months",
      posted: "4 days ago",
      applicants: 123
    }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDomain = !selectedDomain || selectedDomain === 'All Domains' || internship.domain === selectedDomain;
    const matchesLocation = !selectedLocation || selectedLocation === 'All Locations' || 
                           internship.location.includes(selectedLocation) || 
                           (selectedLocation === 'Remote' && internship.type === 'Remote') ||
                           (selectedLocation === 'Hybrid' && internship.type === 'Hybrid');
    
    return matchesSearch && matchesDomain && matchesLocation;
  });

  const handleApply = (internshipId: number, internshipTitle: string) => {
    toast.success(`Application submitted for ${internshipTitle}!`);
  };

  const toggleSave = (internshipId: number) => {
    setSavedJobs(prev => 
      prev.includes(internshipId) 
        ? prev.filter(id => id !== internshipId)
        : [...prev, internshipId]
    );
    
    const isSaved = savedJobs.includes(internshipId);
    toast.success(isSaved ? 'Removed from saved jobs' : 'Job saved successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Browse Internships</h1>
        <p className="text-gray-600 mt-1">Discover opportunities that match your skills and interests.</p>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search internships, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Domain" />
              </SelectTrigger>
              <SelectContent>
                {domains.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
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

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredInternships.length} of {internships.length} internships
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="match">Match Score</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="stipend">Stipend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Internship Cards */}
      <div className="space-y-6">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{internship.match}% match</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Building2 className="w-4 h-4" />
                      <span>{internship.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {internship.type}
                    </Badge>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSave(internship.id)}
                  className={savedJobs.includes(internship.id) ? 'text-red-500' : 'text-gray-400'}
                >
                  <Heart className={`w-5 h-5 ${savedJobs.includes(internship.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{internship.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {internship.skills.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {internship.skills.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{internship.skills.length - 4} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{internship.stipend}</span>
                  <span>{internship.duration}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Posted {internship.posted}</span>
                  </div>
                  <span>{internship.applicants} applicants</span>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleApply(internship.id, internship.title)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <Button variant="outline" size="lg">
          Load More Internships
        </Button>
      </div>
    </div>
  );
}