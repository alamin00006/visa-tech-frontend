import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Globe,
  Shield,
  User as UserIcon,
  Building2,
  Menu,
  X,
  MessageSquare,
  Lock,
  Phone,
  FileText,
  LogOut,
  ChevronRight,
  CheckCircle,
  Upload,
  Database,
  Download,
  Edit,
  Trash2,
  Save,
  XCircle,
  Users,
  Send,
  Star,
  Flag,
  DollarSign,
  Key,
  Zap,
  CheckSquare,
} from "lucide-react";
import { Language, User, AppointmentData, ChatMessage } from "./types";
import {
  TRANSLATIONS,
  t,
  CONTACT_NUMBER,
  PRICE_REGULAR,
  PRICE_FAST,
  authKey,
} from "./constants";
import { db } from "./db";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useGetUser from "./hooks/useGetUser";
import useGetAllUser from "./hooks/useGetAllUser";
import useGetAllCGIData from "./hooks/useGetAllCGIData";

import { removeUserInfo } from "./utils";

// --- Components ---

const Navbar = ({
  lang,
  setLang,
  user,
  onLogout,
  setView,
  onAdminClick,
}: {
  lang: Language;
  setLang: (l: Language) => void;
  user: User | null;
  onLogout: () => void;
  setView: (v: string) => void;
  onAdminClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Aesthetics: Highly contrasting dark glossy navbar
    <nav className="fixed top-0 w-full z-50 bg-[#020408]/90 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => setView("home")}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-2 rounded-lg mr-3 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-orbitron font-bold text-white tracking-wider">
                APOLLO VISA TECH
              </span>
              <div className="flex items-center gap-1">
                <span className="h-0.5 w-6 bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.5)]"></span>
                <span className="text-[10px] text-gray-400 tracking-[0.1em] ml-1 font-rajdhani uppercase">
                  USA Embassy Date Booking Support
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setView("home")}
                className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t(lang, "home")}
              </button>
              <button
                onClick={() => setView("about")}
                className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t(lang, "about")}
              </button>

              {!user ? (
                <>
                  <button
                    onClick={() => setView("register-client")}
                    className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t(lang, "clientReg")}
                  </button>
                  <button
                    onClick={() => setView("register-agency")}
                    className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t(lang, "agencyReg")}
                  </button>
                  <button
                    onClick={() => setView("login")}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-all border border-white/5"
                  >
                    {t(lang, "login")}
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setView("cgi-portal")}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-700 text-white px-4 py-2 rounded-full font-bold hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all shadow-lg border border-amber-400/20"
                  >
                    <Database size={16} />
                    {t(lang, "cgiNav")}
                  </button>

                  <button
                    onClick={() => setView("profile")}
                    className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors"
                  >
                    <UserIcon size={18} />
                    <span className="font-bold">{user.name}</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      removeUserInfo(authKey);
                      window.location.reload();
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              )}

              <button
                onClick={onAdminClick}
                className="flex items-center space-x-1 text-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5 active:scale-95 transform"
                title={t(lang, "adminPanel")}
              >
                <Lock size={16} />
                <span className="hidden lg:inline">
                  {t(lang, "adminPanel")}
                </span>
              </button>

              <button
                onClick={() => setLang(lang === "en" ? "bn" : "en")}
                className="flex items-center space-x-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full hover:bg-white/10 transition-all"
              >
                <Globe size={14} className="text-gray-300" />
                <span className="uppercase text-xs font-bold text-gray-300">
                  {lang}
                </span>
              </button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#050B14] border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                setView("home");
                setIsOpen(false);
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white w-full text-left"
            >
              {t(lang, "home")}
            </button>
            <button
              onClick={() => {
                setView("about");
                setIsOpen(false);
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white w-full text-left"
            >
              {t(lang, "about")}
            </button>
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setView("register-client");
                    setIsOpen(false);
                  }}
                  className="block px-3 py-2 text-white font-bold w-full text-left hover:bg-white/10"
                >
                  {t(lang, "clientReg")}
                </button>
                <button
                  onClick={() => {
                    setView("register-agency");
                    setIsOpen(false);
                  }}
                  className="block px-3 py-2 text-white font-bold w-full text-left hover:bg-white/10"
                >
                  {t(lang, "agencyReg")}
                </button>
                <button
                  onClick={() => {
                    setView("login");
                    setIsOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-400 w-full text-left hover:bg-white/10"
                >
                  {t(lang, "login")}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setView("cgi-portal");
                    setIsOpen(false);
                  }}
                  className="block px-3 py-2 text-amber-400 font-bold w-full text-left hover:bg-white/10 flex items-center gap-2"
                >
                  <Database size={16} /> {t(lang, "cgiNav")}
                </button>
                <button
                  onClick={onLogout}
                  className="block px-3 py-2 text-red-400 w-full text-left hover:bg-white/10"
                >
                  {t(lang, "logout")}
                </button>
              </>
            )}

            <button
              onClick={() => {
                onAdminClick();
                setIsOpen(false);
              }}
              className="block px-3 py-2 text-gray-500 hover:text-white w-full text-left flex items-center gap-2 hover:bg-white/10"
            >
              <Lock size={16} /> {t(lang, "adminPanel")}
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="block px-3 py-2 text-amber-400 w-full text-left hover:bg-white/10"
            >
              Switch Language ({lang.toUpperCase()})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({
  lang,
  onBookNow,
  user,
}: {
  lang: Language;
  onBookNow: () => void;
  user: User | null;
}) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 bg-transparent">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524813642375-9686a3b2b488?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-[#050B14]/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center justify-center p-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Star
              className="text-amber-400 mr-2 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              fill="currentColor"
              size={14}
            />
            <span className="text-xs md:text-sm font-bold text-gray-200 tracking-[0.1em] uppercase font-orbitron">
              Very Emergency Appointment Date Booking System for Aspirants
            </span>
            <Star
              className="text-amber-400 ml-2 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              fill="currentColor"
              size={14}
            />
          </div>

          <h1 className="text-6xl md:text-9xl font-orbitron font-black mb-8 tracking-tighter leading-none">
            <span className="bg-gradient-to-b from-blue-100 via-blue-300 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              AMERICAN
            </span>
            <br />
            <span className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              DREAMS
            </span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-rajdhani font-light border-t border-b border-white/5 py-6 bg-black/20 backdrop-blur-sm">
            {t(lang, "heroDesc")}
          </p>

          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ y: -10 }}
              className="group bg-[#0A1628]/80 backdrop-blur-xl border border-blue-500/30 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/20">
                  Standard
                </div>
                <Globe className="text-blue-500/50" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 text-left">
                Average Appointment
              </h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white font-orbitron">
                  {PRICE_REGULAR}
                </span>
                <span className="text-sm text-gray-400 ml-2">BDT</span>
              </div>
              <ul className="text-sm text-gray-400 space-y-3 mb-8 text-left font-rajdhani font-medium">
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-3 text-blue-500" />{" "}
                  Standard Processing Queue
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-3 text-blue-500" /> 24/7
                  Portal Access
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-3 text-blue-500" />{" "}
                  Secure Data Handling
                </li>
              </ul>
              <button
                onClick={onBookNow}
                className="w-full py-4 bg-gradient-to-r from-blue-900 to-slate-900 hover:from-blue-800 hover:to-slate-800 rounded-xl font-bold text-blue-100 transition-all border border-blue-500/30 shadow-lg shadow-blue-900/20 group-hover:shadow-blue-500/20"
              >
                Select Standard
              </button>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="group bg-[#1a1205]/80 backdrop-blur-xl border border-amber-500/30 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500 blur-[50px] opacity-40"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.5)] flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> Express
                </div>
                <Star className="text-amber-500" fill="currentColor" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 text-left">
                Early Date Priority
              </h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-orbitron">
                  {PRICE_FAST}
                </span>
                <span className="text-sm text-gray-400 ml-2">BDT</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-3 mb-8 text-left font-rajdhani font-medium">
                <li className="flex items-center">
                  <Rocket size={16} className="mr-3 text-amber-500" /> Priority
                  Algorithm Tracking
                </li>
                <li className="flex items-center">
                  <Rocket size={16} className="mr-3 text-amber-500" /> Earliest
                  Date Guarantee
                </li>
                <li className="flex items-center">
                  <Rocket size={16} className="mr-3 text-amber-500" /> Instant
                  SMS Notification
                </li>
              </ul>
              <button
                onClick={onBookNow}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 rounded-xl font-bold text-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
              >
                Select Express
              </button>
            </motion.div>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookNow}
              className="group relative px-12 py-6 bg-transparent overflow-hidden rounded-full"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 opacity-80 group-hover:opacity-100 transition-opacity border border-blue-400/50 rounded-full"></div>
              <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="relative flex items-center gap-4 text-white font-orbitron font-bold text-xl tracking-widest z-10">
                <Rocket
                  size={24}
                  className="text-amber-400 group-hover:animate-pulse"
                />
                <span>{t(lang, "bookNow")}</span>
              </div>
              <div className="absolute -inset-2 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full z-0"></div>
            </motion.button>

            <div className="mt-8 flex items-center gap-3 text-gray-400 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
              <Phone size={14} className="text-white" />
              <span className="font-mono text-sm tracking-wider">
                {CONTACT_NUMBER}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050B14] to-transparent z-10"></div>
    </div>
  );
};

