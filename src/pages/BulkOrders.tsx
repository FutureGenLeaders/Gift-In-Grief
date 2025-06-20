
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function BulkOrders() {
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState(10);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    tier: "Guided Journey"
  });

  const getDiscount = (licenseCount: number) => {
    if (licenseCount >= 500) return 45;
    if (licenseCount >= 100) return 35;
    if (licenseCount >= 50) return 25;
    if (licenseCount >= 10) return 15;
    return 0;
  };

  const basePrices = {
    "Gentle Beginning": 55,
    "Guided Journey": 111,
    "Sacred Transformation": 222
  };

  const calculatePrice = () => {
    const basePrice = basePrices[formData.tier as keyof typeof basePrices];
    const discount = getDiscount(licenses);
    const discountedPrice = basePrice * (1 - discount / 100);
    return {
      originalPrice: basePrice * licenses,
      discountedPrice: discountedPrice * licenses,
      perLicense: discountedPrice,
      savings: (basePrice * licenses) - (discountedPrice * licenses),
      discount
    };
  };

  const pricing = calculatePrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted",
      description: "We'll contact you within 24 hours with your custom pricing.",
    });
  };

  return (
    <main className="min-h-screen bg-black w-full py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-red-800 to-yellow-400 bg-clip-text text-transparent">
            Organizational & Bulk Orders
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Transform your entire organization with volume pricing and enterprise features. 
            Support your team's emotional wellness with our comprehensive grief healing platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Volume Calculator */}
          <Card className="bg-gradient-to-br from-yellow-900/20 to-red-900/20 border-yellow-700/30">
            <CardHeader>
              <CardTitle className="text-yellow-200 text-2xl">Volume Pricing Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-yellow-100">Number of Licenses</Label>
                <Input
                  type="number"
                  min="10"
                  value={licenses}
                  onChange={(e) => setLicenses(Number(e.target.value))}
                  className="bg-black/50 border-yellow-700/50 text-white"
                />
              </div>
              
              <div>
                <Label className="text-yellow-100">Subscription Tier</Label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({...formData, tier: e.target.value})}
                  className="w-full p-2 bg-black/50 border border-yellow-700/50 rounded text-white"
                >
                  <option value="Gentle Beginning">Gentle Beginning ($55/month)</option>
                  <option value="Guided Journey">Guided Journey ($111/month)</option>
                  <option value="Sacred Transformation">Sacred Transformation ($222/month)</option>
                </select>
              </div>

              <div className="bg-black/30 p-4 rounded-lg border border-yellow-700/30">
                <div className="text-yellow-200 space-y-2">
                  <div className="flex justify-between">
                    <span>Original Price:</span>
                    <span className="line-through">${pricing.originalPrice.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Volume Discount ({pricing.discount}%):</span>
                    <span className="text-yellow-400">-${pricing.savings.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t border-yellow-700/50 pt-2">
                    <span>Total Monthly:</span>
                    <span className="text-yellow-400">${pricing.discountedPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-yellow-300">
                    ${pricing.perLicense.toFixed(2)} per license/month
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 p-4 rounded-lg border border-red-700/30">
                <h4 className="text-red-200 font-semibold mb-2">Volume Discount Tiers:</h4>
                <div className="text-red-300 text-sm space-y-1">
                  <div>10-49 licenses: 15% discount</div>
                  <div>50-99 licenses: 25% discount</div>
                  <div>100-499 licenses: 35% discount</div>
                  <div>500+ licenses: 45% discount + enterprise features</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quote Request Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Request Custom Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-gray-300">Company Name</Label>
                  <Input
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="bg-black/50 border-slate-600 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Contact Person</Label>
                  <Input
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    className="bg-black/50 border-slate-600 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Email</Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-black/50 border-slate-600 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-black/50 border-slate-600 text-white"
                  />
                </div>

                <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                  Request Custom Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Features */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-red-900/20 to-yellow-900/20 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-red-200 text-2xl text-center">Enterprise Features (500+ Licenses)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-red-300">
                <div>
                  <h4 className="font-semibold mb-2">Admin Dashboard</h4>
                  <p className="text-sm">Organizational overview of team healing progress</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Usage Analytics</h4>
                  <p className="text-sm">Aggregate insights on team emotional health trends</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Custom Branding</h4>
                  <p className="text-sm">White-label option for large organizations</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Dedicated Support</h4>
                  <p className="text-sm">Priority customer success manager</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <button
            className="text-gray-500 hover:text-gray-200 underline"
            onClick={() => navigate("/")}
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
