import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Building2, Users, Target, TrendingUp, Award, CheckCircle, ArrowRight, Star } from 'lucide-react';

interface ForRecruitersPageProps {
  onNavigate: (page: string) => void;
}

export function ForRecruitersPage({ onNavigate }: ForRecruitersPageProps) {
  const benefits = [
    {
      icon: Users,
      title: "Access Diverse Talent",
      description: "Connect with candidates from SC, ST, OBC, EWS, PwD communities and rural backgrounds prioritized under PM Internship Scheme."
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered candidate matching based on skills, diversity metrics, and PM scheme requirements."
    },
    {
      icon: TrendingUp,
      title: "Government Support",
      description: "Part of the official PM Internship Scheme with government backing and structured 12-month programs."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Pre-vetted candidates with verified educational backgrounds and diversity certifications."
    }
  ];

  const features = [
    "Post unlimited internship opportunities",
    "Advanced diversity analytics dashboard",
    "PM Scheme compliance reporting",
    "Direct candidate communication tools",
    "Structured 12-month program support",
    "Government scheme integration"
  ];

  const stats = [
    { label: "Active Students", value: "50,000+", subtext: "From 500+ colleges" },
    { label: "Diverse Candidates", value: "75%", subtext: "From priority communities" },
    { label: "Successful Placements", value: "12,000+", subtext: "In last 6 months" },
    { label: "Partner Companies", value: "2,500+", subtext: "Across 24+ sectors" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Award className="mr-2 h-4 w-4" />
            Official PM Internship Scheme Partner
          </Badge>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Hire India's Most <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Diverse Talent Pool
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with qualified interns from underrepresented communities through 
            the Government of India's PM Internship Scheme. Build an inclusive workforce 
            while fulfilling diversity goals.
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Button 
              size="lg" 
              className="h-14 px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              onClick={() => onNavigate('post-internship')}
            >
              Post Your First Internship
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8"
              onClick={() => onNavigate('recruiter-dashboard')}
            >
              Explore Dashboard
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
              Why Choose InternLink for Hiring?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access India's most diverse and qualified intern talent pool through 
              our PM Scheme-aligned platform.
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

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Platform Features
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to Hire Diverse Talent
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform is specifically designed to support the PM Internship Scheme's 
                diversity and inclusion objectives while providing you with powerful hiring tools.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="mt-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={() => onNavigate('signup')}
              >
                Start Hiring Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative">
              <Card className="border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-5 w-5" />
                    Recruiter Dashboard Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Total Applications</span>
                      <span className="font-semibold text-primary">2,847</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Diverse Candidates</span>
                      <span className="font-semibold text-accent">75%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Active Internships</span>
                      <span className="font-semibold text-primary">12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Response Rate</span>
                      <span className="font-semibold text-accent">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Diverse Team?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of companies already partnering with the PM Internship Scheme 
            to create inclusive opportunities.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              className="h-14 px-8 bg-white text-primary hover:bg-gray-50"
              onClick={() => onNavigate('signup')}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 border-white text-white hover:bg-white/10"
              onClick={() => onNavigate('about')}
            >
              Learn More
            </Button>
          </div>
          
          <div className="flex justify-center items-center mt-8 space-x-2 text-white/80">
            <Star className="h-5 w-5 fill-current" />
            <span className="text-sm">Trusted by 2,500+ companies • Government certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}