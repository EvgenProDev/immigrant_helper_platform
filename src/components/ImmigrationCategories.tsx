import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Users, 
  Shield, 
  Plane,
  ArrowRight 
} from "lucide-react";

const categories = [
  {
    id: "express-entry",
    title: "Express Entry",
    description: "Federal skilled workers, Canadian Experience Class, and Federal Skilled Trades programs",
    icon: Briefcase,
    color: "bg-canadian-red",
    topics: ["CRS Score", "NOC Codes", "Language Requirements", "Work Experience"]
  },
  {
    id: "family-sponsorship",
    title: "Family Sponsorship",
    description: "Sponsor your spouse, children, parents, grandparents, and other eligible relatives",
    icon: Heart,
    color: "bg-canadian-blue",
    topics: ["Spouse Sponsorship", "Parent/Grandparent Program", "Dependent Children", "Financial Requirements"]
  },
  {
    id: "student-visas",
    title: "Study Permits",
    description: "Study in Canada and explore pathways to permanent residence",
    icon: GraduationCap,
    color: "bg-accent",
    topics: ["DLI Requirements", "Study Permits", "Work While Studying", "Post-Graduate Work Permit"]
  },
  {
    id: "provincial-programs",
    title: "Provincial Nominee Programs",
    description: "Province-specific immigration programs tailored to local economic needs",
    icon: Users,
    color: "bg-muted-foreground",
    topics: ["Ontario PNP", "British Columbia PNP", "Alberta PNP", "Quebec Immigration"]
  },
  {
    id: "refugees",
    title: "Refugee Protection",
    description: "Protection for refugees and persons in need of protection",
    icon: Shield,
    color: "bg-secondary-foreground",
    topics: ["Government-Assisted Refugees", "Privately Sponsored Refugees", "Protected Persons", "Asylum Claims"]
  },
  {
    id: "temporary-residence",
    title: "Temporary Residence",
    description: "Visitor visas, work permits, and temporary resident permits",
    icon: Plane,
    color: "bg-canadian-red",
    topics: ["Visitor Visas", "Work Permits", "Temporary Resident Permits", "Extensions"]
  }
];

interface ImmigrationCategoriesProps {
  onCategorySelect: (category: string) => void;
}

export const ImmigrationCategories = ({ onCategorySelect }: ImmigrationCategoriesProps) => {
  return (
    <section id="resources" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Immigration Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore different pathways to Canada. Click on any category to get specific information 
            and start a conversation with our AI assistant.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-border/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${category.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {category.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-canadian-red rounded-full"></div>
                        {topic}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                    onClick={() => onCategorySelect(category.title)}
                  >
                    Ask Questions
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};