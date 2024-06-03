import express from 'express';
import authRouter from '../components/auth/auth.route';
import globalSettingRouter from '../components/global-settings/global-settings.route';
import mediaRouter from '../components/medias/media.route';
import userRouter from '../components/users/users.route';
import playlistMediaRouter from '../components/playlist-media/playlist-media.route';
import playlistRouter from '../components/playlist/playlist.route';

const app = express();

app.use('/auth', authRouter);
app.use('/global-settings', globalSettingRouter);
app.use('/medias', mediaRouter);
app.use('/users', userRouter);
app.use('/playlist-media', playlistMediaRouter);
app.use('/playlist', playlistRouter);

export default app;

