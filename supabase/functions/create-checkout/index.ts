
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TIER_CONFIG: Record<string, { name: string; price_cents: number; sessions: number; mindfulness_credits: number }> = {
  "Basic": { name: "Gentle Beginning", price_cents: 3300, sessions: 1, mindfulness_credits: 0 },
  "Complete": { name: "Guided Journey", price_cents: 8800, sessions: 40, mindfulness_credits: 1 },
  "Transformation": { name: "Sacred Transformation", price_cents: 11100, sessions: 81, mindfulness_credits: 2 },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting create-checkout function");
    
    const { tier } = await req.json();
    console.log("Received tier:", tier);
    
    if (!tier || !TIER_CONFIG[tier]) {
      console.error("Invalid tier:", tier);
      return new Response(JSON.stringify({ error: "Invalid subscription tier selected." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    let user: any = null;
    let customerEmail = "guest@example.com"; // Default for guest checkouts

    // Try to authenticate user, but allow guest checkout
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      try {
        const { data: { user: authUser }, error: userError } = await supabaseClient.auth.getUser(token);
        if (!userError && authUser?.email) {
          user = authUser;
          customerEmail = authUser.email;
          console.log("User authenticated:", customerEmail);
        }
      } catch (error) {
        console.log("Authentication failed, proceeding as guest:", error);
      }
    } else {
      console.log("No authorization header, proceeding as guest checkout");
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("Stripe secret key not configured");
      return new Response(JSON.stringify({ error: "Payment system configuration error. Please try again later." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    console.log("Looking for existing customer with email:", customerEmail);
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else {
      console.log("No existing customer found, will create new one");
    }

    const origin = req.headers.get("origin") ?? "https://624547dc-459e-4c6d-9740-b72b9d6fe332.lovableproject.com";
    
    console.log("Creating checkout session for tier:", tier);
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: TIER_CONFIG[tier].name,
              description: `${TIER_CONFIG[tier].sessions} healing sessions per month, ${TIER_CONFIG[tier].mindfulness_credits} mindfulness mentoring credits`
            },
            unit_amount: TIER_CONFIG[tier].price_cents,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: {
        trial_period_days: 14,
        metadata: { 
          tier,
          sessions: TIER_CONFIG[tier].sessions.toString(),
          mindfulness_credits: TIER_CONFIG[tier].mindfulness_credits.toString()
        },
      },
      success_url: `${origin}/subscribe?success=1&tier=${encodeURIComponent(tier)}`,
      cancel_url: `${origin}/subscribe?canceled=1&tier=${encodeURIComponent(tier)}`,
    });

    console.log("Checkout session created successfully:", session.id);
    return new Response(JSON.stringify({ 
      url: session.url,
      id: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Detailed Stripe error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const userFriendlyMessage = errorMessage.includes("Invalid API Key") 
      ? "Payment system temporarily unavailable. Please try again in a few minutes."
      : errorMessage.includes("No such customer")
      ? "Account verification failed. Please contact support."
      : "Payment processing failed. Please try again or contact support.";
    
    return new Response(
      JSON.stringify({ 
        error: userFriendlyMessage,
        technical_details: errorMessage
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 500 
      }
    );
  }
});
