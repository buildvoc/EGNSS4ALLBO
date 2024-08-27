// /pages/api/rename-pdf.ts

import { IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

// Disable the default body parser to handle form data
export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).end('Method Not Allowed');
        return;
    }
    try {
        const directoryPath = path.resolve('public/uploads');
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Unable to scan directory' });
            }
            const pdfFiles = files.filter(file => file.endsWith('.pdf'));
            pdfFiles.forEach(file => {
              const filePath = path.join(directoryPath, file);
              fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) console.error(`Failed to delete ${file}: ${unlinkErr}`);
              });
            });
          });

    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).send('Error parsing form data');
            return;
        }
        const file  : any= files.file ;
        const filePath = Array.isArray(file) ? file[0].filepath : file.filepath;
        const fileName = Array.isArray(file) ? file[0].originalFilename : file.originalFilename;
        const newFilePath = path.join(process.cwd(), 'public/uploads', fileName);
        const fileUrl = `${fileName}`;
        fs.mkdirSync(path.join(process.cwd(), 'public/uploads'), { recursive: true });
        fs.renameSync(filePath, newFilePath);
        res.status(200).json({ name: fileName });    });
    }
    catch (err) {
        console.error('Error processing request:', err);
        res.status(500).send('Internal Server Error');
      }
};

export default handler;
