import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/auth.js'
import {
    registerController,
    loginController,
    testController,
    allUsersController,
    deleteUserController,
    updateProfileController,
    getUserInfoController,
    ForgetPasswordController,
    updatePasswordController,
    verifyUserController,
    ContactFormController
} from '../controllers/authController.js'
import {
    newTaskController,
    taskIdController,
    userTaskController,
    todoDeleteController,
    updateTodoController,
    CompleteStatusController
} from '../controllers/todoController.js'

import { EventCommentController, allEventIdController, deleteEventController, fetchEventsbyUserId, getAllPublicEventsController, getEventComments, newEventController, toggleEventController } from "../controllers/eventController.js";
const router = express.Router();


//REGISTER || METHOD POST
router.post("/register", registerController);


//REGISTER || METHOD POST
router.post("/login", loginController);

//REGISTER || METHOD POST
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

router.post("/addtask", requireSignIn, newTaskController);
router.get("/mytasks/:userId", requireSignIn, userTaskController);

router.get("/todos/:id", requireSignIn, taskIdController);
router.delete("/todos/:id", requireSignIn, todoDeleteController);
router.put("/todos/:id/update", requireSignIn, updateTodoController);
router.put("/todos/:id/completed", requireSignIn, CompleteStatusController);
router.put("/todos/:id/isPublic", requireSignIn, CompleteStatusController);

router.patch("/user/:userId/update", requireSignIn, updateProfileController);
router.get("/user/:userId", requireSignIn, getUserInfoController);

// utility routes

router.post("/user/forgot_password", ForgetPasswordController)
router.post("/user/update_password", updatePasswordController)

router.get("/verify-email/:token", verifyUserController)

router.post('/contactform', ContactFormController);

//evert routes
router.post("/addevent", requireSignIn, newEventController);

router.get("/allevents/public",  getAllPublicEventsController);
router.get("/user/allevents/:userId",  requireSignIn,fetchEventsbyUserId);
router.get("/allevents/public/:id",  allEventIdController);
router.post("/events/addcomment", requireSignIn, EventCommentController);
router.get('/events/:eventId/comments', getEventComments);

router.delete(`/user/events/:eventId`, requireSignIn,deleteEventController)
router.put(`/user/events/:eventId`, requireSignIn,toggleEventController)




router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/admin/alluser", requireSignIn, isAdmin, allUsersController);
router.delete("/admin/deleteuser/:userId", requireSignIn, isAdmin, deleteUserController);


export default router;