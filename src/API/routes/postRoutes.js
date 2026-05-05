import express from "express";
const router = express.Router();

import MongoPostRepository from "../../Infrastructure/repositories/MongoPostRepository.js";
import CreatePost from "../../Application/use-cases/CreatePost.js";
import ListItems from "../../Application/use-cases/ListItems.js";
import GetItem from "../../Application/use-cases/GetItem.js";

import  KafkaProducer from "../../Infrastructure/messaging/KafkaProducer.js";


import {
  createPost,
  getAllPosts,
  getPostById,
} from "../controllers/postController.js";


const postRepository = new MongoPostRepository();

const createPostUseCase = new CreatePost(postRepository, KafkaProducer);
const listItemsUseCase = new ListItems(postRepository);
const getItemUseCase = new GetItem(postRepository);

router.get("/", getAllPosts(listItemsUseCase));
router.post("/", createPost(createPostUseCase));
router.get("/:id", getPostById(getItemUseCase));

export default router;
