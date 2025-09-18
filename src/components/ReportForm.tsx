import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Camera, Upload, Mic, MicOff, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveReport } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import LocationPicker from "@/components/LocationPicker";
import { uploadFileAndGetSignedUrl } from "@/lib/supabase";
import { useLanguage } from "@/lib/language";

const ReportForm = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("medium");
  const [coords, setCoords] = useState<{ lat?: number; lng?: number }>({});
  const [mapSelection, setMapSelection] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { uid } = useAuth();
  const { t } = useLanguage();

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setCoords({ lat: latitude, lng: longitude });
          toast({
            title: "Location detected",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to detect location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapSelection) {
      toast({ title: "Select a location", description: "Use the map or search to pick a valid place.", variant: "destructive" });
      return;
    }
    try {
      const { id, ticketId } = await saveReport({
        category,
        description,
        locationText: mapSelection.label,
        latitude: mapSelection.lat,
        longitude: mapSelection.lng,
        priority,
        uid: uid || undefined,
      } as any);

      // Upload media to Supabase under reports/{ticketId}/
      const uploadedPhotos: string[] = [];
      for (const file of photoFiles) {
        const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
        const url = await uploadFileAndGetSignedUrl(file, `reports/${ticketId}/${safeName}`);
        uploadedPhotos.push(url);
      }
      let audioUrl: string | undefined;
      if (audioFile) {
        const safeName = `${Date.now()}-${audioFile.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
        audioUrl = await uploadFileAndGetSignedUrl(audioFile, `reports/${ticketId}/${safeName}`);
      }
      let videoUrl: string | undefined;
      if (videoFile) {
        const safeName = `${Date.now()}-${videoFile.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
        videoUrl = await uploadFileAndGetSignedUrl(videoFile, `reports/${ticketId}/${safeName}`);
      }

      // Save media URLs back into Firestore document
      try {
        const { updateReportStatus } = await import("@/lib/firebase"); // dynamic import avoided; we'll update doc directly below
      } catch {}
      try {
        const { doc, updateDoc } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        const ref = doc(db as any, "reports", id);
        await updateDoc(ref as any, {
          photos: uploadedPhotos.length ? uploadedPhotos : undefined,
          audioUrl: audioUrl || null,
          videoUrl: videoUrl || null,
        });
      } catch {}
      setIsSubmitted(true);
      toast({
        title: "Report submitted successfully!",
        description: `Your issue has been received. ID: ${ticketId}`,
      });
      setTimeout(() => setIsSubmitted(false), 3000);
      setCategory("");
      setDescription("");
      setLocation("");
      setCoords({});
      setMapSelection(null);
      setPriority("medium");
      setPhotoFiles([]);
      setAudioFile(null);
      setVideoFile(null);
    } catch (error: any) {
      // Surface full error for debugging Firestore rules/auth issues
      // eslint-disable-next-line no-console
      console.error("Firestore addDoc error", error?.code, error?.message, error);
      toast({
        title: "Failed to submit report",
        description: error?.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording ? "Voice note saved" : "Speak your message now",
    });
  };

  if (isSubmitted) {
    return (
      <section id="report" className="py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-lg mx-auto text-center ios-card-large glass-card border-0 shadow-elegant animate-scale-in">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-pulse-soft">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
                   <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-success to-success/80 bg-clip-text text-transparent">
                     {t('report.submitted')}
                   </h3>
                   <p className="text-muted-foreground mb-6 text-lg">
                     {t('report.submittedDesc')} <strong className="text-foreground">#CIV-2024-001</strong>
                   </p>
                   <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
                     <p className="text-sm text-success-foreground">
                       📧 {t('report.notifications')}
                     </p>
                   </div>
                   <Button
                     className="ios-card-small bg-gradient-to-r from-primary to-primary-glow hover:from-primary-hover hover:to-primary text-white transition-all duration-300 hover:scale-105"
                     onClick={() => setIsSubmitted(false)}
                   >
                     {t('report.submitAnother')}
                   </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="report" className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="ios-card-large glass-card border-0 shadow-elegant overflow-hidden">
                 <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50">
                   <CardTitle className="flex items-center text-2xl font-bold">
                     <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow ios-card-small flex items-center justify-center mr-3 shadow-glow">
                       <Camera className="w-5 h-5 text-white" />
                     </div>
                     {t('report.issueDetails')}
                   </CardTitle>
                   <p className="text-muted-foreground mt-2">
                     {t('report.issueDetailsDesc')}
                   </p>
                 </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Issue Category */}
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-base font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {t('report.categoryRequired')}
                  </Label>
                  <Select required value={category} onValueChange={setCategory}>
                    <SelectTrigger className="ios-card-small border-2 border-border/50 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder={t('report.category')} />
                    </SelectTrigger>
                    <SelectContent className="ios-card-small">
                      <SelectItem value="pothole" className="py-3">🕳️ {t('common.pothole')}</SelectItem>
                      <SelectItem value="streetlight" className="py-3">💡 {t('common.streetlight')}</SelectItem>
                      <SelectItem value="garbage" className="py-3">🗑️ {t('common.garbage')}</SelectItem>
                      <SelectItem value="graffiti" className="py-3">🎨 {t('common.graffiti')}</SelectItem>
                      <SelectItem value="sidewalk" className="py-3">🚶 {t('common.sidewalk')}</SelectItem>
                      <SelectItem value="traffic" className="py-3">🚦 {t('common.traffic')}</SelectItem>
                      <SelectItem value="parks" className="py-3">🌳 {t('common.parks')}</SelectItem>
                      <SelectItem value="other" className="py-3">📝 {t('common.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location via map/search */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {t('report.locationRequired')}
                  </Label>
                  <div className="ios-card-small border-2 border-border/50 overflow-hidden">
                    <LocationPicker value={mapSelection} onChange={setMapSelection} height={320} />
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                    💡 {t('report.locationDesc')}
                  </div>
                </div>

                {/* Media Upload Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="text-lg font-semibold">{t('report.mediaEvidence')}</h3>
                    <span className="text-sm text-muted-foreground">{t('report.mediaOptional')}</span>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Camera className="w-4 h-4 text-primary" />
                      {t('report.photoEvidence')}
                    </Label>
                    <div className="border-2 border-dashed border-border/50 ios-card-small p-8 text-center hover:border-primary/50 transition-all duration-300 hover:bg-primary/5 group">
                      <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      <p className="text-base font-medium mb-2">
                        {t('report.photoDesc')}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t('report.photoFormats')}
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setPhotoFiles(Array.from(e.target.files || []))}
                        className="block w-full text-sm text-muted-foreground mt-3"
                      />
                    </div>
                  </div>

                  {/* Audio & Video Uploads */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Audio Upload */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <Mic className="w-4 h-4 text-primary" />
                        {t('report.audioRecording')}
                      </Label>
                      <div className="border-2 border-dashed border-border/50 ios-card-small p-6 text-center hover:border-primary/50 transition-all duration-300 hover:bg-primary/5">
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => setAudioFile((e.target.files && e.target.files[0]) || null)}
                          className="block w-full text-sm text-muted-foreground"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          {t('report.audioFormats')}
                        </p>
                      </div>
                    </div>

                    {/* Video Upload */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <Camera className="w-4 h-4 text-primary" />
                        {t('report.videoEvidence')}
                      </Label>
                      <div className="border-2 border-dashed border-border/50 ios-card-small p-6 text-center hover:border-primary/50 transition-all duration-300 hover:bg-primary/5">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setVideoFile((e.target.files && e.target.files[0]) || null)}
                          className="block w-full text-sm text-muted-foreground"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          {t('report.videoFormats')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {t('report.description')}
                  </Label>
                  <Textarea
                    id="description"
                    placeholder={t('report.descriptionPlaceholder')}
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="ios-card-small border-2 border-border/50 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                {/* Voice Note */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {t('report.voiceNote')}
                  </Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant={isRecording ? "destructive" : "outline"}
                      onClick={toggleRecording}
                      className="ios-card-small border-2 transition-all duration-300 hover:scale-105"
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="w-4 h-4 mr-2" />
                          {t('report.stopRecording')}
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          {t('report.recordVoice')}
                        </>
                      )}
                    </Button>
                    {isRecording && (
                      <div className="flex items-center text-sm text-muted-foreground bg-urgent/10 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-urgent rounded-full mr-2 animate-pulse"></div>
                        {t('report.recording')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-3">
                  <Label htmlFor="priority" className="text-base font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {t('report.priority')}
                  </Label>
                  <Select value={priority} onValueChange={(v) => setPriority(v as any)}>
                    <SelectTrigger className="ios-card-small border-2 border-border/50 hover:border-primary/50 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="ios-card-small">
                      <SelectItem value="low" className="py-3">🟢 {t('common.low')} - Cosmetic issues</SelectItem>
                      <SelectItem value="medium" className="py-3">🟡 {t('common.medium')} - Standard repair</SelectItem>
                      <SelectItem value="high" className="py-3">🟠 {t('common.high')} - Safety concern</SelectItem>
                      <SelectItem value="urgent" className="py-3">🔴 {t('common.urgent')} - Immediate danger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-hover hover:to-primary text-white text-lg py-6 ios-card-large transition-all duration-300 hover:scale-105 hover:shadow-elegant shadow-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {t('report.submitReport')}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    {t('report.submitDesc')}
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReportForm;