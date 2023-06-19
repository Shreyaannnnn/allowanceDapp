import React from 'react';
import { is721 } from "../helper/helpers";
import dapps from "../helper/dapps";
import { ERC20ABI } from "../helper/ABI";

function Allowance(props) {
  const dappURL = () => {
    if (dapps[props.tx.contractName.toLowerCase()] !== undefined) {
      return dapps[props.tx.contractName.toLowerCase()];
    }
    const dappsKeys = Object.keys(dapps);
    for (let key of dappsKeys) {
      if (props.tx.contractName.toLowerCase().includes(key)) {
        return dapps[key];
      }
    }
    return "";
  };

  const setRevokeClick = () => {
    // set the contract and make an approve transaction with a zero allowance
    const { web3 } = props;
    const contract = new web3.eth.Contract(ERC20ABI, props.tx.contract);
    is721(contract, props.tx.allowanceUnEdited).then((result) => {
      if (result) {
        //revoke erc721 by nulling the address
        contract.methods.approve(0, props.tx.allowanceUnEdited)
          .send({ from: props.account })
          .then((receipt) => {
            console.log("revoked: " + JSON.stringify(receipt));
          })
          .catch((err) => {
            console.log("failed: " + JSON.stringify(err));
          });
      } else {
        // revoke erc20 by nulling approval amount
        contract.methods.approve(props.tx.approved, 0)
          .send({ from: props.account })
          .then((receipt) => {
            console.log("revoked: " + JSON.stringify(receipt));
          })
          .catch((err) => {
            console.log(err);
            console.log("failed: " + JSON.stringify(err));
          });
      }
    });
  };

  const getDappButton = () => {
    const dappUrl = dappURL();
    if (dappUrl !== "") {
      return (
        <div className="container">
          {/* <img className="container" src={dappButtonV2} alt="" /> */}
          <div className="centered-white">
            <a onClick={() => { window.open(dappUrl) }}>Visit dApp</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          {/* <img className="container" src={dappButtonV2} alt="" /> */}
          <div className="centered-white">
            <a onClick={() => { window.open("https://github.com/James-Sangalli/eth-allowance/blob/master/src/helpers/dapps.js"); }}>Add dApp</a>
          </div>
        </div>
      );
    }
  };

  const truncateName = (name) => {
    if (name.length > 20) {
      return name.substring(0, 17) + '...';
    }
    return name;
  };

  return (
    <div>
      <div className="allowance">
        <div className="container">
          {/* <img className="container" src={textBoxMedium} alt="" /> */}
          <div className="centered">
            <a href={props.etherscanURL + props.tx.contract}>{truncateName(props.tx.contractName)}</a>
          </div>
        </div>
        <div className="container">
          {/* <img className="container" src={textBoxMedium} alt="" /> */}
          <div className="centered">
            <a href={props.etherscanURL + props.tx.approved}>{truncateName(props.tx.approvedName)}</a>
          </div>
        </div>
        <div className="container">
          {/* <img className="container" src={textBoxMedium} alt="" /> */}
          <div className="centered">{props.tx.allowance}</div>
        </div>
        <div className="container">
          {/* <img className="container" src={revokeFull} alt="" /> */}
          <div className="centered-white">
            <a name="revoke" id="revokeLink" onClick={setRevokeClick}>Revoke</a>
          </div>
        </div>
        {getDappButton()}
      </div>
    </div>
  );
}

export default Allowance;
