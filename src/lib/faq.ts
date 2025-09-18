export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export const faqDatabase: FAQItem[] = [
  // General App Usage
  {
    id: "1",
    question: "How do I report a civic issue?",
    answer: "To report an issue: 1) Click the 'Report Issue' button in the navigation, 2) Select the appropriate category (potholes, streetlights, garbage, etc.), 3) Add a detailed description, 4) Use the map to select the exact location, 5) Upload photos, audio, or video if available, 6) Choose priority level, 7) Submit your report. You'll receive a unique tracking ID to monitor progress.",
    category: "Reporting",
    keywords: ["report", "issue", "submit", "how to", "process"]
  },
  {
    id: "2",
    question: "How can I track my report status?",
    answer: "You can track your reports by: 1) Clicking 'Track Progress' in the navigation, 2) Entering your report ID (e.g., #CIV-2024-001) in the search box, 3) Viewing real-time status updates including pending, acknowledged, in-progress, and resolved stages. You can also see estimated completion times and any comments from authorities.",
    category: "Tracking",
    keywords: ["track", "status", "progress", "monitor", "check"]
  },
  {
    id: "3",
    question: "What types of issues can I report?",
    answer: "You can report various civic issues including: Road problems (potholes, cracks, damage), Street lighting issues (broken lights, dark areas), Garbage and waste management problems, Graffiti and vandalism, Sidewalk and footpath issues, Traffic signal problems, Park and playground maintenance, Water supply issues, Sewage problems, and other public infrastructure concerns.",
    category: "Categories",
    keywords: ["types", "categories", "what", "kinds", "issues"]
  },
  {
    id: "4",
    question: "How long does it take to resolve issues?",
    answer: "Resolution times vary by priority: Urgent issues (safety hazards): 24-48 hours, High priority (major problems): 3-5 business days, Medium priority (moderate issues): 1-2 weeks, Low priority (minor issues): 2-4 weeks. You'll receive notifications at each stage of the process, and you can track progress in real-time.",
    category: "Timeline",
    keywords: ["time", "long", "duration", "when", "resolve", "fix"]
  },
  {
    id: "5",
    question: "Can I upload photos and videos with my report?",
    answer: "Yes! You can upload multiple photos, audio recordings, and videos to support your report. This helps authorities better understand the issue and respond more effectively. Supported formats: Photos (JPG, PNG, WebP), Audio (MP3, WAV, M4A), Video (MP4, MOV, AVI). Maximum file size is 10MB per file.",
    category: "Media",
    keywords: ["photos", "videos", "audio", "upload", "media", "files"]
  },
  {
    id: "6",
    question: "How do I select the exact location for my report?",
    answer: "You can select the location in two ways: 1) Use the interactive map to click on the exact spot, 2) Search for an address using the search box above the map. The map will automatically pin your selected location. You can also drag the pin to fine-tune the position. The coordinates will be automatically saved with your report.",
    category: "Location",
    keywords: ["location", "map", "address", "pin", "coordinates", "where"]
  },
  {
    id: "7",
    question: "What if I make a mistake in my report?",
    answer: "If you need to correct information in your report, contact our support team immediately with your report ID. We can help you update details like location, description, or priority level. However, once a report is assigned to an authority, some changes may not be possible. It's best to double-check all information before submitting.",
    category: "Support",
    keywords: ["mistake", "error", "wrong", "correct", "change", "edit"]
  },
  {
    id: "8",
    question: "How do I know if my report was received?",
    answer: "You'll receive immediate confirmation when your report is submitted, including a unique tracking ID. You'll also get email notifications (if provided) and can check the status anytime using the 'Track Progress' feature. The system will show your report as 'pending' initially, then 'acknowledged' once authorities review it.",
    category: "Confirmation",
    keywords: ["received", "confirmation", "submitted", "acknowledged", "status"]
  },
  {
    id: "9",
    question: "Can I report anonymously?",
    answer: "Yes, you can report issues anonymously. Your personal information is not required to submit a report, and you'll still receive a tracking ID to monitor progress. However, providing contact information (optional) allows authorities to reach out for clarification or updates on your report.",
    category: "Privacy",
    keywords: ["anonymous", "privacy", "personal", "information", "contact"]
  },
  {
    id: "10",
    question: "What should I do if my issue is urgent or dangerous?",
    answer: "For urgent or dangerous issues (like gas leaks, downed power lines, major road hazards), please call emergency services immediately (100 for police, 101 for fire, 102 for ambulance). You can still report these issues through our app for tracking, but don't wait for the app response in emergency situations.",
    category: "Emergency",
    keywords: ["urgent", "emergency", "dangerous", "immediate", "safety", "hazard"]
  },
  {
    id: "11",
    question: "How do I view all reports in my area?",
    answer: "Use the 'Community Map' feature to see all reported issues in your area. The map shows different colored markers for different issue types and statuses. You can filter by category, priority, or status. This helps you see what issues are already being addressed and avoid duplicate reports.",
    category: "Community",
    keywords: ["map", "community", "area", "nearby", "all reports", "view"]
  },
  {
    id: "12",
    question: "What if my report is rejected or closed?",
    answer: "If your report is rejected, you'll receive a notification explaining the reason. Common reasons include: duplicate reports, issues outside municipal jurisdiction, insufficient information, or false reports. You can submit a new report with additional details or contact support for clarification. Closed reports mean the issue has been resolved.",
    category: "Status",
    keywords: ["rejected", "closed", "denied", "why", "reason", "appeal"]
  },
  {
    id: "13",
    question: "How do I contact support?",
    answer: "You can contact our support team through: 1) The chatbot in the bottom-right corner, 2) Email us at support@jansamasya.com, 3) Call our helpline at +91 99999 99999, 4) Visit our office during business hours. We're available Monday-Friday, 9 AM to 6 PM.",
    category: "Support",
    keywords: ["contact", "support", "help", "phone", "email", "office"]
  },
  {
    id: "14",
    question: "Is there a mobile app available?",
    answer: "Currently, our service is available through this web application that works on all devices including smartphones, tablets, and computers. The web app is optimized for mobile use and provides the same features as a native app. We're working on dedicated mobile apps for iOS and Android.",
    category: "App",
    keywords: ["mobile", "app", "phone", "download", "ios", "android"]
  },
  {
    id: "15",
    question: "How do I update my profile or settings?",
    answer: "You can update your profile information by clicking on your name in the top-right corner and selecting 'Profile Settings'. Here you can update your contact information, notification preferences, and other account settings. Changes are saved automatically.",
    category: "Profile",
    keywords: ["profile", "settings", "update", "account", "preferences", "information"]
  }
];

