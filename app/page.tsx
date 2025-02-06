"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import {
  Globe,
  Linkedin,
  Instagram,
  Mail,
  Calendar,
  Download,
  Share2,
  Phone,
  Moon,
  Sun,
  Languages,
  ArrowUpRight,
  QrCode,
} from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Loader } from "@/components/ui/loader"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactCard() {
  const [showQR, setShowQR] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [language, setLanguage] = useState<"en" | "ru">("en")
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [qrCodeData, setQrCodeData] = useState<string>("")
  const [selectedInfo, setSelectedInfo] = useState<string>("all")

  useEffect(() => {
    setMounted(true)
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true)
    }
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.style.backgroundColor = isDark ? "#020617" : "#f8fafc"
  }, [isDark])

  const contactInfo = {
    name: {
      en: "John Doe",
      ru: "Джон Доу",
    },
    title: {
      en: "Business Development Manager",
      ru: "Менеджер по развитию бизнеса",
    },
    company: "Biz Franchise",
    location: {
      en: "Bishkek, Kyrgyzstan",
      ru: "Бишкек, Кыргызстан",
    },
    website: "bizfranchise.kg",
    linkedin: "linkedin.com/in/johndoe",
    instagram: "instagram.com/johndoe",
    email: "john@bizfranchise.kg",
    phone: "+996 700 123 456",
    calendly: "calendly.com/johndoe",
    stats: {
      experience: "5+ years",
      deals: "50+",
      countries: "10+",
    },
  }

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name[language]}
TITLE:${contactInfo.title[language]}
ORG:${contactInfo.company}
EMAIL:${contactInfo.email}
TEL:${contactInfo.phone}
URL:${contactInfo.website}
END:VCARD`

    const blob = new Blob([vcard], { type: "text/vcard" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${contactInfo.name[language].replace(" ", "_")}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(language === "en" ? "Contact saved!" : "Контакт сохранен!")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: contactInfo.name[language],
          text: `${contactInfo.name[language]} - ${contactInfo.title[language]} at ${contactInfo.company}`,
          url: window.location.href,
        })
      } catch (err) {
        // Only show QR code if it's not an abort error (user didn't cancel)
        // @ts-ignore
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err)
          setShowQR(true)
        }
      }
    } else {
      setShowQR(true)
    }
  }

  const generateQRCodeData = (info: string) => {
    let data = ""
    switch (info) {
      case "all":
        data = `${contactInfo.name[language]}\n${contactInfo.title[language]}\n${contactInfo.company}\n${contactInfo.email}\n${contactInfo.phone}\n${contactInfo.website}`
        break
      case "email":
        data = contactInfo.email
        break
      case "phone":
        data = contactInfo.phone
        break
      case "website":
        data = `https://${contactInfo.website}`
        break
      case "linkedin":
        data = `https://${contactInfo.linkedin}`
        break
      default:
        data = window.location.href
    }
    setQrCodeData(data)
  }

  useEffect(() => {
    generateQRCodeData(selectedInfo)
  }, [selectedInfo, language, contactInfo])

  const contactLinks = [
    {
      icon: Globe,
      label: { en: "Website", ru: "Вебсайт" },
      value: contactInfo.website,
      href: `https://${contactInfo.website}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: contactInfo.linkedin,
      href: `https://${contactInfo.linkedin}`,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: contactInfo.instagram,
      href: `https://${contactInfo.instagram}`,
    },
    {
      icon: Mail,
      label: { en: "Email", ru: "Почта" },
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      label: { en: "Phone", ru: "Телефон" },
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
    },
    {
      icon: Calendar,
      label: { en: "Schedule a meeting", ru: "Запланировать встречу" },
      value: "Calendly",
      href: `https://${contactInfo.calendly}`,
    },
  ]

  const hashtags = ["#BizFranchise", "#BusinessCard", "#Networking", "#Kyrgyzstan"]

  if (!mounted) return null

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header Image */}
      <div className="relative h-64 sm:h-80 md:h-96">
        <Image src="https://www.sanfrancisco.net/f/estados-unidos/san-francisco/guia/golden-gate.jpg" alt="Cover" fill className="object-cover" />
        <div className={`absolute inset-0 ${isDark ? "bg-gradient-dark" : "bg-gradient-light"}`} />

        {/* Theme & Language Toggle */}
        <div className="absolute top-4 right-4 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                  onClick={() => setIsDark(!isDark)}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{isDark ? "Switch to light mode" : "Switch to dark mode"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                  onClick={() => setLanguage(language === "en" ? "ru" : "en")}
                >
                  <Languages className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {language === "en" ? "Switch to Russian" : "Switch to English"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Logo */}
        <div className="absolute top-4 left-4">
          <div className="p-2 rounded-lg transition-all duration-300 bg-primary">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bizfranchise-logo-300-RsMRCE1KWOaNO5ytsfyUSdrHnTANJK.png"
              alt="Biz Franchise Logo"
              width={120}
              height={40}
              className={`h-8 w-auto transition-all duration-300 ${isDark ? "brightness-200" : "brightness-100"}`}
            />
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative px-4 pb-4 -mt-20 md:-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="md:flex md:items-end md:justify-between">
            <div className="md:flex md:items-center">
              {/* Profile Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 md:mb-0 md:mr-6"
              >
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/10438/10438146.png"
                  alt={contactInfo.name[language]}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white shadow-xl sm:w-32 sm:h-32 md:w-40 md:h-40"
                />
              </motion.div>

              {/* Profile Info */}
              <div className="mb-8 md:mb-0">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-2xl sm:text-3xl font-bold mb-2`}
                >
                  {contactInfo.name[language]}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-base sm:text-lg mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {contactInfo.title[language]}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`text-sm sm:text-base ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {contactInfo.location[language]}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 mt-6 sm:mt-8">
            {Object.entries(contactInfo.stats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`text-center p-2 sm:p-4 rounded-xl backdrop-blur-md ${
                  isDark ? "bg-background-card border border-gray-800" : "bg-white/80 shadow-lg border border-gray-100"
                }`}
              >
                <div className={`text-lg sm:text-2xl font-bold`}>{value}</div>
                <div className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {language === "en" ? key : key === "experience" ? "опыт" : key === "deals" ? "сделки" : "страны"}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            <Button
              className="w-full bg-primary hover:bg-primary-hover text-white transition-colors text-sm sm:text-base py-3 sm:py-4"
              onClick={handleSaveContact}
            >
              <Download className="w-4 h-4 mr-2" />
              {language === "en" ? "Save" : "Сохранить"}
            </Button>
            <Button
              variant="outline"
              className={`w-full ${
                isDark
                  ? "border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white"
                  : "border-gray-300 text-gray-200 hover:bg-gray-100 hover:text-gray-800"
              } transition-colors text-sm sm:text-base py-3 sm:py-4`}
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {language === "en" ? "Share" : "Поделиться"}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full ${
                    isDark
                      ? "border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white"
                      : "border-gray-300 text-gray-200 hover:bg-gray-100 hover:text-gray-800"
                  } transition-colors text-sm sm:text-base py-3 sm:py-4`}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  {language === "en" ? "QR Code" : "QR-код"}
                </Button>
              </DialogTrigger>
              <DialogContent className={isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}>
                <DialogHeader>
                  <DialogTitle>{language === "en" ? "Dynamic QR Code" : "Динамический QR-код"}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                  <Select onValueChange={setSelectedInfo} defaultValue={selectedInfo}>
                    <SelectTrigger
                      className={`w-[180px] ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                    >
                      <SelectValue placeholder="Select info to share" />
                    </SelectTrigger>
                    <SelectContent className={isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"}>
                      <SelectItem value="all">{language === "en" ? "All Info" : "Вся информация"}</SelectItem>
                      <SelectItem value="email">{language === "en" ? "Email" : "Электронная почта"}</SelectItem>
                      <SelectItem value="phone">{language === "en" ? "Phone" : "Телефон"}</SelectItem>
                      <SelectItem value="website">{language === "en" ? "Website" : "Веб-сайт"}</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                  <QRCodeSVG
                    value={qrCodeData}
                    size={200}
                    level="H"
                    includeMargin
                    bgColor={isDark ? "#1e293b" : "#ffffff"}
                    fgColor={isDark ? "#e2e8f0" : "#1e293b"}
                    imageSettings={{
                      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bizfranchise-logo-300-RsMRCE1KWOaNO5ytsfyUSdrHnTANJK.png",
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Contact Links */}
          <div className="grid gap-3 md:grid-cols-2">
            {contactLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group flex items-center p-4 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "bg-background-card hover:bg-gray-800/80 border border-gray-800"
                    : "bg-white/80 hover:bg-white shadow-md hover:shadow-lg border border-gray-100"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <link.icon className="w-6 h-6 text-primary transition-colors group-hover:text-primary-light" />
                <div className="ml-4 flex-1">
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {typeof link.label === "object" ? link.label[language] : link.label}
                  </p>
                  <p>{link.value}</p>
                </div>
                {link.href.startsWith("http") ? (
                  <ArrowUpRight
                    className={`w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                ) : (
                  <Button variant="ghost" size="icon" className="shrink-0 text-gray-400 hover:text-gray-300">
                    {link.href.startsWith("mailto") ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  </Button>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 py-6"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {hashtags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-300 hover:bg-gray-200"
                } transition-colors duration-200 cursor-pointer`}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <p className={`text-center mt-6 text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            © {new Date().getFullYear()} Mood Cards. All rights reserved.
          </p>
        </div>
      </motion.footer>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${
                isDark ? "bg-background-card" : "bg-white"
              } p-6 rounded-2xl max-w-sm w-full shadow-xl border ${isDark ? "border-gray-800" : "border-gray-200"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4 text-center">
                {language === "en" ? "Scan QR Code" : "Сканируйте QR-код"}
              </h3>
              <div className="flex justify-center mb-4">
                <QRCodeSVG
                  value={window.location.href}
                  size={200}
                  level="H"
                  includeMargin
                  bgColor={isDark ? "#1e293b" : "#ffffff"}
                  fgColor={isDark ? "#ffffff" : "#000000"}
                  imageSettings={{
                    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bizfranchise-logo-300-RsMRCE1KWOaNO5ytsfyUSdrHnTANJK.png",
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>
              <Button variant="outline" className="w-full" onClick={() => setShowQR(false)}>
                {language === "en" ? "Close" : "Закрыть"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster position="bottom-center" />
    </div>
  )
}

