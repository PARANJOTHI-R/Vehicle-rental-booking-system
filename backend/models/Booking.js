import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true,
        },
        startDate: {
            type: Date,
            required: [true, 'Please specify a start date'],
        },
        endDate: {
            type: Date,
            required: [true, 'Please specify an end date'],
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Booking', bookingSchema);
