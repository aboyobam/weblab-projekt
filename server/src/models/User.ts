import mng from 'mongoose';

interface IUser {
    _id?: any;
    email: string;
    password: string;
    username: string;
    salt: string;
}

interface IUserStatic extends mng.Model<IUser, {}, IUserMethods, IUserVirtuals> {

}

interface IUserVirtuals {

}

interface IUserMethods {

}

const SUser = new mng.Schema<IUser, IUserStatic, IUserVirtuals>({
    email: String,
    password: String,
    username: String,
    salt: String
});

export type MUser = IUser & IUserMethods & IUserVirtuals & mng.Document;

const User = mng.model<IUser, IUserStatic>('user', SUser);
export default User;