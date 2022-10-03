import { Request, Response } from "express";
import { attachmentsValidation } from "../validations/attachments.validation";
import multer from "multer";
import {
  createAttachments,
  getAttByDay,
  deleteAttachment,
} from "../repositories/attchments.repository";

export const upload = (req: Request, res: Response) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, `${__dirname}/../public/attachments`);
      },
      filename: function (req: any, file: any, cb: any) {
        if (file.mimetype === "application/pdf") {
          cb(null, Date.now() + ".pdf");
        } else if (file.mimetype === "image/jpeg") {
          cb(null, Date.now() + ".jpg");
        } else if (file.mimetype === "image/png") {
          cb(null, Date.now() + ".png");
        } else if (file.mimetype === "application/zip") {
          cb(null, Date.now() + ".zip");
        }
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
        file: `/public/attachments/${req.file?.filename}`,
        dayId: Number(req.body.dayId),
        name: req.body.name,
      };

      await attachmentsValidation.validate(data);

      await createAttachments(data);
      return res.status(201).send();
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

export const getByDay = async (req: Request, res: Response) => {
  try {
    const attachments = await getAttByDay(Number(req.query?.dayId));
    res.status(200).send(attachments);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteAttachment(Number(req.params.id));
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
};
