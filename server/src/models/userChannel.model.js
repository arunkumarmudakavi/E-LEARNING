import {mongoose, Schema} from "mongoose"

const userChannel = new Schema(
    {
        channelName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        channelId: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        channelPassword: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const UserChannel = mongoose.model("UserChannel", userChannel)