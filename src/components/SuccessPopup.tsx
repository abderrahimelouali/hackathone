import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Calendar, Users, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    title: string;
    date: string;
    persons: number;
    total: number;
  };
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ isOpen, onClose, bookingDetails }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-background rounded-[2rem] overflow-hidden shadow-2xl border border-border/50"
          >
            {/* Celebration Header */}
            <div className="bg-primary/10 py-8 flex flex-col items-center text-center px-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 shadow-glow shadow-primary/40"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-black text-foreground mb-1">Booking Confirmed!</h2>
              <p className="text-muted-foreground font-medium">Your adventure in Tinghir awaits.</p>
            </div>

            {/* Booking Details Summary */}
            <div className="p-6 space-y-4">
              <div className="bg-muted/30 rounded-2xl p-4 border border-border/30">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Activity Summary</p>
                <h3 className="font-bold text-foreground mb-3">{bookingDetails.title}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{bookingDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{bookingDetails.persons} {bookingDetails.persons > 1 ? 'People' : 'Person'}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center px-2">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Paid</span>
                <span className="text-2xl font-black text-primary">{bookingDetails.total} MAD</span>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/my-bookings');
                  }}
                  className="w-full py-4 bg-primary text-white font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                >
                  View My Bookings
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 text-muted-foreground font-bold text-sm hover:text-foreground transition-all"
                >
                  Dismiss
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopup;
