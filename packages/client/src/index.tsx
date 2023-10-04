import ReactDOM from "react-dom/client";
import AbstractedGameProvider from "./hooks/useAbstracted";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import {App} from "./App";
import {setup as mudSetup} from "./mud/setup";
import {setup as dojoSetup} from './dojo/setup'
import mudConfig from "contracts/mud.config";
import './index.css'
import MainLayout from "./components/MainLayout";
import ErrorScreen from "./pages/ErrorScreen";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient()

// FIXME: proper way to get url parameter
// const setup = getSetup(router.get("network"))

Promise.all([mudSetup()]).then(async ([mud]) => {
    root.render(
        <JotaiProvider>
          <AbstractedGameProvider _mudSetup={mud}>
            <QueryClientProvider client={queryClient}>
              <App/>
            </QueryClientProvider>
          </AbstractedGameProvider>
        </JotaiProvider>
    );
    if (import.meta.env.DEV) {
        const {mount: mountDevTools} = await import("@latticexyz/dev-tools");
        mountDevTools({
            config: mudConfig,
            publicClient: mud.network.publicClient,
            walletClient: mud.network.walletClient,
            latestBlock$: mud.network.latestBlock$,
            blockStorageOperations$: mud.network.blockStorageOperations$,
            worldAddress: mud.network.worldContract.address,
            worldAbi: mud.network.worldContract.abi,
            write$: mud.network.write$,
            recsWorld: mud.network.world,
        });
    }
})
    .catch(e => {
        root.render(
            <MainLayout>
                <ErrorScreen error={e} />
            </MainLayout>
        )
    })

// TODO: figure out if we actually want this to be async or if we should render something else in the meantime
// https://vitejs.dev/guide/env-and-mode.html

