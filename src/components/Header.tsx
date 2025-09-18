import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, FileText, BarChart3, Shield, Globe } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/language";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: "/", icon: null },
    { name: t('nav.report'), href: "/report", icon: FileText },
    { name: t('nav.map'), href: "/map", icon: MapPin },
    { name: t('nav.track'), href: "/dashboard", icon: BarChart3 },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50 animate-slide-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-md object-contain" />
            <span className="text-xl font-bold bg-blue-500 from-primary to-primary-glow bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Jan-Samasya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group hover:bg-primary/10 hover:shadow-md ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 ios-card-small border-2 border-primary/30 hover:border-primary transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/authority" className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                {t('nav.authority')}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-primary/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/90 backdrop-blur-sm animate-slide-down">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:shadow-md ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              {/* Language Toggle for Mobile */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:shadow-md text-muted-foreground hover:text-primary border-t border-border mt-2 pt-4 w-full text-left"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">{language === 'en' ? 'हिंदी में देखें' : 'View in English'}</span>
              </button>
              
              <Link
                to="/authority"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:shadow-md text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="w-4 h-4" />
                <span className="font-medium">{t('nav.authority')}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;