export function findFAQAnswer(userInput: string): string | null {
  const input = userInput.toLowerCase().trim();
  
  // Direct keyword matching
  for (const faq of faqDatabase) {
    for (const keyword of faq.keywords) {
      if (input.includes(keyword)) {
        return faq.answer;
      }
    }
  }
  
  // Fuzzy matching for common phrases
  const commonPhrases = [
    { pattern: /how.*report/i, answer: faqDatabase[0].answer },
    { pattern: /how.*track/i, answer: faqDatabase[1].answer },
    { pattern: /what.*report/i, answer: faqDatabase[2].answer },
    { pattern: /how.*long/i, answer: faqDatabase[3].answer },
    { pattern: /photo|video|audio/i, answer: faqDatabase[4].answer },
    { pattern: /location|map|address/i, answer: faqDatabase[5].answer },
    { pattern: /mistake|error|wrong/i, answer: faqDatabase[6].answer },
    { pattern: /received|confirmation/i, answer: faqDatabase[7].answer },
    { pattern: /anonymous|privacy/i, answer: faqDatabase[8].answer },
    { pattern: /urgent|emergency/i, answer: faqDatabase[9].answer },
    { pattern: /community|map|area/i, answer: faqDatabase[10].answer },
    { pattern: /rejected|closed/i, answer: faqDatabase[11].answer },
    { pattern: /contact|support|help/i, answer: faqDatabase[12].answer },
    { pattern: /mobile|app|phone/i, answer: faqDatabase[13].answer },
    { pattern: /profile|settings/i, answer: faqDatabase[14].answer }
  ];
  
  for (const phrase of commonPhrases) {
    if (phrase.pattern.test(input)) {
      return phrase.answer;
    }
  }
  
  return null;
}

export function getRandomFAQ(): FAQItem {
  return faqDatabase[Math.floor(Math.random() * faqDatabase.length)];
}

export function getFAQsByCategory(category: string): FAQItem[] {
  return faqDatabase.filter(faq => faq.category === category);
}
