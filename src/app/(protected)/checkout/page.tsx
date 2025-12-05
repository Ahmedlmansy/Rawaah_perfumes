"use client";
import React, { useState } from "react";
import {
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  Package,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount_price?: number;
  image: string;
  size: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

// بيانات تجريبية - استبدلها بـ Redux
const mockCartItems: CartItem[] = [
  {
    product: {
      id: "1",
      name: "His Confession",
      brand: "Rawaah Perfumes",
      price: 150,
      discount_price: 120,
      image:
        "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/His_Confession.avif",
      size: "50ml",
    },
    quantity: 2,
  },
  {
    product: {
      id: "2",
      name: "Midnight Rose",
      brand: "Rawaah Perfumes",
      price: 180,
      image:
        "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/His_Confession.avif",
      size: "100ml",
    },
    quantity: 1,
  },
];

export default function CheckoutPage() {
  const [cartItems] = React.useState<CartItem[]>(mockCartItems);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form States
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // حساب الإجمالي
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.discount_price ?? item.product.price;
    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handlePlaceOrder = async () => {
    // Validation
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zip",
    ];
    const isValid = requiredFields.every(
      (field) => formData[field as keyof typeof formData].trim() !== ""
    );

    if (!isValid) {
      alert("Please fill in all required fields");
      return;
    }

    if (paymentMethod === "card") {
      const cardFields = ["cardNumber", "cardName", "expiry", "cvv"];
      const isCardValid = cardFields.every(
        (field) => formData[field as keyof typeof formData].trim() !== ""
      );
      if (!isCardValid) {
        alert("Please fill in all card details");
        return;
      }
    }

    setLoading(true);

    // محاكاة API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setOrderPlaced(true);
  };

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-stone-50/50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full text-center border-[#A78B64]/20">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-2">Thank you for your purchase</p>
            <p className="text-sm text-gray-500 mb-8">
              Order #:{" "}
              <span className="font-mono font-semibold">ORD-{Date.now()}</span>
            </p>
            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
                onClick={() => (window.location.href = "/orders")}
              >
                View Order Details
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#A78B64] text-[#A78B64] hover:bg-[#A78B64]/10"
                onClick={() => (window.location.href = "/")}
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-stone-50/50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
          <Button
            variant="ghost"
            className="text-[#A78B64] hover:text-[#8B7355] hover:bg-[#A78B64]/10"
            onClick={() => (window.location.href = "/cart")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="border-[#A78B64]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#A78B64]" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="border-[#A78B64]/30 focus:border-[#A78B64]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="border-[#A78B64]/30 focus:border-[#A78B64]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 border-[#A78B64]/30 focus:border-[#A78B64]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 border-[#A78B64]/30 focus:border-[#A78B64]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-[#A78B64]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#A78B64]" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border-[#A78B64]/30 focus:border-[#A78B64]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="border-[#A78B64]/30 focus:border-[#A78B64]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="border-[#A78B64]/30 focus:border-[#A78B64]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code *</Label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="border-[#A78B64]/30 focus:border-[#A78B64]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Leave at front door"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="border-[#A78B64]/30 focus:border-[#A78B64]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-[#A78B64]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#A78B64]" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-2 bg-[#A78B64]/10">
                    <TabsTrigger
                      value="card"
                      className="data-[state=active]:bg-[#A78B64] data-[state=active]:text-white"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger
                      value="cash"
                      className="data-[state=active]:bg-[#A78B64] data-[state=active]:text-white"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Cash on Delivery
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="pl-10 border-[#A78B64]/30 focus:border-[#A78B64]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input
                        id="cardName"
                        placeholder="JOHN DOE"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="border-[#A78B64]/30 focus:border-[#A78B64]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="border-[#A78B64]/30 focus:border-[#A78B64]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="cvv"
                            placeholder="123"
                            maxLength={3}
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="pl-10 border-[#A78B64]/30 focus:border-[#A78B64]"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cash" className="mt-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800 flex items-start gap-2">
                        <Package className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>
                          Pay with cash when your order is delivered. Please
                          have the exact amount ready.
                        </span>
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-[#A78B64]/20 sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products List */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => {
                    const price =
                      item.product.discount_price ?? item.product.price;
                    return (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#A78B64]/10 to-[#8B7355]/10 rounded-lg p-1 flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-semibold text-sm text-gray-900 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.product.brand}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs">
                              Qty: {item.quantity}
                            </Badge>
                            <span className="text-sm font-bold text-[#A78B64]">
                              ${(price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="bg-[#A78B64]/20" />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="bg-[#A78B64]/20" />

                {/* Total */}
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#A78B64]">${total.toFixed(2)}</span>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] text-white h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-xs text-gray-500 text-center justify-center">
                  <Lock className="w-3 h-3" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
