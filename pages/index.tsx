import Head from "next/head";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Modal from "../components/Modal";
import { request } from "express";

export default function Home({ socket }: { socket: any }) {
  const [connected, setConnected] = useState(false);
  const [division, setDivision] = useState<any>({ division: null, show: false });
  const [requestMoney, setRequestMoney] = useState({ open: false, amount: 0 });
  const [requested, setRequested] = useState({ open: false, amount: 0, division: null });
  const [balance, setBalance] = useState(0);

  // Socket Connection
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("money:requested", (e: any) => {
      if (e.division == division.division) return;
      setRequested({ open: true, ...e });
    });
    socket.on("money:updated", setBalance);
  }, [socket]);
  // Functions
  function handleNameSubmit() {
    setDivision({ ...division, show: true });
  }
  function handleRequestMoney() {}
  function handleEmitMoneyRequest() {
    setRequestMoney({ ...requestMoney, open: false });
    setRequested({ ...requested, open: false });
    socket.emit("money:request", { division: division.division, amount: requestMoney.amount });
  }
  function handleAddMoney(amount: number) {
    console.log("add money");
    socket.emit("money:add", { division: division.division, amount });
  }
  function handleRemoveMoney(amount: number) {
    console.log("Remove");
    socket.emit("money:remove", { division: division.division, amount });
  }
  return (
    <div className='flex flex-col min-h-screen bg-gray-800 text-white'>
      <Head>
        <title>Monoplolizars</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {requested.open && (
          <Modal open={true} buttons={[{ name: "Close", onClick: () => setRequested({ ...requested, open: false }) }]}>
            {requested?.division} has requested $<span className='text-green-500'>{requested?.amount}</span>
          </Modal>
        )}

        {division.show ? (
          <div className='z-[100]'>
            <div className='bg-gray-700 p-10 m-5 rounded-lg'>
              <p className='text-2xl font-extrabold'>Monopolizers Balance: ${balance}</p>
              <h1 className='text-2xl'>
                Division: <span className='text-green-500'>{division.division}</span>
              </h1>
              <div className='flex flex-col'>
                <input type={"number"} className='text-black h-12' onChange={(e) => setRequestMoney({ ...requestMoney, amount: +e.target.value })} />
                <button onClick={handleEmitMoneyRequest} className='bg-red-500 hover:bg-red-400 px-10 py-3 rounded-lg'>
                  Request Money
                </button>
              </div>
            </div>
            <div className='bg-gray-700 p-10 m-5 rounded-lg flex flex-wrap'>
              {[
                {
                  amount: 1,
                  img: "https://img.search.brave.com/ycq6WuLH2UbaHo_HYfHWRHyI2TR9RvwDl8T0yIoAtmE/rs:fit:300:152:1/g:ce/aHR0cDovL3ZpZ25l/dHRlMS53aWtpYS5u/b2Nvb2tpZS5uZXQv/bW9ub3BvbHkvaW1h/Z2VzLzYvNjgvJTI0/MS5qcGcvcmV2aXNp/b24vbGF0ZXN0L3Nj/YWxlLXRvLXdpZHRo/LWRvd24vMzAwP2Ni/PTIwMTEwNDEzMDMx/MDIz",
                },

                {
                  amount: 5,
                  img: "https://img.search.brave.com/OW3fWkWy2B5QPMi1dZXqePGCstFSupukhJP2cDm-wt8/rs:fit:640:356:1/g:ce/aHR0cHM6Ly9zLW1l/ZGlhLWNhY2hlLWFr/MC5waW5pbWcuY29t/LzczNngvYjMvNjIv/OWIvYjM2MjliZjUz/YjQzY2Q4ZTY2ODg5/NTVkYzM3YzQ1OTku/anBn",
                },
                {
                  amount: 10,
                  img: "https://img.search.brave.com/YpMzyA4FAiT4bZp8ODh2_mYuvWdk93PtQLNIzmFF9gQ/rs:fit:500:256:1/g:ce/aHR0cHM6Ly92aWdu/ZXR0ZTEud2lraWEu/bm9jb29raWUubmV0/L21vbm9wb2x5L2lt/YWdlcy9kL2Q2LyUy/NDEwLmpwZy9yZXZp/c2lvbi9sYXRlc3Q_/Y2I9MjAxMTA0MTMw/MzEwMjQ",
                },
                {
                  amount: 20,
                  img: "https://img.search.brave.com/1BQYEE6QxuAaJdn_52yiwNgn32W8nOUXPqcRZv81Ylo/rs:fit:575:295:1/g:ce/aHR0cDovLzIuYnAu/YmxvZ3Nwb3QuY29t/L19JQlZQZ2FsZ1JB/ay9TLXJhbEVTOUxH/SS9BQUFBQUFBQUJO/cy90YmVOU3FNU3RW/MC9zMTYwMC9tb25v/cG9seV9tb25leV8y/MC5qcGc",
                },
                {
                  amount: 100,
                  img: "https://img.search.brave.com/3fIoY82JoDQ_s44KNVyg6PCWQWN8tp-LlcA4TBdW24U/rs:fit:500:259:1/g:ce/aHR0cHM6Ly92aWdu/ZXR0ZTIud2lraWEu/bm9jb29raWUubmV0/L21vbm9wb2x5L2lt/YWdlcy9kL2RlLyUy/NDEwMC5qcGcvcmV2/aXNpb24vbGF0ZXN0/P2NiPTIwMTEwNDEz/MDMxMDI0",
                },
                {
                  amount: 500,
                  img: "https://img.search.brave.com/jb8bct7Y48C62-gvVTyrdzEvK7hXM2IOiNG6UubBanU/rs:fit:500:259:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzUwL2Qw/LzE5LzUwZDAxOWY5/NjhmMTg0YThkMWNm/Y2NjOTEwMzIzYTVk/LmpwZw",
                },
              ].map((item, i) => (
                <div className='px-2 text-center my-2'>
                  <button onClick={() => handleAddMoney(item.amount)} className='bg-green-500 hover:bg-green-400 px-10 py-3 rounded-t-lg w-full'>
                    Add
                  </button>
                  <img src={item.img} />
                  <button onClick={() => handleRemoveMoney(item.amount)} className='bg-red-500 hover:bg-red-400 px-10 py-3 rounded-b-lg w-full'>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <h1>Your Name</h1>
            <input type={"text"} className='h-12 text-black text-2xl rounded-lg' onChange={(e) => setDivision({ ...division, division: e.target.value })} />
            <button onClick={handleNameSubmit} className='bg-purple-500  hover:bg-purple-400 px-10 py-3 rounded-lg'>
              Join Gateway
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
