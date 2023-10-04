export default function ErrorScreen({ error }: { error: Error }) {

    return (
        <div className='flex-1 flex flex-col gap-5 justify-center items-center'>
            <p className='text-destructive text-3xl font-extrabold'>Encountered an error</p>
            <ul className='max-w-[100ch]'>
                <li><b>Name</b>: { error.name }</li>
                <li className='truncate'><b>Message</b>: { error.message }</li>
            </ul>
        </div>
    )
}
