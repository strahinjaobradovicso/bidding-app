import { AuthController } from "./controllers/authController";
import { UserController } from "./controllers/userController";
import { AuthRoute } from "./routes/authRoute";
import { Routes } from "./routes/interfaces/route";
import { UserRoute } from "./routes/userRoute";
import Server from "./server";
import { AuthService } from "./services/AuthService";
import { UserService } from "./services/UserService";

const routes: Routes[] = [
    new UserRoute(new UserController(new UserService())),
    new AuthRoute(new AuthController(new AuthService()))
]

const app = new Server(routes)

app.start()