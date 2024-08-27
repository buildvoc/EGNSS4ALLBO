This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Server

First need to set the Next.js on domain api.pic2bim.co.uk. Install Nginx on the server and create site `api.pic2bim.co.uk` in `/etc/nginx/sites-available`. Open `api.pic2bim.co.uk` and define 
rotues for http://localhost:3000; in location/ block.

Then restart the nginx using 

```bash
sudo systemctl restart nginx
```

Domain is now set to the Next.js project. Next install pm2 to manage the next js process.

Upload code on server using Github. 

Navigate to the project directory and build the project:

```bash
npm run build
```

Now project is ready to start. Run the following command to start project on domain `api.pic2bim.co.uk`.

```bash
npm run start_production
```



