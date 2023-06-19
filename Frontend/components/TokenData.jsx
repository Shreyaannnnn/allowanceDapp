import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { useAccount } from "wagmi";
import axios from "axios";

Moralis.start({
  apiKey:
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNkOGNkOTAyLTU4ZDYtNGNhNS05YTI5LWI4MzU5YzRmMzc0OSIsIm9yZ0lkIjoiMzQ0MTU5IiwidXNlcklkIjoiMzUzNzkwIiwidHlwZUlkIjoiNmY2YzBmMGQtYWE3Ny00YzI3LThkOTAtNmNmMzc1OGFkMTRmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODcxMTc5NTgsImV4cCI6NDg0Mjg3Nzk1OH0.OSRmrp19Kd6BLpUhoO8Qwar83X97TEsO6I_O1aRNLzE",
  // ...and any other configuration
});

const TokenData = () => {

  // const [allowance, setAllowance] = useState("")

  // const fetchBackend = async () =>{
  //     const responseAllowance = await axios.get(`http://localhost:3001/approvals?wallet=${address}`)
  //     // setAllowance(JSON.stringify(responseAllowance))
  //     setAllowance(responseAllowance)
  // }
  // useEffect(() => {
  //   fetchBackend()
  // },[])

  // console.log(allowance,"helo")
  

  const { address } = useAccount();
  // const ownerAddress = address
  console.log(address);
  useEffect(() => {
    const fetchData = async () => {
      const chain = EvmChain.MUMBAI;

      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
      });
      const responseNFT = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      });
     
      // const responseAllowance = await Moralis.EvmApi.token.getTokenAllowance({
      //   chain,
      // });
      // console.log(responseAllowance.toJSON())

      const tokenArray = Object.values(response.toJSON());
      console.log(response.toJSON())
      setTokens(tokenArray);
      const NFTArray = Object.values(responseNFT.toJSON());
      setNFTs(responseNFT.jsonResponse.result);
    };

    if(address!==/^0x.*/||address.trim()!==/^0x.*/)
    fetchData();
  }, [address]);

  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(true);
  };
  const handleViewMode = () => {
    setEditing(false);
  };

  const [tokens, setTokens] = useState([]);
  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const chain = EvmChain.MUMBAI;

      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
      });
      const responseNFT = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      });

      const tokenArray = Object.values(response.toJSON());
      setTokens(tokenArray);
      const NFTArray = Object.values(responseNFT.toJSON());
      setNFTs(responseNFT.jsonResponse.result);

    };

    if (address !== /^0x.*/|| address.trim() !== /^0x.*/) fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Allowance
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Authorized Spender
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>

              <tbody>
                {tokens.map((token, index) => (
                  <tr>
                    <td
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      key={index}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src={token.logo}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {token.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {token.balance/10**(token.decimals)}
                      </p>
                      <p className="text-gray-600 whitespace-no-wrap">
                        {token.symbol}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {editing ? (
                        <div>
                          {" "}
                          <input
                            className="w-full px-4 py-2 border border-gray-300 outline-none"
                            type="text"
                          />{" "}
                          <button
                            className="px-4 py-2 font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 mr-2 mt-2 hover:text-gray-800 focus:outline-none focus:bg-gray-300 focus:border-gray-400"
                            onClick={handleViewMode}
                          >
                            Update
                          </button>
                          <button
                            className="px-4 py-2 font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:bg-gray-300 focus:border-gray-400"
                            onClick={handleViewMode}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-900 whitespace-no-wrap ">
                          {/* {allowance} */}
                          <button onClick={handleEditing} className="ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              {" "}
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />{" "}
                            </svg>
                          </button>
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {token.token_address}
                      </p>
                   
                    </td>
                  </tr>
                ))}
                {NFTs.map((nft, index) => (
                  // <h1 key={index}>{ nft.name ? nft.name : " "}
                  // <p>{nft.amount}</p>
                  // </h1>
                  <tr>
                    <td
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      key={index}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src={nft.metadata}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {nft.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {nft.amount}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {/* {allowance} */}
                        Allowance
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {/* <p className="text-gray-900 whitespace-no-wrap">{nft.last_token_uri_sync}</p> */}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {nft.last_token_uri_sync}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenData;

{
  /* <div className="container mx-auto px-4 sm:px-8">
  <div className="py-8">
    <div>
      <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
    </div>
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div
        className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
      >
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Client / Invoice
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Issued / Due
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Molly Sanders
                    </p>
                    <p className="text-gray-600 whitespace-no-wrap">000004</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">$20,000</p>
                <p className="text-gray-600 whitespace-no-wrap">USD</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span className="relative">Paid</span>
                </span>
              </td>
              <td
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
              >
                <button
                  type="button"
                  className="inline-block text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="inline-block h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Michael Roberts
                    </p>
                    <p className="text-gray-600 whitespace-no-wrap">000003</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">$214,000</p>
                <p className="text-gray-600 whitespace-no-wrap">USD</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">Sept 25, 2019</p>
                <p className="text-gray-600 whitespace-no-wrap">Due in 6 days</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span className="relative">Paid</span>
                </span>
              </td>
              <td
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
              >
                <button
                  type="button"
                  className="inline-block text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="inline-block h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Devin Childs
                    </p>
                    <p className="text-gray-600 whitespace-no-wrap">000002</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">$20,000</p>
                <p className="text-gray-600 whitespace-no-wrap">USD</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">Sept 14, 2019</p>
                <p className="text-gray-600 whitespace-no-wrap">Due in 2 weeks</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                  ></span>
                  <span className="relative">Pending</span>
                </span>
              </td>
              <td
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
              >
                <button
                  type="button"
                  className="inline-block text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="inline-block h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-5 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Frederick Nicholas
                    </p>
                    <p className="text-gray-600 whitespace-no-wrap">000001</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">$12,000</p>
                <p className="text-gray-600 whitespace-no-wrap">USD</p>
              </td>
              <td className="px-5 py-5 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">Sept 6, 2019</p>
                <p className="text-gray-600 whitespace-no-wrap">
                  Due 3 weeks ago
                </p>
              </td>
              <td className="px-5 py-5 bg-white text-sm">
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                  ></span>
                  <span className="relative">Overdue</span>
                </span>
              </td>
              <td className="px-5 py-5 bg-white text-sm text-right">
                <button
                  type="button"
                  className="inline-block text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="inline-block h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div> */
}
