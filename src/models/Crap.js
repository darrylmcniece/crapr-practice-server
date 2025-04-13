const { model, Schema, Types } = require("mongoose");
const User = require("./User");

const pointSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 2;
      },
      message:
        "Coordinates must be an array 2, containing a latitude and longitude.",
    },
  },
  _id: false,
});

const suggestionSchema = new Schema({
  address: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  date: {
    type: String,
    // need to update to Date
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  _id: false,
});

const crapSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    description: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "INTERESTED", "SCHEDULED", "AGREED", "FLUSHED"],
      required: true,
    },
    location: [pointSchema],
    suggestion: [suggestionSchema],
    images: {
      type: [String],
      validate: [
        (urls) => urls.length > 0,
        "Please provide at least one image",
      ],
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      validate: [
        (buyer) => buyer !== this.owner.toString(),
        "Buyer cannot be the same as the owner",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Crap", crapSchema);
