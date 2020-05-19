const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Name cannot be more than 500 characters']
    },
    website: {
        type: String,
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with http/https']
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number cannot more than 20 characters.']
    },
    email: {
        type: String,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email.']
    },
    address: {
        type: String,
        required: [true, 'Please add address.']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Others',
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1.'],
        max: [10, 'Rating cannot be more than 10.']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// Create bootcamp slug from the name
BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

// Geocode & create location field
BootcampSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    const [{longitude, latitude, formattedAddress, streetName: street, state, zipcode, countryCode: country}] = loc;
    this.location = {
        coordinates: [longitude, latitude],
        formattedAddress,
        street,
        state,
        zipcode,
        country
    }

    // Skip persisting address, we already have it in location
    this.address = undefined;
    next();
})

module.exports = mongoose.model('BootCamp', BootcampSchema);