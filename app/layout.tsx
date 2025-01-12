import './globals.css';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/Sidebar';
import AppIcon from '@/components/icons/app-icon';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TaskTime Tracker',
  description: 'Task management and time tracking application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        {/* Top App bar section */}
        <div className="h-10 bg-primary-blue flex-shrink-0 flex items-center px-4">
          <AppIcon />
          <div className="flex-1 flex justify-center">
            <div className="relative w-1/4">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-1.5 rounded-md h-8 bg-secondary-blue outline-none border-none text-white placeholder:text-primary-placeholder focus-visible:ring-0 focus-visible:ring-offset-0 pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon color="white" />
              </div>
            </div>
          </div>
        </div>
        {/* Main layout section */}
        <div className="flex flex-1 bg-gray-100 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
