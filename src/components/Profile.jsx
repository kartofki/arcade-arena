import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUserProfileByUsername from '../hooks/useGetUserProfileByUsername';
import NavBar from "./NavBar";
import useAuthStore from '../store/authStore';
import { useDisclosure } from '@chakra-ui/react';
import EditProfile from "./EditProfile"

const Profile = () => {
    const { username } = useParams();
    const { isLoading, userProfile } = useGetUserProfileByUsername(username);
    const authUser = useAuthStore((state) => state.user);
    const visitingOwnProfileAndAuth = authUser && userProfile && authUser.username === userProfile.username;

    //modal
    const {isOpen, onOpen, onClose} = useDisclosure();

    console.log(userProfile, isLoading);

    if (isLoading) {
        return (
            <>
                <NavBar />
                <div>Loading...</div>
            </>
        );
    }

    if (!isLoading && !userProfile) {
        return (
            <>
                <NavBar />
                <div>User not found</div>
            </>
        );
    }

    if (!isLoading && userProfile) {
        return (
            <div>
                <NavBar />
                <div>{userProfile.username}'s profile!</div>
                <div>Created at: {userProfile.createdAt}</div>
                <div>Email: {userProfile.email}</div>
                <div>Profile pic: <img src={userProfile.profilePicURL} alt={`${userProfile.username}'s profile`} /></div>
                {visitingOwnProfileAndAuth && <button onClick={onOpen}>Edit profile</button>}
                {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
            </div>
        );
    }

    return null; // This handles any unexpected cases
}

export default Profile;
