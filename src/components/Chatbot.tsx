import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Phone } from "lucide-react";
import { findFAQAnswer, faqDatabase, getRandomFAQ } from "@/lib/faq";

interface Message {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      content: "Hi! I'm CivicBot, your assistant for the Jan-Samasya civic reporting app. I can help you with reporting issues, tracking your submissions, understanding app features, and answering common questions. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickReplies = [
    "How do I report an issue?",
    "How can I track my report status?",
    "What types of issues can I report?",
    "How long does it take to resolve issues?",
    "Can I upload photos and videos?",
    "How do I select the exact location?",
    "What if I make a mistake in my report?",
    "How do I know if my report was received?",
    "Can I report anonymously?",
    "What should I do if my issue is urgent?"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Find answer from FAQ database
    const faqAnswer = findFAQAnswer(inputValue);
    
    let reply: string;
    if (faqAnswer) {
      reply = faqAnswer;
    } else {
      // Fallback responses for unmatched queries
      const fallbackResponses = [
        "I understand you're looking for help. Could you be more specific about what you need assistance with? You can ask about reporting issues, tracking reports, or general app usage.",
        "I'm here to help with civic issue reporting and tracking. Try asking about how to report an issue, track your reports, or what types of problems you can report.",
        "That's a great question! I can help you with reporting civic issues, tracking your submissions, or answering questions about our app features. What would you like to know?",
        "I'm not sure I understand that question. You can ask me about reporting issues, tracking progress, or how to use specific features of the app.",
        "Let me help you better. You can ask about: How to report an issue, How to track your reports, What types of issues you can report, or How to use the map feature."
      ];
      reply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      content: reply,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
  };


  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-muted hover:bg-muted/80' : 'bg-primary hover:bg-primary-hover'
        } ${isOpen ? 'rotate-180' : 'animate-bounce-soft'}`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-[30rem] h-[38rem] rounded-2xl border-2 border-primary/20 shadow-elegant animate-scale-in bg-card/95 backdrop-blur-md">
          <CardContent className="p-0 h-full flex flex-col rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shadow-glow">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">CivicBot</h3>
                    <p className="text-xs opacity-90">Always here to help</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* 3D area (Spline) */}
            <div className="relative bg-gradient-to-br from-primary-light to-accent p-2 border-b">
              <div className="h-56 md:h-64 rounded-xl overflow-hidden border">
                <spline-viewer
                  url="https://prod.spline.design/KTS9iZdpc9wkdUm2/scene.splinecode"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              </div>
              {/* Overlay to mask the built with Spline watermark */}
              <div
                className="absolute z-20" 
                style={{ bottom: '0.5rem', right: '0.5rem', width: '12rem', height: '3.7rem' }}
              >
                <div className="w-full h-full rounded-lg bg-card/95 backdrop-blur-md border border-border shadow-lg flex items-center gap-2 px-3 text-xs">
                  <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-muted-foreground">Support</div>
                    <div className="font-medium text-foreground">+91 99999 99999</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/40">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-foreground border"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "bot" && (
                        <Bot className="w-4 h-4 mt-0.5 shrink-0" />
                      )}
                      {message.sender === "user" && (
                        <User className="w-4 h-4 mt-0.5 shrink-0" />
                      )}
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="text-xs text-muted-foreground mb-2 font-medium">Quick Questions:</div>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.slice(0, 6).map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 hover:bg-primary/10"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
                {quickReplies.length > 6 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {quickReplies.slice(6).map((reply, index) => (
                      <Button
                        key={index + 6}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 hover:bg-primary/10"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-card/70 backdrop-blur">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="text-sm rounded-xl"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="shrink-0 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;