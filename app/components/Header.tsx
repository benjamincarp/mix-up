interface HeaderParams {
	text: string 
}

export default function Header ({text}: HeaderParams){
    return (<h1 className='flex flex-row justify-center m-3 mb-6 text-3xl'>
        <div className='p-1 border-1 border inline'>
            <div className='p-2.5 border-1 border inline'>
                {text}
            </div>
        </div>
    </h1>)
}