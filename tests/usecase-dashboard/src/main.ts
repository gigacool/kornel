import './style.css'

import { Kornel } from 'kornel';
const kornel = new Kornel().create();


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Microkernel kornel</h1>
    <div class="grid">
    </div>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
