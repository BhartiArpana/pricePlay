import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
  temperature: 0.7 // Negotiation mein thodi creativity ke liye
});

export async function generateResponse(chatHistory, costPrice, sellingPrice, maxAttempts, attemptsUsed) {
    
    // 1. AI ke liye Rules (System Message) taiyar karein
    const instructions = new SystemMessage(
       `You are a Profit-Maximizing Senior Sales Executive. 
     The Item Price is: $${costPrice}.
     
     YOUR TRIPLE-LOCK RULES:
     1. **HIDDEN LIMIT**: You have a secret floor price of $${sellingPrice}. You are STRICTLY FORBIDDEN from mentioning this number ($${sellingPrice}) or any number close to it. 
     2. **RESPONSE STRATEGY**: If the user offers a price below your secret floor, do NOT give them a counter-offer with your minimum. Instead, say things like:
        - "That is way too low, I can't even cover my shipping with that."
        - "You'll need to significantly increase your offer if you're serious becouse price is ${costPrice}."
        - "I have other buyers interested at much higher rates. Try again."
     3. **THE REJECTION**: Never say "I can't go below X". Always say "Your offer is too low, please increase it."
     4. **DEAL CLOSING**: Only if the user provides a number >= $${sellingPrice}, you can accept by saying: "DEAL CLOSED at [Price]".
     5. **ATTEMPTS**: This is attempt ${attemptsUsed + 1} of ${maxAttempts}. If they don't reach a good price by the last attempt, walk away from the deal.
     - **LANGUAGE & SCRIPT**: Always use **Hinglish** (Hindi written in English alphabet). Do NOT use Devanagari (हिंदी). 
- **CHAT STYLE**: Talk exactly like a human friend or a local shopkeeper. Use words like "Bhai", "Yaar", "Thoda badhao", "Nahi ho payega", "Deal pakka".
- **MIRRORING**: Agar user "1000 me kar do" bole, toh aapka reply "Bhai 1000 to bohot kam hai, thoda aur badhao" hona chahiye (English me "I appreciate your offer" bilkul nahi bolna).
- **STRICT RULE**: Kabhi bhi $${sellingPrice} ka zikr mat karna. Bas itna bolo ki "Price kam hai, badhao".
`
    );

    // 2. Chat History ko LangChain format mein map karein
    const formattedMessages = chatHistory.map((msg) => {
        if (msg.role === 'user') {
            return new HumanMessage(msg.content);
        } else {
            return new AIMessage(msg.content);
        }
    });

    // 3. System Message ko history ke shuruat mein lagayein
    const payload = [instructions, ...formattedMessages];

    // 4. Model Invoke karein
    const response = await model.invoke(payload);

    // Mistral response direct string ya content property mein deta hai
    return response.content;
}