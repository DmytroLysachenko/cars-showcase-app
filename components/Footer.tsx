import { footerLinks } from '@/constants';
import { link } from 'fs';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6 object-contain">
          <Image
            src={'/logo.svg'}
            alt="logo"
            width={118}
            height={18}
          />
          <p className="text-base text-gray-700">
            CarHub 2024 <br />
            All rights reserved &copy;
          </p>
        </div>
        <div className="footer__links">
          {footerLinks.map((link): any => (
            <div
              key={link.title}
              className="footer__link"
            >
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item): any => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="text-gray-500"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
        <p>@2024 CarHub. All rights reserved</p>
        <div className="footer__copyrights-link">
          <Link href="/">Privacy policy</Link>
          <Link href="/">Terms of use</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