// --- Form Components ---

const CgiDataPortalForm = ({
  lang,
  onSubmit,
}: {
  lang: Language;
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    secQ1: "",
    secA1: "",
    secQ2: "",
    secA2: "",
    secQ3: "",
    secA3: "",
    personCount: 1,
    priority: "regular",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { userData } = useGetUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newAppointment: AppointmentData = {
        id: Math.random().toString(36).substr(2, 9),
        userId: userData?.data?.id,
        userName: formData.username,
        userType: userData?.data?.role as "client" | "agency",
        portalUsername: formData.username,
        portalPassword: formData.password,
        securityQ1: formData.secQ1,
        securityA1: formData.secA1,
        securityQ2: formData.secQ2,
        securityA2: formData.secA2,
        securityQ3: formData.secQ3,
        securityA3: formData.secA3,
        personCount: Number(formData.personCount),
        priority: formData.priority as "regular" | "fast",
        startDate: formData.startDate,
        endDate: formData.endDate,
        submittedAt: new Date().toISOString(),
        status: "pending",
      };

      const { data } = await axios.post(
        `https://visa-tech-backend.onrender.com/api/v1/client-submission`,
        JSON.stringify(newAppointment),
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem(authKey)}`,
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data?.message || "Registration failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mt-10 bg-usa-navy/95 p-8 rounded-2xl border-4 border-usa-red backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-usa-blue via-white to-usa-red"></div>

      <div className="mb-8 border-b border-white/10 pb-6 text-center pt-4">
        <h3 className="text-4xl font-black font-orbitron text-white flex items-center justify-center gap-3 tracking-wide">
          <Database size={40} className="text-usa-red" />
          {t(lang, "cgiTitle")}
        </h3>
        <p className="text-gray-300 mt-2 text-lg font-rajdhani">
          {t(lang, "cgiDesc")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-black/20 p-4 rounded-xl border border-white/10 mb-6">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
            <Star size={16} className="text-yellow-400" /> {t(lang, "priority")}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              className={`cursor-pointer p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${
                formData.priority === "regular"
                  ? "bg-usa-blue/50 border-usa-blue"
                  : "bg-transparent border-white/10 hover:bg-white/5"
              }`}
            >
              <input
                type="radio"
                name="priority"
                value="regular"
                checked={formData.priority === "regular"}
                onChange={handleChange}
                className="hidden"
              />
              <div className="h-5 w-5 rounded-full border-2 border-white flex items-center justify-center">
                {formData.priority === "regular" && (
                  <div className="h-3 w-3 bg-white rounded-full"></div>
                )}
              </div>
              <span className="font-bold text-white">
                {t(lang, "prioRegular")}
              </span>
            </label>
            <label
              className={`cursor-pointer p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${
                formData.priority === "fast"
                  ? "bg-usa-red/50 border-usa-red"
                  : "bg-transparent border-white/10 hover:bg-white/5"
              }`}
            >
              <input
                type="radio"
                name="priority"
                value="fast"
                checked={formData.priority === "fast"}
                onChange={handleChange}
                className="hidden"
              />
              <div className="h-5 w-5 rounded-full border-2 border-white flex items-center justify-center">
                {formData.priority === "fast" && (
                  <div className="h-3 w-3 bg-white rounded-full"></div>
                )}
              </div>
              <span className="font-bold text-white">
                {t(lang, "prioFast")}
              </span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-bold">
              {t(lang, "username")}
            </label>
            <input
              required
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/20 rounded-lg p-3 focus:border-usa-red focus:bg-black/60 outline-none transition-all text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-bold">
              {t(lang, "password")}
            </label>
            <input
              required
              type="text"
              name="password"
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/20 rounded-lg p-3 focus:border-usa-red focus:bg-black/60 outline-none transition-all text-white"
            />
          </div>
        </div>

        <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <h4 className="text-usa-red font-bold flex items-center gap-2">
            <Key size={16} /> Security Questions
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                required
                type="text"
                name="secQ1"
                placeholder={t(lang, "secQ1")}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 p-2 focus:border-usa-blue outline-none text-white placeholder-gray-500"
              />
            </div>
            <div className="col-span-1">
              <input
                required
                type="text"
                name="secA1"
                placeholder={t(lang, "secA1")}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 p-2 focus:border-usa-blue outline-none text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                required
                type="text"
                name="secQ2"
                placeholder={t(lang, "secQ2")}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 p-2 focus:border-usa-blue outline-none text-white placeholder-gray-500"
              />
            </div>
            <div className="col-span-1">
              <input
                required
                type="text"
                name="secA2"
                placeholder={t(lang, "secA2")}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 p-2 focus:border-usa-blue outline-none text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                required
                type="text"
                name="secQ3"
                placeholder={t(lang, "secQ3")}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 p-2 focus:border-usa-blue outline-none text-white placeholder-gray-500"
              />
            </div>
            <div className="col-span-1">
              <input
                required
                type="text"
                name="secA3"
                placeholder={t(lang, "secA3")}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 p-2 focus:border-usa-blue outline-none text-white placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-bold flex items-center gap-2">
              <Users size={16} />
              {t(lang, "personCount")}
            </label>
            <select
              name="personCount"
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/20 rounded-lg p-3 focus:border-usa-red outline-none transition-colors text-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num} className="bg-usa-navy">
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm text-gray-300 font-bold">
              {t(lang, "dateRange")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  required
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white scheme-dark focus:border-usa-red"
                />
              </div>
              <div>
                <input
                  required
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white scheme-dark focus:border-usa-red"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-usa-blue to-usa-red py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_20px_rgba(178,34,52,0.6)] transition-all flex justify-center items-center gap-2 text-white border-2 border-white/10"
        >
          <Database size={20} />
          {t(lang, "submit")}
        </button>
      </form>
    </motion.div>
  );
};

const RegistrationForm = ({
  type,
  lang,
  onRegister,
}: {
  type: "agency" | "client";
  lang: Language;
  onRegister: (u: User) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    whatsapp: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email ? formData.email : null,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp,
      location: formData.location ? formData.location : null,
      role: type,
      isLoggedIn: true,
    };

    onRegister(newUser);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-usa-navy/90 border border-white/20 backdrop-blur-xl rounded-2xl shadow-2xl relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Flag size={100} className="text-white" />
      </div>

      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-orbitron font-bold text-white mb-2">
          {type === "agency" ? t(lang, "agencyReg") : t(lang, "clientReg")}
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-usa-blue to-usa-red mx-auto rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="relative">
          <UserIcon className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            required
            name="name"
            onChange={handleChange}
            placeholder={
              type === "agency" ? t(lang, "agencyName") : t(lang, "name")
            }
            className="w-full bg-black/30 border border-white/20 rounded-lg py-3 pl-10 pr-4 focus:border-usa-red outline-none transition-colors text-white placeholder-gray-500"
          />
        </div>

        {type === "agency" && (
          <div className="relative">
            <Building2
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />
            <input
              required
              name="location"
              onChange={handleChange}
              placeholder={t(lang, "officeLocation")}
              className="w-full bg-black/30 border border-white/20 rounded-lg py-3 pl-10 pr-4 focus:border-usa-red outline-none transition-colors text-white placeholder-gray-500"
            />
          </div>
        )}

        {type === "client" && (
          <div className="relative">
            <MessageSquare
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />
            <input
              required
              name="email"
              type="email"
              onChange={handleChange}
              placeholder={t(lang, "email")}
              className="w-full bg-black/30 border border-white/20 rounded-lg py-3 pl-10 pr-4 focus:border-usa-red outline-none transition-colors text-white placeholder-gray-500"
            />
          </div>
        )}

        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            required
            name="mobile"
            type="tel"
            onChange={handleChange}
            placeholder={t(lang, "mobile")}
            className="w-full bg-black/30 border border-white/20 rounded-lg py-3 pl-10 pr-4 focus:border-usa-red outline-none transition-colors text-white placeholder-gray-500"
          />
        </div>

        {type === "client" && (
          <div className="relative">
            <MessageSquare
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />
            <input
              required
              name="whatsapp"
              type="tel"
              onChange={handleChange}
              placeholder={t(lang, "whatsapp")}
              className="w-full bg-black/30 border border-white/20 rounded-lg py-3 pl-10 pr-4 focus:border-usa-red outline-none transition-colors text-white placeholder-gray-500"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-white text-usa-navy hover:bg-gray-100 font-bold py-3 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
        >
          {t(lang, "submit")}
        </button>
      </form>
    </div>
  );
};

// --- Admin Components ---

const AdminDashboard = ({
  lang,
  data,
  users,
  messages,
  onUpdateData,
  onDeleteData,
  onReply,
}: {
  lang: Language;
  data: AppointmentData[];
  users: User[];
  messages: ChatMessage[];
  onUpdateData: (id: string, updated: Partial<AppointmentData>) => void;
  onDeleteData: (id: string) => void;
  onReply: (text: string) => void;
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<AppointmentData>>({});
  const [replyText, setReplyText] = useState("");

  const agencyCount = users.filter((u) => u.role === "agency").length;
  const clientCount = users.filter((u) => u.role === "client").length;

  // Chart Data preparation
  const chartData = [
    { name: "Agencies", count: agencyCount },
    { name: "Clients", count: clientCount },
    { name: "Appointments", count: data.length },
  ];

  // Enhanced CSV Download Logic
  const handleDownloadCSV = () => {
    const headers = [
      "System ID",
      "Submitted Date",
      "Status",
      "Registered Name",
      "Account Type",
      "Contact Email",
      "Contact Mobile",
      "Contact WhatsApp",
      "Agency Office Location",
      "US Visa Portal Username",
      "US Visa Portal Password",
      "Security Question 1",
      "Answer 1",
      "Security Question 2",
      "Answer 2",
      "Security Question 3",
      "Answer 3",
      "Total Applicants",
      "Service Priority",
      "Preferred Start Date",
      "Preferred End Date",
    ];

    const rows = data.map((item) => {
      const u = users.find((user) => user.id === item.userId);
      return [
        item.id,
        new Date(item.submittedAt).toLocaleString(),
        item.status.toUpperCase(),
        item.userName,
        item.userType.toUpperCase(),
        u?.email || "N/A",
        u?.mobile || "N/A",
        u?.whatsapp || "N/A",
        u?.location || "N/A",
        item.portalUsername,
        item.portalPassword,
        item.securityQ1,
        item.securityA1,
        item.securityQ2,
        item.securityA2,
        item.securityQ3,
        item.securityA3,
        item.personCount,
        item.priority === "fast" ? "EXPRESS" : "REGULAR",
        item.startDate,
        item.endDate,
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `apollo_visa_full_export_${new Date().toISOString()}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startEdit = (item: AppointmentData) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      onUpdateData(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (
    field: keyof AppointmentData,
    value: string | number
  ) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const sendReply = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText("");
    }
  };

  return (
    <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-orbitron font-bold text-white border-l-8 border-usa-red pl-4 bg-black/30 pr-4 py-2 rounded-r-lg">
          Admin Command Center
        </h2>
        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-lg border border-green-400/30"
        >
          <Download size={20} />
          {t(lang, "downloadCsv")}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-usa-navy/50 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-gray-300 mb-2">Total Agencies</h3>
          <p className="text-4xl font-bold text-white">{agencyCount}</p>
        </div>
        <div className="bg-usa-red/30 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-gray-300 mb-2">Total Clients</h3>
          <p className="text-4xl font-bold text-white">{clientCount}</p>
        </div>
        <div className="bg-white/10 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-gray-300 mb-2">Pending Files</h3>
          <p className="text-4xl font-bold text-yellow-400">{data.length}</p>
        </div>
      </div>

      {/* Admin Chat Reply Section */}
      <div className="bg-black/30 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare size={20} className="text-usa-blue" />
          {t(lang, "adminChat")}
        </h3>
        <div className="h-48 overflow-y-auto mb-4 bg-black/20 p-4 rounded-lg border border-white/5 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded max-w-lg ${
                msg.sender === "admin"
                  ? "ml-auto bg-usa-blue/50 text-right"
                  : "bg-white/10"
              }`}
            >
              <span className="text-xs text-gray-400 block">
                {msg.sender === "admin" ? "Admin" : "User"}
              </span>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={t(lang, "typeReply")}
            className="flex-1 bg-black/40 border border-white/10 rounded-lg p-2 focus:border-usa-blue outline-none text-white"
          />
          <button
            onClick={sendReply}
            className="bg-usa-blue px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Charts */}
        <div className="bg-usa-navy/30 border border-white/10 p-6 rounded-xl h-80">
          <h3 className="text-xl font-bold mb-4">Platform Analytics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A3161",
                  border: "1px solid #fff",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="count" fill="#B22234" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Users List */}
        <div className="bg-usa-navy/30 border border-white/10 p-6 rounded-xl overflow-y-auto h-80">
          <h3 className="text-xl font-bold mb-4">Registered Users</h3>
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-black/30 text-gray-400">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Contact</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-4 py-2 font-medium">{u.name}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        u.role === "agency"
                          ? "bg-purple-900 text-purple-200"
                          : "bg-blue-900 text-blue-200"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">{u.mobile || u.whatsapp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Requests Table */}
      <div className="bg-usa-navy/30 border border-white/10 p-6 rounded-xl overflow-x-auto">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Database size={20} className="text-usa-red" />
          {t(lang, "pendingApps")}
        </h3>
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-black/30 text-gray-400">
            <tr>
              <th className="px-4 py-3 min-w-[150px]">CGI Credentials</th>
              <th className="px-4 py-3 min-w-[200px]">Security Questions</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3 min-w-[120px]">{t(lang, "actions")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                {editingId === item.id ? (
                  // Edit Mode
                  <>
                    <td className="px-4 py-3 space-y-2">
                      <input
                        value={editForm.portalUsername}
                        onChange={(e) =>
                          handleEditChange("portalUsername", e.target.value)
                        }
                        className="bg-black/40 border border-white/20 p-1 rounded w-full text-white"
                        placeholder="Username"
                      />
                      <input
                        value={editForm.portalPassword}
                        onChange={(e) =>
                          handleEditChange("portalPassword", e.target.value)
                        }
                        className="bg-black/40 border border-white/20 p-1 rounded w-full text-white"
                        placeholder="Password"
                      />
                    </td>
                    <td className="px-4 py-3 space-y-1">
                      <div className="flex gap-1">
                        <input
                          value={editForm.securityQ1}
                          onChange={(e) =>
                            handleEditChange("securityQ1", e.target.value)
                          }
                          className="bg-black/40 border border-white/20 p-1 rounded w-1/2 text-white"
                          placeholder="Q1"
                        />
                        <input
                          value={editForm.securityA1}
                          onChange={(e) =>
                            handleEditChange("securityA1", e.target.value)
                          }
                          className="bg-black/40 border border-white/20 p-1 rounded w-1/2 text-white"
                          placeholder="A1"
                        />
                      </div>
                      <div className="flex gap-1">
                        <input
                          value={editForm.securityQ2}
                          onChange={(e) =>
                            handleEditChange("securityQ2", e.target.value)
                          }
                          className="bg-black/40 border border-white/20 p-1 rounded w-1/2 text-white"
                          placeholder="Q2"
                        />
                        <input
                          value={editForm.securityA2}
                          onChange={(e) =>
                            handleEditChange("securityA2", e.target.value)
                          }
                          className="bg-black/40 border border-white/20 p-1 rounded w-1/2 text-white"
                          placeholder="A2"
                        />
                      </div>
                      <div className="flex gap-1">
                        <input
                          value={editForm.securityQ3}
                          onChange={(e) =>
                            handleEditChange("securityQ3", e.target.value)
                          }
                          className="bg-black/40 border border-white/20 p-1 rounded w-1/2 text-white"
                          placeholder="Q3"
                        />
                        <input
                          value={editForm.securityA3}
                          onChange={(e) =>
                            handleEditChange("securityA3", e.target.value)
                          }
                          className="bg-black/40 border border-white/20 p-1 rounded w-1/2 text-white"
                          placeholder="A3"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 mb-2">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            editForm.priority === "fast"
                              ? "bg-usa-red text-white"
                              : "bg-usa-blue text-white"
                          }`}
                        >
                          {editForm.priority}
                        </span>
                      </div>
                      <select
                        value={editForm.personCount}
                        onChange={(e) =>
                          handleEditChange(
                            "personCount",
                            parseInt(e.target.value)
                          )
                        }
                        className="bg-black/40 border border-white/20 p-1 rounded w-full text-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 space-y-1">
                      <input
                        type="date"
                        value={editForm.startDate}
                        onChange={(e) =>
                          handleEditChange("startDate", e.target.value)
                        }
                        className="bg-black/40 border border-white/20 p-1 rounded w-full text-white"
                      />
                      <input
                        type="date"
                        value={editForm.endDate}
                        onChange={(e) =>
                          handleEditChange("endDate", e.target.value)
                        }
                        className="bg-black/40 border border-white/20 p-1 rounded w-full text-white"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="p-2 bg-green-600 rounded hover:bg-green-500"
                          title={t(lang, "save")}
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                          title={t(lang, "cancel")}
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  // View Mode
                  <>
                    <td className="px-4 py-3">
                      <div className="font-bold text-white">
                        {item.portalUsername}
                      </div>
                      <div className="font-mono text-xs text-blue-300 bg-black/20 p-1 rounded inline-block mt-1">
                        {item.portalPassword}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        By: {item.userName} ({item.userType})
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div className="mb-1">
                        <span className="text-gray-500">Q1:</span>{" "}
                        {item.securityQ1}{" "}
                        <span className="text-green-400">
                          A: {item.securityA1}
                        </span>
                      </div>
                      <div className="mb-1">
                        <span className="text-gray-500">Q2:</span>{" "}
                        {item.securityQ2}{" "}
                        <span className="text-green-400">
                          A: {item.securityA2}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Q3:</span>{" "}
                        {item.securityQ3}{" "}
                        <span className="text-green-400">
                          A: {item.securityA3}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="mb-2">
                        {item.priority === "fast" ? (
                          <span className="bg-usa-red text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center w-fit gap-1">
                            <Rocket size={10} /> FAST
                          </span>
                        ) : (
                          <span className="bg-usa-blue text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center w-fit gap-1">
                            <CheckCircle size={10} /> STD
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="font-bold text-lg">
                          {item.personCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div className="text-white">{item.startDate}</div>
                      <div className="text-gray-500">to</div>
                      <div className="text-white">{item.endDate}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-2 bg-blue-600/30 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors"
                          title={t(lang, "edit")}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteData(item.id)}
                          className="p-2 bg-red-600/30 text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors"
                          title={t(lang, "delete")}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No CGI data submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Chat Widget ---

const ChatWidget = ({
  lang,
  isAdmin,
  messages,
  onSendMessage,
}: {
  lang: Language;
  isAdmin: boolean;
  messages: ChatMessage[];
  onSendMessage: (msg: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-usa-navy border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96"
          >
            <div className="bg-gradient-to-r from-usa-blue to-usa-red p-4 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <MessageSquare size={16} />
                {isAdmin ? "Admin Chat" : t(lang, "chatSupport")}
              </h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={16} className="text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === (isAdmin ? "admin" : "user")
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                      msg.sender === (isAdmin ? "admin" : "user")
                        ? "bg-usa-red text-white rounded-br-none"
                        : "bg-white/10 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-white/10 bg-usa-navy flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-black/30 border border-white/10 rounded-full px-4 py-2 text-sm focus:border-usa-red outline-none text-white"
              />
              <button
                onClick={handleSend}
                className="bg-usa-red p-2 rounded-full hover:bg-red-700 transition-colors"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aesthetics: Updated Messenger Icon to Neon Cyan/Emerald */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_30px_rgba(52,211,153,0.8)] flex items-center justify-center text-black font-bold border-4 border-white/20 animate-pulse-slow relative z-50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/40 rounded-full animate-ping opacity-30"></div>
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [view, setView] = useState("home");
  const [user, setUser] = useState<User | null>(null);

  const { userData } = useGetUser();
  const { users } = useGetAllUser();
  const { cgiData } = useGetAllCGIData();

  // Data Stores
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [appointmentData, setAppointmentData] = useState<AppointmentData[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Admin Access Logic
  const [adminClicks, setAdminClicks] = useState(0);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [pinInput, setPinInput] = useState("");

  // Initial Load from DB
  useEffect(() => {
    const initData = async () => {
      // const u = await db.getAllUsers();
      // setAllUsers(u);
      setAllUsers(users?.data || []);

      // const apps = await db.getAppointments();
      // setAppointmentData(apps);
      setAppointmentData(cgiData?.data || []);
      const msgs = await db.getMessages();
      setChatMessages(msgs);
    };
    initData();
    // Set user from useGetUser
    setUser(userData?.data || null);
  }, [userData?.data, users?.data, cgiData?.data]); // Run once on mount

  // Navbar Lock Icon Handler (20 Clicks)
  const handleAdminNavClick = () => {
    setAdminClicks((prev) => {
      const newCount = prev + 1;
      if (newCount >= 20) {
        setShowAdminPin(true);
        return 0;
      }
      return newCount;
    });
  };

  const handlePinSubmit = () => {
    if (pinInput === "4343") {
      const adminUser: User = {
        id: "admin",
        name: "Admin Commander",
        role: "admin",
        isLoggedIn: true,
      };
      setUser(adminUser);
      setView("admin");
      setShowAdminPin(false);
      setPinInput("");
    } else {
      alert(t(lang, "accessDenied"));
      setPinInput("");
    }
  };

  // Handlers
  const handleRegister = async (newUser: User) => {
    try {
      // await db.register(newUser);
      try {
        const { data } = await axios.post(
          `https://visa-tech-backend.onrender.com/api/v1/client-registration`,
          newUser
        );
        toast.success(data.message);
        console.log("Registration successful:", data);
        localStorage.setItem(authKey, data.data.token);
      } catch (error) {
        toast.error(error.response.data?.message || "Registration failed");
        console.error("Registration failed:", error);
      }

      setAllUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      setView("cgi-portal");
    } catch (e) {
      alert("Registration failed: " + e);
    }
  };

  const handleLogin = async (email: string) => {
    // For demo, we are skipping password check in this basic db impl, but architecture is there.
    // const foundUser = await db.login(email);

    // if (foundUser) {
    //   setUser(foundUser);
    //   if (foundUser.role === "admin") setView("admin");
    //   else setView("profile");
    // } else {
    //   alert("User not found. Please register.");
    // }

    try {
      const { data } = await axios.post(
        `https://visa-tech-backend.onrender.com/api/v1/client-registration/login`,
        {
          email: email,
        }
      );
      toast.success(data.message);
      console.log("login success:", data);
      localStorage.setItem(authKey, data.data.token);
      console.log(data);
      const foundUser = data.data.user as User;
      if (foundUser) {
        setUser(foundUser);
        if (foundUser.role === "admin") setView("admin");
        else setView("profile");
      }
    } catch (error) {
      toast.error(error.response.data?.message || "Registration failed");
      console.error("Registration failed:", error);
    }
  };

  const handleBookNow = () => {
    if (user) {
      setView("cgi-portal");
    } else {
      setView("register-client");
    }
  };

  const handleCgiSubmit = async (data: any) => {
    if (!user) return;

    const newAppointment: AppointmentData = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      userType: user.role as "client" | "agency",
      portalUsername: data.username,
      portalPassword: data.password,
      securityQ1: data.secQ1,
      securityA1: data.secA1,
      securityQ2: data.secQ2,
      securityA2: data.secA2,
      securityQ3: data.secQ3,
      securityA3: data.secA3,
      personCount: Number(data.personCount),
      priority: data.priority,
      startDate: data.startDate,
      endDate: data.endDate,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    // await db.submitAppointment(newAppointment);

    try {
      const { data } = await axios.post(
        `https://visa-tech-backend.onrender.com/api/v1/client-submission`,
        newAppointment
      );
      toast.success(data.message);

      setAppointmentData((prev) => [...prev, newAppointment]);
      // alert("CGI Data Portal submission successful! Tracking ID generated.");
      setView("profile");
    } catch (error) {
      toast.error(error.response.data?.message || "Registration failed");
      console.error("Registration failed:", error);
    }

    // Return to profile after submission
  };

  const handleUpdateData = async (
    id: string,
    updated: Partial<AppointmentData>
  ) => {
    // await db.updateAppointment(id, updated);

    try {
      const { data } = await axios.patch(
        `https://visa-tech-backend.onrender.com/api/v1/client-submission/${id}`,
        updated
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data?.message || "Registration failed");
      console.error("Registration failed:", error);
    }

    setAppointmentData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const handleDeleteData = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this CGI entry?")) {
      // await db.deleteAppointment(id);

      try {
        const { data } = await axios.delete(
          `https://visa-tech-backend.onrender.com/api/v1/client-submission/${id}`
        );
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data?.message || "Registration failed");
        console.error("Registration failed:", error);
      }
      setAppointmentData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSendMessage = async (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: user?.role === "admin" ? "admin" : "user",
      text,
      timestamp: Date.now(),
    };
    await db.sendMessage(newMessage);
    setChatMessages((prev) => [...prev, newMessage]);

    // Auto-reply simulation if user
    if (user?.role !== "admin") {
      setTimeout(async () => {
        const reply = {
          id: (Date.now() + 1).toString(),
          sender: "admin" as const,
          text: "Thanks for messaging. An agent will be with you shortly.",
          timestamp: Date.now(),
        };
        await db.sendMessage(reply);
        setChatMessages((prev) => [...prev, reply]);
      }, 1000);
    }
  };

  const handleAdminReply = async (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "admin",
      text,
      timestamp: Date.now(),
    };
    await db.sendMessage(newMessage);
    setChatMessages((prev) => [...prev, newMessage]);
  };

  return (
    // Aesthetics: Updated body background to deep space gradient
    <div className="min-h-screen text-white selection:bg-amber-400 selection:text-black font-rajdhani bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#020617] to-black">
      <Navbar
        lang={lang}
        setLang={setLang}
        user={user}
        onLogout={() => {
          setUser(null);
          setView("home");
        }}
        setView={setView}
        onAdminClick={handleAdminNavClick}
      />

      {/* Admin Pin Modal */}
      {showAdminPin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-usa-navy border-2 border-usa-red p-8 rounded-xl shadow-2xl w-80 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-usa-blue via-white to-usa-red"></div>
            <Lock className="mx-auto text-usa-red mb-4" size={40} />
            <h3 className="text-xl font-bold mb-4 font-orbitron text-white">
              {t(lang, "adminPin")}
            </h3>
            <input
              type="password"
              value={pinInput}
              maxLength={4}
              onChange={(e) => setPinInput(e.target.value)}
              className="bg-black/50 border border-white/20 rounded p-2 w-full text-center text-2xl tracking-[1em] mb-4 focus:border-usa-red outline-none text-white"
            />
            <button
              onClick={handlePinSubmit}
              className="w-full bg-usa-red py-2 rounded font-bold hover:bg-red-700 transition-colors text-white"
            >
              UNLOCK
            </button>
            <button
              onClick={() => setShowAdminPin(false)}
              className="mt-4 text-xs text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Content Router */}
      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero lang={lang} onBookNow={handleBookNow} user={user} />
            {/* About / Description Section on Home */}
            <div className="py-20 bg-[#0A1628]/50 border-t border-white/5 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-orbitron text-white mb-8">
                  {t(lang, "whyUs")}
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-amber-400/50 transition-colors group">
                    <div className="bg-white/10 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-amber-400 transition-colors">
                      <Rocket
                        className="text-white group-hover:text-black"
                        size={32}
                      />
                    </div>
                    <h3 className="font-bold mb-2 text-white">
                      {t(lang, "fastTech")}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Cosmic speed automation for instant slot detection.
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/50 transition-colors group">
                    <div className="bg-white/10 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                      <Shield className="text-white" size={32} />
                    </div>
                    <h3 className="font-bold mb-2 text-white">
                      {t(lang, "secure")}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Bank-grade encryption for all your credentials.
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-white/50 transition-colors group">
                    <div className="bg-white/10 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-white transition-colors">
                      <Phone
                        className="text-white group-hover:text-black"
                        size={32}
                      />
                    </div>
                    <h3 className="font-bold mb-2 text-white">
                      {t(lang, "support")}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Direct line {CONTACT_NUMBER} for urgent queries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === "about" && (
          <motion.div
            key="about"
            className="pt-32 px-6 max-w-4xl mx-auto pb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-4xl font-orbitron mb-8 text-white drop-shadow-lg text-center md:text-left">
              {t(lang, "aboutTitle")}
            </h1>
            <div className="bg-usa-navy/90 p-8 rounded-2xl border-l-8 border-usa-red shadow-2xl backdrop-blur-sm relative overflow-hidden">
              {/* Watermark */}
              <Flag className="absolute -right-10 -bottom-10 text-white/5 w-64 h-64 rotate-12" />

              <p className="text-lg text-gray-200 leading-relaxed font-rajdhani relative z-10">
                {t(lang, "aboutContent")}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                <div className="flex items-center gap-3 text-white">
                  <Rocket className="text-usa-red" />{" "}
                  <span>Automated Scheduling</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Shield className="text-usa-blue" />{" "}
                  <span>Secure Portal</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Globe className="text-white" /> <span>24/7 Monitoring</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Users className="text-gray-300" />{" "}
                  <span>Agency Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === "register-client" && (
          <motion.div
            key="reg-client"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <RegistrationForm
              type="client"
              lang={lang}
              onRegister={handleRegister}
            />
          </motion.div>
        )}

        {view === "register-agency" && (
          <motion.div
            key="reg-agency"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <RegistrationForm
              type="agency"
              lang={lang}
              onRegister={handleRegister}
            />
          </motion.div>
        )}

        {view === "login" && (
          <motion.div
            key="login"
            className="pt-32 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="p-8 bg-usa-navy/90 border border-white/20 rounded-2xl w-full max-w-md text-center shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-white">
                {t(lang, "login")}
              </h2>
              <input
                placeholder="Enter Email to Demo Login"
                className="w-full bg-black/40 border border-white/20 p-3 rounded text-white mb-4"
                id="login-email-input"
              />
              <button
                onClick={() =>
                  handleLogin(
                    (
                      document.getElementById(
                        "login-email-input"
                      ) as HTMLInputElement
                    ).value
                  )
                }
                className="w-full bg-usa-blue text-white py-3 rounded font-bold hover:bg-blue-700 transition-colors"
              >
                {t(lang, "login")}
              </button>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setView("register-client")}
                  className="text-usa-red hover:text-white hover:underline font-bold transition-colors text-sm"
                >
                  {t(lang, "register")}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {view === "profile" && user && (
          <motion.div
            key="profile"
            className="pt-24 max-w-5xl mx-auto px-4 pb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Agency Banner */}
            {user.role === "agency" && (
              <div className="mb-8 bg-white/10 border-l-4 border-yellow-400 p-4 rounded-r-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-yellow-400" size={24} />
                  <span className="text-white font-bold">
                    {t(lang, "bulkNotice")}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setChatMessages((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        sender: "admin",
                        text: "Hello! Interested in bulk rates?",
                        timestamp: Date.now(),
                      },
                    ])
                  }
                  className="text-sm bg-yellow-400 text-black px-3 py-1 rounded font-bold hover:bg-yellow-300"
                >
                  Chat Now
                </button>
              </div>
            )}

            <div className="bg-usa-navy/80 p-6 rounded-2xl border-t-4 border-usa-blue shadow-xl mb-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-usa-navy border-4 border-usa-red">
                  {user.name.charAt(0)}
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-3xl font-bold mb-1 text-white">
                    {user.name}
                  </h2>
                  <p className="text-usa-red font-bold uppercase text-sm tracking-widest">
                    {user.role}
                  </p>
                </div>
                <button
                  onClick={() => setView("cgi-portal")}
                  className="bg-usa-red px-8 py-4 rounded-full font-bold shadow-lg hover:bg-red-700 transition-all flex items-center gap-2 text-white border-2 border-white/20"
                >
                  <Database size={20} />
                  Open CGI Portal
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm bg-black/20 p-4 rounded-lg relative z-10">
                {user.mobile && (
                  <div className="flex justify-between md:block">
                    <span className="text-gray-400 block mb-1">Mobile</span>{" "}
                    <span className="text-white font-mono">{user.mobile}</span>
                  </div>
                )}
                {user.email && (
                  <div className="flex justify-between md:block">
                    <span className="text-gray-400 block mb-1">Email</span>{" "}
                    <span className="text-white">{user.email}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex justify-between md:block">
                    <span className="text-gray-400 block mb-1">Location</span>{" "}
                    <span className="text-white">{user.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
              <CheckCircle className="text-green-400" size={24} />
              <div>
                <h4 className="font-bold text-white">Submissions</h4>
                <p className="text-xs text-gray-300">
                  You have{" "}
                  {appointmentData.filter((a) => a.userId === user.id).length}{" "}
                  active submissions.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dedicated CGI Portal View */}
        {view === "cgi-portal" && user && (
          <motion.div
            key="cgi-portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="pt-24 px-4 pb-12">
              <button
                onClick={() => setView("profile")}
                className="mb-4 text-white/70 hover:text-white flex items-center gap-1 max-w-4xl mx-auto transition-colors"
              >
                <ChevronRight className="rotate-180" size={16} /> Back to
                Profile
              </button>
              <CgiDataPortalForm lang={lang} onSubmit={handleCgiSubmit} />
            </div>
          </motion.div>
        )}

        {view === "admin" && user?.role === "admin" && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AdminDashboard
              lang={lang}
              data={appointmentData}
              users={allUsers}
              messages={chatMessages}
              onUpdateData={handleUpdateData}
              onDeleteData={handleDeleteData}
              onReply={handleAdminReply}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ChatWidget
        lang={lang}
        isAdmin={user?.role === "admin"}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
      />

      {/* Footer */}
      <footer className="bg-[#020617] text-white border-t border-white/10 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
                <Rocket className="text-white h-5 w-5" />
              </div>
              <span className="font-orbitron font-bold text-lg text-white">
                APOLLO VISA TECH
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Automating your journey to the USA with state-of-the-art
              technology. Fast, Secure, and Reliable embassy bookings.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">
              {t(lang, "contactUs")}
            </h4>
            <div className="text-gray-400 text-sm space-y-3">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-blue-500" />{" "}
                <span className="font-mono">{CONTACT_NUMBER}</span>
              </p>
              <p className="flex items-center gap-2">
                <Building2 size={14} className="text-blue-500" /> Dhaka,
                Bangladesh
              </p>
            </div>
          </div>
          <div>
            {/* Hidden Admin Trigger Area - Retained as Easter Egg/Backup */}
            <div className="w-full h-full min-h-[50px] cursor-default opacity-0 hover:opacity-10 transition-opacity flex items-end justify-center">
              <span className="text-[10px] text-gray-800">Admin Port</span>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>&copy; 2023 Apollo Visa Tech.</p>
            <p>All Rights Reserved.</p>
            <div className="mt-4 inline-block bg-white/5 px-3 py-1 rounded border border-white/10">
              <span className="text-amber-500 font-bold">USA</span>{" "}
              <span className="text-gray-400">PARTNER</span>
            </div>
          </div>
        </div>
      </footer>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "60px" }}
        reverseOrder={false}
      />
    </div>
  );
}
