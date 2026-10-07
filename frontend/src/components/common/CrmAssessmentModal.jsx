"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Calendar,
  Building2,
  Mail,
  User,
  Phone,
  Layers,
  Zap,
} from "lucide-react";

export default function CrmAssessmentModal({ isOpen, onClose, defaultService = "" }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    currentSystem: "",
    teamSize: "",
    primaryGoal: defaultService || "",
    secondaryChallenges: [],
    name: "",
    email: "",
    company: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, primaryGoal: defaultService }));
    }
  }, [defaultService]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const systems = [
    { id: "zoho-crm", label: "Zoho CRM (Needs Optimization/Fix)" },
    { id: "zoho-one", label: "Zoho One (Need Full Deployment)" },
    { id: "spreadsheets", label: "Spreadsheets / Google Sheets" },
    { id: "salesforce", label: "Salesforce (Considering Migration)" },
    { id: "hubspot", label: "HubSpot (Considering Migration)" },
    { id: "other", label: "Other / Multiple Disjointed Apps" },
  ];

  const teamSizes = ["1–5 users", "6–20 users", "21–50 users", "50+ enterprise"];

  const challenges = [
    "Sales reps wasting hours on manual data entry",
    "Slow lead follow-up & leads slipping through cracks",
    "Systems don't communicate (ERP, accounting, billing)",
    "Unreliable pipeline forecasting & reporting",
    "Need custom Deluge logic or API integrations",
    "Want AI lead qualification & smart workflows",
  ];

  const handleChallengeToggle = (item) => {
    setFormData((prev) => {
      const exists = prev.secondaryChallenges.includes(item);
      return {
        ...prev,
        secondaryChallenges: exists
          ? prev.secondaryChallenges.filter((c) => c !== item)
          : [...prev.secondaryChallenges, item],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;

    setIsSubmitting(true);
    // In production this can post to a backend endpoint or webhook
    try {
      // Simulate submission & track event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "generate_lead", {
          event_category: "Assessment",
          event_label: formData.currentSystem || "CRM Assessment",
        });
      }
      await new Promise((res) => setTimeout(res, 600));
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({
      currentSystem: "",
      teamSize: "",
      primaryGoal: "",
      secondaryChallenges: [],
      name: "",
      email: "",
      company: "",
      phone: "",
      notes: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040e1f]/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#081b33] border border-[#08e5c0]/30 rounded-3xl shadow-[0_0_50px_rgba(8,229,192,0.2)] text-white overflow-hidden z-10 my-8"
        >
          {/* Header Strip */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#06162b]/80">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#08e5c0]/15 text-[#08e5c0] border border-[#08e5c0]/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Free CRM &amp; Automation Assessment
                </h3>
                <p className="text-xs text-gray-400">
                  Custom bottleneck diagnosis &amp; architectural roadmap
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close assessment modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar (when not submitted) */}
          {!submitted && (
            <div className="w-full bg-white/5 h-1.5">
              <div
                className="bg-gradient-to-r from-[#08e5c0] to-[#00e0ff] h-1.5 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          {/* Content Area */}
          <div className="p-6 sm:p-8">
            {!submitted ? (
              <div>
                {/* STEP 1: Current System & Team Size */}
                {step === 1 && (
                  <div>
                    <div className="mb-6">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#08e5c0] font-bold">
                        Step 1 of 3 • System Profile
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                        What software does your business currently run on?
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Select your current core platform so we can evaluate integration and migration needs.
                      </p>
                    </div>

                    <div className="space-y-2.5 mb-6">
                      {systems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, currentSystem: item.label })}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                            formData.currentSystem === item.label
                              ? "bg-[#0b274a] border-[#08e5c0] text-[#08e5c0] shadow-[0_0_15px_rgba(8,229,192,0.2)]"
                              : "bg-white/[0.03] border-white/10 text-gray-300 hover:border-[#08e5c0]/40 hover:bg-white/[0.06]"
                          }`}
                        >
                          <span>{item.label}</span>
                          {formData.currentSystem === item.label && (
                            <CheckCircle2 className="w-4 h-4 text-[#08e5c0]" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="mb-8">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                        How many team members use this system?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {teamSizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setFormData({ ...formData, teamSize: size })}
                            className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                              formData.teamSize === size
                                ? "bg-[#08e5c0] text-[#071831] border-[#08e5c0]"
                                : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        disabled={!formData.currentSystem}
                        onClick={() => setStep(2)}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                          formData.currentSystem
                            ? "bg-[#08e5c0] text-[#071831] hover:scale-105 shadow-[0_0_20px_rgba(8,229,192,0.4)]"
                            : "bg-white/10 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Continue to Step 2
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Core Bottlenecks */}
                {step === 2 && (
                  <div>
                    <div className="mb-6">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#08e5c0] font-bold">
                        Step 2 of 3 • Operational Friction
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                        Where is your team experiencing the biggest operational drag?
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Select all that apply to guide our architecture audit.
                      </p>
                    </div>

                    <div className="space-y-2.5 mb-8">
                      {challenges.map((c, i) => {
                        const isSelected = formData.secondaryChallenges.includes(c);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleChallengeToggle(c)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-[#0b274a] border-[#08e5c0] text-white shadow-[0_0_15px_rgba(8,229,192,0.15)]"
                                : "bg-white/[0.03] border-white/10 text-gray-300 hover:border-[#08e5c0]/30 hover:bg-white/[0.05]"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "bg-[#08e5c0] border-[#08e5c0] text-[#071831]"
                                    : "border-white/30"
                                }`}
                              >
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </span>
                              <span>{c}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#08e5c0] text-[#071831] hover:scale-105 shadow-[0_0_20px_rgba(8,229,192,0.4)] transition-all"
                      >
                        Continue to Final Step
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact & Delivery */}
                {step === 3 && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#08e5c0] font-bold">
                        Step 3 of 3 • Delivery Details
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                        Where should we send your Assessment Roadmap?
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Our senior Zoho architects will review your inputs and formulate a tailored action plan.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Alex Morgan"
                            className="w-full bg-[#051426] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#08e5c0] focus:ring-1 focus:ring-[#08e5c0]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Work Email *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full bg-[#051426] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#08e5c0] focus:ring-1 focus:ring-[#08e5c0]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Company Name *
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Apex Logistics"
                            className="w-full bg-[#051426] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#08e5c0] focus:ring-1 focus:ring-[#08e5c0]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Phone Number (Optional)
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-[#051426] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#08e5c0] focus:ring-1 focus:ring-[#08e5c0]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Specific Goals or Questions (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. Need to sync QuickBooks with Zoho CRM and automate sales pipeline follow-ups."
                        className="w-full bg-[#051426] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#08e5c0] focus:ring-1 focus:ring-[#08e5c0]"
                      />
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#08e5c0]" />
                        Bilateral NDA Protected
                      </span>
                      <span>•</span>
                      <span>Zero Spam Guarantee</span>
                      <span>•</span>
                      <span>Turnaround: &lt; 2 Business Hours</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-[#08e5c0] text-[#071831] hover:scale-105 shadow-[0_0_25px_rgba(8,229,192,0.5)] transition-all"
                      >
                        {isSubmitting ? (
                          <span>Analyzing System...</span>
                        ) : (
                          <>
                            Generate My Assessment Roadmap
                            <Sparkles className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* SUBMITTED / CONFIRMATION STATE */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-[#08e5c0]/15 text-[#08e5c0] border border-[#08e5c0]/30 mx-auto flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(8,229,192,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-2">
                  Assessment Request Received
                </span>

                <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  Thank You, {formData.name || "there"}!
                </h4>

                <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6">
                  Our Senior Solutions Architect is reviewing your configuration for{" "}
                  <strong className="text-white">{formData.company || "your business"}</strong>. We will formulate a tailored architectural roadmap for{" "}
                  <strong className="text-[#08e5c0]">{formData.currentSystem || "your CRM environment"}</strong> and deliver it to{" "}
                  <span className="text-white underline">{formData.email}</span> within 2 business hours.
                </p>

                {/* Next Step Fast-Track Callout */}
                <div className="bg-[#0b274a]/80 border border-[#08e5c0]/30 rounded-2xl p-6 max-w-lg mx-auto mb-6 text-left">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#08e5c0] font-bold mb-2">
                    <Zap className="w-4 h-4" />
                    Want Immediate Advice?
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    Fast-track your consultation and speak directly with a Principal Zoho Architect today.
                  </p>
                  <a
                    href="https://insyrge.zohobookings.com/#/4623360000000149002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs bg-[#08e5c0] text-[#071831] hover:scale-105 shadow-[0_0_20px_rgba(8,229,192,0.4)] transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Priority 1-on-1 Discovery Call
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-gray-400 hover:text-white underline underline-offset-4"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
