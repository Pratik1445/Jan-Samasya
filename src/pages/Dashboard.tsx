import Header from "@/components/Header";
import TrackingDashboard from "@/components/TrackingDashboard";
import { BarChart3, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/language";

const Dashboard = () => {
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
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Header Section */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
                <BarChart3 className="w-4 h-4" />
                {t('track.badge')}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary-hover bg-clip-text text-transparent animate-gradient-shift">
                {t('track.title')}
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                {t('track.description')}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in [animation-delay:0.3s]">
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t('home.liveUpdates')}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t('track.badge')}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t('home.communityImpact')}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Dashboard Section */}
            <div className="animate-slide-up [animation-delay:0.4s]">
              <TrackingDashboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;