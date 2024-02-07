import mng from 'mongoose';
import { MRating } from './Rating';
import { MComment } from './Comment';
import { MUser } from './User';

interface IModule {
    _id?: any;
    abbreviation: string;
    description: string;
    anonymous: boolean;
    slug: string;
    
    author: MUser;
    ratings: MRating[];
    comments: MComment[];
}

interface IModuleStatic extends mng.Model<IModule, {}, IModuleMethods, IModuleVirtuals> {

}

interface IModuleVirtuals {
    createdAt: Date;
    updatedAt: Date;
}

interface IModuleMethods {
    getRatings(): [number, number, number];
}

const SModule = new mng.Schema<IModule, IModuleStatic, IModuleVirtuals>({
    abbreviation: String,
    description: String,
    anonymous: Boolean,
    slug: String,

    author: { type: mng.Schema.Types.ObjectId, ref: 'user' },
    ratings: [{ type: mng.Schema.Types.ObjectId, ref: 'rating' }],
    comments: [{ type: mng.Schema.Types.ObjectId, ref: 'comment' }]
}, { timestamps: true });

SModule.method("getRatings", function(this: MModule) {
    if (!this.populated('ratings')) {
        throw new Error('Ratings not populated');
    }

    if (!this.ratings.length) {
        return [0.5, 0, 0];
    }

    const positive = this.ratings.filter(r => r.positive).length;
    return [positive / this.ratings.length, positive, this.ratings.length - positive];
});

export type MModule = IModule & IModuleMethods & IModuleVirtuals & mng.Document;

const Module = mng.model<IModule, IModuleStatic>('module', SModule);
export default Module;