import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a vehicle title'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        pricePerDay: {
            type: Number,
            required: [true, 'Please add a daily rental price'],
        },
        images: {
            type: [String], // Array of image URLs
            required: [true, 'Please add at least one image'],
        },
        availability: {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            enum: ['Car', 'SUV', 'Van', 'Motorcycle', 'Truck'],
            required: [true, 'Please specify vehicle type'],
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Vehicle', vehicleSchema);
