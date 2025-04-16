const { model } = require("../../config/gemini");
const Service = require("../../models/Service");

class GeminiClient {
  async generateSmartHomeResponse(services, question) {
    const serviceDetails = services.map((s) => ({
      name: s.name,
      description: s.description,
      solutionSet: s.solutionSet,
      specificCategory: s.specificCategory,
    }));

    const prompt = `
      You are a knowledgeable smart home solutions expert. Provide a positive, informative response about our available smart home services.
      Available Services: ${JSON.stringify(serviceDetails)}
      Question: ${question}
      
      Focus on:
      - Specific features and benefits
      - Available solution sets
      - Integration capabilities
      - Key advantages
      
      Maintain a professional, enthusiastic tone without apologies or uncertainties.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async getServiceSpecificResponse(serviceId, question) {
    try {
      const service = await Service.findById(serviceId);
      const prompt = `
        Service Details: ${JSON.stringify(service)}
        Question: ${question}
        
        Please provide detailed information about this specific service.
      `;

      const result = await model.generateContent(prompt);
      return result.response.text();
      console.log(result.response.text());
    } catch (error) {
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
}

module.exports = new GeminiClient();
