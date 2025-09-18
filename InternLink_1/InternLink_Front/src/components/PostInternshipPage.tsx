import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { X, Plus, Save, Eye, Award, Users, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PostInternshipPageProps {
  onNavigate: (page: string) => void;
}

export function PostInternshipPage({ onNavigate }: PostInternshipPageProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    title: '',
    sector: '',
    location: '',
    description: '',
    requirements: '',
    stipend: '',
    skills: [] as string[],
    requiredStreams: [] as string[],
    diversityTargets: [] as string[],
    preferFirstTimeInterns: false
  });

  const [newSkill, setNewSkill] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  // 24 sectors as per PM Internship Scheme
  const sectors = [
    'Information Technology',
    'Banking & Financial Services',
    'Healthcare & Pharmaceuticals',
    'Manufacturing & Engineering',
    'Telecommunications',
    'E-commerce & Retail',
    'Media & Entertainment',
    'Education & EdTech',
    'Consulting & Professional Services',
    'Automotive',
    'Real Estate & Construction',
    'FMCG (Fast Moving Consumer Goods)',
    'Energy & Utilities',
    'Transportation & Logistics',
    'Agriculture & Food Processing',
    'Textiles & Apparel',
    'Tourism & Hospitality',
    'Chemical & Petrochemicals',
    'Aerospace & Defense',
    'Mining & Metals',
    'Government & Public Sector',
    'NGO & Social Sector',
    'Research & Development',
    'Startups & Innovation'
  ];

  const educationalStreams = [
    'Engineering (All Branches)',
    'Computer Science & IT',
    'Commerce & Business Studies',
    'Management (MBA/BBA)',
    'Arts & Humanities',
    'Science (Physics, Chemistry, Biology)',
    'Economics',
    'Law',
    'Medicine & Healthcare',
    'Pharmacy',
    'Architecture',
    'Agriculture',
    'Social Sciences',
    'Journalism & Mass Communication',
    'Design (UI/UX, Graphic, Fashion)',
    'Other'
  ];

  const diversityTargets = [
    'SC (Scheduled Caste)',
    'ST (Scheduled Tribe)', 
    'OBC (Other Backward Classes)',
    'EWS (Economically Weaker Section)',
    'PwD (Person with Disability)',
    'Women candidates',
    'First-generation graduates',
    'Rural background candidates',
    'Candidates from Tier-2/Tier-3 cities'
  ];

  const suggestedTechnicalSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Git',
    'Machine Learning', 'Data Analysis', 'Excel', 'PowerBI', 'Tableau',
    'Figma', 'Adobe Creative Suite', 'AutoCAD', 'MATLAB'
  ];

  const suggestedSoftSkills = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork',
    'Project Management', 'Time Management', 'Critical Thinking',
    'Adaptability', 'Public Speaking', 'Analytical Thinking'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ 
        ...prev, 
        skills: [...prev.skills, skill] 
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleArrayChange = (field: 'diversityTargets' | 'requiredStreams', option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], option]
        : prev[field].filter(item => item !== option)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.title || !formData.sector || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.requiredStreams.length === 0) {
      toast.error('Please select at least one educational stream');
      return;
    }

    toast.success('PM Internship Scheme opportunity posted successfully!');
    onNavigate('my-internships');
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };

  if (isPreview) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PM Internship Preview</h1>
            <p className="text-gray-600">Preview your PM Internship Scheme opportunity</p>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => setIsPreview(false)}>
              <X className="mr-2 h-4 w-4" />
              Back to Edit
            </Button>
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-accent">
              <Save className="mr-2 h-4 w-4" />
              Publish PM Internship
            </Button>
          </div>
        </div>

        <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-r from-blue-50 to-teal-50">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{formData.title}</h2>
                    <Badge className="bg-primary text-white">PM Scheme</Badge>
                  </div>
                  <p className="text-lg text-gray-600">{formData.companyName}</p>
                  <p className="text-gray-600">{formData.sector} • {formData.location}</p>
                </div>
                <Award className="w-8 h-8 text-primary" />
              </div>

              <Alert>
                <Award className="h-4 w-4" />
                <AlertDescription>
                  This is a PM Internship Scheme opportunity with 12-month duration and government support for diversity promotion.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-lg font-semibold mb-3">Project Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{formData.description}</p>
              </div>

              {formData.requirements && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{formData.requirements}</p>
                </div>
              )}

              {formData.requiredStreams.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Required Educational Streams</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.requiredStreams.map((stream, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1 border-primary text-primary">
                        {stream}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formData.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formData.diversityTargets.length > 0 && (
                <div className="p-4 bg-accent/10 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Diversity & Inclusion Targets
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.diversityTargets.map((target, index) => (
                      <Badge key={index} className="bg-accent text-white px-3 py-1">
                        {target}
                      </Badge>
                    ))}
                  </div>
                  {formData.preferFirstTimeInterns && (
                    <p className="mt-2 text-sm text-accent-foreground">
                      ⭐ Priority given to first-time interns to promote wider participation
                    </p>
                  )}
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <h4 className="font-semibold text-gray-900">Duration</h4>
                  <p className="text-gray-600">12 months (PM Scheme Standard)</p>
                </div>
                {formData.stipend && (
                  <div>
                    <h4 className="font-semibold text-gray-900">Stipend</h4>
                    <p className="text-gray-600">{formData.stipend}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">Scheme</h4>
                  <p className="text-primary font-medium">PM Internship Programme</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            Post PM Internship Opportunity
          </h1>
          <p className="text-gray-600 mt-1">Create a 12-month internship under the Prime Minister's Internship Scheme.</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={() => setIsPreview(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>

      {/* PM Scheme Information */}
      <Alert className="mb-6">
        <Award className="h-4 w-4" />
        <AlertDescription>
          <strong>PM Internship Scheme:</strong> All internships are 12 months in duration and focus on promoting diversity 
          and providing opportunities to first-time interns. Your posting will be prioritized for candidates from 
          underrepresented backgrounds.
        </AlertDescription>
      </Alert>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>PM Internship Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company & Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company & Position Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="e.g. TechFlow India Pvt. Ltd."
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Sector *</Label>
                  <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Internship Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Software Development Intern"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g. Mumbai, Maharashtra or Remote"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">12 months (Fixed as per PM Scheme)</p>
                    <p className="text-xs text-muted-foreground">All PM Internship Scheme opportunities are standardized to 12 months</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stipend">Stipend *</Label>
                  <Input
                    id="stipend"
                    placeholder="e.g. ₹25,000/month"
                    value={formData.stipend}
                    onChange={(e) => handleInputChange('stipend', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Description</h3>
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the internship project, learning objectives, responsibilities, and expected outcomes. Be specific about what the intern will work on and learn..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="requirements">Additional Requirements & Qualifications</Label>
                <Textarea
                  id="requirements"
                  placeholder="List any specific qualifications, prior experience, or additional requirements..."
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                />
              </div>
            </div>

            {/* Required Educational Streams - Mandatory */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Required Educational Streams *</h3>
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Select the educational backgrounds that are suitable for this internship. This helps in accurate candidate matching.
                </AlertDescription>
              </Alert>
              <div className="grid md:grid-cols-2 gap-4">
                {educationalStreams.map((stream) => (
                  <div key={stream} className="flex items-center space-x-2">
                    <Checkbox
                      id={stream}
                      checked={formData.requiredStreams.includes(stream)}
                      onCheckedChange={(checked) => handleArrayChange('requiredStreams', stream, checked as boolean)}
                    />
                    <Label htmlFor={stream} className="text-sm">
                      {stream}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.requiredStreams.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected streams:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.requiredStreams.map((stream) => (
                      <Badge key={stream} variant="outline" className="px-3 py-1 border-primary text-primary">
                        {stream}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Required Skills (Technical & Soft Skills)</h3>
              
              {/* Add Custom Skill */}
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Add a custom skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
                />
                <Button type="button" onClick={() => addSkill(newSkill)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Technical Skills */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Technical Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTechnicalSkills.map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skill)}
                      disabled={formData.skills.includes(skill)}
                      className="text-xs"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Soft Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSoftSkills.map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skill)}
                      disabled={formData.skills.includes(skill)}
                      className="text-xs"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Selected Skills */}
              {formData.skills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Diversity & Inclusion Targets */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Diversity & Inclusion Targets
              </h3>
              <Alert className="mb-4">
                <Users className="h-4 w-4" />
                <AlertDescription>
                  <strong>Highly Recommended:</strong> Select diversity targets to meet your company's inclusion goals and support 
                  the PM Scheme's objective of promoting equal opportunities. This helps prioritize underrepresented candidates.
                </AlertDescription>
              </Alert>
              <div className="grid md:grid-cols-2 gap-4">
                {diversityTargets.map((target) => (
                  <div key={target} className="flex items-center space-x-2">
                    <Checkbox
                      id={target}
                      checked={formData.diversityTargets.includes(target)}
                      onCheckedChange={(checked) => handleArrayChange('diversityTargets', target, checked as boolean)}
                    />
                    <Label htmlFor={target} className="text-sm">
                      {target}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.diversityTargets.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected diversity targets:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.diversityTargets.map((target) => (
                      <Badge key={target} className="bg-accent text-white px-3 py-1">
                        {target}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preference for First-Time Interns */}
            <div>
              <h3 className="text-lg font-semibold mb-4">First-Time Intern Preference</h3>
              <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                <Checkbox
                  id="preferFirstTime"
                  checked={formData.preferFirstTimeInterns}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, preferFirstTimeInterns: checked as boolean }))
                  }
                />
                <div>
                  <Label htmlFor="preferFirstTime" className="text-sm font-medium">
                    Prefer candidates who haven't participated in PM Scheme before
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    This helps distribute opportunities to as many new candidates as possible, aligning with PM Scheme objectives.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-8 border-t">
              <Button type="submit" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Award className="mr-2 h-4 w-4" />
                Publish PM Internship
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsPreview(true)}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button type="button" variant="ghost" onClick={() => onNavigate('recruiter-dashboard')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}