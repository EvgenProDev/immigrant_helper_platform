import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  Bot, 
  User, 
  AlertTriangle, 
  Loader2,
  FileText,
  MapPin 
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  selectedCategory?: string;
}

export const Chatbot = ({ selectedCategory }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Hello! I'm your Canadian Immigration Assistant. I can help answer questions about immigration processes, requirements, and procedures. 

**Important:** The information I provide is for general guidance only and should not be considered legal advice. For specific legal matters, please consult with a qualified immigration lawyer.

What would you like to know about Canadian immigration?`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample responses based on common immigration questions
  const getResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    if (message.includes("express entry") || message.includes("crs")) {
      return `**Express Entry System:**

The Express Entry system manages applications for three federal immigration programs:
- Federal Skilled Worker Program
- Canadian Experience Class  
- Federal Skilled Trades Program

**CRS Score Factors:**
- Age (up to 110 points)
- Education (up to 150 points)
- Language ability (up to 160 points)
- Work experience (up to 80 points)
- Arranged employment (up to 200 points)
- Canadian education/experience (up to 30 points)

Current minimum CRS score varies but typically ranges from 470-490 points. Would you like specific information about any of these factors?`;
    }
    
    if (message.includes("family") || message.includes("sponsor")) {
      return `**Family Sponsorship Programs:**

You can sponsor eligible relatives including:
- Spouse, common-law partner, or conjugal partner
- Dependent children under 22
- Parents and grandparents (through PGP)
- Other eligible relatives in specific circumstances

**Requirements:**
- You must be 18+ and a Canadian citizen or permanent resident
- Meet minimum income requirements (varies by family size)
- Sign an undertaking to support the sponsored person

Processing times vary: spouse sponsorship typically takes 12 months, while Parent and Grandparent Program can take 24+ months.`;
    }
    
    if (message.includes("study") || message.includes("student")) {
      return `**Study Permits:**

To study in Canada, you need:
- Acceptance letter from a Designated Learning Institution (DLI)
- Proof of financial support
- No criminal record
- Medical exam (if required)
- Language proficiency proof

**Benefits:**
- Work up to 20 hours/week during studies
- Post-Graduate Work Permit (PGWP) after graduation
- Potential pathway to permanent residence
- Spouse may be eligible for open work permit

Would you like information about specific study programs or PGWP requirements?`;
    }
    
    if (message.includes("pnp") || message.includes("provincial")) {
      return `**Provincial Nominee Programs (PNP):**

Each province/territory has unique immigration streams:

**Popular PNP Streams:**
- Ontario Immigrant Nominee Program (OINP)
- British Columbia Provincial Nominee Program (BC PNP)
- Alberta Immigrant Nominee Program (AINP)
- Saskatchewan Immigrant Nominee Program (SINP)

**General Process:**
1. Apply to provincial program
2. Receive provincial nomination
3. Apply for permanent residence to IRCC
4. Additional 600 CRS points if in Express Entry

Which province interests you most?`;
    }
    
    if (message.includes("language") || message.includes("ielts") || message.includes("celpip")) {
      return `**Language Requirements:**

**Accepted Tests:**
- IELTS General Training
- CELPIP-General
- TEF Canada (French)
- TCF Canada (French)

**Minimum Levels:**
- Federal Skilled Worker: CLB 7 (IELTS 6.0 overall)
- Canadian Experience Class: CLB 7 for NOC 0/A, CLB 5 for NOC B
- Federal Skilled Trades: CLB 5 speaking/listening, CLB 4 reading/writing

**Tips:**
- Take official practice tests
- Results valid for 2 years from test date
- Higher scores significantly boost CRS points

Need help calculating your language points?`;
    }
    
    // Default response for unmatched queries
    return `Thank you for your question about "${userMessage}". 

I can provide general information about:
- Express Entry and CRS scores
- Family sponsorship programs
- Study permits and student visas
- Provincial Nominee Programs
- Language requirements
- Work permits and temporary residence
- Refugee protection programs

**Please remember:** This is general information only. For personalized advice or complex situations, consult with a qualified immigration lawyer or authorized representative.

Could you please ask a more specific question about any of these topics?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await getResponse(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      const categoryMessage = `Tell me about ${selectedCategory}`;
      setInputValue(categoryMessage);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section id="chatbot" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Immigration Assistant
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant answers to your Canadian immigration questions. Our AI assistant is trained 
            on the latest immigration regulations and procedures.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            {/* Disclaimer */}
            <div className="bg-canadian-red-light/20 border-l-4 border-canadian-red p-4 m-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-canadian-red mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-sm">Important Disclaimer</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This AI assistant provides general information only and should not be considered legal advice. 
                    For specific legal matters, consult with a qualified immigration lawyer.
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea 
              className="h-[500px] px-6 pb-4" 
              ref={scrollAreaRef}
            >
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.isBot ? "justify-start" : "justify-end"
                    } animate-fade-in`}
                  >
                    {message.isBot && (
                      <div className="bg-canadian-blue text-white p-2 rounded-full">
                        <Bot size={20} />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.isBot
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    {!message.isBot && (
                      <div className="bg-canadian-red text-white p-2 rounded-full">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start animate-fade-in">
                    <div className="bg-canadian-blue text-white p-2 rounded-full">
                      <Bot size={20} />
                    </div>
                    <div className="bg-secondary text-secondary-foreground p-4 rounded-2xl max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={16} />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t border-border">
              <div className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about immigration requirements, processes, or specific programs..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  variant="canadian"
                >
                  <Send size={18} />
                </Button>
              </div>
              
              <div className="flex gap-2 mt-3 text-xs text-muted-foreground">
                <FileText size={14} />
                <span>Information sourced from canada.ca and updated regularly</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};