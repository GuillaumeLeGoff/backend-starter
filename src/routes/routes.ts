import express from "express";
import authRouter from "../components/auth/auth.route";
import globalSettingRouter from "../components/global-settings/global-settings.route";
import mediaRouter from "../components/medias/media.route";
import userRouter from "../components/users/users.route";
import playlistRouter from "../components/playlist/playlist.route";
import modeRouter from "../components/mode/mode.route";

const app = express();

app.use("/auth", authRouter);
app.use("/global-settings", globalSettingRouter);
app.use("/medias", mediaRouter);
app.use("/users", userRouter);
app.use("/playlist", playlistRouter);
app.use("/mode", modeRouter);

export default app;
