
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Users, Calculator, Mail } from "lucide-react";

const volumeTiers = [
  { min: 10, max: 49, discount: 15, name: "Small Team" },
  { min: 50, max: 99, discount: 25, name: "Department" },
  { min: 100, max: 499, discount: 35, name: "Company" },
  { min: 500, max: Infinity, discount: 45, name: "Enterprise" }
];

const basePrices = {
  Basic: 55,
  Complete: 111,
  Transformation: 222
};

export default function BulkOrders() {
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState(10);
  const [selectedTier, setSelectedTier] = useState("Complete");
  const [companyInfo, setCompanyInfo] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    message: ""
  });

  const calculatePricing = (licenseCount: number, tier: keyof typeof basePrices) => {
    const basePrice = basePrices[tier];
    const volumeTier = volumeTiers.find(t => licenseCount >= t.min && licenseCount <= t.max);
    const discount = volumeTier?.discount || 0;
    const discountedPrice = basePrice * (1 - discount / 100);
    const totalPrice = discountedPrice * licenseCount;
    
    return {
      basePrice,
      discountedPrice,
      totalPrice,
      discount,
      tierName: volumeTier?.name || "Individual"
    };
  };

  const pricing = calculatePricing(licenses, selectedTier as keyof typeof basePrices);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the quote request to your backend
    console.log("Quote request:", { licenses, selectedTier, pricing, companyInfo });
    alert("Thank you for your interest! We'll contact you within 24 hours with a custom quote.");
  };

  return (
    <main className="min-h-screen bg-black w-full py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Organizational Grief Healing Solutions
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Support your team, clients, or organization with volume pricing and enterprise-grade grief healing resources.
            Help your people transform loss into wisdom and strength.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Volume Calculator */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-blue-400" />
                Volume Pricing Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="licenses" className="text-gray-300">Number of Licenses</Label>
                <Input
                  id="licenses"
                  type="number"
                  min="10"
                  value={licenses}
                  onChange={(e) => setLicenses(Math.max(10, parseInt(e.target.value) || 10))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="tier" className="text-gray-300">Subscription Tier</Label>
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic Healing Plan ($55/month)</SelectItem>
                    <SelectItem value="Complete">Complete Healing Journey ($111/month)</SelectItem>
                    <SelectItem value="Transformation">Transformation Circle ($222/month)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Volume Tier:</span>
                  <span className="text-blue-400 font-semibold">{pricing.tierName}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Base Price:</span>
                  <span>${pricing.basePrice}/month</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span>Volume Discount:</span>
                  <span>{pricing.discount}% off</span>
                </div>
                <div className="flex justify-between text-white font-semibold text-lg border-t border-slate-600 pt-2">
                  <span>Price per License:</span>
                  <span>${pricing.discountedPrice.toFixed(2)}/month</span>
                </div>
                <div className="flex justify-between text-blue-400 font-bold text-xl">
                  <span>Total Monthly:</span>
                  <span>${pricing.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quote Request Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-400" />
                Request Custom Quote
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="company" className="text-gray-300">Company Name</Label>
                  <Input
                    id="company"
                    value={companyInfo.company}
                    onChange={(e) => setCompanyInfo({...companyInfo, company: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact" className="text-gray-300">Contact Person</Label>
                  <Input
                    id="contact"
                    value={companyInfo.contact}
                    onChange={(e) => setCompanyInfo({...companyInfo, contact: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                  <Input
                    id="phone"
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300">Additional Requirements</Label>
                  <Textarea
                    id="message"
                    value={companyInfo.message}
                    onChange={(e) => setCompanyInfo({...companyInfo, message: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Tell us about your organization's specific needs..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Request Custom Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-700/30">
            <CardHeader>
              <CardTitle className="text-blue-200 text-lg flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Admin Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-300 text-sm">
                Organizational overview of team healing progress with privacy-protected analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-700/30">
            <CardHeader>
              <CardTitle className="text-green-200 text-lg flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Team Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-300 text-sm">
                Aggregate insights on team emotional health trends while maintaining individual privacy.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-700/30">
            <CardHeader>
              <CardTitle className="text-purple-200 text-lg">Custom Branding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-300 text-sm">
                White-label options available for large organizations wanting branded experiences.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 border-yellow-700/30">
            <CardHeader>
              <CardTitle className="text-yellow-200 text-lg">Priority Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-300 text-sm">
                Dedicated customer success manager for 500+ licenses with priority response times.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <button
            className="text-gray-500 hover:text-gray-200 underline font-light"
            onClick={() => navigate("/subscribe")}
          >
            ← Back to Individual Plans
          </button>
        </div>
      </div>
    </main>
  );
}
