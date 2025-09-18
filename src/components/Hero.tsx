import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Clock, CheckCircle, ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedButton from "./AnimatedButton";
import { useLanguage } from "@/lib/language";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/30 via-background to-accent/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float [animation-delay:2s]"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-success/10 rounded-full blur-2xl animate-float [animation-delay:4s]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-20">
            <div className="animate-slide-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4" />
                {t('home.badge')}
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-7.8xl font-bold text-foreground mb-8 leading-tight" >
                {t('home.title')}
                <span className="block bg-gradient-to-r from-primary via-primary-glow to-primary-hover bg-clip-text text-transparent animate-gradient-shift">
                  {t('home.subtitle')}
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                {t('home.description')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <AnimatedButton
                  to="/report"
                  text={t('home.reportButton')}
                  variant="primary"
                  className="text-lg font-semibold"
                />

                <AnimatedButton
                  to="/map"
                  text={t('home.mapButton')}
                  variant="secondary"
                  className="text-lg font-semibold"
                />
              </div>

            </div>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl blur-2xl animate-pulse-soft"></div>
            
            {/* Quick Reporting Card */}
            <Card className="group relative ios-card-large glass-card border-0 hover:border-primary/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 animate-slide-up overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center mb-6 mx-auto shadow-glow group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                       <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors duration-300">{t('home.quickReporting')}</h3>
                       <p className="text-muted-foreground text-center leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                         {t('home.quickReportingDesc')}
                       </p>
                <div className="mt-6 flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-glow rounded-full group-hover:w-20 transition-all duration-300"></div>
                </div>
              </div>
            </Card>

            {/* Real-Time Tracking Card */}
            <Card className="group relative ios-card-large glass-card border-0 hover:border-warning/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 animate-slide-up [animation-delay:0.1s] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-warning/5 via-transparent to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-warning to-warning/80 ios-card-small flex items-center justify-center mb-6 mx-auto shadow-glow group-hover:shadow-warning/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                       <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-warning transition-colors duration-300">{t('home.realTimeTracking')}</h3>
                       <p className="text-muted-foreground text-center leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                         {t('home.realTimeTrackingDesc')}
                       </p>
                <div className="mt-6 flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-warning to-warning/80 rounded-full group-hover:w-20 transition-all duration-300"></div>
                </div>
              </div>
            </Card>

            {/* Community Impact Card */}
            <Card className="group relative ios-card-large glass-card border-0 hover:border-success/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 animate-slide-up [animation-delay:0.2s] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-success to-success/80 ios-card-small flex items-center justify-center mb-6 mx-auto shadow-glow group-hover:shadow-success/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                       <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-success transition-colors duration-300">{t('home.communityImpact')}</h3>
                       <p className="text-muted-foreground text-center leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                         {t('home.communityImpactDesc')}
                       </p>
                <div className="mt-6 flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-success to-success/80 rounded-full group-hover:w-20 transition-all duration-300"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;