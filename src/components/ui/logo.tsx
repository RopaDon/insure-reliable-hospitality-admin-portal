import Link from "next/link";
import Image from "next/image";
import LogoPng from "@/assets/images/logo.png";
import LogoWhite from "@/assets/images/logo-white.png";

type Props = {
  isLight: boolean;
};

export default function Logo({ isLight = false }: Props) {
  return (
    <Link className="block" href="/">
      <Image src={isLight ? LogoWhite : LogoPng} width={35} height={32} alt="Avatar 03" />
    </Link>
  );
}
