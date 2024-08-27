import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from "next/font/google";
import { TaskProvider } from "@/hooks/TaskContext";
import "./ui/globals.css";


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Identify building data from a photo"
};
if (process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', (error) => {
    console.error(error.stack)
    // Don't run process.exit(1)
  })
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body">
        <TaskProvider>
        {children}
        </TaskProvider>
        </body>
    </html>
  );
}
