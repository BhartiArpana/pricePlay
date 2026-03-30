import mongoose from 'mongoose';

const negotiationSchema = new mongoose.Schema({ // 'neogatiationSchema' nahi 'Schema' hoga
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true 
    },
    productId: { 
        type: String, 
        required: true 
    },
    attemptsUsed: {
        type: Number,
        default: 0
    },
    maxAttempts: {
        type: Number,
        default: 10
    },
    costPrice: Number, 
    sellingPrice: Number, 
    status: {
        type: String,
        enum: ['ongoing', 'sold', 'failed'],
        default: 'ongoing' 
    },
    chatHistory: [
        {
            role: { 
                type: String, 
                enum: ['user', 'ai'], 
                required: true 
            },
            content: { 
                type: String, 
                required: true 
            },
            timestamp: { 
                type: Date, 
                default: Date.now 
            }
        }
    ]
}, { timestamps: true }); 

export const negotiationModel = mongoose.model('Negotiation', negotiationSchema);