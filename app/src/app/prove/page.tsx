import BuildQuery from "@/components/prove/BuildQuery";
import Title from "@/components/ui/Title";
import callbackAbi from '@/lib/abi/ChangeColorClient.json';
import jsonInputs from "../../../axiom/data/inputs.json";
import { bytes32 } from "@/lib/utils";
import { publicClient } from "@/lib/viemClient";
import { Constants } from "@/shared/constants";
import { UserInput } from "@axiom-crypto/client";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Prove({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";

  const blockNumber = await publicClient.getBlockNumber();
  const inputs: UserInput<typeof jsonInputs> = {
    blockNumber: Number(blockNumber),
    token1Addr: String(jsonInputs.token1Addr),
    token2Addr: String(jsonInputs.token2Addr),
    userAddr: connected,
    tokenId: Number(jsonInputs.tokenId),
  }

  return (
    <>
      <Title>
        Prove
      </Title>
      <div className="text-center">
        Please wait while your browser generates a compute proof for the Axiom Query.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callbackTarget={Constants.CALLBACK_CONTRACT}
          callbackExtraData={bytes32(connected)}
          refundee={connected}
          callbackAbi={callbackAbi}
        />
      </div>
    </>
  )
}
