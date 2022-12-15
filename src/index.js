import React from "react";
import { render } from "react-dom";
import { QRCode } from "react-qr-svg";

const styles = {
  root: {
    color: "#2C1752",
    fontFamily: "sans-serif",
    textAlign: "center"
  },
  title: {
    color: "#7B3FE4"
  }
};

// update with your contract address
const deployedContractAddress = "0xcCAF431AF17745ECaC7B656BCdc9075EF51B5f17";

const qrProofRequestJson = {
  id: "c811849d-6bfb-4d85-936e-3d9759c7f105",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  body: {
    transaction_data: {
      contract_address: deployedContractAddress,
      method_id: "b68967e2",
      chain_id: 80001,
      network: "polygon-mumbai"
    },
    reason: "airdrop participation",
    scope: [
      {
        id: 1,
        circuit_id: "credentialAtomicQuerySig",
        rules: {
          query: {
            allowed_issuers: ["*"],
            req: {
              birthday: {
                $lt: 20020101
              }
            },
            schema: {
              url:
                "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/4249ae2b-835e-4a89-aad5-69de39b43672.json-ldhttps://s3.eu-west-1.amazonaws.com/polygonid-schemas/c2be3523-f637-48ab-a54a-135d8b359c0d.json-ld",
              type: "KYCAgeCredential"
            }
          }
        }
      }
    ]
  }
};

export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div style={styles.root}>
        <h2 style={styles.title}>
          Claim an ERC20 zk airdrop on Polygon Mumbai
        </h2>
        <p>
          Age verification: You must prove your date of birth was before Jan 1,
          2001 to claim.
        </p>
        <p>
          Complete age verification by issuing yourself a Polygon ID claim via{" "}
          <a
            href="https://polygontechnology.notion.site/Issue-yourself-a-KYC-Age-Credential-claim-a06a6fe048c34115a3d22d7d1ea315ea"
            target="_blank"
          >
            KYC Age Credentials
          </a>{" "}
          then scan QR code within Polygon ID app to claim tokens
        </p>

        <div>
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify(qrProofRequestJson)}
          />
        </div>
        <br />
        <p>
          Github:{" "}
          <a
            href="https://github.com/oceans404/tutorial-examples/tree/main/on-chain-verification"
            target="_blank"
          >
            On-chain verification tutorial
          </a>
        </p>
        <p>
          Polygonscan:{" "}
          <a
            href={`https://mumbai.polygonscan.com/token/${deployedContractAddress}`}
            target="_blank"
          >
            Token ERC20zkAirdrop
          </a>
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
