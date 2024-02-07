import mng from 'mongoose';
import { MUser } from './User';

interface IRating {
    _id?: any;
    positive: boolean;
    sessionID: string;
    author: MUser;
}

interface IRatingStatic extends mng.Model<IRating, {}, IRatingMethods, IRatingVirtuals> {

}

interface IRatingVirtuals {
    createdAt: Date;
}

interface IRatingMethods {
    forClient(): any;
}

const SRating = new mng.Schema<IRating, IRatingStatic, IRatingVirtuals>({
    positive: Boolean,
    sessionID: String,
    author: { type: mng.Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: { createdAt: true } });

SRating.method("forClient", function(this: MRating) {
    return { positive: this.positive }
});

export type MRating = IRating & IRatingMethods & IRatingVirtuals & mng.Document;

const Rating = mng.model<IRating, IRatingStatic>('rating', SRating);
export default Rating;