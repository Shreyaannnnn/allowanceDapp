import React, { useEffect, useState } from 'react';
import { getQuery, getApproveTransactions, getName, getEtherScanPage } from "../helper/helpers";
import Allowance from "./Allowance";

const Allowances = (props) => {
  const [txs, setTxs] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [chainId, setChainId] = useState(undefined);

  useEffect(() => {
    document.getElementById("loading").hidden = false;
    init().then((obj) => {
      setTxs(obj.txs);
      setAccount(obj.account);
      if (obj.txs.length !== 0) {
        document.getElementById("revokeAll").hidden = false;
        document.getElementById("loading").hidden = true;
      } else {
        document.getElementById("loading").innerText = "No allowances found on this account";
      }
    }).catch((err) => {
      console.log(err);
      document.getElementById("loading").innerText = "No allowances found on this account";
    });
  }, []);

  async function init() {
    let account;
    try {
      const accounts = await props.web3.eth.requestAccounts();
      account = accounts[0];
    } catch (e) {
      const accounts = await window.ethereum.enable();
      account = accounts[0];
    }
    const chainId = await props.web3.eth.getChainId();
    setChainId(chainId);
    const query = getQuery(chainId, account);
    const txs = await getApproveTransactions(query);
    for (const index in txs) {
      txs[index].contractName = await getName(txs[index].contract);
      txs[index].approvedName = await getName(txs[index].approved);
    }
    return {
      txs: txs,
      account: account
    };
  }

  let elements = "";
  if (txs !== undefined && chainId !== undefined) {
    const etherscanUrl = getEtherScanPage(chainId);
    elements = txs.map((tx) => {
      return <Allowance etherscanURL={etherscanUrl} tx={tx} web3={props.web3} id={tx.contract} account={account} />
    });
  }

  return (
    <div>
      {elements}
    </div>
  );
}

export default Allowances;
