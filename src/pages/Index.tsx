import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImmigrationCategories } from "@/components/ImmigrationCategories";
import { Chatbot } from "@/components/Chatbot";
import { WebScraper } from "@/components/WebScraper";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Scroll to chatbot section
    setTimeout(() => {
      document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ImmigrationCategories onCategorySelect={handleCategorySelect} />
        <Chatbot selectedCategory={selectedCategory} />
        <div id="knowledge-base">
          <WebScraper />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
