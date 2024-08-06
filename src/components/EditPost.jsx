import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "../hooks/useShowToast";

const EditPost = ({ isOpen, onClose, post }) => {
	const [inputs, setInputs] = useState({
		title: post?.title || "",
		body: post?.body || "",
	});
	const { editPost, isUpdating } = usePostStore((state) => ({
		editPost: state.editPost,
		isUpdating: state.isUpdating,
	}));
	const showToast = useShowToast();

	useEffect(() => {
		if (post) {
			setInputs({
				title: post.title,
				body: post.body,
			});
		}
	}, [post]);

	const handleEditPost = async () => {
		try {
			await editPost({ ...post, ...inputs });
			showToast("Success", "Post updated successfully", "success");
			onClose();
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody>
						<Flex bg={"black"}>
							<Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
								<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
									Edit Post
								</Heading>

								<FormControl>
									<FormLabel fontSize={"sm"}>Title</FormLabel>
									<Input
										placeholder={"Title"}
										size={"sm"}
										type={"text"}
										value={inputs.title}
										onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
									/>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Content</FormLabel>
									<Textarea
										placeholder={"Content"}
										size={"sm"}
										value={inputs.body}
										onChange={(e) => setInputs({ ...inputs, body: e.target.value })}
									/>
								</FormControl>

								<Stack spacing={6} direction={["column", "row"]}>
									<Button
										bg={"red.400"}
										color={"white"}
										w='full'
										size='sm'
										_hover={{ bg: "red.500" }}
										onClick={onClose}
									>
										Cancel
									</Button>
									<Button
										bg={"blue.400"}
										color={"white"}
										size='sm'
										w='full'
										_hover={{ bg: "blue.500" }}
										onClick={handleEditPost}
										isLoading={isUpdating}
									>
										Submit
									</Button>
								</Stack>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditPost;
