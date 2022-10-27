import multer from "multer";
import fs from "fs";
import { Request, Response } from "express";
import {
  createVideo,
  getAll,
  getById,
  updateVideo,
  deleteVideo,
  getByCategory,
} from "../repositories/video.repository";

export const upload = (req: Request, res: Response) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, `${__dirname}/../public/videos`);
      },
      filename: function (req: any, file: any, cb: any) {
        cb(null, Date.now() + ".mp4");
      },
    });

    const upload = multer({ storage }).single("file");

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).send(err);
      } else if (err) {
        return res.status(500).send(err);
      }

      const data = {
        name: req.body.name,
        link: `/public/videos/${req.file?.filename}`,
        categoryId: req.body.categoryId ? Number(req.body.categoryId) : null,
        dayId: req?.body?.dayId ? Number(req.body.dayId) : null,
        nameFile: req?.file?.filename ? req?.file?.filename : "",
      };

      await createVideo(data);
      return res.status(201).send();
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const skip = Number(req.query?.skip) | 0;
    const take = Number(req.query?.take) | 20;
    const videos = await getAll(skip, take);
    res.status(200).send(videos);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    const video = await getById(Number(req.params.id));
    res.status(200).send(video);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const video = await updateVideo(Number(req.params.id), req.body);
    res.status(200).send(video);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const video = await getById(Number(req.params.id));
    if (!video) throw { message: "video não existe" };

    if (video.nameFile)
      fs.rmSync(`${__dirname}/../public/videos/${video.nameFile}`);
    await deleteVideo(Number(req.params.id));
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getVideoByCategory = async (req: Request, res: Response) => {
  try {
    const skip = Number(req?.query?.skip) | 0;
    const take = Number(req?.query?.take) | 20;

    const videos = await getByCategory(Number(req.params.id), skip, take);
    res.status(200).send(videos);
  } catch (e) {
    res.status(400).send(e);
  }
};
