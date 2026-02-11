# Deploy su Vercel

Per deployare questo progetto su Vercel:

## Opzione 1: Deploy Manuale via GitHub
1. Vai su [vercel.com](https://vercel.com) e fai login
2. Clicca "Import Project"
3. Connetti il tuo account GitHub 
4. Seleziona il repository: `gabrieledurden/finvest-ai-mentor`
5. Configura le impostazioni:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Opzione 2: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gabrieledurden/finvest-ai-mentor)

## Repository GitHub
🔗 **https://github.com/gabrieledurden/finvest-ai-mentor**

Il progetto è configurato con:
- ✅ vercel.json per configurazione automatica
- ✅ Build script ottimizzato
- ✅ SPA routing configurato
- ✅ TypeScript build pipeline

Dopo il deploy, l'URL sarà del tipo:
`https://finvest-ai-mentor.vercel.app`