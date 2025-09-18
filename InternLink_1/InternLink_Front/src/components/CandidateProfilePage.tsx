import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award, 
  Upload,
  Plus,
  X,
  Save,
  Check,
  AlertTriangle,
  Users,
  Home
} from 'lucide-react';
import { toast } from 'sonner';

interface CandidateProfilePageProps {
  onNavigate: (page: string) => void;
}

export function CandidateProfilePage({ onNavigate }: CandidateProfilePageProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'Python']);
  const [newSkill, setNewSkill] = useState('');
  const [savedSections, setSavedSections] = useState<string[]>([]);

  // Common skills for quick selection
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Django', 'Flask',
    'Machine Learning', 'Data Science', 'SQL', 'MongoDB', 'AWS', 'Git', 'Docker',
    'Figma', 'Adobe Photoshop', 'UI/UX Design', 'Project Management', 'Communication',
    'Leadership', 'Problem Solving', 'Teamwork', 'Public Speaking'
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const toggleCommonSkill = (skill: string) => {
    if (skills.includes(skill)) {
      removeSkill(skill);
    } else {
      setSkills([...skills, skill]);
    }
  };

  const saveSection = (section: string) => {
    setSavedSections([...savedSections, section]);
    toast.success(`${section} section saved successfully!`);
  };

  const isSectionSaved = (section: string) => savedSections.includes(section);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">
            Build a comprehensive profile to get matched with the best internship opportunities
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
            <TabsTrigger value="personal" className="text-xs">Personal & Demographics</TabsTrigger>
            <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
            <TabsTrigger value="preferences" className="text-xs">Preferences</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
          </TabsList>

          {/* Personal & Demographic Information */}
          <TabsContent value="personal">
            <div className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                    {isSectionSaved('personal') && <Check className="w-4 h-4 text-green-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (as per official documents) *</Label>
                    <Input id="fullName" placeholder="Enter your complete name" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input id="dateOfBirth" type="date" />
                      <p className="text-xs text-gray-500">Must be between 18-30 years for PM Internship Scheme</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="transgender">Transgender</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number *</Label>
                      <Input id="phone" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentAddress">Current Address *</Label>
                    <Textarea id="currentAddress" placeholder="Enter your complete current address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" placeholder="Mumbai" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                          <SelectItem value="bihar">Bihar</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="gujarat">Gujarat</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                          <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                          <SelectItem value="west-bengal">West Bengal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input id="pincode" placeholder="400001" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Diversity & Reservation - Mandatory */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Diversity & Reservation Details
                    <span className="text-red-500">*</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      This information is mandatory for the PM Internship Scheme and will be kept strictly confidential. 
                      It helps ensure diversity and equal opportunities in the selection process.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="obc">OBC (Other Backward Classes)</SelectItem>
                        <SelectItem value="sc">SC (Scheduled Caste)</SelectItem>
                        <SelectItem value="st">ST (Scheduled Tribe)</SelectItem>
                        <SelectItem value="ews">EWS (Economically Weaker Section)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pwd" />
                      <Label htmlFor="pwd">Person with Disability (PwD)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="firstGeneration" />
                      <Label htmlFor="firstGeneration">First Generation Graduate</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disabilityType">If PwD, specify type of disability</Label>
                    <Input id="disabilityType" placeholder="e.g., Visual, Hearing, Physical, etc." />
                  </div>
                </CardContent>
              </Card>

              {/* Family Background */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    Family Background (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                      <Input id="fatherOccupation" placeholder="e.g., Farmer, Teacher, Business" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                      <Input id="motherOccupation" placeholder="e.g., Homemaker, Nurse, etc." />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="familyIncome">Annual Family Income</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-1-lakh">Below ₹1 Lakh</SelectItem>
                        <SelectItem value="1-3-lakh">₹1 - 3 Lakh</SelectItem>
                        <SelectItem value="3-5-lakh">₹3 - 5 Lakh</SelectItem>
                        <SelectItem value="5-8-lakh">₹5 - 8 Lakh</SelectItem>
                        <SelectItem value="8-15-lakh">₹8 - 15 Lakh</SelectItem>
                        <SelectItem value="above-15-lakh">Above ₹15 Lakh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="govtEmployee" />
                    <Label htmlFor="govtEmployee">
                      Is there a government employee in your immediate family?
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="govtEmployeeDetails">If yes, provide details</Label>
                    <Input id="govtEmployeeDetails" placeholder="e.g., Father - State Government Teacher" />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => saveSection('personal')} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Personal & Demographic Information
              </Button>
            </div>
          </TabsContent>

          {/* Educational Background */}
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Educational Background
                  {isSectionSaved('education') && <Check className="w-4 h-4 text-green-600" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="highestDegree">Highest Degree/Qualification *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select highest qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class12">Class 12th</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="btech">B.Tech/B.E.</SelectItem>
                        <SelectItem value="bsc">B.Sc</SelectItem>
                        <SelectItem value="bca">BCA</SelectItem>
                        <SelectItem value="ba">B.A.</SelectItem>
                        <SelectItem value="bcom">B.Com</SelectItem>
                        <SelectItem value="bba">BBA</SelectItem>
                        <SelectItem value="llb">LL.B</SelectItem>
                        <SelectItem value="mtech">M.Tech/M.E.</SelectItem>
                        <SelectItem value="msc">M.Sc</SelectItem>
                        <SelectItem value="mca">MCA</SelectItem>
                        <SelectItem value="mba">MBA</SelectItem>
                        <SelectItem value="ma">M.A.</SelectItem>
                        <SelectItem value="mcom">M.Com</SelectItem>
                        <SelectItem value="llm">LL.M</SelectItem>
                        <SelectItem value="phd">Ph.D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">University/Institution *</Label>
                    <Input id="institution" placeholder="e.g., IIT Bombay, Delhi University" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Field of Study *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field of study" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="law">Law</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="architecture">Architecture</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="social-sciences">Social Sciences</SelectItem>
                      <SelectItem value="economics">Economics</SelectItem>
                      <SelectItem value="journalism">Journalism & Mass Communication</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization/Major</Label>
                    <Input id="specialization" placeholder="e.g., Computer Science & Engineering" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Current Year/Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select current status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="final">Final Year</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="gap-year">Gap Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA/Percentage *</Label>
                    <Input id="cgpa" placeholder="8.5 CGPA or 85%" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Year of Completion/Expected Graduation *</Label>
                    <Input id="graduationYear" type="number" placeholder="2025" min="2020" max="2030" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Previous Education</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class12Board">Class 12th Board *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select board" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cbse">CBSE</SelectItem>
                          <SelectItem value="icse">ICSE/ISC</SelectItem>
                          <SelectItem value="state-board">State Board</SelectItem>
                          <SelectItem value="ib">IB (International Baccalaureate)</SelectItem>
                          <SelectItem value="nios">NIOS</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class12Marks">Class 12th Marks/Percentage *</Label>
                      <Input id="class12Marks" placeholder="92%" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="class12Stream">Class 12th Stream</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stream" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="science-pcm">Science (PCM)</SelectItem>
                          <SelectItem value="science-pcb">Science (PCB)</SelectItem>
                          <SelectItem value="science-pcmb">Science (PCMB)</SelectItem>
                          <SelectItem value="commerce">Commerce</SelectItem>
                          <SelectItem value="arts">Arts/Humanities</SelectItem>
                          <SelectItem value="vocational">Vocational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class12Year">Class 12th Year of Completion</Label>
                      <Input id="class12Year" type="number" placeholder="2022" min="2015" max="2025" />
                    </div>
                  </div>
                </div>

                <Button onClick={() => saveSection('education')} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Educational Background
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

         
          {/* Experience */}
          <TabsContent value="experience">
            <div className="space-y-6">
              {/* Past Participation in PM Schemes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Past Participation in Government Schemes
                    <span className="text-red-500">*</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      This information helps prioritize new candidates to distribute benefits more broadly across the population.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pmInternshipPrevious" />
                      <Label htmlFor="pmInternshipPrevious">
                        Have you previously participated in any PM-level internship scheme?
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="pmSkillingPrevious" />
                      <Label htmlFor="pmSkillingPrevious">
                        Have you previously participated in any PM-level skilling scheme?
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="otherGovtScheme" />
                      <Label htmlFor="otherGovtScheme">
                        Have you participated in any other government employment/training scheme?
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schemeDetails">If yes to any above, please provide details</Label>
                    <Textarea 
                      id="schemeDetails" 
                      placeholder="Name of scheme, year of participation, duration, outcome, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Work Experience & Internships
                    {isSectionSaved('experience') && <Check className="w-4 h-4 text-green-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company/Organization</Label>
                      <Input id="companyName" placeholder="TechFlow India Pvt. Ltd." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position/Role</Label>
                      <Input id="position" placeholder="Software Development Intern" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="month" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="month" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Description & Responsibilities</Label>
                    <Textarea 
                      id="jobDescription" 
                      placeholder="Describe your role, responsibilities, and key achievements"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements">Key Achievements & Impact</Label>
                    <Textarea 
                      id="achievements" 
                      placeholder="List your major accomplishments and their measurable impact"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="currentWork" />
                    <Label htmlFor="currentWork">I currently work here</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Projects & Portfolio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Projects & Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input id="projectName" placeholder="E-commerce Website" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal Project</SelectItem>
                          <SelectItem value="academic">Academic Project</SelectItem>
                          <SelectItem value="internship">Internship Project</SelectItem>
                          <SelectItem value="freelance">Freelance Work</SelectItem>
                          <SelectItem value="open-source">Open Source Contribution</SelectItem>
                          <SelectItem value="competition">Competition/Hackathon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">Project Description</Label>
                    <Textarea 
                      id="projectDescription" 
                      placeholder="Describe the project, its purpose, your role, and impact"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="technologies">Technologies/Skills Used</Label>
                      <Input id="technologies" placeholder="React, Node.js, MongoDB, Python" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectDuration">Duration</Label>
                      <Input id="projectDuration" placeholder="3 months" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectUrl">Project URL/Demo</Label>
                      <Input id="projectUrl" placeholder="https://myproject.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub Repository</Label>
                      <Input id="githubUrl" placeholder="https://github.com/username/project" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Portfolio & Social Links</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="portfolioWebsite">Portfolio Website</Label>
                        <Input id="portfolioWebsite" placeholder="https://myportfolio.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                        <Input id="linkedinProfile" placeholder="https://linkedin.com/in/username" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => saveSection('experience')} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Experience & Projects
              </Button>
            </div>
          </TabsContent>



          {/* Skills & Preferences */}
          <TabsContent value="skills">
            <div className="space-y-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Skills & Competencies
                    {isSectionSaved('skills') && <Check className="w-4 h-4 text-green-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Your Skills</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a new skill"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Hard Skills (Technical)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {[
                        'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Django', 'Flask',
                        'Machine Learning', 'Data Science', 'SQL', 'MongoDB', 'AWS', 'Git', 'Docker',
                        'Figma', 'Adobe Photoshop', 'AutoCAD', 'Excel', 'PowerBI', 'Tableau'
                      ].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={skills.includes(skill)}
                            onCheckedChange={() => toggleCommonSkill(skill)}
                          />
                          <Label htmlFor={skill} className="text-sm cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Soft Skills</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Project Management',
                        'Public Speaking', 'Critical Thinking', 'Time Management', 'Adaptability', 'Creativity',
                        'Analytical Thinking', 'Negotiation'
                      ].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={skills.includes(skill)}
                            onCheckedChange={() => toggleCommonSkill(skill)}
                          />
                          <Label htmlFor={skill} className="text-sm cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location, Role & Industry Preferences
                  {isSectionSaved('preferences') && <Check className="w-4 h-4 text-green-600" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Preferred Work Locations</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      'Mumbai', 'Delhi/NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 
                      'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Bhopal', 'Remote Work'
                    ].map((city) => (
                      <div key={city} className="flex items-center space-x-2">
                        <Checkbox id={city} />
                        <Label htmlFor={city} className="text-sm cursor-pointer">
                          {city}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Preferred Industries</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      'Information Technology', 'Banking & Finance', 'Healthcare & Pharmaceuticals', 
                      'E-commerce & Retail', 'Media & Entertainment', 'Education & EdTech',
                      'Management Consulting', 'Manufacturing', 'Automotive', 'Real Estate', 
                      'FMCG', 'Startups', 'Government/Public Sector', 'NGO/Social Sector',
                      'Telecommunications', 'Energy & Utilities'
                    ].map((industry) => (
                      <div key={industry} className="flex items-center space-x-2">
                        <Checkbox id={industry} />
                        <Label htmlFor={industry} className="text-sm cursor-pointer">
                          {industry}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Preferred Role Categories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      'Software Development & Engineering', 'Data Science & Analytics', 
                      'Product Management', 'UI/UX Design', 'Digital Marketing',
                      'Business Development', 'Finance & Accounting', 'Operations & Supply Chain', 
                      'Human Resources', 'Research & Development', 'Content Writing & Communication',
                      'Sales & Customer Success', 'Legal & Compliance', 'Quality Assurance',
                      'Project Management', 'Business Analysis'
                    ].map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Checkbox id={role} />
                        <Label htmlFor={role} className="text-sm cursor-pointer">
                          {role}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Work Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="workMode">Preferred Work Mode</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onsite">On-site</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="flexible">Flexible/Any</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="internshipDuration">Preferred Internship Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3-months">1-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="6-12-months">6-12 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button onClick={() => saveSection('preferences')} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents & Additional Information */}
          <TabsContent value="documents">
            <div className="space-y-6">
              {/* Resume Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Resume/CV Upload
                    <span className="text-red-500">*</span>
                    {isSectionSaved('documents') && <Check className="w-4 h-4 text-green-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Your resume is mandatory for the PM Internship Scheme application. Please ensure it's updated and professional.
                    </AlertDescription>
                  </Alert>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop your resume here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supported formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                    <Button variant="outline">
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Additional Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Certifications & Awards</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="certificationName">Certification/Award Name</Label>
                        <Input id="certificationName" placeholder="e.g., AWS Certified Solutions Architect" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="issuingOrganization">Issuing Organization</Label>
                        <Input id="issuingOrganization" placeholder="e.g., Amazon Web Services" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="issueDate">Issue Date</Label>
                        <Input id="issueDate" type="month" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="credentialId">Credential ID (if applicable)</Label>
                        <Input id="credentialId" placeholder="Certificate verification ID" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Language Proficiency</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nativeLanguage">Native/Mother Tongue</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select native language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="bengali">Bengali</SelectItem>
                            <SelectItem value="telugu">Telugu</SelectItem>
                            <SelectItem value="marathi">Marathi</SelectItem>
                            <SelectItem value="tamil">Tamil</SelectItem>
                            <SelectItem value="gujarati">Gujarati</SelectItem>
                            <SelectItem value="urdu">Urdu</SelectItem>
                            <SelectItem value="kannada">Kannada</SelectItem>
                            <SelectItem value="malayalam">Malayalam</SelectItem>
                            <SelectItem value="punjabi">Punjabi</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="englishProficiency">English Proficiency Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select proficiency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="native">Native</SelectItem>
                            <SelectItem value="fluent">Fluent</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="basic">Basic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="otherLanguages">Other Languages (with proficiency levels)</Label>
                      <Input id="otherLanguages" placeholder="e.g., Tamil (Fluent), Spanish (Basic)" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Extra-Curricular Activities & Achievements</h4>
                    <Textarea 
                      placeholder="Sports achievements, cultural activities, leadership positions, volunteer work, social service, etc."
                      rows={4}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Additional Information</h4>
                    <Textarea 
                      placeholder="Any other relevant information you'd like to share (hobbies, interests, achievements, etc.)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => saveSection('documents')} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Documents & Additional Information
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => onNavigate('candidate-dashboard')}>
            Save as Draft
          </Button>
          <Button 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            onClick={() => {
              toast.success('Profile completed successfully! You are now eligible for PM Internship Scheme matching.');
              onNavigate('candidate-dashboard');
            }}
          >
            Submit for PM Internship Scheme
          </Button>
        </div>
      </div>
    </div>
  );
}