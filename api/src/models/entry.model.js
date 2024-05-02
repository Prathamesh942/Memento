import mongoose from "mongoose";
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    tags: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

entrySchema.pre('save', function(next) {
    this.lastUpdated = new Date();
    next();
});

export const Entry = mongoose.model('entry', entrySchema);