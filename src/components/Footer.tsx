import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <MapPin className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold">CanadaConnect</h3>
                <p className="text-sm text-muted-foreground">Immigration Assistant</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted companion for navigating Canadian immigration. 
              Providing accurate, up-to-date information to help newcomers succeed.
            </p>
          </div>

          {/* Immigration Categories */}
          <div className="space-y-4">
            <h4 className="font-bold">Immigration Programs</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">Express Entry</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">Family Sponsorship</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">Study Permits</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">Provincial Nominee Programs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">Work Permits</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-bold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">AI Chat Assistant</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">Immigration Forms</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">Processing Times</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">Fee Calculator</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-canadian-red transition-colors">Document Checklist</a></li>
            </ul>
          </div>

          {/* Official Links */}
          <div className="space-y-4">
            <h4 className="font-bold">Official Sources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-canadian-red transition-colors flex items-center gap-1"
                >
                  IRCC Canada <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-canadian-red transition-colors flex items-center gap-1"
                >
                  Immigrate to Canada <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-canadian-red transition-colors flex items-center gap-1"
                >
                  Application Status <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 CanadaConnect. Information sourced from official Government of Canada websites.
            </div>
            <div className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This platform provides general information only. 
              For legal advice, consult qualified immigration professionals.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};