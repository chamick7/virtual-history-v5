# virtual-history-v5

## Installation

**_Npm_**

```sh
npm install virtual-history-v5
```

**_Yarn_**

```sh
yarn add virtual-history-v5
```

## SET UP

import `VirtualHistoryProvider` under `BrowserRouter`

```
import { VirtualHistoryProvider } from "virtual-history-v5"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
   <VirtualHistoryProvider>
      <Switch>
       ...
      </Switch>
    </VirtualHistoryProvider>
  </BrowserRouter>,
)

```

## HOW TO USE

```
import { useVirtualHistory  } from "virtual-history-v5"

const { histories, clearHistory, restartWith, moveTo } = useVirtualHistory()
```

|              | parameters                                                               | description                                                                                                                                     |
| ------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| histories    |                                                                          | list of history                                                                                                                                 |
| clearHistory | **index** _optional_<br>target index<br>default: 0                       | clear history list<br>close all history                                                                                                         |
| restartWith  | **location**<br>locator of react router<br>like `history.push(location)` | clear all history<br>and replace first order with specific                                                                                      |
| moveTo       | **key**<br>key of location<br>example: `kv67oi`                          | change the current location to target<br>if `target` stay before `current` it uses go(-...)<br>if `target` stay after `current` it uses go(...) |
