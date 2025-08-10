<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Wallet Integrations — MetaMask (EVM) & Phantom (Solana)</title>
  <style>
    body { font-family: system-ui, Arial; max-width:800px; margin:30px auto; }
    button { margin:6px 0; padding:8px 12px; }
    .box { border:1px solid #eee; padding:12px; border-radius:8px; margin-bottom:12px; }
    code { background:#f8f8f8; padding:2px 6px; border-radius:4px; }
  </style>
</head>
<body>
  <h1>Connect MetaMask (EVM) & Phantom (Solana)</h1>

  <div class="box">
    <strong>MetaMask / EVM</strong><br/>
    <div id="metamask-status">Detecting...</div>
    <button id="mm-connect">Connect MetaMask</button>
    <button id="mm-sign">Sign Message (EVM)</button>
    <button id="mm-send-token">Send ERC20 (example)</button>
    <pre id="mm-output"></pre>
  </div>

  <div class="box">
    <strong>Phantom / Solana</strong><br/>
    <div id="phantom-status">Detecting...</div>
    <button id="ph-connect">Connect Phantom</button>
    <button id="ph-sign">Sign Message (Solana)</button>
    <button id="ph-send-sol">Send SOL (example)</button>
    <pre id="ph-output"></pre>
  </div>

  <!-- ethers.js for EVM (MetaMask) -->
  <script src="https://cdn.jsdelivr.net/npm/ethers@6/dist/ethers.umd.min.js"></script>
  <!-- solana web3 -->
  <script src="https://unpkg.com/@solana/web3.js@1.88.0/lib/index.iife.js"></script>

  <script>
  (async () => {
    // ---------- MetaMask / EVM ----------
    const mmStatus = document.getElementById('metamask-status');
    const mmOut = document.getElementById('mm-output');
    const mmConnectBtn = document.getElementById('mm-connect');
    const mmSignBtn = document.getElementById('mm-sign');
    const mmSendTokenBtn = document.getElementById('mm-send-token');

    const logMM = (...args) => { mmOut.textContent = args.map(a=>typeof a==='object'?JSON.stringify(a,null,2):String(a)).join(' '); };

    // Detect MetaMask / EVM provider
    const ethProvider = window.ethereum;
    if (!ethProvider) {
      mmStatus.innerText = 'No EVM wallet detected (MetaMask not found).';
      mmConnectBtn.disabled = true;
      mmSignBtn.disabled = true;
      mmSendTokenBtn.disabled = true;
    } else {
      mmStatus.innerText = 'EVM wallet detected.';
    }

    let mmProvider, mmSigner, mmAddress;
    mmConnectBtn.onclick = async () => {
      try {
        // request accounts
        await ethProvider.request({ method: 'eth_requestAccounts' });
        mmProvider = new ethers.BrowserProvider(ethProvider); // ethers v6
        mmSigner = await mmProvider.getSigner();
        mmAddress = await mmSigner.getAddress();
        mmStatus.innerText = Connected: ${mmAddress};
        logMM('Connected', mmAddress);
      } catch (err) {
        console.error(err);
        logMM('MetaMask connect error:', err.message || err);
      }
    };

    mmSignBtn.onclick = async () => {
      if (!mmSigner) return logMM('Not connected');
      try {
        const message = 'Sign this message to prove wallet ownership. ' + new Date().toISOString();
        // ethers v6 - use signer.signMessage
        const sig = await mmSigner.signMessage(new TextEncoder().encode(message));
        logMM('Message:', message, '\nSignature:', sig);
      } catch (err) {
        console.error(err);
        logMM('Sign error:', err.message || err);
      }
    };

    // Simple ERC-20 transfer example
    mmSendTokenBtn.onclick = async () => {
      if (!mmSigner) return logMM('Not connected');
      try {
        // Replace these example values before use:
        const tokenAddress = prompt('ERC-20 token contract address (example):', '0x...') || '';
        const recipient = prompt('Recipient address:', '') || '';
        const amountStr = prompt('Amount (human readable):', '1') || '0';
        if (!tokenAddress || !ethers.isAddress(recipient)) return logMM('Invalid input');

        // minimal ERC-20 ABI for transfer
        const abi = [
          "function decimals() view returns (uint8)",
          "function transfer(address to, uint256 amount) returns (bool)"
        ];
        const token = new ethers.Contract(tokenAddress, abi, mmSigner);

        // get decimals
        const decimals = Number(await token.decimals());
        const amount = ethers.parseUnits(amountStr, decimals); // ethers v6 parseUnits
        const tx = await token.transfer(recipient, amount);
        logMM('Transaction sent. Hash:', tx.hash);
        await tx.wait();
        logMM('Transfer confirmed. Hash:', tx.hash);
      } catch (err) {
        console.error(err);
        logMM('ERC20 send error:', err.message || err);
      }
    };

    // ---------- Phantom / Solana ----------
    const phStatus = document.getElementById('phantom-status');
    const phOut = document.getElementById('ph-output');
    const phConnectBtn = document.getElementById('ph-connect');
    const phSignBtn = document.getElementById('ph-sign');
    const phSendSolBtn = document.getElementById('ph-send-sol');

    const logPH = (...args) => { phOut.textContent = args.map(a=>typeof a==='object'?JSON.stringify(a,null,2):String(a)).join(' '); };

    const solanaWeb3 = window.solanaWeb3;
    // Detect Phantom
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    if (!isPhantomInstalled) {
      phStatus.innerText = 'Phantom not detected in this browser.';
      phConnectBtn.disabled = true;
      phSignBtn.disabled = true;
      phSendSolBtn.disabled = true;
    } else {
      phStatus.innerText = 'Phantom detected.';
    }

    let phPublicKey, phConnected;
    // Default to devnet for testing — change to 'mainnet-beta' for production.
    const SOL_CLUSTER = 'devnet'; // 'mainnet-beta' or 'devnet' or 'testnet'
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl(SOL_CLUSTER),
      'confirmed'
    );

    phConnectBtn.onclick = async () => {
      try {
        const resp = await window.solana.connect();
        phPublicKey = resp.publicKey;
        phConnected = true;
        phStatus.innerText = Connected: ${phPublicKey.toString()};
        logPH('Connected:', phPublicKey.toString());
      } catch (err) {
        console.error(err);
        logPH('Phantom connect error:', err.message || err);
      }
    };

    phSignBtn.onclick = async () => {
      if (!phConnected) return logPH('Not connected');
      try {
        const message = 'Sign this message to prove wallet ownership: ' + new Date().toISOString();
        const encoded = new TextEncoder().encode(message);

        // Phantom supports signMessage via signMessage (if enabled)
        // Note: signMessage may require the "signMessage" permission in the Phantom wallet.
        if (window.solana.signMessage) {
          const signed = await window.solana.signMessage(encoded, 'utf8');
          // signed.signature is a Uint8Array
          logPH('Message:', message, '\nSignature (base64):', btoa(String.fromCharCode(...signed.signature)));
        } else {
          logPH('Phantom does not support signMessage in this environment.');
        }
      } catch (err) {
        console.error(err);
        logPH('Sign message error:', err.message || err);
      }
    };

    phSendSolBtn.onclick = async () => {
      if (!phConnected) return logPH('Not connected');

      try {
        const toAddress = prompt('Recipient public key (Solana):', '');
        if (!toAddress) return logPH('No recipient');

        const lamports = Number(prompt('Amount in SOL (e.g. 0.01):', '0.01')) * solanaWeb3.LAMPORTS_PER_SOL;
        if (!toAddress || isNaN(lamports)) return logPH('Bad input');

        const fromPubkey = phPublicKey;
        const toPubkey = new solanaWeb3.PublicKey(toAddress);

        const transaction = new solanaWeb3.Transaction().add(
          solanaWeb3.SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: Math.floor(lamports),
          })
        );

        transaction.feePayer = fromPubkey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        // Phantom supports signAndSendTransaction (recommended) OR signTransaction
        if (window.solana.signAndSendTransaction) {
          const { signature } = await window.solana.signAndSendTransaction(transaction);
          await connection.confirmTransaction(signature);
          logPH('Transaction sent via signAndSendTransaction. Sig:', signature);
        } else {
          // fallback: sign + send raw
          const signedTx = await window.solana.signTransaction(transaction);
          const raw = signedTx.serialize();
          const sig = await connection.sendRawTransaction(raw);
          await connection.confirmTransaction(sig);
          logPH('Transaction sent via signTransaction + sendRawTransaction. Sig:', sig);
        }
      } catch (err) {
        console.error(err);
        logPH('Send SOL error:', err.message || err);
      }
    };

    // Optional: handle account changes / disconnects
    if (ethProvider) {
      ethProvider.on && ethProvider.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          mmStatus.innerText = 'Disconnected';
          mmOut.textContent = '';
        } else {
          mmStatus.innerText = 'Connected: ' + accounts[0];
          logMM('accountsChanged:', accounts);
        }
      });
    }
    if (window.solana) {
      window.solana.on && window.solana.on('disconnect', () => {
        phStatus.innerText = 'Disconnected';
        phOut.textContent = '';
        phConnected = false;
      });
      window.solana.on && window.solana.on('accountChanged', (pubkey) => {
        phStatus.innerText = pubkey ? ('Connected: ' + pubkey.toString()) : 'Disconnected';
      });
    }

  })();
  </script>
</body>
</html>


