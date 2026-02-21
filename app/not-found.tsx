import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-2'>
      <h1 className='text-8xl font-bold text-gray-900 dark:text-gray-100'>404</h1>
      <p className='text-xl font-medium text-gray-800 dark:text-gray-200'>Sorry, we couldn't find this page</p>
      <Link href={'/'} className='mt-2' ><Button variant={"default"}>Back to HomePage</Button></Link>
    </div>
  )
}

export default NotFound
