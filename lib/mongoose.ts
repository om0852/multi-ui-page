import mongoose from 'mongoose';

// Define a type for the cached connection
type CachedConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Fix TypeScript global type
declare global {
  var mongoose: CachedConnection | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI as string;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: CachedConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose);
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

// Define interface for the Customization document
interface ICustomization {
  componentName: string;
  variantId: string;
  userInput: string;
  generatedCode: string;
  timestamp: Date;
  createdAt: Date;
}

// Define Mongoose Schema
const CustomizationSchema = new mongoose.Schema({
  componentName: { 
    type: String, 
    required: true 
  },
  variantId: { 
    type: String, 
    required: true 
  },
  userInput: { 
    type: String, 
    required: true 
  },
  generatedCode: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  // Auto-expire after 30 minutes
  createdAt: { 
    type: Date, 
    default: Date.now,
    expires: 60 * 30 // 30 minutes in seconds
  }
});

// Create or retrieve model
export const CustomizationModel = mongoose.models.Customization || 
  mongoose.model<ICustomization>('Customization', CustomizationSchema);

// Define input type
interface CustomizationInput {
  componentName: string;
  variantId: string;
  userInput: string;
  generatedCode: string;
  timestamp: Date;
}

// Store customization
export async function storeCustomization(data: CustomizationInput): Promise<string> {
  await connectToDatabase();
  
  const customization = new CustomizationModel(data);
  const result = await customization.save();
  
  return result._id.toString();
}

// Get customization by ID
export async function getCustomizationById(id: string): Promise<ICustomization | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  
  await connectToDatabase();
  
  try {
    // Use a more direct approach with document conversion
    const doc = await (CustomizationModel as any).findOne({ _id: id });
    return doc ? doc.toObject() : null;
  } catch (error) {
    console.error('Error fetching customization:', error);
    return null;
  }
} 