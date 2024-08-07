import {
	Box,
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon } from '@chakra-ui/icons';
import useShowToast from "../hooks/useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";

const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [title, setTitle] = useState("");
	const [postBody, setPostBody] = useState("");
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

	const handlePostCreation = async () => {
		if (!title.trim() || !postBody.trim()) {
			showToast("Error", "Please provide both a title and body for the post", "error");
			return;
		}
		if (isLoading) return;

		if (!authUser) {
			showToast("Error", "User not authenticated", "error");
			return;
		}

		setIsLoading(true);
		const newPost = {
			title: title,
			body: postBody,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

			newPost.id = postDocRef.id;

			if (userProfile && userProfile.uid === authUser.uid) {
				createPost(newPost);
			}

			if (pathname !== "/" && userProfile && userProfile.uid === authUser.uid) {
				addPost(newPost);
			}

			showToast("Success", "Post created successfully", "success");
			onClose();
			setTitle("");
			setPostBody("");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Tooltip
				hasArrow
				label={"Create"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<AddIcon />
					<Box display={{ base: "none", md: "block" }}>New Post</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Input
							placeholder='Post Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							mb={4}
						/>
						<Textarea
							placeholder='Post Body'
							value={postBody}
							onChange={(e) => setPostBody(e.target.value)}
						/>
					</ModalBody>

					<ModalFooter>
						<Button 
							mr={3} 
							onClick={handlePostCreation} 
							isLoading={isLoading}
							isDisabled={!title.trim() || !postBody.trim()} // Disable if empty
						>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;
