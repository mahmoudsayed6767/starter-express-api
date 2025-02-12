import mongoose,{ Schema} from "mongoose";
import autoIncrement from 'mongoose-auto-increment';
const ReportSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    action: {
        type: String,
        trim: true,
        required: true,
    },
    user:{
        type:Number,
        ref:'user'
    },
    type:{
        type:String,
        enum:['SERVICE','ADDRESS','COUNTRIES','RATE','USERS','ABOUT','ITEM','ORDER','CONTACT-US','CITIES','DEVICES','OFFER','NOTIFS','SETTINGS','TERMS'],
        default:'USER'
    },
    deepId:{
        type:Number,
    },
    deleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true, discriminatorKey: 'kind' });

ReportSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
autoIncrement.initialize(mongoose.connection);
ReportSchema.plugin(autoIncrement.plugin, { model: 'report', startAt: 1 });

export default mongoose.model('report', ReportSchema);