import Link from "next/link";

export default function createTodo() {
    return (
        <div>
            <p>TODO追加ページです</p>
            <Link href='/'>戻る</Link>
        </div>
    )
}