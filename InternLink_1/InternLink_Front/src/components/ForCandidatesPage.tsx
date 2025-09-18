import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, MapPin, Users, Award, TrendingUp, CheckCircle, ArrowRight, Star, Building } from 'lucide-react';

interface ForCandidatesPageProps {
  onNavigate: (page: string) => void;
}

export function ForCandidatesPage({ onNavigate }: ForCandidatesPageProps) {
  const benefits = [
    {
      icon: Award,
      title: "Priority for Diverse Backgrounds",
      description: "Special focus on SC, ST, OBC, EWS, PwD candidates, rural students, and first-generation college graduates."
    },
    {
      icon: Building,
      title: "Top Companies",
      description: "Access to internships with leading organizations across 24+ sectors committed to diversity and inclusion."
    },
    {
      icon: TrendingUp,
      title: "Skill Development",
      description: "12-month structured programs with mentorship, training, and industry-relevant skill building."
    },
    {
      icon: MapPin,
      title: "Direct to Employment",
      description: "Clear pathway from internship to full-time employment with performance-based conversion opportunities."
    }
  ];

  const features = [
    "AI-powered internship matching",
    "Diversity-focused opportunities",
    "Skill development tracking",
    "Mentor support system",
    "Career counseling sessions",
    "Industry certification programs"
  ];

  const stats = [
    { label: "Available Internships", value: "15,000+", subtext: "Across India" },
    { label: "Success Rate", value: "85%", subtext: "Internship completion" },
    { label: "Conversion Rate", value: "70%", subtext: "To full-time roles" },
    { label: "Average Stipend", value: "₹15,000", subtext: "Per month" }
  ];

  const categories = [
    "General", "SC (Scheduled Caste)", "ST (Scheduled Tribe)", 
    "OBC (Other Backward Class)", "EWS (Economically Weaker Section)", 
    "PwD (Person with Disability)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Award className="mr-2 h-4 w-4" />
            PM Internship Scheme - Government of India
          </Badge>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Your Gateway to <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dream Internships
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students from diverse backgrounds finding quality internships 
            through India's largest diversity-focused internship program. Special opportunities 
            for underrepresented communities.
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Button 
              size="lg" 
              className="h-14 px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              onClick={() => onNavigate('browse-internships')}
            >
              Explore Internships
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8"
              onClick={() => onNavigate('candidate-dashboard')}
            >
              View Dashboard
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Students Choose InternLink
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed specifically for the PM Internship Scheme with focus on 
              diversity, inclusion, and career development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Diversity Focus Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Inclusive Opportunities
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Special Focus on Diversity & Inclusion
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The PM Internship Scheme prioritizes candidates from underrepresented 
              communities to create equal opportunities for all.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Priority Categories
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {categories.map((category, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg shadow-sm border">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Student Dashboard Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Profile Match Score</span>
                      <span className="font-semibold text-primary">92%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Recommended Internships</span>
                      <span className="font-semibold text-accent">24</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Applications Sent</span>
                      <span className="font-semibold text-primary">8</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Interview Calls</span>
                      <span className="font-semibold text-accent">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real students, real success through the PM Internship Scheme
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Singh",
                category: "SC Category",
                role: "Software Developer Intern → Full-time SDE",
                company: "Tech Mahindra",
                quote: "The PM scheme gave me the opportunity I never thought possible. Now I'm a full-time developer!"
              },
              {
                name: "Rajesh Kumar",
                category: "Rural Background",
                role: "Data Analyst Intern → Business Analyst",
                company: "Wipro",
                quote: "From a small village to working at Wipro - InternLink made my dreams come true."
              },
              {
                name: "Meera Patel",
                category: "First-generation Graduate",
                role: "Marketing Intern → Marketing Manager",
                company: "Flipkart",
                quote: "The mentorship and support I received was incredible. Now I'm leading a team at Flipkart!"
              }
            ].map((story, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge className="mb-2 bg-primary/10 text-primary">
                      {story.category}
                    </Badge>
                    <h3 className="font-bold text-lg text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.role}</p>
                    <p className="text-sm font-medium text-primary">{story.company}</p>
                  </div>
                  <p className="text-gray-600 italic">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Internship Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who have already found their dream internships 
            through the PM Internship Scheme. Your future starts here.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              className="h-14 px-8 bg-white text-primary hover:bg-gray-50"
              onClick={() => onNavigate('signup')}
            >
              Create Your Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 border-white text-white hover:bg-white/10"
              onClick={() => onNavigate('browse-internships')}
            >
              Browse Internships
            </Button>
          </div>
          
          <div className="flex justify-center items-center mt-8 space-x-2 text-white/80">
            <Star className="h-5 w-5 fill-current" />
            <span className="text-sm">15,000+ successful placements • Government certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}