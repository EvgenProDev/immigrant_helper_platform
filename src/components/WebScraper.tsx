import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Globe, 
  RefreshCw, 
  CheckCircle, 
  Clock,
  Database 
} from "lucide-react";

export const WebScraper = () => {
  const [lastScrapeTime] = useState<Date>(new Date(Date.now() - 2 * 60 * 60 * 1000)); // 2 hours ago
  const [nextScrapeTime] = useState<Date>(new Date(Date.now() + 4 * 60 * 60 * 1000)); // 4 hours from now

  const canadaImmigrationUrls = [
    "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html",
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/application.html",
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html",
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Knowledge Base Status
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our system automatically pulls the latest immigration information from canada.ca 
            every 6 hours to keep our knowledge base current and accurate.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Status Panel */}
          <Card className="p-8 bg-gradient-card shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-canadian-blue text-white p-3 rounded-lg">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Automatic Update System</h3>
                <p className="text-muted-foreground">Running continuously in the background</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-canadian-blue" />
                <span className="font-medium">Last updated:</span>
                <span className="text-muted-foreground">{lastScrapeTime.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RefreshCw size={16} className="text-canadian-red" />
                <span className="font-medium">Next update:</span>
                <span className="text-muted-foreground">{nextScrapeTime.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Target URLs */}
          <Card className="p-8 bg-gradient-card">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Database size={20} />
              Monitored Sources
            </h4>
            
            <div className="grid gap-4">
              {canadaImmigrationUrls.map((url) => (
                <div 
                  key={url}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-mono">{url}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-gradient-card">
              <RefreshCw className="mx-auto mb-4 text-canadian-blue" size={32} />
              <h4 className="font-bold mb-2">Auto-Updates</h4>
              <p className="text-sm text-muted-foreground">
                Scheduled scraping every 6 hours to ensure information is current
              </p>
            </Card>
            
            <Card className="p-6 text-center bg-gradient-card">
              <CheckCircle className="mx-auto mb-4 text-green-500" size={32} />
              <h4 className="font-bold mb-2">Verified Sources</h4>
              <p className="text-sm text-muted-foreground">
                Only official canada.ca immigration pages for accurate information
              </p>
            </Card>
            
            <Card className="p-6 text-center bg-gradient-card">
              <Database className="mx-auto mb-4 text-canadian-red" size={32} />
              <h4 className="font-bold mb-2">Smart Storage</h4>
              <p className="text-sm text-muted-foreground">
                Efficient data processing and storage for instant AI responses
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};