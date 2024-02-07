import mng from 'mongoose';
import { MUser } from './User';

interface IComment {
    _id?: any;
    text: string;
    author: MUser;
    anonymous: boolean;
}

interface ICommentStatic extends mng.Model<IComment, {}, ICommentMethods, ICommentVirtuals> {

}

interface ICommentVirtuals {
    createdAt: Date;
    updatedAt: Date;
}

interface ICommentMethods {

}

const SComment = new mng.Schema<IComment, ICommentStatic, ICommentVirtuals>({
    text: String,
    anonymous: Boolean,
    author: { type: mng.Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true });

export type MComment = IComment & ICommentMethods & ICommentVirtuals & mng.Document;

const Comment = mng.model<IComment, ICommentStatic>('comment', SComment);
export default Comment;