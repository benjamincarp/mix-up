import { PropsWithChildren } from 'react'
import Header from '@/components/Header'

interface Params {
	titleText: string 
}

export default function ContentCard (props: PropsWithChildren<Params>){
    return (
        <div className='p-5'>
            <Header text={props.titleText} />
            <div className='flex flex-row justify-center'>
                <div className='p-6 border-2 border-double flex-grow max-w-3xl'>
                    {props.children}
                </div>
            </div>
        </div>
        
    )
}