import { PropsWithChildren } from 'react'
import Header from '@/app/components/Header'

interface Params {
	titleText: string 
}

export default function ContentCard (props: PropsWithChildren<Params>){
    return (
        <div className='p-5'>
            <Header text={props.titleText} />
            <div className='p-6 border-2 border-double'>
                {props.children}
            </div>
        </div>
        
    )
}