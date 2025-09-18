import Header from "@/components/Header";
import CityMap from "@/components/CityMap";
import { MapPin, Eye, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/lib/language";

const Map = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float [animation-delay:3s]"></div>
      
      <Header />
      <main className="pt-20 relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header Section */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
                <MapPin className="w-4 h-4" />
                {t('map.badge')}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary-hover bg-clip-text text-transparent animate-gradient-shift">
                {t('map.title')}
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                {t('map.description')}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in [animation-delay:0.3s]">
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t('home.liveUpdates')}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t('home.realTimeStatus')}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t('home.communityDriven')}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Map Section */}
            <div className="animate-slide-up [animation-delay:0.4s]">
              <CityMap />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Map;