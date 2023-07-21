import User from '../models/user';

/**READ */
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

export const getUserFriends = async (req, res) => {
    try{
        //find user by id search params
        const user = await User.findById(req.params.id);
        //find all friends by id since we have an array of friend ids in DB
        const friends = await Promise.all(
            user.friends.map((id) => { User.findById(id)})
        );
        //format friends to send to front end
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, ocupation, location, picturePath}) => {
                return {_id, firstName, lastName, ocupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    } catch (e){
        res.status(404).json({message: e.message});
    }
};
/**UPDATE */
export const addRemoveFreind = async (req, res) => {
    try{
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        //if friendId is in user.friends, remove it
        if(user.friends.includes(friendId)){
            //have to remove each other from friends list
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            //have to add each other to friends list
            user.friends.push(friendID);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        //find all friends by id since we have an array of friend ids in DB
        const friends = await Promise.all(
            user.friends.map((id) => { User.findById(id)})
        );
        //format friends to send to front end
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, ocupation, location, picturePath}) => {
                return {_id, firstName, lastName, ocupation, location, picturePath};
            }
        );

        res.status(200).json(formattedFriends);
    } catch (e){
        res.status(404).json({message: e.message});
    }
};