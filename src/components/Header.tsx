import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  MessageCircle, 
  FileText, 
  Database,
  MapPin,
  LogOut,
  User,
  Users
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully"
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <MapPin className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">CanadaConnect</h1>
              <p className="text-xs text-muted-foreground">Immigration Assistant</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('resources')}
              className="flex items-center gap-2 text-foreground hover:text-canadian-red transition-colors"
            >
              <FileText size={16} />
              Resources
            </button>
            <button 
              onClick={() => scrollToSection('chatbot')}
              className="flex items-center gap-2 text-foreground hover:text-canadian-red transition-colors"
            >
              <MessageCircle size={16} />
              AI Assistant
            </button>
            <button 
              onClick={() => scrollToSection('knowledge-base')}
              className="flex items-center gap-2 text-foreground hover:text-canadian-red transition-colors"
            >
              <Database size={16} />
              Knowledge Base
            </button>
            <button 
              onClick={() => navigate('/forum')}
              className="flex items-center gap-2 text-foreground hover:text-canadian-red transition-colors"
            >
              <Users size={16} />
              Community Forum
            </button>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <User size={16} />
                  <span>Welcome!</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} className="mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
                <Button 
                  variant="canadian" 
                  onClick={() => scrollToSection('chatbot')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg">
            <nav className="flex flex-col p-4 space-y-4">
              <button 
                onClick={() => scrollToSection('resources')}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <FileText size={20} />
                <span>Immigration Resources</span>
              </button>
              <button 
                onClick={() => scrollToSection('chatbot')}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <MessageCircle size={20} />
                <span>AI Assistant</span>
              </button>
              <button 
                onClick={() => scrollToSection('knowledge-base')}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <Database size={20} />
                <span>Knowledge Base</span>
              </button>
              <button 
                onClick={() => {
                  navigate('/forum');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <Users size={20} />
                <span>Community Forum</span>
              </button>
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="canadian" 
                    className="w-full"
                    onClick={() => scrollToSection('chatbot')}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};