import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, FileText, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/language";

const Index = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: FileText,
      title: t('nav.report'),
      description: t('home.quickReportingDesc'),
      link: "/report",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      title: t('nav.map'),
      description: t('map.description'),
      link: "/map",
      color: "from-green-500 to-green-600",
    },
    {
      icon: BarChart3,
      title: t('nav.track'),
      description: t('track.description'),
      link: "/dashboard",
      color: "from-purple-500 to-purple-600",
    },
  ];

  // Removed stats section

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* Enhanced Features Section */}
        <section className="py-32 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float [animation-delay:3s]"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20 animate-fade-in">
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
                       <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                       {t('home.features')}
                     </div>
                     <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary-hover bg-clip-text text-transparent animate-gradient-shift">
                       {t('home.empowerTitle')}
                     </h2>
                     <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                       {t('home.empowerDesc')}
                     </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {features.map((feature, index) => (
                <Link
                  key={feature.title}
                  to={feature.link}
                  className={`group animate-slide-up [animation-delay:${index * 0.2}s]`}
                >
                  <Card className="h-full ios-card-large glass-card border-0 hover:border-primary/20 transition-all duration-500 hover:-translate-y-4 hover:scale-105 overflow-hidden group-hover:shadow-elegant">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="relative z-10 p-10 text-center">
                      <div className={`w-20 h-20 mx-auto mb-8 ios-card-small bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-glow group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        <feature.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-8 leading-relaxed text-lg group-hover:text-foreground/90 transition-colors duration-300">
                        {feature.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 border-2 ios-card-small px-8 py-3 text-lg font-medium hover:shadow-lg"
                      >
                        Get Started
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Call to Action Section */}
            <div className="text-center animate-fade-in [animation-delay:0.8s]">
              <Card className="ios-card-large glass-card border-0 max-w-4xl mx-auto p-12 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
                <div className="text-center">
                         <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                           {t('home.readyTitle')}
                         </h3>
                         <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                           {t('home.readyDesc')}
                         </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
                           <Button
                             asChild
                             size="lg"
                             className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-hover hover:to-primary text-white text-lg px-8 py-4 ios-card-large transition-all duration-300 hover:scale-105 hover:shadow-elegant"
                           >
                             <Link to="/report">
                               {t('home.startReporting')}
                               <ArrowRight className="w-5 h-5 ml-2" />
                             </Link>
                           </Button>
                           <Button
                             asChild
                             size="lg"
                             variant="outline"
                             className="text-lg px-8 py-4 ios-card-large border-2 border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-105 glass-card"
                           >
                             <Link to="/map">
                               {t('home.exploreMap')}
                             </Link>
                           </Button>
                         </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Chatbot />
      {/* Footer removed as requested */}
    </div>
  );
};

export default Index;