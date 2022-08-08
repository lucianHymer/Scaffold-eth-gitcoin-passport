import React, { useEffect } from "react";
import GitcoinLogo from "../assets/GitcoinLogoWhite.svg";
import { EthereumAuthProvider } from "@3id/connect";

import { useViewerConnection } from "@self.id/framework";

// import { PassportWriter } from "@gitcoinco/passport-sdk-writer";

// TODO alert if not connected using metamask

export default function IssueStamp({ address, provider }) {
  const [viewerConnection, connectCeramic] = useViewerConnection();

  // useEffect(
  //   () =>
  //     (async () => {
  //       if (address && provider && viewerConnection.status === "idle") {
  //         const authProvider = new EthereumAuthProvider(provider, address);
  //         await connectCeramic(authProvider);
  //         console.log("done");
  //       }
  //     })(),
  //   [address, provider, connectCeramic, viewerConnection],
  // );

  useEffect(
    () =>
      (async () => {
        if ("ethereum" in window && address && viewerConnection.status === "idle") {
          await connectCeramic(new EthereumAuthProvider(window.ethereum, address));
        }
      })(),
    [address, connectCeramic, viewerConnection.status],
  );

  useEffect(() => {
    switch (viewerConnection.status) {
      case "idle": {
        // not connected yet
        break;
      }
      case "connected": {
        // user connected - construct a writer authenticated by user's DID
        // let writer;
        // import("@gitcoinco/passport-sdk-writer").then(wr => {
        //   const passportWriter = new wr.PassportWriter(viewerConnection.selfID.did);
        // });
        // ... do stuff with passport writer ...
        break;
      }
      case "failed": {
        // user refused to connect or authenticate to ceramic
        break;
      }
      default:
        break;
    }
  }, [viewerConnection.status]);

  return (
    <div className="p-10">
      <div className="border-2 border-solid border-gray-600 mx-auto w-3/4 bg-blue-darkblue text-white p-10">
        <h2 className="text-white text-xl">Issue Stamps</h2>
        <div className="mt-10 mb-4 flex items-center font-medium text-gray-900 md:mb-0">
          <img src={GitcoinLogo} alt="Gitcoin Logo White" />
          <span className="font-miriam-libre ml-3 text-4xl text-white">Passport</span>
        </div>
      </div>
    </div>
  );
}
