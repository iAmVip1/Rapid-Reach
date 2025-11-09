import Drive from "../models/drive.model.js";
import { errorHandler } from "../utils/error.js";

export const createDrive = async (req, res, next) => {
    try {
        const drivePayload = { ...req.body, approved: false };
        const drive = await Drive.create(drivePayload);
        return res.status(201).json(drive);

    } catch (error) {
        next(error);
        
    }
}

export const deleteDrive = async (req, res, next) => {
    const drive = await Drive.findById(req.params.id);

    if (!drive) {
        return next (errorHandler(404, 'Drive not found'));
    }
    if ( !req.user.isAdmin && req.user.id !== drive.userRef.toString()) {
        return next(errorHandler(401, 'You can only delete your own drives!'));
    }
    try {
        await Drive.findByIdAndDelete(req.params.id);
        res.status(200).json('Drive has been deleted! ')
    } catch (error) {
        next(error);
    }
}

export const updateDrive = async (req, res, next) => {
    const drive = await Drive.findById(req.params.id);
    if (!drive) {
        return next (errorHandler(404, 'Drive not found'));
    }
    if (!req.user.isAdmin && req.user.id !== drive.userRef) {
        return next(errorHandler(401, 'You can only update your own drive!'));
    }

    try {
        const updatedDrive = await Drive.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedDrive);
    } catch (error) {
        next(error)
    }
}

export const getDrive = async (req, res, next) => {
    try {
        const drive = await Drive.findById(req.params.id);
        if (!drive) {
            return next(errorHandler(404, 'Drive not found'))
        }
        if (!drive.approved) {
            return next(errorHandler(404, 'Drive not found'));
        }
        res.status(200).json(drive);
    } catch (error) {
        next(error)
    } 
    }

export const getAllDrives = async (req, res, next) => {
  try {
    // Extract search params from query string
    const { vechicleNumber, departmentAddress, category, includeUnapproved } = req.query;

    // Build a dynamic filter object
    const filter = {};

    if (vechicleNumber) {
      filter.vechicleNumber = { $regex: vechicleNumber, $options: "i" }; // i = case-insensitive
    }
    if (departmentAddress) {
      filter.departmentAddress = { $regex: departmentAddress, $options: "i" };
    }
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    // Default: only approved drives
    filter.approved = true;

    // Allow including unapproved only if the requester is an admin (requires auth middleware on route)
    if (includeUnapproved === 'true' && req.user?.isAdmin) {
      delete filter.approved;
    }

    const drives = await Drive.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: drives.length,
      data: drives,
    });
  } catch (error) {
    next(error);
  }
};

export const approveDrive = async (req, res, next) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return next(errorHandler(404, 'Drive not found'));

    if (!req.user?.isAdmin) {
      return next(errorHandler(403, 'Forbidden'));
    }

    drive.approved = true;
    await drive.save();

    res.status(200).json({ success: true, data: drive });
  } catch (error) {
    next(error);
  }
}

