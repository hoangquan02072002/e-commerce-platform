/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { FormInput } from "@/components/FormInput";
import Link from "next/link";
import Image from "next/image";
import contact from "@/public/contact.png";
import { SocialButton } from "@/components/SocialButton";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
const ContactForm: React.FC = () => {
  const socialButtons = [
    { ariaLabel: "Facebook", icon: <FaFacebook /> },
    { ariaLabel: "Twitter", icon: <FaTwitter /> },
    { ariaLabel: "Instagram", icon: <FaInstagramSquare /> },
    { ariaLabel: "LinkedIn", icon: <FaLinkedin /> },
    { ariaLabel: "YouTube", icon: <FaYoutube /> },
  ];

  return (
    <main className="px-8 py-8 bg-white rounded-xl max-md:px-5">
      <div className="flex gap-5 max-md:flex-col">
        <section className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start w-full max-md:mt-10 max-md:max-w-full">
            <h1 className="text-lg font-bold leading-tight uppercase text-black">
              ready to work with us
            </h1>
            <p className="self-stretch mt-16 text-base leading-relaxed text-stone-500 max-md:mt-10">
              Contact us for all your questions and opinions
            </p>

            <form className="w-full">
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex-1 min-w-[45%]">
                  <FormInput
                    label="First Name"
                    id="firstName"
                    type="text"
                    required={true}
                  />
                </div>
                <div className="flex-1 min-w-[45%]">
                  <FormInput
                    label="Last Name"
                    id="lastName"
                    type="text"
                    required={true}
                  />
                </div>
              </div>

              <FormInput
                label="Email Address"
                id="email"
                type="email"
                required={true}
              />

              <FormInput
                label="Phone Number"
                id="phone"
                type="tel"
                optional={true}
              />

              <div className="mt-7 text-sm text-black">
                Country / Region <span className="text-red-600">*</span>
              </div>
              <select
                id="country"
                name="country"
                required
                className="flex flex-wrap gap-5 justify-between self-stretch px-3.5 py-4 mt-3 text-sm bg-white rounded-md border border-solid border-stone-300 text-neutral-800 w-full"
              >
                <option value="US">United States (US)</option>
              </select>

              <FormInput
                label="Subject"
                id="subject"
                type="text"
                optional={true}
              />

              <label htmlFor="message" className="mt-8 text-sm text-black">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="overflow-hidden self-stretch px-3.5 pt-3 pb-24 mt-3 text-sm bg-white rounded-md border border-solid border-stone-300 text-neutral-400 w-full"
                placeholder="Note about your order, e.g. special note for delivery"
              />

              <div className="flex items-start gap-2 mt-7">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="mt-1 w-3.5 h-3.5 border border-solid border-black border-opacity-30 rounded"
                />
                <label htmlFor="newsletter" className="text-sm text-black">
                  I want to receive news and updates once in a while. By
                  submitting, I'm agreed to the{" "}
                  <Link href="#terms" className="text-green-600 underline">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="px-8 py-5 mt-14 text-xs font-medium text-center text-white uppercase bg-green-600 rounded-xl w-full max-md:px-5 max-md:mt-10"
              >
                send message
              </button>
            </form>
          </div>
        </section>

        <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mt-16 text-xs text-black max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col items-start py-8 pr-20 pl-8 w-full rounded-xl bg-slate-100 max-md:px-5 max-md:max-w-full">
              <div>
                <div className="uppercase text-stone-500">ADDRESS</div>
                {/* <ContactInfo {...location} /> */}
                <div className="mt-9 text-base leading-8">
                  Hoa Tho Dong
                  <br />
                  0764783802
                  <br />
                  <Link
                    href={`mailto:@gmail.com`}
                    className="text-green-600 underline"
                  >
                    @gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex gap-3.5 mt-14 text-sm leading-none text-center whitespace-nowrap max-md:mt-10">
                {socialButtons.map((button, index) => (
                  <SocialButton
                    key={index}
                    ariaLabel={button.ariaLabel}
                    icon={button.icon}
                  />
                ))}
              </div>
            </div>

            <Image
              loading="lazy"
              src={contact}
              alt="Contact office location map"
              className="object-contain mt-2.5 w-full rounded-xl aspect-[1.38] max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactForm;
