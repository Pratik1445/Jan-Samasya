//
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Filter, Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import LeafletMap from "./LeafletMap";
import { useEffect, useState } from "react";
import { subscribeToReports, ReportDoc } from "@/lib/firebase";

const CityMap = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToReports((reports: ReportDoc[]) => {
      const mapped = reports.map((r) => ({
        id: r.id,
        type: r.category,
        status: r.status || "pending",
        title: r.description?.slice(0, 60) || r.category,
        location: r.locationText,
        priority: r.priority,
        date: r.createdAt ? r.createdAt.toISOString().slice(0, 10) : "",
        icon: r.category === "streetlight" ? "💡" : r.category === "garbage" ? "🗑️" : r.category === "pothole" ? "🕳️" : "📍",
        lat: r.latitude ?? 40.7128,
        lng: r.longitude ?? -74.0060,
      }));
      setIssues(mapped);
    });
    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "success";
      case "in-progress": return "warning";
      case "acknowledged": return "secondary";
      case "urgent": return "urgent";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "urgent": return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredIssues = selectedFilter === "all" 
    ? issues 
    : issues.filter(issue => issue.type === selectedFilter);

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden ios-card-large glass-card border-0 shadow-elegant">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50">
              <CardTitle className="flex items-center text-xl font-bold">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center mr-3 shadow-glow">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                Interactive Map
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Click on markers to view issue details
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <LeafletMap issues={filteredIssues} selectedFilter={selectedFilter} />
            </CardContent>
          </Card>
        </div>

        {/* Issue List */}
        <div className="space-y-6">
          {/* Filters */}
          <Card className="ios-card-large glass-card border-0 shadow-elegant">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50">
              <CardTitle className="flex items-center text-lg font-bold">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center mr-2 shadow-glow">
                  <Filter className="w-3 h-3 text-white" />
                </div>
                Filter Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("all")}
                  size="sm"
                  className="ios-card-small transition-all duration-300 hover:scale-105"
                >
                  All Issues
                </Button>
                <Button
                  variant={selectedFilter === "pothole" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("pothole")}
                  size="sm"
                  className="ios-card-small transition-all duration-300 hover:scale-105"
                >
                  🕳️ Potholes
                </Button>
                <Button
                  variant={selectedFilter === "streetlight" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("streetlight")}
                  size="sm"
                  className="ios-card-small transition-all duration-300 hover:scale-105"
                >
                  💡 Lights
                </Button>
                <Button
                  variant={selectedFilter === "garbage" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("garbage")}
                  size="sm"
                  className="ios-card-small transition-all duration-300 hover:scale-105"
                >
                  🗑️ Garbage
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Issue List */}
          <Card className="ios-card-large glass-card border-0 shadow-elegant">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50">
              <CardTitle className="flex items-center text-lg font-bold">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center mr-2 shadow-glow">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                Recent Issues ({filteredIssues.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {filteredIssues.map((issue, index) => (
                <div
                  key={issue.id}
                  className={`ios-card-small border border-border/50 p-4 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-[1.02] animate-fade-in group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300">{issue.icon}</span>
                      <h4 className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">{issue.title}</h4>
                    </div>
                    <Badge variant={getStatusColor(issue.status)} className="text-xs ios-card-small">
                      {getStatusIcon(issue.status)}
                      <span className="ml-1 capitalize">{issue.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-primary" />
                      <span className="truncate">{issue.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-primary" />
                      <span>{issue.date}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredIssues.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No issues found for the selected filter</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CityMap;