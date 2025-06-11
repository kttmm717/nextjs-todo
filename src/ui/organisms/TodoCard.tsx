"use client";

import CheckMarkIcon from "../atoms/icons/CheckMarkIcon";
import TrashBoxIcon from "../atoms/icons/TrashBoxIcon";
import { useState } from "react";
import { deleteTodo } from "@/app/actions/actions";


// 型定義
type Props = {
  id: number;
  todo: string;
  time: number;
}


// ここからコンポーネント
export default function TodoCard(props: Props) {
  const { id, todo, time } = props;

  // state定義
  const [complated, setComplated] = useState<boolean>(false);

  // チェック付け外しの関数
  function onClickCheckToggle() {
    return setComplated(!complated);
  }


  // ここからビュー
  return (
    <div className="border border-green-200 rounded-xl mb-3 px-4 py-2">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <div
              className="border border-gray-400 w-4 h-4 cursor-pointer"
              onClick={onClickCheckToggle}
            >
              {complated && <CheckMarkIcon />}
            </div>
            <div className="mx-4">
              <p>{todo}</p>
              <span className="text-gray-500">{time} min</span>
            </div>
          </div>
        </div>

        <form action={deleteTodo}>
          <input type="hidden" name='id' value={id} />
          <button type="submit" className="cursor-pointer">
            <TrashBoxIcon />
          </button>
        </form>
      </div>
    </div>
  )
}