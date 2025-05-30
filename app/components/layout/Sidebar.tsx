'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import {
  RiDashboardLine,
  RiBarChartBoxLine,
  RiBugLine,
  RiLineChartLine,
  RiPieChartLine,
  RiDatabase2Line,
  RiFileTextLine,
  RiBookmarkLine,
  RiNotification3Line,
  RiTestTubeLine,
  RiTeamLine,
  RiSettings4Line,
  RiToolsLine,
} from 'react-icons/ri';

interface NavItem {
  name: string;
  href: string;
  icon: IconType;
  requiresPro?: boolean;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: RiDashboardLine },
  { name: 'Benchmarks', href: '/benchmarks', icon: RiBarChartBoxLine },
  { name: 'Recommendations', href: '/recommendations', icon: RiBugLine, requiresPro: true },
  { name: 'Opportunities', href: '/opportunities', icon: RiLineChartLine },
  { name: 'Trends', href: '/trends', icon: RiLineChartLine },
  { name: 'Media Mix', href: '/media-mix', icon: RiPieChartLine },
  { name: 'My Data', href: '/my-data', icon: RiDatabase2Line },
  { name: 'Reports', href: '/reports', icon: RiFileTextLine, requiresPro: true },
  { name: 'Saved Views', href: '/saved-views', icon: RiBookmarkLine },
  { name: 'Alerts', href: '/alerts', icon: RiNotification3Line, requiresPro: true },
  { name: 'Experiments', href: '/experiments', icon: RiTestTubeLine },
  { name: 'Team Access', href: '/team', icon: RiTeamLine },
  { name: 'Settings', href: '/settings', icon: RiSettings4Line },
  { name: 'Toolbox', href: '/toolbox', icon: RiToolsLine },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Benchmarketing"
            />
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 flex-shrink-0 h-6 w-6
                        ${isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.requiresPro && (
                      <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        Pro
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 