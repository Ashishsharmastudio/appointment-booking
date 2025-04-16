const GeminiClient = require("./geminiClient");
const Chat = require("../../models/Chat.model");
const Service = require("../../models/Service");

class ChatController {
  async handleQuestion(req, res) {
    try {
      console.log("Request received:", req.body);
      const { question } = req.body;
      console.log("Question:", question);

      // Get all smart home services
      console.log("Fetching smart home services...");
      const services = await Service.find({
        category: "4) Smart Home and Specific Purpose",
        isAvailable: true,
      });
      console.log(`Found ${services.length} smart home services:`, services);

      console.log("Detecting relevant service...");
      const relevantService = await this.detectRelevantService(
        question,
        services
      );
      console.log("Relevant service detected:", relevantService);

      console.log("Generating response with GeminiClient...");
      const response = await GeminiClient.generateSmartHomeResponse(
        services,
        question
      );
      console.log("Generated response:", response);

      console.log("Sending successful response to client");
      return res.status(200).json({
        success: true,
        data: {
          answer: response,
          detectedService: relevantService?.name || "Smart Home Solutions",
          category: "4) Smart Home and Specific Purpose",
        },
      });
    } catch (error) {
      console.error("Error in handleQuestion:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async detectRelevantService(question, services) {
    console.log("Starting service detection for question:", question);

    const keywordMap = {
      "smart home": services.filter((s) => s.solutionSet.includes("Smart")),
      automation: services.filter((s) => s.solutionSet.includes("Automation")),
      security: services.filter((s) => s.category === "2) Security and Access"),
    };

    console.log("Keyword map created:", keywordMap);

    for (const [keyword, matchedServices] of Object.entries(keywordMap)) {
      console.log(
        `Checking keyword "${keyword}":`,
        matchedServices.length,
        "matches"
      );

      if (
        question.toLowerCase().includes(keyword) &&
        matchedServices.length > 0
      ) {
        console.log(
          `Keyword "${keyword}" matched! Returning service:`,
          matchedServices[0]
        );
        return matchedServices[0];
      }
    }

    console.log(
      "No specific keyword matched, returning first service:",
      services[0]
    );
    return services[0];
  }
}

module.exports = new ChatController();
