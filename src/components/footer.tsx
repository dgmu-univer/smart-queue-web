import Link from 'next/link';
import { Wheat } from 'lucide-react';

const links = [
  {
    title: 'Войти',
    href: '/dashboard/profile',
  },
  {
    title: 'Панель администратора',
    href: '/dashboard',
  },
];

const Footer = () => {
  return (
    <footer className="border-t px-6 py-2">
      <div className="mx-auto w-full max-w-screen-2xl divide-y">
        <div className="flex flex-col items-center justify-between gap-4 px-2 pt-3 pb-5 sm:flex-row">
          <Link className="flex items-center gap-2" href="/">
            <Wheat />
            <span className="text-xl font-medium">ДГМУ</span>
          </Link>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
            {links.map(({ title, href }) => (
              <li key={title}>
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col-reverse items-center justify-between gap-4 px-2 pt-4 pb-2 sm:flex-row">
          <p className="text-sm font-medium">
            Copyright &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            ДГМУ. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
