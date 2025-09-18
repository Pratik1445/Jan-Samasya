import { useEffect, useMemo, useState } from "react";
import { subscribeToReports, ReportDoc } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Clock, CheckCircle, AlertTriangle, MapPin, Calendar, MessageSquare } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  category: string;
  status: "submitted" | "acknowledged" | "in-progress" | "resolved";
  progress: number;
  location: string;
  date: string;
  priority: "low" | "medium" | "high" | "urgent";
  updates: Array<{
    date: string;
    status: string;
    message: string;
  }>;
}

const TrackingDashboard = () => {
  const [searchId, setSearchId] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [reports, setReports] = useState<ReportDoc[]>([]);

  const statusToProgress = (status?: string) => {
    switch (status) {
      case "resolved":
        return 100;
      case "in-progress":
        return 60;
      case "acknowledged":
        return 30;
      case "submitted":
      case "pending":
      default:
        return 10;
    }
  };

  useEffect(() => {
    const unsub = subscribeToReports(setReports);
    return () => unsub();
  }, []);

  const myIssues: Issue[] = useMemo(() => {
    return reports.map((r) => ({
      id: r.id,
      title: r.description?.slice(0, 60) || r.category,
      category: r.category,
      status: (r.status as any) || "submitted",
      progress: statusToProgress(r.status),
      location: r.locationText,
      date: r.createdAt ? r.createdAt.toISOString().slice(0, 10) : "",
      priority: r.priority,
      updates: [
        { date: r.createdAt ? r.createdAt.toISOString().slice(0, 10) : "", status: "submitted", message: "Issue reported" }
      ]
    }));
  }, [reports]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "success";
      case "in-progress": return "warning";
      case "acknowledged": return "secondary";
      case "submitted": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "acknowledged": return <MessageSquare className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "urgent";
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const handleSearch = () => {
    const q = searchId.trim().toLowerCase();
    const found = reports.find(r => (r.ticketId || r.id).toLowerCase().includes(q));
    if (found) {
      setSelectedIssue({
        id: found.id,
        title: found.description?.slice(0, 60) || found.category,
        category: found.category,
        status: (found.status as any) || "submitted",
        progress: statusToProgress(found.status),
        location: found.locationText,
        date: found.createdAt ? found.createdAt.toISOString().slice(0, 10) : "",
        priority: found.priority,
        updates: [{ date: found.createdAt ? found.createdAt.toISOString().slice(0, 10) : "", status: "submitted", message: "Issue reported" }],
      });
    }
  };

  return (
    <section id="track" className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Enhanced Search Bar */}
          <Card className="ios-card-large glass-card border-0 shadow-elegant">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50">
              <CardTitle className="flex items-center text-xl font-bold">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center mr-3 shadow-glow">
                  <Search className="w-4 h-4 text-white" />
                </div>
                Search Your Reports
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Enter your report ID to track progress and view updates
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter report ID (e.g., CIV-2024-001)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="ios-card-small border-2 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>
                <Button 
                  onClick={handleSearch} 
                  className="px-8 ios-card-small bg-gradient-to-r from-primary to-primary-glow hover:from-primary-hover hover:to-primary text-white transition-all duration-300 hover:scale-105"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="ios-card-large glass-card border-0 shadow-elegant animate-slide-in group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:shadow-primary/40 transition-all duration-300">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{myIssues.length}</h3>
                <p className="text-muted-foreground font-medium">Total Reports</p>
              </CardContent>
            </Card>

            <Card className="ios-card-large glass-card border-0 shadow-elegant animate-slide-in [animation-delay:0.1s] group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-warning to-warning/80 ios-card-small flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:shadow-warning/40 transition-all duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{myIssues.filter(i => i.status === 'in-progress').length}</h3>
                <p className="text-muted-foreground font-medium">In Progress</p>
              </CardContent>
            </Card>

            <Card className="ios-card-large glass-card border-0 shadow-elegant animate-slide-in [animation-delay:0.2s] group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-success to-success/80 ios-card-small flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:shadow-success/40 transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{myIssues.filter(i => i.status === 'resolved').length}</h3>
                <p className="text-muted-foreground font-medium">Resolved</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Issue Details */}
          {selectedIssue ? (
            <Card className="ios-card-large glass-card border-0 shadow-elegant animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <span className="text-2xl">
                        {selectedIssue.category === "streetlight" && "💡"}
                        {selectedIssue.category === "pothole" && "🕳️"}
                        {selectedIssue.category === "garbage" && "🗑️"}
                      </span>
                      {selectedIssue.title}
                    </CardTitle>
                    <p className="text-muted-foreground mt-2 font-medium">ID: {selectedIssue.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(selectedIssue.status)} className="ios-card-small">
                      {getStatusIcon(selectedIssue.status)}
                      <span className="ml-1 capitalize">{selectedIssue.status.replace('-', ' ')}</span>
                    </Badge>
                    <Badge variant={getPriorityColor(selectedIssue.priority)} className="ios-card-small">
                      {selectedIssue.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Enhanced Progress Bar */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Progress</span>
                    <span className="text-2xl font-bold text-primary">{selectedIssue.progress}%</span>
                  </div>
                  <Progress value={selectedIssue.progress} className="h-4 ios-card-small" />
                </div>

                {/* Enhanced Issue Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-muted/30 ios-card-small">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{selectedIssue.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/30 ios-card-small">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Reported</p>
                      <p className="font-medium">{selectedIssue.date}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Timeline */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Update Timeline
                  </h4>
                  <div className="space-y-4">
                    {selectedIssue.updates.map((update, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-muted/20 ios-card-small">
                        <div className={`w-4 h-4 rounded-full mt-1 shadow-glow ${
                          update.status === 'resolved' ? 'bg-success' :
                          update.status === 'in-progress' ? 'bg-warning' :
                          'bg-secondary'
                        }`}></div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-base font-semibold capitalize">
                              {update.status.replace('-', ' ')}
                            </span>
                            <span className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                              {update.date}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {update.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Enhanced Issues List */
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <h3 className="text-2xl font-bold">My Recent Reports</h3>
              </div>
              {myIssues.map((issue, index) => (
                <Card 
                  key={issue.id} 
                  className={`ios-card-large glass-card border-0 shadow-elegant cursor-pointer hover:shadow-elegant hover:scale-[1.02] transition-all duration-300 animate-slide-up group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedIssue(issue)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {issue.category === "streetlight" && "💡"}
                          {issue.category === "pothole" && "🕳️"}
                          {issue.category === "garbage" && "🗑️"}
                        </span>
                        <div>
                          <h4 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{issue.title}</h4>
                          <p className="text-sm text-muted-foreground font-medium">ID: {issue.id}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(issue.status)} className="ios-card-small">
                        {getStatusIcon(issue.status)}
                        <span className="ml-1 capitalize">{issue.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-lg font-bold text-primary">{issue.progress}%</span>
                      </div>
                      <Progress value={issue.progress} className="h-3 ios-card-small" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="truncate">{issue.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{issue.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {myIssues.length === 0 && (
                <Card className="ios-card-large glass-card border-0 shadow-elegant">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No Reports Yet</h3>
                    <p className="text-muted-foreground">Submit your first civic issue to start tracking progress!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {selectedIssue && (
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setSelectedIssue(null)}
                className="ios-card-small border-2 border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-105"
              >
                Back to All Reports
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackingDashboard;