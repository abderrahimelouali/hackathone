import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, X, Send, User } from 'lucide-react';
import { toast } from 'sonner';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiverName: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, receiverName }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setIsSending(false);
      setMessage('');
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-background rounded-3xl overflow-hidden shadow-2xl border border-border"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-foreground leading-tight">Send a Message</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                      Contacting: <span className="text-foreground font-bold">{receiverName}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-muted transition-all flex items-center justify-center"
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">Your Name</label>
                  <div className="relative">
                    <User className="absolute start-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                    <input
                      type="text"
                      className="w-full bg-muted/40 border border-border rounded-xl py-3.5 ps-11 pe-4 text-foreground focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      placeholder="Enter your name"
                      defaultValue="Tinghir Traveler"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">Your Email</label>
                  <div className="relative">
                    <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                    <input
                      type="email"
                      className="w-full bg-muted/40 border border-border rounded-xl py-3.5 ps-11 pe-4 text-foreground focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      placeholder="Enter your email"
                      defaultValue="traveler@tinghir.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">Message</label>
                  <textarea
                    className="w-full bg-muted/40 border border-border rounded-xl p-5 text-foreground focus:ring-2 focus:ring-primary/20 transition-all font-medium min-h-[140px] resize-none"
                    placeholder="Tell us what you're looking for..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={handleSend}
                    disabled={isSending}
                    className="flex-1 py-4 bg-primary text-white font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                  <div className="flex gap-2">
                    <button className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 transition-all hover:text-primary">
                      <Phone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 text-center border-t border-border/50">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Support provided by Experiencia Tinghir Team
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
