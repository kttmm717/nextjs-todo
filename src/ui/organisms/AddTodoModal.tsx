'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState, useActionState, useEffect } from 'react';
import AddNewTaskButton from '../atoms/buttons/AddNewTaskButton';
import CancelButton from '../atoms/buttons/CancelButton';
import AddButton from '../atoms/buttons/AddButton';
import { createTodo } from '@/app/actions/actions';


type State = {
  errors?: {
    todo?: string[];
    time?: string[];
  };
  message?: string | null;
}

export default function AddTodoModal() {

  const [todo, setTodo] = useState('');
  const [time, setTime] = useState('');

  const [todoError, setTodoError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
    setTodoError(value === '');
  }
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTime(value);
    setTimeError(value === '');
  }

  const [open, setOpen] = useState(false);
  //ダイアログパネルを開くか閉じるか管理

  const initialState: State = { message: null, errors: {} };
  //イニシャル(初期状態)を定義、初期はメッセージ何もなし、エラーも空のオブジェクト

  const [state, formAction] = useActionState(createTodo, initialState);
  //これがuseActionStateフックの書き方
  //「createTodo というフォーム処理関数を使って、initialStateを持って、それを実行するためのformActionをもらう

  useEffect(() => {
    if (state?.message === 'Success') {
      setOpen(false);
      setTodo('');
      setTime('');
      setTodoError(false);
      setTimeError(false);
    }
  }, [state]);

  return (
    <>
      {/* ダイアログの開くボタン */}
      <button onClick={() => setOpen(true)}>
        <AddNewTaskButton />
      </button>

      {/* ダイアログの設定 */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">

        {/* ダイアログの全体スタイル */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">

          {/* ダイアログのパネル本体 */}
          <DialogPanel className="max-w-lg w-100 space-y-4 bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-2xl">
            <DialogTitle className="font-bold text-2xl">
              Add Task
            </DialogTitle>

            {/* フォーム */}
            <form action={formAction}>
              <div className='mb-4'>
                <p>Todo</p>
                <input type="text" name='todo' aria-describedby='todo-error'
                  onChange={handleTodoChange}
                  className='border border-gray-300 w-full p-1.5 rounded-md'
                  value={todo}
                />
                <div id='todo-error' aria-live='polite' aria-atomic='true'>
                  {state?.errors?.todo &&
                    state.errors.todo.map((error: string) => (
                      <p key={error} className='text-red-500 text-sm'>
                        {error}
                      </p>
                    ))
                  }
                </div>
                {todoError && <p className="text-red-500 text-sm">Todoを入力してください</p>}
              </div>

              <div className='mb-6'>
                <p>Time</p>
                <input type="text" name='time'     aria-describedby='time-error'
                  onChange={handleTimeChange}
                  className='border border-gray-300 w-full p-1.5 rounded-md'
                  value={time}
                />
                <div id='time-error' aria-live='polite' aria-atomic='true'>
                  {state?.errors?.time &&
                    state.errors.time.map((error: string) => (
                      <p key={error} className='text-red-500 text-sm'>
                        {error}
                      </p>
                    ))
                  }
                </div>
                {timeError && <p className="text-red-500 text-sm">Timeを入力してください</p>}
              </div>

              {/* キャンセルボタン、追加ボタン */}
              <div className="flex gap-4">
                <CancelButton setOpen={setOpen} />
                <AddButton disabled={!todo || !time} />
              </div>
            </form>
            {/* ここまでフォーム */}

          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}