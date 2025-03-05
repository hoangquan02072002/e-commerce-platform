import { StaticImageData } from "next/image";

export interface SidebarItemProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

export interface InputFieldProps {
  label: string;
  value: string;
  // onChange: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  isOptional?: boolean;
  type?: string;
  name: string;
  error?: string;
  autoComplete?: string;
  required?: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: StaticImageData;
}

export interface FormInputProps {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  optional?: boolean;
}
export interface SocialButtonProps {
  ariaLabel: string;
  icon: React.ReactNode;
}
export interface OrderItemProps {
  image: StaticImageData;
  title: string;
  quantity: number;
  shipping?: {
    text: string;
    price: string;
  };
}

export interface PaymentMethodProps {
  icon: string;
  title: string;
  description?: string;
  isSelected?: boolean;
  paypalImage?: string;
  helpText?: string;
}
