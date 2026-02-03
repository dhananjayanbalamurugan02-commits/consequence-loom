import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are NeuroPath AI, a cognitive decision intelligence engine. Your role is to analyze human decisions and explore their consequences across multiple possible futures.

When given a decision, context, and priorities, you must:
1. Identify 3 distinct possible futures/outcomes based on the decision
2. Uncover hidden assumptions the user might be making
3. Reveal potential trade-offs for each path
4. Provide actionable insights and guidance

Respond with a JSON object in this exact format:
{
  "summary": "A 2-3 sentence executive summary of the decision landscape",
  "outcomes": [
    {
      "title": "Outcome title (10 words max)",
      "likelihood": "high" | "medium" | "low",
      "timeframe": "e.g., '1-2 years', '6 months', 'Immediate'",
      "narrative": "A detailed 3-4 paragraph narrative describing this future. Use markdown for formatting. Be specific and vivid.",
      "tradeoffs": ["Trade-off 1", "Trade-off 2", "Trade-off 3"],
      "insights": ["Insight 1", "Insight 2"],
      "actionItems": ["Action 1", "Action 2", "Action 3"]
    }
  ]
}

Guidelines:
- The first outcome should be the most likely positive path
- The second outcome should explore a moderate/balanced scenario
- The third outcome should reveal potential challenges or cautionary paths
- Be honest about uncertainty but constructive in guidance
- Focus on the user's stated priorities
- Uncover at least one hidden assumption per outcome
- Make narratives vivid and specific, not generic
- Action items should be concrete and immediately actionable

IMPORTANT: Respond ONLY with the JSON object, no additional text.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { decision, context, priorities } = await req.json();

    if (!decision) {
      return new Response(
        JSON.stringify({ error: "Decision is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userMessage = `Please analyze this decision and explore its possible futures:

DECISION: ${decision}

${context ? `CONTEXT: ${context}` : ""}

${priorities ? `PRIORITIES: ${priorities}` : ""}

Provide a comprehensive analysis with 3 distinct future pathways.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later.", status: 429 }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits.", status: 402 }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let analysisResult;
    try {
      // Remove potential markdown code blocks
      const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response");
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("analyze-decision error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
