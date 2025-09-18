import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.report': 'Report Issue',
    'nav.map': 'Community Map',
    'nav.track': 'Track Progress',
    'nav.authority': 'Authority Login',
    
    // Homepage
    'home.title': 'Make Your City',
    'home.subtitle': 'Better Together',
    'home.description': 'Transform your community with instant civic issue reporting, real-time tracking, and collaborative problem-solving. Join thousands making their cities better.',
    'home.badge': 'Empowering Communities Nationwide',
    'home.reportButton': 'Report an Issue',
    'home.mapButton': 'View City Map',
    'home.quickReporting': 'Quick Reporting',
    'home.quickReportingDesc': 'Snap a photo, add location, and submit in seconds. Our smart system categorizes issues automatically with AI-powered analysis.',
    'home.realTimeTracking': 'Real-Time Tracking',
    'home.realTimeTrackingDesc': 'Follow your issue from submission to resolution with live status updates, notifications, and detailed progress tracking.',
    'home.communityImpact': 'Community Impact',
    'home.communityImpactDesc': 'See the collective impact of your community\'s efforts with resolution stats, improvement metrics, and success stories.',
    'home.empowerTitle': 'Empower Your Community',
    'home.empowerDesc': 'Discover powerful tools designed to make civic engagement simple, effective, and impactful. Join thousands of citizens making their communities better.',
    'home.readyTitle': 'Ready to Make a Difference?',
    'home.readyDesc': 'Join thousands of citizens who are already transforming their communities. Start reporting issues today and see the impact.',
    'home.startReporting': 'Start Reporting Now',
    'home.exploreMap': 'Explore Community Map',
    'home.features': 'Powerful Features',
    'home.liveUpdates': 'Live Updates',
    'home.realTimeStatus': 'Real-time Status',
    'home.communityDriven': 'Community Driven',
    'home.activeUsers': 'Active Users',
    'home.issuesResolved': 'Issues Resolved',
    'home.satisfactionRate': 'Satisfaction Rate',
    
    // Report Page
    'report.title': 'Report a Civic Issue',
    'report.description': 'Help improve your community by reporting issues that need attention. Your voice matters in making our city better for everyone.',
    'report.badge': 'Community Reporting',
    'report.locationRequired': 'Location Required',
    'report.photosWelcome': 'Photos Welcome',
    'report.quickProcess': 'Quick Process',
    'report.issueDetails': 'Issue Details',
    'report.issueDetailsDesc': 'Provide detailed information about the issue you\'ve encountered',
    'report.category': 'Issue Category',
    'report.categoryRequired': 'Issue Category *',
    'report.location': 'Location',
    'report.locationRequired': 'Location *',
    'report.locationDesc': 'Pick a location by searching or clicking on the map. This is required for accurate reporting.',
    'report.mediaEvidence': 'Media Evidence',
    'report.mediaOptional': '(Optional but helpful)',
    'report.photoEvidence': 'Photo Evidence',
    'report.photoDesc': 'Drag and drop photos here, or click to browse',
    'report.photoFormats': 'Supports JPG, PNG, WebP formats',
    'report.audioRecording': 'Audio Recording',
    'report.audioFormats': 'MP3, WAV, M4A formats',
    'report.videoEvidence': 'Video Evidence',
    'report.videoFormats': 'MP4, MOV, AVI formats',
    'report.description': 'Description',
    'report.descriptionPlaceholder': 'Describe the issue in detail... What exactly did you observe? When did you notice it? Any additional context that might help authorities understand the problem better?',
    'report.voiceNote': 'Voice Note (Optional)',
    'report.recordVoice': 'Record Voice Note',
    'report.stopRecording': 'Stop Recording',
    'report.recording': 'Recording...',
    'report.priority': 'Priority Level',
    'report.submitReport': 'Submit Report',
    'report.submitDesc': 'By submitting, you agree to our terms and help improve your community',
    'report.submitted': 'Report Submitted Successfully!',
    'report.submittedDesc': 'Your issue has been received and assigned ID:',
    'report.notifications': 'You\'ll receive email notifications about progress updates',
    'report.submitAnother': 'Submit Another Report',
    
    // Map Page
    'map.title': 'Community Issues Map',
    'map.description': 'Explore reported issues across the city and track their resolution status. See what\'s happening in your neighborhood and beyond.',
    'map.badge': 'Community Insights',
    'map.interactiveMap': 'Interactive Map',
    'map.mapDesc': 'Click on markers to view issue details',
    'map.filterIssues': 'Filter Issues',
    'map.recentIssues': 'Recent Issues',
    'map.allIssues': 'All Issues',
    'map.potholes': 'Potholes',
    'map.lights': 'Lights',
    'map.garbage': 'Garbage',
    'map.noIssues': 'No issues found for the selected filter',
    
    // Track Page
    'track.title': 'Track Your Reports',
    'track.description': 'Monitor the progress of your submitted civic issues and see community impact. Stay informed about the status of your reports in real-time.',
    'track.badge': 'Progress Tracking',
    'track.searchReports': 'Search Your Reports',
    'track.searchDesc': 'Enter your report ID to track progress and view updates',
    'track.searchPlaceholder': 'Enter report ID (e.g., CIV-2024-001)',
    'track.search': 'Search',
    'track.totalReports': 'Total Reports',
    'track.inProgress': 'In Progress',
    'track.resolved': 'Resolved',
    'track.myReports': 'My Recent Reports',
    'track.progress': 'Progress',
    'track.updateTimeline': 'Update Timeline',
    'track.backToReports': 'Back to All Reports',
    'track.noReports': 'No Reports Yet',
    'track.noReportsDesc': 'Submit your first civic issue to start tracking progress!',
    
    // Common
    'common.submitted': 'submitted',
    'common.acknowledged': 'acknowledged',
    'common.inProgress': 'in progress',
    'common.resolved': 'resolved',
    'common.pending': 'pending',
    'common.low': 'Low',
    'common.medium': 'Medium',
    'common.high': 'High',
    'common.urgent': 'Urgent',
    'common.pothole': 'Potholes & Road Damage',
    'common.streetlight': 'Streetlight Issues',
    'common.garbage': 'Garbage & Sanitation',
    'common.graffiti': 'Graffiti & Vandalism',
    'common.sidewalk': 'Sidewalk Problems',
    'common.traffic': 'Traffic Signals',
    'common.parks': 'Parks & Recreation',
    'common.other': 'Other',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.report': 'समस्या रिपोर्ट करें',
    'nav.map': 'समुदाय मानचित्र',
    'nav.track': 'प्रगति ट्रैक करें',
    'nav.authority': 'अधिकारी लॉगिन',
    
    // Homepage
    'home.title': 'अपने शहर को बनाएं',
    'home.subtitle': 'एक साथ बेहतर',
    'home.description': 'तत्काल नागरिक समस्या रिपोर्टिंग, रियल-टाइम ट्रैकिंग और सहयोगी समस्या समाधान के साथ अपने समुदाय को बदलें। हजारों लोगों के साथ जुड़ें जो अपने शहरों को बेहतर बना रहे हैं।',
    'home.badge': 'राष्ट्रव्यापी समुदायों को सशक्त बनाना',
    'home.reportButton': 'समस्या रिपोर्ट करें',
    'home.mapButton': 'शहर मानचित्र देखें',
    'home.quickReporting': 'त्वरित रिपोर्टिंग',
    'home.quickReportingDesc': 'फोटो खींचें, स्थान जोड़ें, और सेकंडों में सबमिट करें। हमारी स्मार्ट प्रणाली AI-संचालित विश्लेषण के साथ समस्याओं को स्वचालित रूप से वर्गीकृत करती है।',
    'home.realTimeTracking': 'रियल-टाइम ट्रैकिंग',
    'home.realTimeTrackingDesc': 'लाइव स्थिति अपडेट, सूचनाओं और विस्तृत प्रगति ट्रैकिंग के साथ सबमिशन से समाधान तक अपनी समस्या का अनुसरण करें।',
    'home.communityImpact': 'समुदाय प्रभाव',
    'home.communityImpactDesc': 'समाधान आंकड़े, सुधार मेट्रिक्स और सफलता की कहानियों के साथ अपने समुदाय के प्रयासों के सामूहिक प्रभाव को देखें।',
    'home.empowerTitle': 'अपने समुदाय को सशक्त बनाएं',
    'home.empowerDesc': 'शक्तिशाली उपकरणों की खोज करें जो नागरिक भागीदारी को सरल, प्रभावी और प्रभावशाली बनाने के लिए डिज़ाइन किए गए हैं। हजारों नागरिकों के साथ जुड़ें जो अपने समुदायों को बेहतर बना रहे हैं।',
    'home.readyTitle': 'अंतर लाने के लिए तैयार हैं?',
    'home.readyDesc': 'हजारों नागरिकों के साथ जुड़ें जो पहले से ही अपने समुदायों को बदल रहे हैं। आज ही समस्याओं की रिपोर्टिंग शुरू करें और प्रभाव देखें।',
    'home.startReporting': 'अभी रिपोर्टिंग शुरू करें',
    'home.exploreMap': 'समुदाय मानचित्र एक्सप्लोर करें',
    'home.features': 'शक्तिशाली सुविधाएं',
    'home.liveUpdates': 'लाइव अपडेट',
    'home.realTimeStatus': 'रियल-टाइम स्थिति',
    'home.communityDriven': 'समुदाय संचालित',
    'home.activeUsers': 'सक्रिय उपयोगकर्ता',
    'home.issuesResolved': 'समस्याएं हल',
    'home.satisfactionRate': 'संतुष्टि दर',
    
    // Report Page
    'report.title': 'नागरिक समस्या रिपोर्ट करें',
    'report.description': 'समस्याओं की रिपोर्टिंग करके अपने समुदाय को बेहतर बनाने में मदद करें जिन पर ध्यान देने की आवश्यकता है। हमारे शहर को बेहतर बनाने में आपकी आवाज मायने रखती है।',
    'report.badge': 'समुदाय रिपोर्टिंग',
    'report.locationRequired': 'स्थान आवश्यक',
    'report.photosWelcome': 'फोटो स्वागत योग्य',
    'report.quickProcess': 'त्वरित प्रक्रिया',
    'report.issueDetails': 'समस्या विवरण',
    'report.issueDetailsDesc': 'आपके द्वारा सामना की गई समस्या के बारे में विस्तृत जानकारी प्रदान करें',
    'report.category': 'समस्या श्रेणी',
    'report.categoryRequired': 'समस्या श्रेणी *',
    'report.location': 'स्थान',
    'report.locationRequired': 'स्थान *',
    'report.locationDesc': 'खोज करके या मानचित्र पर क्लिक करके स्थान चुनें। सटीक रिपोर्टिंग के लिए यह आवश्यक है।',
    'report.mediaEvidence': 'मीडिया साक्ष्य',
    'report.mediaOptional': '(वैकल्पिक लेकिन सहायक)',
    'report.photoEvidence': 'फोटो साक्ष्य',
    'report.photoDesc': 'फोटो यहां खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें',
    'report.photoFormats': 'JPG, PNG, WebP प्रारूपों का समर्थन करता है',
    'report.audioRecording': 'ऑडियो रिकॉर्डिंग',
    'report.audioFormats': 'MP3, WAV, M4A प्रारूप',
    'report.videoEvidence': 'वीडियो साक्ष्य',
    'report.videoFormats': 'MP4, MOV, AVI प्रारूप',
    'report.description': 'विवरण',
    'report.descriptionPlaceholder': 'समस्या का विस्तार से वर्णन करें... आपने वास्तव में क्या देखा? आपने इसे कब देखा? कोई अतिरिक्त संदर्भ जो अधिकारियों को समस्या को बेहतर ढंग से समझने में मदद कर सके?',
    'report.voiceNote': 'वॉइस नोट (वैकल्पिक)',
    'report.recordVoice': 'वॉइस नोट रिकॉर्ड करें',
    'report.stopRecording': 'रिकॉर्डिंग रोकें',
    'report.recording': 'रिकॉर्डिंग...',
    'report.priority': 'प्राथमिकता स्तर',
    'report.submitReport': 'रिपोर्ट सबमिट करें',
    'report.submitDesc': 'सबमिट करके, आप हमारी शर्तों से सहमत हैं और अपने समुदाय को बेहतर बनाने में मदद करते हैं',
    'report.submitted': 'रिपोर्ट सफलतापूर्वक सबमिट!',
    'report.submittedDesc': 'आपकी समस्या प्राप्त हो गई है और ID असाइन की गई है:',
    'report.notifications': 'आपको प्रगति अपडेट के बारे में ईमेल सूचनाएं मिलेंगी',
    'report.submitAnother': 'एक और रिपोर्ट सबमिट करें',
    
    // Map Page
    'map.title': 'समुदाय समस्याएं मानचित्र',
    'map.description': 'शहर भर में रिपोर्ट की गई समस्याओं का अन्वेषण करें और उनके समाधान की स्थिति को ट्रैक करें। देखें कि आपके पड़ोस और उससे आगे क्या हो रहा है।',
    'map.badge': 'समुदाय अंतर्दृष्टि',
    'map.interactiveMap': 'इंटरैक्टिव मानचित्र',
    'map.mapDesc': 'समस्या विवरण देखने के लिए मार्कर पर क्लिक करें',
    'map.filterIssues': 'समस्याएं फ़िल्टर करें',
    'map.recentIssues': 'हाल की समस्याएं',
    'map.allIssues': 'सभी समस्याएं',
    'map.potholes': 'गड्ढे',
    'map.lights': 'लाइट्स',
    'map.garbage': 'कचरा',
    'map.noIssues': 'चयनित फ़िल्टर के लिए कोई समस्या नहीं मिली',
    
    // Track Page
    'track.title': 'अपनी रिपोर्ट्स ट्रैक करें',
    'track.description': 'अपनी सबमिट की गई नागरिक समस्याओं की प्रगति की निगरानी करें और समुदाय प्रभाव देखें। अपनी रिपोर्ट्स की स्थिति के बारे में रियल-टाइम में सूचित रहें।',
    'track.badge': 'प्रगति ट्रैकिंग',
    'track.searchReports': 'अपनी रिपोर्ट्स खोजें',
    'track.searchDesc': 'प्रगति ट्रैक करने और अपडेट देखने के लिए अपनी रिपोर्ट ID दर्ज करें',
    'track.searchPlaceholder': 'रिपोर्ट ID दर्ज करें (जैसे, CIV-2024-001)',
    'track.search': 'खोजें',
    'track.totalReports': 'कुल रिपोर्ट्स',
    'track.inProgress': 'प्रगति में',
    'track.resolved': 'हल',
    'track.myReports': 'मेरी हाल की रिपोर्ट्स',
    'track.progress': 'प्रगति',
    'track.updateTimeline': 'अपडेट टाइमलाइन',
    'track.backToReports': 'सभी रिपोर्ट्स पर वापस जाएं',
    'track.noReports': 'अभी तक कोई रिपोर्ट नहीं',
    'track.noReportsDesc': 'प्रगति ट्रैकिंग शुरू करने के लिए अपनी पहली नागरिक समस्या सबमिट करें!',
    
    // Common
    'common.submitted': 'सबमिट',
    'common.acknowledged': 'स्वीकृत',
    'common.inProgress': 'प्रगति में',
    'common.resolved': 'हल',
    'common.pending': 'लंबित',
    'common.low': 'कम',
    'common.medium': 'मध्यम',
    'common.high': 'उच्च',
    'common.urgent': 'तत्काल',
    'common.pothole': 'गड्ढे और सड़क क्षति',
    'common.streetlight': 'स्ट्रीटलाइट समस्याएं',
    'common.garbage': 'कचरा और स्वच्छता',
    'common.graffiti': 'ग्रैफिटी और वैंडलिज्म',
    'common.sidewalk': 'फुटपाथ समस्याएं',
    'common.traffic': 'ट्रैफिक सिग्नल',
    'common.parks': 'पार्क और मनोरंजन',
    'common.other': 'अन्य',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'hi';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
