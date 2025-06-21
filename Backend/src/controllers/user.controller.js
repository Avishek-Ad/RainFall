import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;

    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, //exclude current user's friends
        { isOnboarded: true },
      ],
    });

    res.status(200).json({ success: true, recommendedUsers });
  } catch (error) {
    console.log("Error in getRecommendedUsers controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json({ success: true, friends: user.friends });
  } catch (error) {
    console.log("Error in getMyFriends controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequests(req, res) {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;

    // prevent sending request to self
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself" });
    }

    const recipientUSer = await User.findById(recipientId);

    // check if recipient user exists
    if (!recipientUSer) {
      return res.status(404).json({ message: "recipient user not found" });
    }

    // check if user is already friends
    if (recipientUSer.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // check if request already sent
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, receiver: recipientId },
        { sender: recipientId, receiver: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Friend request already sent to this user" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(200).json({
      success: true,
      message: "Friend request sent successfully",
      friendRequest,
    });
  } catch (error) {
    console.log("Error in sendFriendRequests controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    //verify if current user is the recipient
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "You are not authorized to accept this friend request",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to each other's friend list
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    return res
      .status(200)
      .json({ success: true, message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    return res.status(200).json({ success: true, incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendRequests controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    return res.status(200).json({ success: true, outgoingReqs });
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
