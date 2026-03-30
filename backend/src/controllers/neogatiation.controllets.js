import { negotiationModel } from "../models/neogatiation.model.js";
import { generateResponse } from '../services/ai.service.js';

export async function negotiation(req, res) {
    try {
        const { productId } = req.params;
        const { content, costPrice, sellingPrice } = req.body;
        const userId = req.user._id; // Middleware se aaya hua user

        // 1. Pehle check karein ki kya is user aur product ke liye pehle se negotiation chal rahi hai?
        let session = await negotiationModel.findOne({ userId, productId, status: 'ongoing' });

        // 2. Agar session nahi hai, toh naya create karein
        if (!session) {
            session = await negotiationModel.create({
                userId,
                productId,
                costPrice,
                sellingPrice,
                chatHistory: []
            });
        }

        // 3. Check karein ki attempts khatam toh nahi ho gaye
        if (session.attemptsUsed >= session.maxAttempts) {
            return res.status(400).json({ message: "Negotiation limits reached. Final price stands." });
        }

        // 4. User ka current message history mein add karein (Temporary for AI context)
        const currentChatHistory = [...session.chatHistory, { role: 'user', content }];

        // 5. AI Service ko saara data pass karein
        const aiResponse = await generateResponse(
            currentChatHistory, 
            session.costPrice, 
            session.sellingPrice, 
            session.maxAttempts, 
            session.attemptsUsed
        );

        // 6. Database Update karein (User ka message, AI ka message, aur attempts increment)
        session.chatHistory.push({ role: 'user', content });
        session.chatHistory.push({ role: 'ai', content: aiResponse });
        session.attemptsUsed += 1;

        // 7. Check if Deal is Closed (Optional: AI ke message mein 'DEAL CLOSED' keyword dhoondein)
        if (aiResponse.includes("DEAL CLOSED")) {
            session.status = 'sold';
        } else if (session.attemptsUsed >= session.maxAttempts) {
            session.status = 'failed';
        }

        await session.save();

        // 8. Final response bhejien
        res.status(200).json({
            reply: aiResponse,
            attemptsLeft: session.maxAttempts - session.attemptsUsed,
            status: session.status
        });

    } catch (err) {
        console.error("Negotiation Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}