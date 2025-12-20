import { Language } from "./types";

export const CONTACT_NUMBER = "01300172795";
export const PRICE_FAST = "10000";
export const PRICE_REGULAR = "5000";

export const TRANSLATIONS = {
  en: {
    title: "Apollo Visa Tech",
    subtitle: "Premium US Embassy Appointment Booking",
    home: "Home",
    about: "About Us",
    services: "Services",
    login: "Login",
    register: "Register",
    agencyReg: "Agency Registration",
    clientReg: "Client Registration",
    profile: "Profile",
    dashboard: "Dashboard",
    logout: "Logout",
    heroTitle: "American Dreams, Expedited",
    heroDesc:
      "Secure your US Embassy interview slot with our high-speed tracking technology. Choose between Regular or Express Early Date options.",
    bookNow: "Start Application",
    priceTag: `Regular: ${PRICE_REGULAR} BDT | Express: ${PRICE_FAST} BDT`,
    paymentNote:
      "Payment due upon appointment confirmation. Agencies: Contact us for bulk rates.",
    contactUs: "Contact Us",
    chatSupport: "Live Support",
    adminPanel: "Admin",
    submit: "Submit CGI Data",
    processing: "Processing...",

    // Form Labels
    name: "Full Name",
    agencyName: "Agency Name",
    email: "Email Address",
    mobile: "Mobile Number",
    whatsapp: "WhatsApp Number",
    officeLocation: "Office Location",
    cgiTitle: "CGI PORTAL DATA ENTRY",
    cgiNav: "CGI Entry",
    cgiDesc:
      "Enter your official US Visa Portal credentials. Select your priority service level below.",
    username: "CGI Login Username",
    password: "CGI Password",
    secQ1: "1st Security Question",
    secA1: "Answer 1",
    secQ2: "2nd Security Question",
    secA2: "Answer 2",
    secQ3: "3rd Security Question",
    secA3: "Answer 3",
    personCount: "Number of Persons",
    priority: "Service Priority",
    prioRegular: `Regular (${PRICE_REGULAR} BDT)`,
    prioFast: `Express Early Date (${PRICE_FAST} BDT)`,
    dateRange: "Preferred Appointment Date Range",
    startDate: "Start Date",
    endDate: "End Date",

    // Sections
    whyUs: "The American Standard",
    fastTech: "Express Processing",
    secure: "State-Grade Security",
    support: "24/7 Agency Support",
    aboutTitle: "About Apollo Visa Tech",
    aboutContent:
      "Apollo Visa Tech is a technology building company for travel agencies, visa consultancies, and the public who need tech support to avoid offshore hassles. We are the premier gateway to the United States, leveraging advanced automated systems to secure face-to-face interview slots at the US Embassy. Our tiered service model offers flexibility: standard processing for regular timelines and premium express services for urgent early dates (10,000 BDT). We offer special negotiable rates for agencies submitting bulk files, ensuring a partnership built on trust and efficiency. Our mission is to democratize access to appointment bookings through superior software engineering, offering robust tech support that handles the heavy lifting of continuous monitoring and data entry.",

    // Admin
    adminPin: "Enter Admin Security PIN",
    accessDenied: "Access Denied",
    totalUsers: "Total Users",
    pendingApps: "CGI PORTAL DATABASE",
    downloadCsv: "Download Full CSV",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    adminChat: "Support Messages",
    reply: "Reply",
    typeReply: "Type your reply...",
    bulkNotice: "Agencies: Contact admin for bulk file negotiation.",
  },
  bn: {
    title: "অ্যাপোলো ভিসা টেক",
    subtitle: "প্রিমিয়াম ইউএস দূতাবাস অ্যাপয়েন্টমেন্ট বুকিং",
    home: "হোম",
    about: "আমাদের সম্পর্কে",
    services: "সেবা",
    login: "লগইন",
    register: "নিবন্ধন",
    agencyReg: "এজেন্সি নিবন্ধন",
    clientReg: "ক্লায়েন্ট নিবন্ধন",
    profile: "প্রোফাইল",
    dashboard: "ড্যাশবোর্ড",
    logout: "লগআউট",
    heroTitle: "আমেরিকান স্বপ্ন, দ্রুততম উপায়ে",
    heroDesc:
      "আমাদের উচ্চ-গতির ট্র্যাকিং প্রযুক্তির মাধ্যমে আপনার ইউএস দূতাবাসের ইন্টারভিউ স্লট নিশ্চিত করুন। রেগুলার বা এক্সপ্রেস আর্লি ডেট অপশন বেছে নিন।",
    bookNow: "আবেদন শুরু করুন",
    priceTag: `রেগুলার: ${PRICE_REGULAR} টাকা | এক্সপ্রেস: ${PRICE_FAST} টাকা`,
    paymentNote:
      "অ্যাপয়েন্টমেন্ট নিশ্চিতকরণের পর পেমেন্ট। এজেন্সি: বাল্ক রেটের জন্য যোগাযোগ করুন।",
    contactUs: "যোগাযোগ করুন",
    chatSupport: "লাইভ সাপোর্ট",
    adminPanel: "অ্যাডমিন",
    submit: "সিজিআই ডেটা জমা দিন",
    processing: "প্রক্রিয়াধীন...",

    // Form Labels
    name: "পুরো নাম",
    agencyName: "এজেন্সির নাম",
    email: "ইমেইল ঠিকানা",
    mobile: "মোবাইল নম্বর",
    whatsapp: "হোয়াটসঅ্যাপ নম্বর",
    officeLocation: "অফিসের অবস্থান",
    cgiTitle: "সিজিআই পোর্টাল ডেটা এন্ট্রি",
    cgiNav: "সিজিআই এন্ট্রি",
    cgiDesc:
      "আপনার অফিসিয়াল ইউএস ভিসা পোর্টাল তথ্য দিন। নিচে আপনার অগ্রাধিকার সেবা নির্বাচন করুন।",
    username: "সিজিআই লগইন ইউজারনেম",
    password: "সিজিআই পাসওয়ার্ড",
    secQ1: "১ম নিরাপত্তা প্রশ্ন",
    secA1: "উত্তর ১",
    secQ2: "২য় নিরাপত্তা প্রশ্ন",
    secA2: "উত্তর ২",
    secQ3: "৩য় নিরাপত্তা প্রশ্ন",
    secA3: "উত্তর ৩",
    personCount: "ব্যক্তির সংখ্যা",
    priority: "সেবা অগ্রাধিকার",
    prioRegular: `রেগুলার (${PRICE_REGULAR} টাকা)`,
    prioFast: `এক্সপ্রেস আর্লি ডেট (${PRICE_FAST} টাকা)`,
    dateRange: "পছন্দের অ্যাপয়েন্টমেন্ট তারিখ পরিসীমা",
    startDate: "শুরুর তারিখ",
    endDate: "শেষ তারিখ",

    // Sections
    whyUs: "আমেরিকান মানদণ্ড",
    fastTech: "এক্সপ্রেস প্রসেসিং",
    secure: "রাষ্ট্রীয় মানের নিরাপত্তা",
    support: "২৪/৭ এজেন্সি সাপোর্ট",
    aboutTitle: "অ্যাপোলো ভিসা টেক সম্পর্কে",
    aboutContent:
      "অ্যাপোলো ভিসা টেক হল ট্রাভেল এজেন্সি, ভিসা কনসালটেন্সি এবং সাধারণ মানুষের জন্য একটি প্রযুক্তি নির্মাণকারী কোম্পানি যাদের অফশোর ঝামেলা এড়াতে প্রযুক্তিগত সহায়তার প্রয়োজন। আমরা যুক্তরাষ্ট্রের প্রধান প্রবেশদ্বার, ইউএস দূতাবাসে ফেস-টু-ফেস ইন্টারভিউ স্লট নিশ্চিত করতে উন্নত স্বয়ংক্রিয় সিস্টেম ব্যবহার করি। আমাদের টায়ার্ড সার্ভিস মডেল নমনীয়তা প্রদান করে: নিয়মিত সময়রেখার জন্য স্ট্যান্ডার্ড প্রসেসিং এবং জরুরি আর্লি ডেটের জন্য প্রিমিয়াম এক্সপ্রেস সার্ভিস (১০,০০০ টাকা)। আমরা বাল্ক ফাইল জমা দেওয়া এজেন্সিগুলোর জন্য বিশেষ নেগোশিয়েবল রেট অফার করি, যা বিশ্বাস এবং দক্ষতার উপর ভিত্তি করে একটি অংশীদারিত্ব নিশ্চিত করে। আমাদের লক্ষ্য হল উন্নত সফটওয়্যার ইঞ্জিনিয়ারিংয়ের মাধ্যমে অ্যাপয়েন্টমেন্ট বুকিংয়ে সকলের প্রবেশাধিকার সহজ করা।",

    // Admin
    adminPin: "অ্যাডমিন সিকিউরিটি পিন দিন",
    accessDenied: "প্রবেশাধিকার নেই",
    totalUsers: "মোট ব্যবহারকারী",
    pendingApps: "সিজিআই পোর্টাল ডাটাবেস",
    downloadCsv: "CSV ডাউনলোড করুন",
    actions: "অ্যাকশন",
    edit: "এডিট",
    delete: "মুছুন",
    save: "সেভ",
    cancel: "বাতিল",
    adminChat: "সাপোর্ট মেসেজ",
    reply: "উত্তর দিন",
    typeReply: "আপনার উত্তর লিখুন...",
    bulkNotice:
      "এজেন্সি: বাল্ক ফাইল নেগোসিয়েশনের জন্য অ্যাডমিনের সাথে যোগাযোগ করুন।",
  },
};

export const t = (lang: Language, key: keyof (typeof TRANSLATIONS)["en"]) => {
  return TRANSLATIONS[lang][key] || TRANSLATIONS["en"][key];
};

export const authKey: string = "accessToken";
