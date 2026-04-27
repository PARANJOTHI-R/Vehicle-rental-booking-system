import Vehicle from '../models/Vehicle.js';

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
export const getVehicles = async (req, res, next) => {
    try {
        const filters = {};
        if (req.query.type) filters.type = req.query.type;
        if (req.query.availability) filters.availability = req.query.availability === 'true';

        const vehicles = await Vehicle.find(filters);
        res.status(200).json(vehicles);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
export const getVehicleById = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            res.status(404);
            throw new Error('Vehicle not found');
        }
        res.status(200).json(vehicle);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a vehicle
// @route   POST /api/vehicles
// @access  Private/Admin
export const createVehicle = async (req, res, next) => {
    try {
        // user is coming from auth middleware
        const vehicle = new Vehicle({
            ...req.body,
            ownerId: req.user.id
        });

        const createdVehicle = await vehicle.save();
        res.status(201).json(createdVehicle);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Private/Admin
export const updateVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            res.status(404);
            throw new Error('Vehicle not found');
        }

        // Only owner can update (Admin check is in route, but let's be safe)
        if (vehicle.ownerId.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized to update this vehicle');
        }

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedVehicle);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/Admin
export const deleteVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            res.status(404);
            throw new Error('Vehicle not found');
        }

        if (vehicle.ownerId.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized to delete this vehicle');
        }

        await vehicle.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'Vehicle deleted' });
    } catch (error) {
        next(error);
    }
};
