"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    //
    setIsSubmitted(true);
  };
  return (
    <div className="min-h-screen  py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {"Let's"} Start a
            <span className="block mt-2 bg-gradient-to-r from-[#A78B64] to-[#8B7355] bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to learn more?{" We'd"} love to hear from
            you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 mb-4">Mon-Fri 9am-6pm</p>
              <a
                href="tel:+201234567890"
                className="text-[#A78B64] hover:text-[#8B7355] font-semibold"
              >
                +20 123 456 7890
              </a>
            </CardContent>
          </Card>

          <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">We reply within 24hrs</p>
              <a
                href="mailto:info@rawaah.com"
                className="text-[#A78B64] hover:text-[#8B7355] font-semibold"
              >
                info@rawaah.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600 mb-4">Visit our showroom</p>
              <p className="text-[#A78B64] font-semibold">Cairo, Egypt</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Card className="border-[#A78B64]/20 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-green-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-green-700">
                    Your message has been sent successfully. {"We'll"} get back
                    to you soon!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ahmed Mohamed"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="border-[#A78B64]/30 focus:border-[#A78B64]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ahmed@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="border-[#A78B64]/30 focus:border-[#A78B64]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+20 123 456 7890"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="border-[#A78B64]/30 focus:border-[#A78B64]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-700">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="border-[#A78B64]/30 focus:border-[#A78B64]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={6}
                      className="border-[#A78B64]/30 focus:border-[#A78B64]"
                      required
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] text-white h-12 text-lg shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="space-y-8">
            <Card className="border-[#A78B64]/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#A78B64]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#A78B64]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Business Hours
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-[#A78B64]/20" />

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-[#A78B64]/30 hover:bg-[#A78B64] hover:text-white hover:border-[#A78B64] transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-[#A78B64]/30 hover:bg-[#A78B64] hover:text-white hover:border-[#A78B64] transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-[#A78B64]/30 hover:bg-[#A78B64] hover:text-white hover:border-[#A78B64] transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-[#A78B64]/30 hover:bg-[#A78B64] hover:text-white hover:border-[#A78B64] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#A78B64]/20 bg-gradient-to-br from-[#A78B64]/5 to-transparent">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Response
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call us directly.
                </p>
                <div className="flex items-center gap-2 text-sm text-[#A78B64]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-semibold">
                    Average response time: 4 hours
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
