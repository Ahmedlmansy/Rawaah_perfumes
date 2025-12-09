import React from "react";
import {
  Send,
  Award,
  Users,
  Heart,
  Sparkles,
  Droplets,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 "></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Crafting Memories Through
              <span className="block mt-2 bg-gradient-to-r from-[#A78B64] to-[#8B7355] bg-clip-text text-transparent">
                Timeless Fragrances
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Welcome to Rawaah Perfumes, where passion meets artistry in every
              bottle. We are dedicated to creating luxurious fragrances that
              tell your unique story.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">10+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </CardContent>
            </Card>

            <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">150+</p>
                <p className="text-sm text-gray-600">Unique Fragrances</p>
              </CardContent>
            </Card>

            <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">50K+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </CardContent>
            </Card>

            <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">4.9</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-[#A78B64]/10 text-[#A78B64] hover:bg-[#A78B64]/20 mb-4">
                Our Story
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                A Journey of Passion & Excellence
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2013, Rawaah Perfumes began with a simple vision: to
                create fragrances that capture the essence of elegance and
                luxury. Our journey started in the heart of the Middle East,
                where the art of perfumery has been cherished for centuries.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Today, we blend traditional craftsmanship with modern
                innovation, sourcing the finest ingredients from around the
                world to create our signature scents. Each fragrance tells a
                story, evoking emotions and memories that last a lifetime.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Made with Love</p>
                  <p className="text-sm text-gray-500">
                    Every bottle is crafted with care
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-3xl transform rotate-3"></div>
              <div className="relative bg-gradient-to-br from-amber-100 to-stone-100 rounded-3xl p-12 aspect-square flex items-center justify-center">
                <Sparkles className="w-32 h-32 text-[#A78B64]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-[#A78B64]/10 text-[#A78B64] hover:bg-[#A78B64]/20 mb-4">
              Our Values
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do, from sourcing ingredients
              to serving our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quality First
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We never compromise on quality. Every ingredient is carefully
                  selected and every fragrance is meticulously crafted to meet
                  the highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We constantly explore new scent combinations and techniques,
                  pushing the boundaries of perfumery while respecting
                  traditional artistry.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#A78B64]/20 hover:shadow-xl transition-all group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Customer Care
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your satisfaction is our priority. {"We're"} dedicated to
                  providing exceptional service and creating experiences that
                  exceed expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#A78B64]/5 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-[#A78B64] hover:bg-[#8B7355] text-white mb-4">
            Our Promise
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Committed to Your Satisfaction
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Every bottle of Rawaah Perfume is a testament to our dedication to
            excellence. We promise to deliver not just a fragrance, but an
            experience that elevates your everyday moments.
          </p>
          <Button className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] text-white h-14 px-8 text-lg shadow-lg hover:shadow-xl">
            Get in Touch
            <Send className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
