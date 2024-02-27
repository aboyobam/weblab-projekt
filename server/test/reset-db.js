import Comment from "../dist/models/Comment";
import Module from "../dist/models/Module";
import Rating from "../dist/models/Rating";
import User from "../dist/models/User";

export default async function resetDb() {
    await User.deleteMany({});
    await Module.deleteMany({});
    await Comment.deleteMany({});
    await Rating.deleteMany({});
}