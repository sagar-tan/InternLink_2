import { useState, useEffect, SetStateAction } from 'react';
import { initialCandidateData } from './candidateData';
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
  Home,
  CheckCircle,
  XCircle,
  Shield
} 
from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '../api/apiClient'; // Import the configured Axios instance this is manually done btw
import { FormData } from '../types'; // Import the FormData type from types.ts which is now a template pretty much

interface CandidateProfilePageProps {
  onNavigate: (page: string) => void;
}

interface EligibilityStatus {
  overall: 'eligible' | 'not-eligible' | 'partial' | 'pending';
  age: 'eligible' | 'not-eligible' | 'pending';
  academic: 'eligible' | 'not-eligible' | 'pending';
  education: 'eligible' | 'not-eligible' | 'pending';
  income: 'eligible' | 'not-eligible' | 'pending';
  participation: 'eligible' | 'not-eligible' | 'pending';
  employment: 'eligible' | 'not-eligible' | 'pending';
  citizenship: 'eligible' | 'not-eligible' | 'pending';
  family: 'eligible' | 'not-eligible' | 'pending';
  issues: string[];
  warnings: string[];
}

export function CandidateProfilePage({ onNavigate }: CandidateProfilePageProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [newSkill, setNewSkill] = useState('');

  // You don’t need this. It’s cosmetic only.
  //const [savedSections, setSavedSections] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    //personal Information
    dateOfBirth: '',
    citizenship: '',
    fullName: '',
    gender: '',
    email: '',
    phone: '',
    currentlyEmployed: false,
    currentAddress: '',
    city: '',
    state: '',
    pincode: '',
    //Reservation Details
    category: '',
    PwD: false,
    FGG: false,
    PwdType: '',
    //Family Background
    familyIncome: '',
    govtEmployee: false,
    fatherOccupation: '',
    motherOccupation: '',
    govtEmployeeDetails: '',

    //Educational BG fields
    highestDegree: '',
    institution: '',
    studyField: '',
    specialization: '',
    cgpa: '',
    currYear: '',
    graduationYear: '',

    //Previous Education fields
    class12Board: '',
    class12Year: '',
    class12Marks: '',
    class12Stream: '',
    //Past Participation fields
    pmInternshipPrevious: false,
    pmSkillingPrevious: false,
    otherGovtScheme: false,
    natsNapsTraining: false,
    pmleveldetails: '',
    //Work Experience fields
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
    keyAchievements: '',
    workHereNow: false,

    //Skills
    skills: [],
    // Preferences required
    preferredDomain: '',
    preferredLocation: '',
    preferredDuration: '',
    monthlyStipend: ''
  });
  const [eligibilityStatus, setEligibilityStatus] = useState<EligibilityStatus>({
    overall: 'pending',
    age: 'pending',
    academic: 'pending',
    education: 'pending',
    income: 'pending',
    participation: 'pending',
    employment: 'pending',
    citizenship: 'pending',
    family: 'pending',
    issues: [],
    warnings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {

    const fetchProfile = async () =>{
      const token = localStorage.getItem('token');
      console.log("Fetched token:", token);
      if(!token){
        toast.error('Please log in to access your profile.');
        return; // Stop fetching if not logged in
      }
      try{
        const response =await apiClient.get('/candidate/profile');
        if(response.data){
          setFormData(response.data);
        }
      }
      catch(error:any){
        if(error.response?.status === 404){
          console.log("New User, no Profile yet");
        }
        else{
          console.error("Error fetching profile:", error);
          toast.error("Error fetching profile data. Please try again later.");
        }
      }
      finally{
        setLoading(false);
      }
    };
    fetchProfile();

  }, []);


  // Common skills for quick selection
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Django', 'Flask',
    'Machine Learning', 'Data Science', 'SQL', 'MongoDB', 'AWS', 'Git', 'Docker',
    'Figma', 'Adobe Photoshop', 'UI/UX Design', 'Project Management', 'Communication',
    'Leadership', 'Problem Solving', 'Teamwork', 'Public Speaking'
  ];

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Eligibility validation logic
  const validateEligibility = () => {
    const issues: string[] = [];
    const warnings: string[] = [];
    const status: EligibilityStatus = {
      overall: 'pending',
      age: 'pending',
      academic: 'pending',
      education: 'pending',
      income: 'pending',
      participation: 'pending',
      employment: 'pending',
      citizenship: 'pending',
      family: 'pending',
      issues,
      warnings
    };

    // Age validation (21-24 years for PM Internship Scheme)
    if (formData.dateOfBirth) {
      const age = calculateAge(formData.dateOfBirth);
      if (age !== null) {
        if (age < 21) {
          status.age = 'not-eligible';
          issues.push(`Age requirement not met: You must be at least 21 years old (Current age: ${age})`);
        } else if (age > 24) {
          status.age = 'not-eligible';
          issues.push(`Age limit exceeded: Maximum age allowed is 24 years (Current age: ${age})`);
        } else {
          status.age = 'eligible';
        }
      }
    }

    // Citizenship validation
    if (formData.citizenship) {
      if (formData.citizenship === 'indian') {
        status.citizenship = 'eligible';
      } else {
        status.citizenship = 'not-eligible';
        issues.push('Citizenship requirement: You must be an Indian citizen to be eligible for PM Internship Scheme');
      }
    }

    // Education validation - Updated for PM Internship Scheme
    // Education validation - Updated for PM Internship Scheme
    if (formData.highestDegree && formData.institution) {
      const institutionLower = formData.institution.toLowerCase();

      const excludedInstitutions = [
        'iit', 'iim', 'national law university', 'iiser', 'nid', 'iiit'
      ];

      const excludedDegrees = [
        'phd', 'mtech', 'msc', 'mca', 'mba', 'ma', 'mcom', 'llm',
        'ca', 'cma', 'cs', 'mbbs', 'bds'
      ];

      const eligibleDegrees = [
        'class12', 'btech', 'iti', 'diploma',
        'ba', 'bsc', 'bcom', 'bca', 'bba', 'bpharma'
      ];

      const isExcludedInstitution = excludedInstitutions.some(inst =>
        institutionLower.includes(inst)
      );

      if (isExcludedInstitution) {
        status.education = 'not-eligible';
        issues.push('Institution not eligible: Graduates from IITs, IIMs, National Law Universities, IISERs, NIDs, and IIITs are not eligible');
      } else if (excludedDegrees.includes(formData.highestDegree)) {
        status.education = 'not-eligible';
        if (['ca', 'cma', 'cs', 'mbbs', 'bds'].includes(formData.highestDegree)) {
          issues.push('Professional qualification not eligible: CA, CMA, CS, MBBS, BDS holders are not eligible');
        } else {
          issues.push('Education level not eligible: Master\'s degree or higher qualification holders are not eligible');
        }
      } else if (eligibleDegrees.includes(formData.highestDegree)) {
        status.education = 'eligible';
        if (formData.highestDegree === 'class12') {
          warnings.push('Education consideration: Having completed only Class 12th...');
        }
      } else {
        status.education = 'not-eligible';
        issues.push('Education qualification not eligible...');
      }
    } else {
      // Institution or degree not filled yet → keep it pending
      status.education = 'pending';
    }


    // Income validation - Family income must not exceed ₹8,00,000
    if (formData.familyIncome) {
      const eligibleIncomeRanges = ['below-1-lakh', '1-3-lakh', '3-5-lakh', '5-8-lakh'];
      if (eligibleIncomeRanges.includes(formData.familyIncome)) {
        status.income = 'eligible';
      } else {
        status.income = 'not-eligible';
        issues.push('Income limit exceeded: Annual family income must not exceed ₹8,00,000 for PM Internship Scheme');
      }
    }

    // Employment status validation
    if (formData.currentlyEmployed) {
      status.employment = 'not-eligible';
      issues.push('Employment status: Currently employed candidates are not eligible for PM Internship Scheme');
    } else {
      status.employment = 'eligible';
    }

    // Family government employee validation
    if (formData.govtEmployee) {
      status.family = 'not-eligible';
      issues.push('Family member employment: No family member (self, parents, spouse) can be a permanent or regular government employee');
    } else {
      status.family = 'eligible';
    }

    // Previous participation validation - More comprehensive
    if (formData.pmInternshipPrevious || formData.pmSkillingPrevious || formData.natsNapsTraining) {
      status.participation = 'not-eligible';
      if (formData.pmInternshipPrevious) {
        issues.push('Previous participation: You have already participated in a PM-level internship scheme');
      }
      if (formData.pmSkillingPrevious) {
        issues.push('Previous participation: You have already participated in a PM-level skilling scheme');
      }
      if (formData.natsNapsTraining) {
        issues.push('Previous training: Candidates who completed NATS or NAPS apprenticeship/training are not eligible');
      }
    } else if (formData.otherGovtScheme) {
      status.participation = 'eligible';
      warnings.push('Previous participation: Participation in other government schemes may affect selection priority');
    } else {
      status.participation = 'eligible';
    }

    // Overall status calculation
    const allStatuses = [
      status.age, 
      status.education, 
      status.income, 
      status.participation, 
      status.employment, 
      status.citizenship, 
      status.family
    ];
    const eligibleCount = allStatuses.filter(s => s === 'eligible').length;
    const notEligibleCount = allStatuses.filter(s => s === 'not-eligible').length;
    const pendingCount = allStatuses.filter(s => s === 'pending').length;

    if (notEligibleCount > 0) {
      status.overall = 'not-eligible';
    } else if (pendingCount > 0) {
      status.overall = 'pending';
    } else if (eligibleCount === allStatuses.length) {
      status.overall = 'eligible';
    } else {
      status.overall = 'partial';
    }

    return status;
  };

  // Update form data and recalculate eligibility
  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await apiClient.post('/candidate/profile', formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile. Please try again later.');
    }
  };

  // Effect to recalculate eligibility when form data changes
  useEffect(() => {
    const newStatus = validateEligibility();
    setEligibilityStatus(newStatus);
  }, [formData]);

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]

      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill=> skill !== skillToRemove),
    });
  };

  const toggleCommonSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      removeSkill(skill);
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };
  //Cosmetic Use of the Save button, doesn't actually do anythign
  /* 
    const saveSection = (section: string) => {
    setSavedSections([...savedSections, section]);
    toast.success(`${section} section saved successfully!`);
  }; */
  //same thing with the below line
  //const isSectionSaved = (section: string) => savedSections.includes(section);
  

  const getEligibilityIcon = (status: string) => {
    switch (status) {
      case 'eligible':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'not-eligible':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getEligibilityColor = (status: string) => {
    console.log("Overall status:", eligibilityStatus.overall);
    switch (status) {
      case 'eligible':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'not-eligible':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'partial':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  
  //Submit Handling Function
  
  const handleSubmit = async () => {
  console.log("Submit button pressed");
  try {

    const backendKeys = Object.keys(initialCandidateData);
    const payload: Record<string, any> = {};
    backendKeys.forEach((key)=>{
      payload[key] = (formData as any)[key] ?? (initialCandidateData as any)[key];
    });
    const token = localStorage.getItem('token');
    if(!token){
      toast.error('Ya toh bro token nahi mil rha, ya phir toh ghatiya insaan login krke try krle submit');
      onNavigate('login');
      return;
    }
    const response = await apiClient.post('/candidate/data', payload);// everything else is defined in ApiClient.ts
    toast.success('Profile Data Bahutehi pyaar ke saath DB me jaa chuka h, kripya Schema ko dekhke Khushi ka Anubhav kre');
    console.log('Response:', response.data);
    onNavigate('candidate-dashboard');
  } 
  catch (err: any) {
    console.error('Error Submitting Candidate data:', err);
    if(err.response?.status === 401){
      toast.error('Session Expired. Please log in again.');
      onNavigate('login');
    }
    else{
      toast.error('Bhagwaan jaane kya beemari  h yrr 😭');
    }

    
  }


  // ... later you can add axios call etc.
  };

//variables storing if the below said information is filled or not
// add the validation for form filling eligibility here
const isPersonalComplete = !!formData.dateOfBirth && !!formData.category && !!formData.familyIncome;// we should just make a function out of this no?
const isEducationComplete = !!formData.highestDegree && !!formData.institution && !! formData.cgpa && !! formData.class12Marks;
// basically making a function and returning True false as per validation would give a little better flexibility 
const isSkillsComplete = true; //just a jugaad for now, need to add validation later
const isExperienceComplete = true; //again just a jugaad need to add validation later
const isPreferncesComplete = true; //again just a jugaad need to add validation later
const isDocsComplete = true; // do i need to type alladat again

const profileComplete = isPersonalComplete && isEducationComplete;

  // Validate required fields per section (starred fields)
  const validateSectionRequired = (section: string) => {
    const missing: string[] = [];
    const pushIfMissing = (key: keyof FormData, label: string) => {
      const v = (formData as any)[key];
      if (v === undefined || v === null || String(v).trim() === '') missing.push(label);
    };

    if (section === 'personal') {
      pushIfMissing('fullName', 'Full Name');
      pushIfMissing('dateOfBirth', 'Date of Birth');
      pushIfMissing('citizenship', 'Citizenship');
      pushIfMissing('gender', 'Gender');
      pushIfMissing('email', 'Email');
      pushIfMissing('phone', 'Mobile Number');
      pushIfMissing('currentAddress', 'Current Address');
      pushIfMissing('city', 'City');
      pushIfMissing('state', 'State');
      pushIfMissing('pincode', 'PIN Code');
    } else if (section === 'education') {
      pushIfMissing('highestDegree', 'Highest Degree');
      pushIfMissing('institution', 'Institution');
      pushIfMissing('cgpa', 'CGPA/Percentage');
      pushIfMissing('graduationYear', 'Graduation Year');
    } else if (section === 'preferences') {
      pushIfMissing('preferredDomain', 'Preferred Domain/Field');
      pushIfMissing('preferredLocation', 'Preferred Location');
    }

    if (missing.length > 0) {
      toast.error(`Please fill required fields: ${missing.join(', ')}`);
      return false;
    }
    return true;
  };








  if (loading) {
    return <div>Loading profile...</div>;
  }

  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Eligibility Status */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
              <p className="text-gray-600">
                Build a comprehensive profile to get matched with the best internship opportunities
              </p>
            </div>
            
            {/* Eligibility Status Card */}
            <Card className={`w-80 border-2 ${getEligibilityColor(eligibilityStatus.overall)}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" />
                  PM Internship Eligibility Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Status:</span>
                    <div className="flex items-center gap-1">
                      {getEligibilityIcon(eligibilityStatus.overall)}
                      <Badge variant={eligibilityStatus.overall === 'eligible' ? 'default' : 
                                   eligibilityStatus.overall === 'not-eligible' ? 'destructive' : 'secondary'}>
                        {eligibilityStatus.overall === 'eligible' ? 'Eligible' :
                         eligibilityStatus.overall === 'not-eligible' ? 'Not Eligible' :
                         eligibilityStatus.overall === 'partial' ? 'Partially Eligible' : 'Pending Verification'}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Individual criteria */}
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Age (21-24):</span>
                      {getEligibilityIcon(eligibilityStatus.age)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Citizenship:</span>
                      {getEligibilityIcon(eligibilityStatus.citizenship)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Education:</span>
                      {getEligibilityIcon(eligibilityStatus.education)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Income (≤₹8L):</span>
                      {getEligibilityIcon(eligibilityStatus.income)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Employment Status:</span>
                      {getEligibilityIcon(eligibilityStatus.employment)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Family Status:</span>
                      {getEligibilityIcon(eligibilityStatus.family)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Previous Participation:</span>
                      {getEligibilityIcon(eligibilityStatus.participation)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Eligibility Issues and Warnings */}
          {(eligibilityStatus.issues.length > 0 || eligibilityStatus.warnings.length > 0) && (
            <div className="space-y-4 mb-6">
              {eligibilityStatus.issues.length > 0 && (
                <Alert className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <div className="font-medium mb-2">Eligibility Issues Found:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {eligibilityStatus.issues.map((issue, index) => (
                        <li key={index} className="text-sm">{issue}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {eligibilityStatus.warnings.length > 0 && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <div className="font-medium mb-2">Important Considerations:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {eligibilityStatus.warnings.map((warning, index) => (
                        <li key={index} className="text-sm">{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={(val: 'personal' | 'education' | 'experience' | 'skills' | 'preferences' | 'documents') => {
          setActiveTab(val);
          validateSectionRequired(val);//this can be used as a Send to backend function too
          window.scrollTo({top : 0, behavior: 'smooth'});
        }}
        className="space-y-6"
        >
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
            <TabsTrigger 
            value="personal" 
            className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:font-medium transition-colors duration-200
             bg-gray-100 text-gray-700 hover:bg-gray-200"
             >
              Personal Details
              </TabsTrigger>
            <TabsTrigger value="education" className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:font-medium transition-colors duration-200
             bg-gray-100 text-gray-700 hover:bg-gray-200"
             >
              Education
            </TabsTrigger>
            <TabsTrigger 
            value="experience" 
            className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:font-medium transition-colors duration-200
             bg-gray-100 text-gray-700 hover:bg-gray-200"
             >
              Experience
            </TabsTrigger>
            <TabsTrigger value="skills" 
            className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:font-medium transition-colors duration-200
             bg-gray-100 text-gray-700 hover:bg-gray-200"
             >
              Skills
            </TabsTrigger>
            <TabsTrigger value="preferences" 
            className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:font-medium transition-colors duration-200
             bg-gray-100 text-gray-700 hover:bg-gray-200"
             >
              Preferences
            </TabsTrigger>
            <TabsTrigger value="documents" 
            className="text-xs px-2 py-1 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:font-medium transition-colors duration-200
             bg-gray-100 text-gray-700 hover:bg-gray-200"
             >
              Documents
            </TabsTrigger>
          </TabsList>
          {/*I ain't explaining these changes just a lot of Fomatting details and Validation Changes,
          now we can add everythign to validate and update in the 
          validateSectionRequired function*/}

          {/* Personal & Demographic Information */}
          <TabsContent value="personal">
            <div className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                    {isPersonalComplete && <Check className="w-4 h-4 text-green-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (as per official documents) *</Label>
                    <Input id="fullName"
                           placeholder="Enter your complete name"
                           value={formData.fullName}
                           onChange={(e) => updateFormData('fullName', e.target.value)}
                           required
                           />{/* //Updating this field also in the form data */}
                  </div>{/* Full Name and Date of Birth */}
                  {/* this below in the input tag is the input format to actually store in the form data, we have to ensure each field takes input liek this */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input 
                        id="dateOfBirth" 
                        type="date" 
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                        className={eligibilityStatus.age === 'not-eligible' ? 'border-red-500' : ''}
                      />
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">Must be between 21-24 years for PM Internship Scheme</p>
                        {formData.dateOfBirth && getEligibilityIcon(eligibilityStatus.age)}
                      </div>
                      {formData.dateOfBirth && calculateAge(formData.dateOfBirth) !== null && (
                        <p className="text-xs text-gray-600">Current age: {calculateAge(formData.dateOfBirth)} years</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="citizenship">Citizenship *</Label>
                      <Select 
                        value={formData.citizenship} 
                        onValueChange={(value: string) => updateFormData('citizenship', value)}
                      >
                        <SelectTrigger className={eligibilityStatus.citizenship === 'not-eligible' ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select citizenship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="indian">Indian Citizen</SelectItem>
                          <SelectItem value="nri">NRI (Non-Resident Indian)</SelectItem>
                          <SelectItem value="foreign">Foreign National</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">Only Indian citizens are eligible</p>
                        {formData.citizenship && getEligibilityIcon(eligibilityStatus.citizenship)}
                      </div>
                    </div>
                  </div>{/* Citizenship selection */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select
                          value={formData.gender}
                          onValueChange={(value: string) => updateFormData('gender', value)}
                        >{/* Adding Handled For gender Change and add */}
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
                    </div> {/* Gender selection */}
                    <div className="space-y-2">
                      <Label htmlFor="currentlyEmployed">Employment Status *</Label>
                      <Select 
                        value={formData.currentlyEmployed ? 'employed' : 'unemployed'} 
                        onValueChange={(value: string) => updateFormData('currentlyEmployed', value === 'employed')}
                      >
                        <SelectTrigger className={eligibilityStatus.employment === 'not-eligible' ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unemployed">Not Currently Employed</SelectItem>
                          <SelectItem value="employed">Currently Employed</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">Must not be currently employed</p>
                        {getEligibilityIcon(eligibilityStatus.employment)}
                      </div>
                    </div> {/* Employment status */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email"
                             type="email" 
                             placeholder="your.email@example.com"
                             value={formData.email}
                             onChange={(e) => updateFormData('email', e.target.value)}
                             />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number *</Label>
                      <Input id="phone"
                             placeholder="+91 98765 43210"
                             value={formData.phone}
                             onChange={(e) => updateFormData('phone', e.target.value)}
                             />
                    </div>
                  </div> {/* Input fields for email and phone number */}

                  <div className="space-y-2">
                    <Label htmlFor="currentAddress">Current Address *</Label>
                    <Textarea id="currentAddress" 
                              placeholder="Enter your complete current address"
                              value={formData.currentAddress}
                              onChange={(e) => updateFormData('currentAddress', e.target.value)}
                              /> 
                  </div>{/* Textarea for multi-line address input */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input 
                          id="city" 
                          placeholder="Mumbai"
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)} 
                          />
                    </div>{/* City input */}
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select
                          value={formData.state}
                          onValueChange={(value: string) => updateFormData('state', value)}
                        >
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
                    </div>{/* State selection */}
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input id="pincode" placeholder="400001" value={formData.pincode} onChange={(e) => updateFormData('pincode', e.target.value)} />
                    </div>{/* PIN Code input */}
                  </div>{/* Grid for City, State, PIN Code */}
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
                    <Select value={formData.category} onValueChange={(value: string) => updateFormData('category', value)}>
                      <SelectTrigger className={eligibilityStatus.income === 'not-eligible' ? 'border-red-500' : ''}>
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
                    {formData.category === 'ews' && (
                      <p className="text-xs text-blue-600">EWS category requires family income verification below ₹8 Lakh per annum</p>
                    )}
                  </div>{/* Category selection */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                          id="pwd"
                          checked={formData.PwD}
                          onCheckedChange={(checked: boolean) => updateFormData('PwD', checked)}
                          />
                      <Label htmlFor="pwd">Person with Disability (PwD)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                          id="firstGeneration"
                          checked={formData.FGG}
                          onCheckedChange={(checked: boolean) => updateFormData('FGG', checked)}
                          />
                      <Label htmlFor="firstGeneration">First Generation Graduate</Label>
                    </div>
                  </div>{/* PwD and First Generation Graduate checkboxes */} 


                  <div className="space-y-2">
                    <Label htmlFor="disabilityType">If PwD, specify type of disability</Label>
                    <Input 
                    id="disabilityType" 
                    placeholder="e.g., Visual, Hearing, Physical, etc."
                    value={formData.PwdType}
                    onChange={(e) => updateFormData('PwdType', e.target.value)}
                    />
                  </div>{/* Disability type input */}
                </CardContent>
              </Card>

              {/* Family Background */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    Family Background *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherOccupation">Father's Occupation * </Label>
                      <Input 
                      id="fatherOccupation" 
                      placeholder="e.g., Farmer, Teacher, Business" 
                      value={formData.fatherOccupation}
                      onChange={(e) => updateFormData('fatherOccupation', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherOccupation">Mother's Occupation * </Label>
                      <Input 
                      id="motherOccupation" 
                      placeholder="e.g., Homemaker, Nurse, etc." 
                      value={formData.motherOccupation}
                      onChange={(e) => updateFormData('motherOccupation', e.target.value)}
                      />
                    </div>
                  </div>{/* Parents' Occupation inputs */}

                  <div className="space-y-2">
                    <Label htmlFor="familyIncome">Annual Family Income * </Label>
                    <Select 
                      value={formData.familyIncome} 
                      onValueChange={(value: string) => updateFormData('familyIncome', value)}
                    >
                      <SelectTrigger className={eligibilityStatus.income === 'not-eligible' ? 'border-red-500' : ''}>
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
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">Required for EWS category verification</p>
                      {formData.familyIncome && formData.category && getEligibilityIcon(eligibilityStatus.income)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="govtEmployee" checked={formData.govtEmployee} onCheckedChange={(checked: boolean) => updateFormData('govtEmployee', checked)} />
                    <Label htmlFor="govtEmployee">
                      Is there a government employee in your immediate family? *
                    </Label>
                  </div>{/* Checkbox for government employee in family */}

                  <div className="space-y-2">
                    <Label htmlFor="govtEmployeeDetails">If yes, provide details * </Label>
                    <Input 
                    id="govtEmployeeDetails" 
                    placeholder="e.g., Father - State Government Teacher" 
                    value={formData.govtEmployeeDetails}
                    onChange={(e) => updateFormData('govtEmployeeDetails', e.target.value)}
                    />
                  </div>{/* Government employee details input */}
                </CardContent>
              </Card>
              


              {/*This button is for Personal Section*/}
              <Button 
                onClick={() => {
                  console.log("Go to Education Section by clicking this");
                  setActiveTab('education');
                  window.scrollTo({ top: 0, behavior: 'smooth'});//scrolls to top when the tab changes SMoooooothly 
                }}
                className="w-full"
                disabled={eligibilityStatus.overall === 'not-eligible'}

                /* Anyways here are lyrics for SMooth Operator, jazziest song everrr, You might be tired reading all this!!
    
                Face to face, each classic case
                We shadow box and double cross
                Yet need the chase
                A license to love, insurance to hold
                Melts all your memories and change into gold
                His eyes are like angels but his heart is cold
                No need to ask
                He's a smooth operator
                Smooth operator
                Smooth operator
                Smooth operator
                Coast to coast, LA to Chicago, western male
                */

                //onClick={() => saveSection('personal')} 

              >
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
                  {isEducationComplete && <Check className="w-4 h-4 text-green-600" />} 
                  {/* this validation is for the check icon with the Title of the section */}
                  {/* {isSectionSaved('education') && <Check className="w-4 h-4 text-green-600" />} */}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="highestDegree">Highest Degree/Qualification *</Label>
                    <Select 
                      value={formData.highestDegree} 
                      onValueChange={(value: string) => updateFormData('highestDegree', value)}
                    >
                      <SelectTrigger className={eligibilityStatus.education === 'not-eligible' ? 'border-red-500' : ''}>
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
                    <div className="flex items-center gap-2">
                      {formData.highestDegree === 'phd' && (
                        <p className="text-xs text-gray-500">PhD holders are not eligible for this scheme</p>
                      )}
                      {eligibilityStatus.education === 'not-eligible' && getEligibilityIcon('not-eligible')}
                    </div>{/* Highest Degree selection */}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">University/Institution *</Label>
                    {/* <Input id="institution" placeholder="e.g., IIT Bombay, Delhi University" /> */}
                    {/* The Work in the above line was stupid, nothing is retained so we'll just take input properly */}
                    <Input 
                      id="institution" 
                      placeholder="e.g. IIT Bombay, Galgotias University" 
                      value={formData.institution}
                      onChange={(e) => updateFormData('institution', e.target.value)}
                      className={eligibilityStatus.academic === 'not-eligible' ? 'border-red-500' : ''} //this line just means it would make the border red if academic status is ineligible
                    />
                  </div>{/* Institution input */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Field of Study *</Label>
                  <Select
                      value={formData.studyField}
                      onValueChange={(value: string) => updateFormData('studyField', value)}
                    >
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
                  </Select>{/* Field of Study selection */}
                </div>{/* Field of Study selection */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization/Major</Label>
                    <Input 
                    id="specialization" 
                    placeholder="e.g., Computer Science & Engineering" 
                    value={formData.specialization}
                    onChange={(e) => updateFormData('specialization', e.target.value)}
                  />
                  </div>{/*Specialization Input*/}
                  <div className="space-y-2">
                    <Label htmlFor="year">Current Year/Status</Label>
                    <Select onValueChange={(value: string) => updateFormData('currYear', value)}>
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
                  </div>{/* Current Year Status*/}
                </div>
                {/* 
Miss/Mr Reviewer,

Check this out tho
https://open.spotify.com/playlist/37i9dQZF1E8KWGOkQ6Xhuz?si=fb8272c3fb314f85 

*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA/Percentage *</Label>
                    <Input 
                      id="cgpa" 
                      placeholder="8.5 CGPA or 85%" 
                      value={formData.cgpa}
                      onChange={(e) => updateFormData('cgpa', e.target.value)}
                      className={eligibilityStatus.academic === 'not-eligible' ? 'border-red-500' : ''}
                    />
                    <div className="flex items-center gap-2">

                      {formData.cgpa && Number(formData.cgpa)<=49 && (
                        <p className="text-xs text-gray-500">Minimum 50% marks required</p>
                      )}
                      {eligibilityStatus.academic === 'not-eligible' && getEligibilityIcon('not-eligible')}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Year of Completion/Expected Graduation *</Label>
                    <Input 
                    id="graduationYear" 
                    type="number" 
                    placeholder="2025" 
                    min="2020" 
                    max="2030" 
                    value={formData.graduationYear}
                    onChange={(e) => updateFormData('graduationYear', e.target.value)}
                    />
                  </div>{/* Graduation Year input */}
                </div>{/* CGPA and Graduation Year inputs */}

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Previous Education</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class12Board">Class 12th Board *</Label>
                      <Select
                        value={formData.class12Board}
                        onValueChange={(value: string) => updateFormData('class12Board', value)}
                      >
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
                    </div>{/* Class 12th Board selection */}
                    <div className="space-y-2">
                      <Label htmlFor="class12Marks">Class 12th Marks/Percentage *</Label>
                      <Input 
                        id="class12Marks" 
                        placeholder="92%" 
                        value={formData.class12Marks}
                        onChange={(e) => updateFormData('class12Marks', e.target.value)}
                        className={eligibilityStatus.academic === 'not-eligible' ? 'border-red-500' : ''}
                      />
                    </div>{/* Class 12th Marks input */}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="class12Stream">Class 12th Stream</Label>
                      <Select
                        value={formData.class12Stream}
                        onValueChange={(value: string) => updateFormData('class12Stream', value)}
                      >
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
                    </div>{/* Class 12th Stream selection */}
                    <div className="space-y-2">
                      <Label htmlFor="class12Year">Class 12th Year of Completion</Label>
                      <Input 
                      id="class12Year" 
                      type="number" 
                      placeholder="2022" 
                      min="2015" 
                      max="2025" 
                      value={formData.class12Year}
                      onChange={(e) => updateFormData('class12Year', e.target.value)}
                      />
                    </div>{/* Class 12th Year input */}
                  </div>
                </div>
                
                {/*This button is for Education Section*/}
                
                <Button 
                  onClick={() => {console.log("Change me around line 964 to add the navigate to NExt section maybe experience?")
                    setActiveTab('experience');
                    window.scrollTo({ top: 0, behavior: 'smooth'});//scrolls to top when the tab changes SMoooooothly againnnnn
                  }}

                  /* 
                  Anyways Here are rest of the lyrics for Smooth Operator, jazziest song everrr
                  Coast to coast, LA to Chicago, western male
                  Across the north and south, to Key Largo, love for sale
                  Smooth operator
                  Smooth operator
                  Smooth operator
                  Smooth operator
                  Smooth operator
                  Smooth operator
                  Smooth operator
                  Smooth operator
                  Smooth operator
                  Smooth operator
                  Smooth operator
                  */
                  //onClick={() => saveSection('education')} 
                  
                  className="w-full"
                  disabled={eligibilityStatus.overall === 'not-eligible'}
                >
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
                      Previous participation in PM-level schemes may affect eligibility.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pmInternshipPrevious" 
                        checked={formData.pmInternshipPrevious}
                        onCheckedChange={(checked: boolean | undefined) => updateFormData('pmInternshipPrevious', !!checked)}
                      />
                      <Label htmlFor="pmInternshipPrevious" className={formData.pmInternshipPrevious ? 'text-red-600' : ''}>
                        Have you previously participated in any PM-level internship scheme?
                      </Label>
                      {formData.pmInternshipPrevious && <XCircle className="w-4 h-4 text-red-600" />}
                    </div>{/* Pm Internship done? */}

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pmSkillingPrevious" 
                        checked={formData.pmSkillingPrevious}
                        onCheckedChange={(checked: boolean | undefined) => updateFormData('pmSkillingPrevious', !!checked)}
                      />
                      <Label htmlFor="pmSkillingPrevious" className={formData.pmSkillingPrevious ? 'text-red-600' : ''}>
                        Have you previously participated in any PM-level skilling scheme?
                      </Label>
                      {formData.pmSkillingPrevious && <XCircle className="w-4 h-4 text-red-600" />}
                    </div>{/* Pm Skilling done? */}

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="otherGovtScheme" 
                        checked={formData.otherGovtScheme}
                        onCheckedChange={(checked: boolean | undefined) => updateFormData('otherGovtScheme', !!checked)}
                      />
                      <Label htmlFor="otherGovtScheme" className={formData.otherGovtScheme ? 'text-yellow-600' : ''}>
                        Have you participated in any other government employment/training scheme?
                      </Label>
                      {formData.otherGovtScheme && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                    </div>{/* Pm Training done? */}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schemeDetails">If yes to any above, please provide details</Label>
                    <Textarea 
                      id="schemeDetails" 
                      placeholder="Name of scheme, year of participation, duration, outcome, etc."
                      rows={3}
                      value={formData.pmleveldetails}
                      onChange={(e)=> updateFormData('pmleveldetails', e.target.value)}
                    />
                  </div>{/* pm level Details */}
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">Previous participation status:</p>
                    {getEligibilityIcon(eligibilityStatus.participation)}
                  </div>
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Work Experience & Internships
                    {isExperienceComplete && <Check className="w-4 h-4 text-green-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company/Organization</Label>
                      <Input 
                      id="companyName" 
                      placeholder="TechFlow India Pvt. Ltd." 
                      value={formData.companyName}
                      onChange={(e)=> updateFormData('companyName', e.target.value)}
                      />
                    </div> {/* Company name */}

                    <div className="space-y-2">
                      <Label htmlFor="position">Position/Role</Label>
                      <Input 
                      id="position" 
                      placeholder="Software Development Intern" 
                      value={formData.position}
                      onChange={(e)=> updateFormData('position', e.target.value)}
                      />
                    </div>{/* Company Position */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Start Date */}
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input 
                        id="startDate" 
                        type="month" 
                        value={formData.startDate}
                        onChange={(e)=> updateFormData('startDate', e.target.value)}
                      />
                    </div>

                    {/* End Date + Checkbox in same column */}
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input 
                        id="endDate" 
                        type="month" 
                        value={formData.workHereNow ? new Date().toISOString().slice(0,7) : formData.endDate}
                        onChange={(e)=> updateFormData('endDate', e.target.value)}
                        disabled={formData.workHereNow} 
                        className={formData.workHereNow ? 'bg-gray-100 cursor-not-allowed' : ''} //disables end date if currently work is enabled
                      />

                      {/* Checkbox below End Date */}
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox 
                          id="currentWork"
                          checked={formData.workHereNow}
                          onCheckedChange={(checked: boolean | undefined) => updateFormData('workHereNow', !!checked)} 
                        />
                        <Label htmlFor="currentWork">I currently work here</Label>
                      </div>
                    </div>
                  </div>{/* Joining Duration Details */}


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

                  
                </CardContent>
              </Card>

              <Button 
                onClick={() => {
                    console.log("Change me on line 1206 to add the navigate to Next section maybe Skills?")
                    window.scrollTo({top:0, behavior: 'smooth'});
                    setActiveTab('skills')
                  }
                }
                // onClick={() => saveSection('experience')} 
                className="w-full"
                disabled={eligibilityStatus.overall === 'not-eligible'}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Experience Information
              </Button>
            </div>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Skills & Competencies
                  {isSkillsComplete && <Check className="w-4 h-4 text-green-600" />}
                  {/* again just the validation for the check sign with the title of the section */}

                  {/* {isSectionSaved('skills') && <Check className="w-4 h-4 text-green-600" />} */}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Skills */}
                <div>
                  <Label className="text-base font-medium">Your Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-500" 
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Add New Skill */}
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>

                {/* Common Skills */}
                <div>
                  <Label className="text-base font-medium">Quick Add Popular Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {commonSkills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant={formData.skills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleCommonSkill(skill)}
                      >
                        {skill}
                        {formData.skills.includes(skill) && <Check className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() =>{
                    window.scrollTo({top:0, behavior: 'smooth'});
                    setActiveTab('preferences');
                    console.log("This is a check for the Details of Skills Saved or not in array", formData.skills)}
                    } 
                  //onClick={() => saveSection('skills')} className="w-full"
                  >
                  <Save className="w-4 h-4 mr-2" />
                  Save Skills & Competencies
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Internship Preferences
                  {isPreferncesComplete && <Check className="w-4 h-4 text-green-600" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="preferredDomain">Preferred Domain/Field *</Label>
                  <Select
                    value={formData.preferredDomain}
                    onValueChange={(value: string) => updateFormData('preferredDomain', value)}
                    >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology & Software</SelectItem>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="marketing">Marketing & Digital Media</SelectItem>
                      <SelectItem value="design">Design & Creative</SelectItem>
                      <SelectItem value="data-science">Data Science & Analytics</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="telecommunication">Telecommunications</SelectItem>
                      <SelectItem value="media">Media & Entertainment</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="real estate">Real Estate & Construction</SelectItem>
                      <SelectItem value="fmcg">FMCG (Fast Moving Consumer Goods)</SelectItem>
                      <SelectItem value="energy">Energy & Utilities</SelectItem>
                      <SelectItem value="transportation">Transportation & Logistics</SelectItem>
                      <SelectItem value="agriculture">Agriculture & Food Processing</SelectItem>
                      <SelectItem value="textiles">Textiles & Apparel</SelectItem>
                      <SelectItem value="tourism">Tourism & Hospitality</SelectItem>
                      <SelectItem value="chemical">Chemical & Petrochemicals</SelectItem>
                      <SelectItem value="aerospace">Aerospace & Defence</SelectItem>
                      <SelectItem value="mining">Mining & Metals</SelectItem>
                      <SelectItem value="gov & public sector">Government & Public Sector</SelectItem>
                      <SelectItem value="ngo">NGO & Social Sector</SelectItem>
                      <SelectItem value="research">Research & Developement Sector</SelectItem>
                      <SelectItem value="startups">Startups & Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredLocation">Preferred Location *</Label>
                  <Select
                    value={formData.preferredLocation}
                    onValueChange={(value: string) => updateFormData('preferredLocation', value)}
                    >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi/NCR</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="kolkata">Kolkata</SelectItem>
                      <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                      <SelectItem value="remote">Remote/Work from Home</SelectItem>
                      <SelectItem value="anywhere">Open to any location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="internshipDuration">Preferred Duration</Label>
                  <Select
                  value={formData.preferredDuration}
                  onValueChange={(value: string) => updateFormData('preferredDuration', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="12-months">12 Months (PM Scheme Standard)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedStipend">Expected Monthly Stipend</Label>
                  <Select
                  value={formData.monthlyStipend}
                  onValueChange={(value: string) => updateFormData('monthlyStipend', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stipend range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                      <SelectItem value="10000-15000">₹10,000 - ₹15,000</SelectItem>
                      <SelectItem value="15000-25000">₹15,000 - ₹25,000</SelectItem>
                      <SelectItem value="25000-35000">₹25,000 - ₹35,000</SelectItem>
                      <SelectItem value="35000+">₹35,000+</SelectItem>
                      <SelectItem value="negotiable">Negotiable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => console.log("Change me on line 1392 to add the navigate to Next section maybe docs?")} 
                  // onClick={() => saveSection('preferences')} className="w-full"
                  >
                  <Save className="w-4 h-4 mr-2" />
                  Save Internship Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>{/* This one is completed with Handling */}

          {/* Documents */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Required Documents
                  {isDocsComplete && <Check className="w-4 h-4 text-green-600" />}
                  {/* again this is for the check sign only i(sagar) replaced the similar line for all the sections */}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Upload clear, legible copies of all required documents. All documents should be in PDF or image format (JPG, PNG).
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Aadhaar Card *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload Aadhaar Card</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Educational Certificates *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Upload degree/marksheets</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Category Certificate</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">SC/ST/OBC/EWS certificate</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Income Certificate</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Family income certificate</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Resume/CV *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Upload your latest resume</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Passport Size Photo *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Recent passport size photo</p>
                    </div>
                  </div>
                </div>
                <Button onClick={() => console.log("Change me on line 1470 to add the navigate to NExt section maybe experience?")}          
                /* <Button onClick={() => saveSection('documents')}*/
                 className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Documents
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>


        {/* Honestly i couldn't give 2 shi*s about this section, we'll deal with this later i am going to sleeeep1!!!! */}




        {/* Final Submission */}
        


        {profileComplete && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Profile Completion Status</h3>
                <div className="flex justify-center space-x-4">
                  <Badge variant={isPersonalComplete ? 'default' : 'secondary'}>
                    Personal Information {isPersonalComplete && <Check className="w-3 h-3 ml-1" />}
                  </Badge>
                  <Badge variant={isEducationComplete ? 'default' : 'secondary'}>
                    Education {isEducationComplete && <Check className="w-3 h-3 ml-1" />}
                  </Badge>
                </div>

                {eligibilityStatus.overall === 'eligible' ? (
                  /* 
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={async () => {
                      // Build payload consisting only of backend-required keys
                      const backendKeys = Object.keys(initialCandidateData);
                      const payload: Record<string, any> = {};
                      backendKeys.forEach((key) => {
                        // If the formData has the key use it, otherwise fallback to the initialCandidateData default
                        // @ts-ignore - dynamic keys
                        payload[key] = (formData as any)[key] ?? (initialCandidateData as any)[key];
                      });

                      try {
                        await axios.post('http://localhost:5000/api/candidate/data', payload);
                        toast.success('Profile submitted successfully! You are eligible for PM Internship Scheme.');
                        onNavigate('candidate-dashboard');
                      } 
                      catch (err) {
                        console.error('Error submitting candidate data', err);
                        toast.error('Error submitting data. Please try again later.');
                      }
                    }}
                  > 
                    */
                  //  <Button 
                  //     size="lg"
                  //     className="bg-green-600 hover:bg-green-700 text-white"
                  //     onClick={console.log("Submit Buttom Clicked")}
                  //   >
                  <Button 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleSubmit}

                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Profile & Apply for Internships
                  </Button>
                ):(
                  <div className="space-y-2">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      disabled
                    >
                    <XCircle className="w-4 h-4 mr-2" />
                      Profile Incomplete or Eligibility Issues
                    </Button>
                    <p className="text-sm text-gray-600">
                      Please address the eligibility issues shown above before submitting your profile.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}