/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { FormInput } from "@/components/FormInput";
import Link from "next/link";
import Image from "next/image";
import contact from "@/public/contact.png";
import { SocialButton } from "@/components/SocialButton";
import {
  FaFacebook,
  FaTwitter,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const ContactForm: React.FC = () => {
  const socialButtons = [
    { ariaLabel: "Facebook", icon: <FaFacebook /> },
    { ariaLabel: "Twitter", icon: <FaTwitter /> },
    { ariaLabel: "Instagram", icon: <FaInstagramSquare /> },
    { ariaLabel: "LinkedIn", icon: <FaLinkedin /> },
    { ariaLabel: "YouTube", icon: <FaYoutube /> },
  ];

  return (
    <main className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="w-full">
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-black uppercase">
              ready to work with us
            </h1>
            <p className="text-base text-stone-500">
              Contact us for all your questions and opinions
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <FormInput
                    label="First Name"
                    id="firstName"
                    type="text"
                    required={true}
                  />
                </div>
                <div>
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

              <div className="space-y-2">
                <label className="text-sm text-black">
                  Country / Region <span className="text-red-600">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  className="px-4 py-3 w-full text-sm bg-white rounded-md border border-stone-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="US">United States (US)</option>
                </select>
              </div>

              <FormInput
                label="Subject"
                id="subject"
                type="text"
                optional={true}
              />

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-black">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-4 py-3 text-sm bg-white rounded-md border border-stone-300 text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[150px]"
                  placeholder="Note about your order, e.g. special note for delivery"
                />
              </div>

              <div className="flex gap-2 items-start">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="mt-1 w-4 h-4 rounded border border-stone-300 focus:ring-green-500"
                />
                <label htmlFor="newsletter" className="text-sm text-black">
                  I want to receive news and updates once in a while. By
                  submitting, I'm agreed to the{" "}
                  <Link
                    href="#terms"
                    className="text-green-600 underline hover:text-green-700"
                  >
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="px-6 py-4 w-full text-sm font-medium text-white uppercase bg-green-600 rounded-xl transition-colors hover:bg-green-700"
              >
                send message
              </button>
            </form>
          </div>
        </section>

        <div className="w-full">
          <div className="space-y-8">
            <div className="p-8 rounded-xl bg-slate-100">
              <div className="space-y-6">
                <div>
                  <div className="uppercase text-stone-500">ADDRESS</div>
                  <div className="mt-4 text-base leading-8">
                    Hoa Tho Dong
                    <br />
                    0764783802
                    <br />
                    <Link
                      href="mailto:@gmail.com"
                      className="text-green-600 underline hover:text-green-700"
                    >
                      @gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  {socialButtons.map((button, index) => (
                    <SocialButton
                      key={index}
                      ariaLabel={button.ariaLabel}
                      icon={button.icon}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-full aspect-[1.38] rounded-xl overflow-hidden">
              <Image
                src={contact}
                alt="Contact office location map"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactForm;
