import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Search, 
  Filter,
  MapPin,
  Camera,
  User,
  Calendar,
  BarChart3,
  FileText,
  LogOut,
  Download,
  Eye,
  Play,
  Pause,
  Volume2
} from "lucide-react";
import { Link } from "react-router-dom";
import LeafletMap from "@/components/LeafletMap";

import { subscribeToReports, ReportDoc, updateReportStatus } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useLanguage } from "@/lib/language";

const AdminDashboard = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState<ReportDoc[]>([]);
  const [statusUpdate, setStatusUpdate] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const unsub = subscribeToReports(setReports);
    return () => unsub();
  }, []);

  const mockIssues = useMemo(() => {
    return reports.map((r) => ({
      id: r.id,
      title: r.category,
      description: r.description,
      category: r.category,
      status: r.status || "pending",
      priority: r.priority,
      location: r.latitude && r.longitude ? `${r.latitude}, ${r.longitude}` : r.locationText,
      submittedBy: r.uid || "anonymous",
      submittedAt: (r.createdAt || new Date()).toISOString(),
      photos: r.photos || [],
      assignedTo: null
    }));
  }, [reports]);

  useEffect(() => {
    // When a new issue is selected, default the dropdown to its current status
    if (selectedIssue) {
      setStatusUpdate(selectedIssue.status || "");
    } else {
      setStatusUpdate("");
    }
  }, [selectedIssue]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-warning/20 text-warning hover:bg-warning/30",
      "in-progress": "bg-primary/20 text-primary hover:bg-primary/30",
      resolved: "bg-success/20 text-success hover:bg-success/30"
    };
    return variants[status] || variants.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-destructive/20 text-destructive hover:bg-destructive/30",
      medium: "bg-warning/20 text-warning hover:bg-warning/30",
      low: "bg-success/20 text-success hover:bg-success/30"
    };
    return variants[priority] || variants.medium;
  };

  const filteredIssues = mockIssues.filter(issue => {
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = useMemo(() => ({
    total: mockIssues.length,
    pending: mockIssues.filter(i => i.status === "pending").length,
    inProgress: mockIssues.filter(i => i.status === "in-progress").length,
    resolved: mockIssues.filter(i => i.status === "resolved").length
  }), [mockIssues]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float [animation-delay:3s]"></div>
      
      {/* Enhanced Header */}
      <header className="relative z-10 bg-card/90 backdrop-blur-md border-b border-border/50 shadow-elegant">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center shadow-glow">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary-hover bg-clip-text text-transparent">
                  Authority Dashboard
                </h1>
                <p className="text-muted-foreground font-medium">Municipal Issue Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild className="ios-card-small border-2 border-primary/30 hover:border-primary transition-all duration-300">
                <Link to="/map">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Public Map
                </Link>
              </Button>
              <Button variant="outline" asChild className="ios-card-small border-2 border-destructive/30 hover:border-destructive transition-all duration-300">
                <Link to="/">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="ios-card-large glass-card border-0 shadow-elegant hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Total Issues</p>
                  <p className="text-4xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center shadow-glow group-hover:shadow-primary/40 transition-all duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card-large glass-card border-0 shadow-elegant hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Pending</p>
                  <p className="text-4xl font-bold text-warning">{stats.pending}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-warning to-warning/80 ios-card-small flex items-center justify-center shadow-glow group-hover:shadow-warning/40 transition-all duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card-large glass-card border-0 shadow-elegant hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">In Progress</p>
                  <p className="text-4xl font-bold text-primary">{stats.inProgress}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center shadow-glow group-hover:shadow-primary/40 transition-all duration-300">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card-large glass-card border-0 shadow-elegant hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Resolved</p>
                  <p className="text-4xl font-bold text-success">{stats.resolved}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-success to-success/80 ios-card-small flex items-center justify-center shadow-glow group-hover:shadow-success/40 transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enhanced Issues List */}
          <div className="xl:col-span-2">
            <Card className="ios-card-large glass-card border-0 shadow-elegant">
              <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-2xl font-bold">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center mr-3 shadow-glow">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    Issue Management
                  </CardTitle>
                  <Button variant="outline" size="sm" className="ios-card-small border-2 border-primary/30 hover:border-primary transition-all duration-300">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                
                {/* Enhanced Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search issues by title or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 ios-card-small border-2 border-border/50 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-48 h-12 ios-card-small border-2 border-border/50 focus:border-primary/50 transition-all duration-300">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="ios-card-small">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {filteredIssues.map((issue) => (
                    <Card 
                      key={issue.id} 
                      className={`p-5 ios-card-small border-2 transition-all duration-300 cursor-pointer group hover:scale-[1.02] ${
                        selectedIssue?.id === issue.id 
                          ? 'border-primary/50 bg-primary/5 shadow-elegant' 
                          : 'border-border/30 hover:border-primary/30 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          {/* Header with title and badges */}
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-lg text-foreground truncate">{issue.title}</h3>
                            <div className="flex gap-2 flex-shrink-0">
                              <Badge className={`${getStatusBadge(issue.status)} ios-card-small px-3 py-1 text-xs font-medium`}>
                                {issue.status.replace("-", " ")}
                              </Badge>
                              <Badge className={`${getPriorityBadge(issue.priority)} ios-card-small px-3 py-1 text-xs font-medium`}>
                                {issue.priority}
                              </Badge>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-muted-foreground mb-3 line-clamp-2 text-sm leading-relaxed">
                            {issue.description}
                          </p>
                          
                          {/* Metadata */}
                          <div className="flex items-center gap-6 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate max-w-32">{issue.location}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span className="truncate max-w-20">{issue.submittedBy}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(issue.submittedAt).toLocaleDateString()}</span>
                            </span>
                          </div>
                        </div>
                        
                        {/* Media indicator */}
                        <div className="ml-4 flex-shrink-0">
                          <div className="w-14 h-14 bg-gradient-to-br from-muted to-muted/80 ios-card-small flex items-center justify-center group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300">
                            <Camera className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {filteredIssues.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">No issues found</p>
                      <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Issue Detail Panel */}
          <div>
            <Card className="ios-card-large glass-card border-0 shadow-elegant">
              <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50">
                <CardTitle className="flex items-center text-xl font-bold">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center mr-3 shadow-glow">
                    <Eye className="w-3 h-3 text-white" />
                  </div>
                  Issue Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedIssue ? (
                  <div className="space-y-6">
                    {/* Issue Header */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-xl mb-3 text-foreground">{selectedIssue.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{selectedIssue.description}</p>
                      </div>
                      <div className="flex gap-3">
                        <Badge className={`${getStatusBadge(selectedIssue.status)} ios-card-small px-4 py-2 text-sm font-medium`}>
                          {selectedIssue.status.replace("-", " ")}
                        </Badge>
                        <Badge className={`${getPriorityBadge(selectedIssue.priority)} ios-card-small px-4 py-2 text-sm font-medium`}>
                          {selectedIssue.priority}
                        </Badge>
                      </div>
                    </div>

                    {/* Issue Information */}
                    <div className="space-y-4">
                      <div className="bg-muted/30 ios-card-small p-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <span className="text-sm font-semibold text-foreground">Location</span>
                              <p className="text-sm text-muted-foreground mt-1">{selectedIssue.location}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <span className="text-sm font-semibold text-foreground">Submitted by</span>
                              <p className="text-sm text-muted-foreground mt-1">{selectedIssue.submittedBy}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <span className="text-sm font-semibold text-foreground">Date</span>
                              <p className="text-sm text-muted-foreground mt-1">
                                {new Date(selectedIssue.submittedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <span className="text-sm font-semibold text-foreground">Assigned to</span>
                              <p className="text-sm text-muted-foreground mt-1">
                                {selectedIssue.assignedTo || "Unassigned"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Map Section */}
                    {selectedIssue && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="text-sm font-semibold text-foreground">Location Map</span>
                        </div>
                        <div className="ios-card-small overflow-hidden border-2 border-border/30">
                          <LeafletMap
                            issues={[{
                              id: selectedIssue.id,
                              type: selectedIssue.category,
                              status: selectedIssue.status,
                              title: selectedIssue.title,
                              location: selectedIssue.location,
                              priority: selectedIssue.priority,
                              date: new Date(selectedIssue.submittedAt).toISOString().slice(0,10),
                              icon: selectedIssue.category === "streetlight" ? "💡" : selectedIssue.category === "garbage" ? "🗑️" : selectedIssue.category === "pothole" ? "🕳️" : "📍",
                              lat: Number(selectedIssue.location.split(',')[0]) || 20.5937,
                              lng: Number(selectedIssue.location.split(',')[1]) || 78.9629,
                            }]}
                            selectedFilter="all"
                          />
                        </div>
                        
                        {/* Enhanced Media Section */}
                        <div className="space-y-4">
                          {selectedIssue.photos?.length ? (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Camera className="w-5 h-5 text-primary" />
                                <span className="text-sm font-semibold text-foreground">Photos ({selectedIssue.photos.length})</span>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {selectedIssue.photos.map((url: string, idx: number) => (
                                  <div key={idx} className="ios-card-small overflow-hidden border-2 border-border/30 group cursor-pointer hover:border-primary/50 transition-all duration-300">
                                    <img
                                      src={url}
                                      alt="evidence"
                                      className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                                      onClick={() => setPreviewImage(url)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                          
                          {selectedIssue.audioUrl && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Volume2 className="w-5 h-5 text-primary" />
                                <span className="text-sm font-semibold text-foreground">Audio Recording</span>
                              </div>
                              <div className="ios-card-small p-4 border-2 border-border/30">
                                <audio controls src={selectedIssue.audioUrl} className="w-full" />
                              </div>
                            </div>
                          )}
                          
                          {selectedIssue.videoUrl && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Play className="w-5 h-5 text-primary" />
                                <span className="text-sm font-semibold text-foreground">Video Evidence</span>
                              </div>
                              <div className="ios-card-small overflow-hidden border-2 border-border/30">
                                <video controls src={selectedIssue.videoUrl} className="w-full" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Enhanced Action Controls */}
                    <div className="space-y-4 pt-4 border-t border-border/50">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground">Update Status</label>
                        <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                          <SelectTrigger className="ios-card-small border-2 border-border/50 focus:border-primary/50 transition-all duration-300">
                            <SelectValue placeholder="Select new status" />
                          </SelectTrigger>
                          <SelectContent className="ios-card-small">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground">Assign Department</label>
                        <Select>
                          <SelectTrigger className="ios-card-small border-2 border-border/50 focus:border-primary/50 transition-all duration-300">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent className="ios-card-small">
                            <SelectItem value="roads">Roads Department</SelectItem>
                            <SelectItem value="electrical">Electrical Department</SelectItem>
                            <SelectItem value="sanitation">Sanitation Department</SelectItem>
                            <SelectItem value="parks">Parks & Recreation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        className="w-full ios-card-small bg-gradient-to-r from-primary to-primary-glow hover:from-primary-hover hover:to-primary text-white transition-all duration-300 hover:scale-105 shadow-lg" 
                        disabled={!selectedIssue || !statusUpdate}
                        onClick={async () => {
                          if (!selectedIssue || !statusUpdate) return;
                          try {
                            await updateReportStatus(selectedIssue.id, statusUpdate as any);
                            toast({ title: "Status updated", description: `Report set to ${statusUpdate}` });
                          } catch (err: any) {
                            // eslint-disable-next-line no-console
                            console.error("Failed to update status", err);
                            toast({ title: "Failed to update", description: err?.message || "Permission or network issue", variant: "destructive" });
                          }
                        }}
                      >
                        Update Issue Status
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/80 ios-card-small flex items-center justify-center mx-auto mb-6 shadow-glow">
                      <FileText className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Issue Selected</h3>
                    <p className="text-muted-foreground">Select an issue from the list to view detailed information and manage its status</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Enhanced Image Preview Dialog */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-5xl ios-card-large">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Image Preview</span>
            </div>
          </DialogHeader>
          {previewImage && (
            <div className="ios-card-small overflow-hidden border-2 border-border/30">
              <img src={previewImage} alt="preview" className="w-full h-auto" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;