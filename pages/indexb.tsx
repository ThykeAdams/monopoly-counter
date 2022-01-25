import Head from "next/head";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Home({ socket }: { socket: any }) {
  const [division, setDivision] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);
  const [changedMoney, setChangedMoney] = useState(0);
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("money:added", (e: any) => {
      console.log("connected");
      setBalance(e);
    });
  }, [socket]);
  function addMoney() {
    socket.emit("money:add", { division, ammount: changedMoney });
  }
  function removeMoney() {
    socket.emit("money:remove", { division, ammount: changedMoney });
  }
  return (
    <div className='flex flex-col justify-center min-h-screen py-2 bg-gray-800 text-white'>
      <Head>
        <title>Monoplolizars</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {!show ? (
          <div className='flex flex-col'>
            {division}
            <input type={"text"} className='h-12 text-black' onChange={(e) => setDivision(e.target.value)} />
            <button onClick={() => setShow(true)} className='bg-red-500  hover:bg-red-400 px-10 py-3 rounded-lg'>
              Submit
            </button>
          </div>
        ) : (
          <main>
            <RequestMoney division={division} socket={socket} />
            <MoneyRequested division={division} socket={socket} />
            <h1 className='text-6xl'>${balance}</h1>
            <div>
              <input type={"text"} className='h-12 text-black' value={changedMoney} onChange={(e) => setChangedMoney(+e.target.value)} />
              <button onClick={addMoney} className='bg-green-500  hover:bg-red-400 px-10 py-3 rounded-lg'>
                Add Money
              </button>
              <button onClick={removeMoney} className='bg-green-500  hover:bg-red-400 px-10 py-3 rounded-lg'>
                Remove Money
              </button>
            </div>
          </main>
        )}
      </main>
    </div>
  );
}
export function MoneyRequested({ division, socket }: any) {
  let [isOpen, setIsOpen] = useState(false);
  let [request, setRequest] = useState<any>(null);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  socket.on("money:requested", (d: any) => {
    console.log(d, division);
    if (d.division == division) return;
    setIsOpen(true);
    setRequest(d);
  });

  return (
    <>
      {}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={closeModal}>
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className='inline-block h-screen align-middle' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl'>
                <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-white'>
                  Money Request
                </Dialog.Title>
                <p className='text-white text-3xl'>
                  {request?.division} has requested ${request?.amount}
                </p>
                <div className='mt-4'>
                  <button
                    type='button'
                    className=' mx-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-red-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
                <div className='mt-4'></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export function RequestMoney({ division, socket }: any) {
  let [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function change(e: any) {
    setAmount(e.target.value);
  }
  function request(e: any) {
    socket.emit("request", { amount, division });
    closeModal();
    setAmount(0);
  }

  return (
    <>
      <div className='absolute top-5 right-5 bg-gray-700 px-10 py-3 rounded-lg'>
        <h1>Division: {division}</h1>
        <button onClick={openModal} className='bg-red-500  hover:bg-red-400 px-10 py-3 rounded-lg'>
          Request Money
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={closeModal}>
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className='inline-block h-screen align-middle' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 shadow-xl rounded-2xl'>
                <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-white'>
                  Money Request
                </Dialog.Title>
                <input type='number' onChange={change} />
                <div className='mt-4'>
                  <button
                    type='button'
                    className=' mx-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-red-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='mx-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-green-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={request}
                  >
                    Request
                  </button>
                </div>
                <div className='mt-4'></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
