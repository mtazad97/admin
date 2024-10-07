"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.post('/signup', UserController_1.registerUser); // Use the registerUser controller function
router.post('/login', UserController_1.loginUser); // Use the loginUser controller function
exports.default = router;
