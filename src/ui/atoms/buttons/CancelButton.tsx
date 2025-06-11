type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CancelButton({ setOpen }: Props) {
    return (
        <button
            className='border align-middle px-4 py-2 w-[50%] rounded-xl cursor-pointer'
            onClick={() => setOpen(false)}>
            Cancel
        </button>
    )
}