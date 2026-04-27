import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res, next) => {
    try {
        const { vehicleId, startDate, endDate, totalPrice } = req.body;

        if (!vehicleId || !startDate || !endDate || !totalPrice) {
            res.status(400);
            throw new Error('Please provide all booking details');
        }

        // Optional: Check if vehicle is already booked in that date range
        // For simplicity, we just create the booking with 'pending' status
        
        const booking = new Booking({
            userId: req.user.id,
            vehicleId,
            startDate,
            endDate,
            totalPrice,
            status: 'pending'
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).populate('vehicleId', 'title images type');
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({}).populate('userId', 'name email').populate('vehicleId', 'title');
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            res.status(404);
            throw new Error('Booking not found');
        }

        booking.status = status;
        const updatedBooking = await booking.save();

        res.status(200).json(updatedBooking);
    } catch (error) {
        next(error);
    }
};
