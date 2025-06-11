type Props = {
    disabled: boolean;
}

export default function AddButton({ disabled }: Props) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`align-middle px-4 py-2 w-[50%] rounded-xl cursor-pointer 
            ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-200 hover:opacity-80'}`}
        >
            Add
        </button>
    )
}