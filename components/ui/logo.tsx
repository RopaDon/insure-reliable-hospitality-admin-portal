import Link from 'next/link'
import Image from 'next/image'
import LogoPng from '@/public/images/logo.png'

export default function Logo() {
  return (
    <Link className="block" href="/">
       <Image  src={LogoPng} width={35} height={32} alt="Avatar 03" />
    </Link>
  )
}
