import { AuctionController } from "./controllers/auctionController";
import { AuthController } from "./controllers/authController";
import { ItemController } from "./controllers/itemController";
import { UserController } from "./controllers/userController";
import { AuctionRoute } from "./routes/auctionRoute";
import { AuthRoute } from "./routes/authRoute";
import { Routes } from "./routes/interfaces/route";
import { ItemRoute } from "./routes/itemRoute";
import { UserRoute } from "./routes/userRoute";
import Server from "./server";
import { AuctionService } from "./services/AuctionService";
import { AuthService } from "./services/AuthService";
import { ItemService } from "./services/ItemService";
import { UserService } from "./services/UserService";

const userService = new UserService();
const authService = new AuthService();
const itemService = new ItemService();
const auctionService = new AuctionService(itemService);

const routes: Routes[] = [
    new UserRoute(new UserController(userService)),
    new AuthRoute(new AuthController(authService)),
    new ItemRoute(new ItemController(itemService)),
    new AuctionRoute(new AuctionController(auctionService))
]

const app = new Server(routes)

app.start()