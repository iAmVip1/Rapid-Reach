import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://github.com/iAmVip1/serviceaggregator/blob/main/images/avatar.jpg?raw=true",
    },
    isHospital: {
        type: Boolean,
        default: false,
    },
    isFireDep: {
        type: Boolean,
        default: false,
    },
    isPoliceDep: {
        type: Boolean,
        default: false,
    },
    isPoliceVAn: {
        type: Boolean,
        default: false,
    },
    isAmbulance: {
        type: Boolean,
        default: false,
    },
    isBlood: {
        type: Boolean,
        default: false,
    },
    isFireTruck: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, 
{timestamps:true}
);

const User = mongoose.model('User', userSchema);

export default User;