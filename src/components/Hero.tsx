import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, Users } from "lucide-react";
import heroImage from "@/assets/hero-immigration.jpg";

export const Hero = () => {
  const scrollToChatbot = () => {
    document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToResources = () => {
    document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Canadian immigration assistance platform"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <span className="w-2 h-2 bg-canadian-red rounded-full animate-pulse"></span>
            <span className="text-white text-sm">Trusted by 50,000+ newcomers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to
            <span className="bg-gradient-to-r from-canadian-red to-white bg-clip-text text-transparent block">
              Your New Home
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Navigate Canadian immigration with confidence. Get instant answers, up-to-date regulations, 
            and personalized guidance for your journey to Canada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToChatbot}
              className="min-w-[200px]"
            >
              <MessageCircle className="mr-2" />
              Start Chat Assistant
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToResources}
              className="min-w-[200px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              <FileText className="mr-2" />
              Browse Resources
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80">Newcomers Helped</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">AI Assistance</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80">Free to Use</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};