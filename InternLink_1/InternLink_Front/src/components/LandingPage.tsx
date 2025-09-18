import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Users, Target, FileText, ArrowRight, Star, Building2 } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Target,
      title: "AI Matching",
      description: "Our smart algorithm matches candidates with the perfect internship opportunities based on skills, preferences, and company culture."
    },
    {
      icon: Users,
      title: "Diversity Hiring",
      description: "Promote inclusive hiring practices with built-in diversity insights and bias-free candidate recommendations."
    },
    {
      icon: FileText,
      title: "Easy Applications",
      description: "Streamlined application process for candidates and simplified review workflows for recruiters."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "500+", label: "Partner Companies" },
    { number: "95%", label: "Match Success Rate" },
    { number: "2.5M+", label: "Applications Processed" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find the right interns.
            <br />
            <span className="text-primary">Find the right opportunities.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            InternLink connects ambitious students with forward-thinking companies through 
            AI-powered matching, making internship discovery seamless and effective for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg"
              onClick={() => onNavigate('post-internship')}
            >
              Post an Internship
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-2 border-accent text-accent hover:bg-accent hover:text-white"
              onClick={() => onNavigate('browse-internships')}
            >
              Apply as Candidate
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose InternLink?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most advanced platform to connect talent with opportunity, 
              powered by cutting-edge technology and human insight.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Students and Companies
            </h2>
            <p className="text-xl text-gray-600">
              See what our community has to say about their InternLink experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "InternLink helped me find the perfect internship at a tech startup. 
                  The AI matching was spot-on, and I felt like the opportunities were 
                  truly tailored to my interests and skills."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">PS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Priya Sharma</p>
                    <p className="text-gray-500 text-sm">Computer Science Student, IIT Delhi</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "As a hiring manager, InternLink has transformed our recruitment process. 
                  We now get high-quality candidates who are genuinely interested in our 
                  company culture and mission. It's a game-changer."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Rajesh Gupta</p>
                    <p className="text-gray-500 text-sm">HR Director, TechFlow India Pvt. Ltd.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of students and companies already using InternLink 
            to build their future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-gray-50"
              onClick={() => onNavigate('signup')}
            >
              Join as Student
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent"
              onClick={() => onNavigate('signup')}
            >
              Join as Recruiter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}