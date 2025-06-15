
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Star, Sparkles } from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionType: string;
}

export default function CertificateModal({ isOpen, onClose, sessionType }: CertificateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-yellow-900/90 to-orange-900/90 border-yellow-600/50 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-yellow-200">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Award className="h-16 w-16 text-yellow-400 animate-bounce" />
                <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>
            Congratulations!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <div className="bg-black/30 rounded-lg p-4 border border-yellow-600/30">
            <p className="text-lg text-yellow-200 mb-2">
              You've completed your
            </p>
            <p className="text-2xl font-bold text-yellow-300">
              {sessionType}
            </p>
          </div>
          
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 text-yellow-400 fill-current animate-pulse" />
            ))}
          </div>
          
          <p className="text-yellow-200">
            Your commitment to growth is inspiring. Every session builds your leadership capacity and nervous system resilience.
          </p>
          
          <p className="text-sm text-yellow-300/80">
            Keep up the amazing work on your transformation journey!
          </p>
          
          <Button 
            onClick={onClose}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold"
          >
            Continue Journey
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
