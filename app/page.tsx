"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import {
  Globe,
  Send as Telegram,
  Instagram,
  Mail,
  MessageCircleIcon as MessageSquare,
  Download,
  Share2,
  Phone,
  Moon,
  Sun,
  Languages,
  ArrowUpRight,
  QrCode,
  X,
} from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Loader } from "@/components/ui/loader"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactCard() {
  const [showQR, setShowQR] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [language, setLanguage] = useState<"en" | "ru">("en")
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [qrCodeData, setQrCodeData] = useState<string>("")
  const [selectedInfo, setSelectedInfo] = useState<string>("all")
  const [isBioExpanded, setIsBioExpanded] = useState(false)

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
      en: "Saikal Asylbekova",
      ru: "Асылбекова Сайкал",
    },
    title: {
      en: "Entrepreneur & Franchising Expert",
      ru: "Предприниматель и Эксперт по Франчайзингу",
    },
    role: {
      en: "CEO & Founder",
      ru: "CEO и основатель",
    },
    company: "BIZ Franchise",
    location: {
      en: "Bishkek, KYRGYZSTAN",
      ru: "Бишкек, КЫРГЫЗСТАН",
    },
    website: "bizfranchise.org",
    telegram: "https://t.me/SaikalA",
    instagram: "https://www.instagram.com/saikal_asylbek/",
    email: "asylbekovasaikal@gmail.com",
    phone: "+996 556 781 818",
    calendly: "calendly.com/saikaasylbekova",
    bio: {
      en: "Saikal Asylbekova is a franchising expert and a leader in promoting local franchises across the CIS. She is the inspiration behind and creator of the largest network of supplementary education for children, 'Academy of Growth'. Saikal founded the first franchise packaging company 'BIZ Franchise' in Kyrgyzstan, which has helped many entrepreneurs successfully scale their businesses and enter the international market. 'BIZ Franchise' is a brokerage and consulting company founded in 2018, specializing in franchise business development in Kyrgyzstan. The company provides a wide range of services, including franchise packaging, brokerage, consulting, and trademark registration, to help entrepreneurs successfully launch and manage franchises.",
      ru: "Асылбекова Сайкал Фридоновна — эксперт в области франчайзинга, лидер в продвижении локальных франшиз по СНГ. Она является вдохновителем и создателем крупнейшей сети дополнительного образования для детей, 'Академия Роста'. Основала первую компанию по упаковке франшиз 'BIZ Franchise' в Кыргызстане, которая помогла многим предпринимателям успешно масштабировать свои бизнесы и выйти на международный рынок. 'BIZ Franchise' — брокерская и консалтинговая компания, основанная в 2018 году, специализирующаяся на развитии франчайзингового бизнеса в Кыргызстане. Компания предоставляет широкий спектр услуг, включая упаковку франшиз, брокерство, консалтинг и регистрацию товарного знака, чтобы помочь предпринимателям успешно запускать и управлять франшизами.",
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
        data = `https://www.asylbekova.space/`
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
      case "telegram":
        data = `${contactInfo.telegram}`
        break
      default:
        data = window.location.href
    }
    setQrCodeData(data)
  }

  useEffect(() => {
    generateQRCodeData(selectedInfo)
  }, [selectedInfo, generateQRCodeData]) // Added generateQRCodeData to dependencies

  const contactLinks = [
      {
      icon: Mail,
      label: { en: "Email", ru: "Почта" },
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
      {
      icon: Telegram,
      label: "Telegram",
      value: "@SaikalA",
       href: `https://${contactInfo.telegram}`,
    },
       {
      icon: Instagram,
      label: "Instagram",
      value: "@saikal_asylbek",
      href: `https://${contactInfo.instagram}`,
    },
    {
      icon: Globe,
      label: { en: "Company Website", ru: "Сайт компании" },
      value: contactInfo.website,
      href: `https://${contactInfo.website}`,
    },
    {
      icon: Phone,
      label: { en: "Phone", ru: "Телефон" },
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: contactInfo.phone,
      href: `https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, "")}`,
    },
  ]

  const hashtags = ["#BizFranchise", "#Franchising", "#Entrepreneurship", "#Kyrgyzstan",]

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
        <Image src="https://asylbekova.space/background.jpg" alt="Cover" fill className="object-cover" />
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
        <div className="absolute top-4 left-4 flex items-center gap-4">
          <div className="p-2 rounded-lg transition-all duration-300 bg-white">
            <Image
                src="https://asylbekova.space/logo2.png"
              alt="Academy of Growth Logo"
              width={120}
              height={40}
              className={`h-8 w-auto transition-all duration-300`}
            />
          </div>
          <div className="p-2 rounded-lg transition-all duration-300 bg-white">
            <Image
                src="https://asylbekova.space/logo1.png"
              alt="KAFF Logo"
              width={120}
              height={40}
              className={`h-8 w-auto transition-all duration-300`}
            />
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative px-4 pb-4 -mt-20 md:-mt-32">
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="max-w-4xl mx-auto">
          <div className="md:flex md:items-end md:justify-between">
            <div className="md:flex md:items-center">
              {/* Profile Image */}
              <motion.div
                  initial={{scale: 0.8, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  transition={{delay: 0.2}}
                  className="mb-4 md:mb-0 md:mr-6"
              >
                <Image
                    src="https://asylbekova.space/profile.jpg"
                    alt={contactInfo.name[language]}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white shadow-xl sm:w-32 sm:h-32 md:w-40 md:h-40"
                />
              </motion.div>

              {/* Profile Info */}
              <div className="mb-6 md:mb-0">
                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3}}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
                >
                  {contactInfo.name[language]}
                </motion.h1>
                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.4}}
                    className="text-lg sm:text-xl md:text-2xl mb-2 "
                >
                  {contactInfo.title[language]}
                </motion.p>
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5}}
                    className="flex flex-col sm:flex-row sm:items-center text-gray-500 text-base sm:text-lg"
                >
                  <span>{`${contactInfo.role[language]} | ${contactInfo.company}`}</span>
                  <span className="hidden sm:inline mx-2">|</span>
                  <span>{contactInfo.location[language]}</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.6}}
              className={`mt-6 p-6 rounded-xl ${
                  isDark ? "bg-gray-800/50 text-gray-200 border border-gray-700" : "bg-white text-gray-800 border border-gray-200"
              } shadow-sm `}
          >
            <div className="relative">
              <p
                  className={`text-base sm:text-lg ${isDark ? "text-gray-300" : "text-gray-600"} ${
                      !isBioExpanded ? "line-clamp-3" : ""
                  }`}
              >
                {contactInfo.bio[language]}
              </p>
              <button
                  onClick={() => setIsBioExpanded(!isBioExpanded)}
                  className={`mt-2 text-sm font-medium ${
                      isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-700"
                  }`}
              >
                {isBioExpanded
                    ? language === "en"
                        ? "Read less"
                        : "Свернуть"
                    : language === "en"
                        ? "Read more"
                        : "Читать далее"}
              </button>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.9}}
              className="grid grid-cols-3 gap-3 mb-8 mt-8"
          >
            <Button
                className="w-full bg-primary hover:bg-primary-hover text-white transition-colors text-base sm:text-lg py-4 sm:py-5"
                onClick={handleSaveContact}
            >
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{language === "en" ? "Save" : "Сохранить"}</span>
                <span className="sm:hidden">{language === "en" ? "Save" : "Сохр.."}</span>
            </Button>
            <Button
                variant="outline"
                className={`w-full ${
                    isDark
                        ? "border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white"
                        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
                } transition-colors text-base sm:text-lg py-4 sm:py-5`}
                onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{language === "en" ? "Share" : "Поделиться"}</span>
                <span className="sm:hidden">{language === "en" ? "Share" : "Под.."}</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className={`w-full ${
                        isDark
                            ? "border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white"
                            : "border-gray-300 text-gray-800 bg-white hover:bg-gray-100"
                    } transition-colors text-base sm:text-lg py-4 sm:py-5`}
                >
                  <QrCode className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">{language === "en" ? "QR Code" : "QR-код"}</span>
                    <span className="sm:hidden">QR</span>
                  </Button>
              </SheetTrigger>
              <SheetContent
                  side="bottom"
                  className={`h-[80vh] rounded-t-2xl ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
              >
                <SheetHeader className="items-center pb-6 mb-6">
                  <SheetTitle className="text-2xl font-bold">
                    {language === "en" ? "Dynamic QR Code" : "Динамический QR-код"}
                  </SheetTitle>
                  <SheetClose className="absolute right-2 top-0 border rounded-lg border-accent text-accent">
                    <X className="h-6 w-6"/>
                  </SheetClose>
                </SheetHeader>
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-full max-w-xs">
                    <label className="block text-sm font-medium mb-2">
                      {language === "en" ? "Select information to share:" : "Выберите информацию для обмена:"}
                    </label>
                    <Select onValueChange={setSelectedInfo} defaultValue={selectedInfo}>
                      <SelectTrigger
                          className={`w-full ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}
                      >
                        <SelectValue placeholder="Select info to share"/>
                      </SelectTrigger>
                      <SelectContent className={isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}>
                        <SelectItem value="all">{language === "en" ? "All Info" : "Вся информация"}</SelectItem>
                        <SelectItem value="email">{language === "en" ? "Email" : "Электронная почта"}</SelectItem>
                        <SelectItem value="phone">{language === "en" ? "Phone" : "Телефон"}</SelectItem>
                        <SelectItem value="website">{language === "en" ? "Website" : "Веб-сайт"}</SelectItem>
                        <SelectItem value="telegram">{language === "en" ? "Telegram" : "Телеграм"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className={`p-2 rounded-xl relative ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                    <QRCodeSVG
                        value={qrCodeData}
                        size={350}
                        level="H"
                        includeMargin
                        bgColor={isDark ? "#1e293b" : "#ffffff"}
                        fgColor={isDark ? "#e2e8f0" : "#1e293b"}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                          className={`
                        w-12 h-12 rounded-full 
                        ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
                        border-2 ${isDark ? "border-gray-700" : "border-gray-200"}
                        flex items-center justify-center
                        font-bold text-lg
                      `}
                      >
                        SA
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-center max-w-xs">
                    {language === "en"
                        ? "Scan this QR code to share your selected information."
                        : "Отсканируйте этот QR-код, чтобы поделиться выбранной информацией."}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
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
                            ? "bg-gray-800/50 hover:bg-gray-700 border border-gray-700"
                            : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200"
                    }`}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1 + index * 0.1}}
                >
                  <link.icon
                      className="w-10 h-10 text-primary bg-gray-50 border border-gray-300 rounded-lg p-2 transition-colors group-hover:text-primary-light group-hover:border-primary"
                  />
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
                        {link.href.startsWith("mailto") ? <Mail className="w-4 h-4"/> : <Phone className="w-4 h-4"/>}
                      </Button>
                  )}
                </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1.5}}
          className="mt-12 py-6"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {hashtags.map((tag, index) => (
                <motion.span
                    key={index}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1.6 + index * 0.1}}
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                        isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                initial={{opacity: 0}}
                animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`w-full sm:w-auto sm:max-w-sm ${
                isDark ? "bg-gray-800" : "bg-white"
              } p-6 rounded-t-2xl sm:rounded-2xl shadow-xl border ${isDark ? "border-gray-700" : "border-gray-200"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4 text-center">
                {language === "en" ? "Scan QR Code" : "Сканируйте QR-код"}
              </h3>
              <div className="flex justify-center mb-4">
                <QRCodeSVG
                  value={window.location.href}
                  size={600}
                  level="H"
                  includeMargin
                  bgColor={isDark ? "#1e293b" : "#ffffff"}
                  fgColor={isDark ? "#e2e8f0" : "#1e293b"}
                  imageSettings={{
                    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bizfranchise-logo-300-RsMRCE1KWOaNO5ytsfyUSdrHnTANJK.png",
                    height: 60,
                    width: 60,
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

